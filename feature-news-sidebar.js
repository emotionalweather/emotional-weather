// ============================================================
//  feature-news-sidebar.js - 📰 نافذة الأخبار + زر تصغير للجوال
// ============================================================

console.log('📰 جاري تحميل نافذة الأخبار...');

const NEWS_JSON_URL = 'data/news.json';

// ============================================================
//  🏳️ الدول من data-countries.js
// ============================================================
const COUNTRY_KEYWORDS = {};
const COUNTRY_INFO = {};

if (typeof window.ALL_COUNTRIES !== 'undefined') {
    window.ALL_COUNTRIES.forEach(c => {
        COUNTRY_KEYWORDS[c.code] = c.kw;
        COUNTRY_INFO[c.code] = {
            flag: c.flag,
            name: c.ar,
            lat: c.lat,
            lng: c.lng
        };
    });
    console.log(`✅ تم تحميل ${Object.keys(COUNTRY_KEYWORDS).length} دولة`);
}

window.__realNewsMood = {};
window.__realCountryMoods = {};
window.__realCountryImpact = {};

Object.keys(COUNTRY_KEYWORDS).forEach(code => {
    window.__realCountryMoods[code] = {};
    window.__realCountryImpact[code] = [];
});

const newsQueue = [];
let queueProcessorRunning = false;

// ============================================================
//  🎨 CSS
// ============================================================
function injectNewsStyles() {
    if (document.getElementById('news-styles')) return;
    const style = document.createElement('style');
    style.id = 'news-styles';
    style.textContent = `
        #news-panel {
            position: fixed; top: 110px; right: 0; bottom: 60px;
            width: 380px; background: rgba(10, 18, 30, 0.98);
            border-left: 1px solid rgba(56, 189, 248, 0.3);
            z-index: 900; backdrop-filter: blur(20px);
            display: flex; flex-direction: column;
            font-family: inherit;
            box-shadow: -5px 0 30px rgba(0,0,0,0.5);
        }
        body.lang-en #news-panel {
            right: auto; left: 0;
            border-left: none; border-right: 1px solid rgba(56, 189, 248, 0.3);
            box-shadow: 5px 0 30px rgba(0,0,0,0.5);
        }
        .news-header {
            padding: 14px 18px;
            background: linear-gradient(90deg, rgba(56,189,248,0.15), rgba(139,92,246,0.15));
            border-bottom: 1px solid rgba(56,189,248,0.2);
            display: flex; align-items: center; gap: 10px;
            color: #38bdf8; font-weight: 700; font-size: 0.9rem;
            flex-shrink: 0;
        }
        .news-header .live-dot {
            width: 9px; height: 9px; background: #ff4444;
            border-radius: 50%; animation: livePulse 1.5s infinite;
            flex-shrink: 0;
        }
        @keyframes livePulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,68,68,0.5); }
            50% { opacity: 0.6; box-shadow: 0 0 0 10px rgba(255,68,68,0); }
        }

        /* 🔽 زر التصغير — يظهر فقط على الجوال */
        #news-toggle-btn {
            display: none;
            margin-left: auto;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid rgba(56, 189, 248, 0.35);
            color: #38bdf8;
            font-size: 1rem;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: transform 0.3s ease, background 0.2s;
            font-family: inherit;
            padding: 0;
        }
        #news-toggle-btn:active {
            background: rgba(56, 189, 248, 0.3);
        }
        body.lang-en #news-toggle-btn {
            margin-left: 0;
            margin-right: auto;
        }

        .news-body {
            flex: 1; overflow-y: auto; padding: 12px 14px; min-height: 0;
        }
        .news-body::-webkit-scrollbar { width: 5px; }
        .news-body::-webkit-scrollbar-thumb {
            background: rgba(56,189,248,0.3); border-radius: 5px;
        }
        .news-card {
            background: rgba(255,255,255,0.04);
            border-radius: 12px; padding: 12px; margin-bottom: 10px;
            border-right: 3px solid #94a3b8;
            animation: newsIn 0.5s ease; cursor: pointer;
            transition: background 0.2s;
        }
        .news-card:hover { background: rgba(255,255,255,0.08); }
        body.lang-en .news-card { border-right: none; border-left: 3px solid; }
        @keyframes newsIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        .news-card-top {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 8px; gap: 6px;
        }
        .news-country {
            display: flex; align-items: center; gap: 6px;
            font-size: 0.75rem; color: #cbd5e1; font-weight: 700;
        }
        .news-country .flag { font-size: 1rem; }
        .news-tag {
            font-size: 0.65rem; padding: 3px 8px; border-radius: 10px;
            font-weight: 700; color: #fff;
            background: rgba(148,163,184,0.3); transition: all 0.3s;
        }
        .news-tag.loading { animation: pulseTag 1.5s infinite; }
        @keyframes pulseTag { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
        .news-title {
            color: #fff; font-size: 0.85rem; line-height: 1.6;
            margin-bottom: 6px; font-weight: 500;
        }
        .news-meta {
            font-size: 0.7rem; color: #94a3b8;
            display: flex; flex-wrap: wrap; gap: 10px; align-items: center;
        }
        .news-empty {
            text-align: center; color: #64748b;
            padding: 40px 20px; font-size: 0.85rem; line-height: 1.8;
        }
        .news-loading-spinner {
            display: inline-block; width: 20px; height: 20px;
            border: 2px solid rgba(56,189,248,0.2);
            border-top-color: #38bdf8;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 12px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* 📱 للجوال */
        @media (max-width: 768px) {
            #news-panel {
                top: auto; bottom: 80px; right: 0; left: 0;
                width: 100%; max-height: 50vh;
                border-left: none;
                border-top: 1px solid rgba(56,189,248,0.3);
                border-radius: 20px 20px 0 0;
                transition: max-height 0.35s ease;
            }

            #news-toggle-btn {
                display: flex;
            }

            /* 🔽 الوضع المصغر */
            #news-panel.collapsed {
                max-height: 58px;
                bottom: 80px;
            }
            #news-panel.collapsed .news-body {
                display: none;
            }
            #news-panel.collapsed #news-toggle-btn {
                transform: rotate(180deg);
            }

            /* تلميح بسيط على الحافة */
            #news-panel.collapsed::after {
                content: '↕ اسحب للأعلى للمزيد';
                position: absolute;
                bottom: -22px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 0.6rem;
                color: #64748b;
                white-space: nowrap;
                pointer-events: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  🏗️ بناء النافذة
// ============================================================
let newsPanel, newsBody;

function buildNewsPanel() {
    if (document.getElementById('news-panel')) return;
    newsPanel = document.createElement('div');
    newsPanel.id = 'news-panel';
    newsPanel.innerHTML = `
        <div class="news-header">
            <span class="live-dot"></span>
            <span>🌍 أخبار العالم — مباشر</span>
            <button id="news-toggle-btn" title="تصغير / تكبير">▼</button>
        </div>
        <div class="news-body" id="newsBody">
            <div class="news-empty">
                <div class="news-loading-spinner"></div>
                <div>جاري تحميل الأخبار...</div>
            </div>
        </div>
    `;
    document.body.appendChild(newsPanel);
    newsBody = document.getElementById('newsBody');

    // 🔽 زر التصغير
    const toggleBtn = document.getElementById('news-toggle-btn');
    if (toggleBtn) {
        toggleBtn.onclick = (e) => {
            e.stopPropagation();
            toggleNewsPanel();
        };
    }

    // استرجاع الحالة المحفوظة
    const savedState = localStorage.getItem('news_panel_collapsed');
    if (savedState === '1') {
        newsPanel.classList.add('collapsed');
    }
}

// ============================================================
//  🔽 فتح/إغلاق النافذة (للموبايل)
// ============================================================
function toggleNewsPanel() {
    if (!newsPanel) return;
    newsPanel.classList.toggle('collapsed');
    const isCollapsed = newsPanel.classList.contains('collapsed');
    localStorage.setItem('news_panel_collapsed', isCollapsed ? '1' : '0');
}

// نصدّرها عشان نقدر نستخدمها من أي مكان
window.toggleNewsPanel = toggleNewsPanel;

// ============================================================
//  🎯 كشف الدولة
// ============================================================
function detectCountry(title) {
    if (!title) return null;
    const lower = title.toLowerCase();
    for (const [code, keywords] of Object.entries(COUNTRY_KEYWORDS)) {
        for (const kw of keywords) {
            if (kw.length < 3) continue;
            if (lower.includes(kw.toLowerCase())) return code;
        }
    }
    return null;
}

// ============================================================
//  📊 معالجة مقال
// ============================================================
async function processArticle(article) {
    const countryCode = detectCountry(article.title);
    article.countryCode = countryCode;
    article.countryInfo = countryCode ? COUNTRY_INFO[countryCode] : null;

    const initial = typeof keywordClassify === 'function'
        ? keywordClassify(article.title)
        : {
            category: 'politics',
            sentiment: 'neutral',
            mood: 'neutral',
            impact: 30,
            summary: article.title
        };

    article.category = initial.category;
    article.sentiment = initial.sentiment;
    article.mood = initial.mood;
    article.impact = initial.impact;
    article.summary = initial.summary || article.title;
    article.fullText = article.description || '';

    const cardEl = displayNewsCard(article);
    updateStats(article);

    if (countryCode) dropMapMarker(article.countryInfo, article.mood);

    if (typeof classifyWithSmartAI === 'function' && typeof getAIKey === 'function' && getAIKey()) {
        await classifyInBackground(article, cardEl);
    }
}

// ============================================================
//  🤖 AI في الخلفية
// ============================================================
async function classifyInBackground(article, cardEl) {
    try {
        const countryName = article.countryInfo ? article.countryInfo.name : 'العالم';
        const result = await classifyWithSmartAI(article.title, countryName, article.fullText);
        if (!result) return;

        removeFromStats(article);

        article.category = result.category;
        article.sentiment = result.sentiment;
        article.mood = result.mood;
        article.impact = result.impact;
        article.summary = result.summary || article.title;

        updateStats(article);
        if (cardEl) updateCardContent(cardEl, article);
        if (article.countryCode) dropMapMarker(article.countryInfo, article.mood);
    } catch (err) {
        console.warn('⚠️ فشل AI:', err.message);
    }
}

// ============================================================
//  📊 الإحصائيات
// ============================================================
function updateStats(article) {
    const cat = article.category;
    window.__realNewsMood[cat] = (window.__realNewsMood[cat] || 0) + 1;

    if (article.countryCode) {
        const code = article.countryCode;
        if (!window.__realCountryMoods[code]) window.__realCountryMoods[code] = {};
        window.__realCountryMoods[code][cat] = (window.__realCountryMoods[code][cat] || 0) + 1;
        if (!window.__realCountryImpact[code]) window.__realCountryImpact[code] = [];
        window.__realCountryImpact[code].push(article.impact);
    }
}

function removeFromStats(article) {
    const cat = article.category;
    if (window.__realNewsMood[cat]) {
        window.__realNewsMood[cat] = Math.max(0, window.__realNewsMood[cat] - 1);
    }
    if (article.countryCode) {
        const code = article.countryCode;
        if (window.__realCountryMoods[code] && window.__realCountryMoods[code][cat]) {
            window.__realCountryMoods[code][cat] = Math.max(0, window.__realCountryMoods[code][cat] - 1);
        }
        if (window.__realCountryImpact[code]) {
            const idx = window.__realCountryImpact[code].indexOf(article.impact);
            if (idx > -1) window.__realCountryImpact[code].splice(idx, 1);
        }
    }
}

// ============================================================
//  🎬 البطاقة
// ============================================================
function displayNewsCard(article) {
    if (!newsBody) return null;
    const empty = newsBody.querySelector('.news-empty');
    if (empty) empty.remove();

    const card = document.createElement('div');
    card.className = 'news-card';

    const sourceTag = article.countryInfo
        ? `<div class="news-country"><span class="flag">${article.countryInfo.flag}</span><span>${article.countryInfo.name}</span></div>`
        : `<div class="news-country"><span class="flag">🌍</span><span>عالمي</span></div>`;

    card.innerHTML = `
        <div class="news-card-top">
            ${sourceTag}
            <span class="news-tag loading" data-cat>⏳</span>
        </div>
        <div class="news-title" data-title>${escapeHTML(article.summary || article.title)}</div>
        <div class="news-meta" data-meta></div>
    `;

    card.onclick = () => {
        if (article.link && article.link !== '#') window.open(article.link, '_blank');
    };

    newsBody.insertBefore(card, newsBody.firstChild);
    while (newsBody.children.length > 60) {
        newsBody.removeChild(newsBody.lastChild);
    }

    updateCardContent(card, null);
    return card;
}

function updateCardContent(cardEl, article) {
    if (!cardEl) return;
    const tagEl = cardEl.querySelector('[data-cat]');
    const metaEl = cardEl.querySelector('[data-meta]');
    const titleEl = cardEl.querySelector('[data-title]');

    if (!article) {
        if (tagEl) {
            tagEl.classList.remove('loading');
            tagEl.textContent = '📊';
            tagEl.style.background = 'rgba(148,163,184,0.3)';
        }
        return;
    }

    const cat = (typeof AI_CATEGORIES !== 'undefined' && AI_CATEGORIES[article.category])
        ? AI_CATEGORIES[article.category]
        : { emoji: '🏛️', label: 'أخبار', color: '#9370DB' };

    const sentiment = (typeof AI_IMPACT_LABELS !== 'undefined' && AI_IMPACT_LABELS[article.sentiment])
        ? AI_IMPACT_LABELS[article.sentiment]
        : { label: 'محايد', color: '#94a3b8' };

    if (tagEl) {
        tagEl.classList.remove('loading');
        tagEl.textContent = `${cat.emoji} ${cat.label}`;
        tagEl.style.background = cat.color;
    }
    if (metaEl) {
        metaEl.innerHTML = `
            <span style="color:${sentiment.color};">💭 ${sentiment.label}</span>
            <span>💥 ${article.impact}/100</span>
        `;
    }
    if (titleEl && article.summary) {
        titleEl.style.opacity = '0.5';
        setTimeout(() => {
            titleEl.textContent = article.summary;
            titleEl.style.opacity = '1';
        }, 200);
    }
    cardEl.style.borderRightColor = cat.color;
    if (document.body.classList.contains('lang-en')) {
        cardEl.style.borderLeftColor = cat.color;
    }
}

// ============================================================
//  📍 نقاط الخريطة
// ============================================================
function dropMapMarker(countryInfo, mood) {
    if (!countryInfo || typeof dropEmotion !== 'function' || typeof EMOTIONS === 'undefined') return;
    const emoKey = mood || 'neutral';
    if (!EMOTIONS[emoKey]) return;

    const lat = countryInfo.lat + (Math.random() - 0.5) * 2;
    const lng = countryInfo.lng + (Math.random() - 0.5) * 2;

    try {
        dropEmotion(lat, lng, emoKey, `${countryInfo.flag} ${countryInfo.name}`);
    } catch (e) {}
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

// ============================================================
//  🎯 إضافة بترتيب الأولوية
// ============================================================
function addToQueueWithPriority(articles) {
    articles.forEach(a => {
        const initial = typeof keywordClassify === 'function'
            ? keywordClassify(a.title)
            : { category: 'politics', impact: 30 };
        a.category = initial.category;
        a.impact = initial.impact;
    });

    newsQueue.push(...articles);

    if (typeof CATEGORY_PRIORITY !== 'undefined') {
        newsQueue.sort((a, b) => {
            const pa = (CATEGORY_PRIORITY[a.category] || 5) * 1000 - a.impact;
            const pb = (CATEGORY_PRIORITY[b.category] || 5) * 1000 - b.impact;
            return pa - pb;
        });
    }
}

// ============================================================
//  🐢 معالج الطابور
// ============================================================
async function processQueueWorker(workerId) {
    while (newsQueue.length > 0) {
        const article = newsQueue.shift();
        if (!article) break;

        console.log(`👷 [${workerId}] (${newsQueue.length} متبقي) ${article.category}`);

        try {
            await processArticle(article);
        } catch (err) {
            console.warn(`   ❌ [${workerId}]:`, err.message);
        }

        await new Promise(r => setTimeout(r, 15000));
    }
}

async function startQueueProcessor() {
    if (queueProcessorRunning) return;
    queueProcessorRunning = true;

    console.log(`🐢 بدء معالجة ${newsQueue.length} خبر...`);

    await Promise.all([
        processQueueWorker('W1'),
        processQueueWorker('W2')
    ]);

    queueProcessorRunning = false;
    console.log('✅ انتهت المعالجة');
}

// ============================================================
//  📥 قراءة news.json
// ============================================================
async function fetchAllSources() {
    console.log('📥 جاري قراءة الأخبار من JSON...');

    try {
        const res = await fetch(NEWS_JSON_URL + '?t=' + Date.now());
        if (!res.ok) throw new Error('HTTP ' + res.status);

        const data = await res.json();

        if (!data.articles || data.articles.length === 0) {
            if (newsBody) {
                newsBody.innerHTML = '<div class="news-empty">لا توجد أخبار حالياً</div>';
            }
            return;
        }

        console.log(`✅ تم قراءة ${data.articles.length} خبر`);
        console.log(`📅 آخر تحديث: ${data.updated_at}`);

        const shuffled = [...data.articles].sort(() => Math.random() - 0.5);
        addToQueueWithPriority(shuffled);
        startQueueProcessor();

    } catch (err) {
        console.error('❌ فشل قراءة JSON:', err.message);
        if (newsBody) {
            newsBody.innerHTML = '<div class="news-empty">جاري تحديث الأخبار...</div>';
        }
    }
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initNewsFeature() {
    injectNewsStyles();
    buildNewsPanel();
    fetchAllSources();
    console.log('✅ تم تفعيل نافذة الأخبار!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initNewsFeature, 1300));
} else {
    setTimeout(initNewsFeature, 1300);
}