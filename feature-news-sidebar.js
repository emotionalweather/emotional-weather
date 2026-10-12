// ============================================================
//  feature-news-sidebar.js - 📰 نافذة الأخبار
//  - جلب عشوائي من الدول
//  - تصنيف بالذكاء الاصطناعي (مع تدوير الوكلاء)
//  - عرض فوري + تحديث تلقائي عند وصول نتيجة AI
// ============================================================

console.log('📰 جاري تحميل نافذة الأخبار...');

// ============================================================
//  🌍 الدول العربية
// ============================================================
const ARAB_COUNTRIES = [
    { code: 'SA', name: 'السعودية', flag: '🇸🇦', q: 'Saudi', lat: 24.7, lng: 46.7 },
    { code: 'AE', name: 'الإمارات', flag: '🇦🇪', q: 'Emirates', lat: 25.2, lng: 55.3 },
    { code: 'QA', name: 'قطر', flag: '🇶🇦', q: 'Qatar', lat: 25.3, lng: 51.5 },
    { code: 'KW', name: 'الكويت', flag: '🇰🇼', q: 'Kuwait', lat: 29.4, lng: 47.9 },
    { code: 'BH', name: 'البحرين', flag: '🇧🇭', q: 'Bahrain', lat: 26.2, lng: 50.6 },
    { code: 'OM', name: 'عُمان', flag: '🇴🇲', q: 'Oman', lat: 23.6, lng: 58.4 },
    { code: 'YE', name: 'اليمن', flag: '🇾🇪', q: 'Yemen', lat: 15.4, lng: 44.2 },
    { code: 'EG', name: 'مصر', flag: '🇪🇬', q: 'Egypt', lat: 30.0, lng: 31.2 },
    { code: 'SD', name: 'السودان', flag: '🇸🇩', q: 'Sudan', lat: 15.5, lng: 32.5 },
    { code: 'LY', name: 'ليبيا', flag: '🇱🇾', q: 'Libya', lat: 32.9, lng: 13.2 },
    { code: 'TN', name: 'تونس', flag: '🇹🇳', q: 'Tunisia', lat: 36.8, lng: 10.2 },
    { code: 'DZ', name: 'الجزائر', flag: '🇩🇿', q: 'Algeria', lat: 36.7, lng: 3.1 },
    { code: 'MA', name: 'المغرب', flag: '🇲🇦', q: 'Morocco', lat: 34.0, lng: -6.8 },
    { code: 'MR', name: 'موريتانيا', flag: '🇲🇷', q: 'Mauritania', lat: 18.1, lng: -15.9 },
    { code: 'JO', name: 'الأردن', flag: '🇯🇴', q: 'Jordan', lat: 31.9, lng: 35.9 },
    { code: 'LB', name: 'لبنان', flag: '🇱🇧', q: 'Lebanon', lat: 33.9, lng: 35.5 },
    { code: 'SY', name: 'سوريا', flag: '🇸🇾', q: 'Syria', lat: 33.5, lng: 36.3 },
    { code: 'IQ', name: 'العراق', flag: '🇮🇶', q: 'Iraq', lat: 33.3, lng: 44.4 },
    { code: 'PS', name: 'فلسطين', flag: '🇵🇸', q: 'Palestine', lat: 31.9, lng: 35.2 },
    { code: 'DJ', name: 'جيبوتي', flag: '🇩🇯', q: 'Djibouti', lat: 11.6, lng: 43.1 },
    { code: 'SO', name: 'الصومال', flag: '🇸🇴', q: 'Somalia', lat: 2.0, lng: 45.3 },
    { code: 'KM', name: 'جزر القمر', flag: '🇰🇲', q: 'Comoros', lat: -11.7, lng: 43.3 }
];

// ============================================================
//  💾 متغيرات عامة
// ============================================================
window.__realNewsMood = {};
window.__realCountryMoods = {};
window.__realCountryImpact = {};

ARAB_COUNTRIES.forEach(c => {
    window.__realCountryMoods[c.code] = {};
    window.__realCountryImpact[c.code] = [];
});

// ============================================================
//  🎨 CSS
// ============================================================
function injectNewsStyles() {
    if (document.getElementById('news-styles')) return;
    const style = document.createElement('style');
    style.id = 'news-styles';
    style.textContent = `
        #news-panel {
            position: fixed;
            top: 110px;
            right: 0;
            bottom: 60px;
            width: 380px;
            background: rgba(10, 18, 30, 0.98);
            border-left: 1px solid rgba(56, 189, 248, 0.3);
            z-index: 900;
            backdrop-filter: blur(20px);
            display: flex;
            flex-direction: column;
            font-family: inherit;
            box-shadow: -5px 0 30px rgba(0,0,0,0.5);
        }

        body.lang-en #news-panel {
            right: auto;
            left: 0;
            border-left: none;
            border-right: 1px solid rgba(56, 189, 248, 0.3);
            box-shadow: 5px 0 30px rgba(0,0,0,0.5);
        }

        .news-header {
            padding: 14px 18px;
            background: linear-gradient(90deg, rgba(56, 189, 248, 0.15), rgba(139, 92, 246, 0.15));
            border-bottom: 1px solid rgba(56, 189, 248, 0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            color: #38bdf8;
            font-weight: 700;
            font-size: 0.9rem;
            flex-shrink: 0;
        }
        .news-header .live-dot {
            width: 9px; height: 9px;
            background: #ff4444;
            border-radius: 50%;
            animation: livePulse 1.5s infinite;
        }
        @keyframes livePulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.5); }
            50%      { opacity: 0.6; box-shadow: 0 0 0 10px rgba(255, 68, 68, 0); }
        }
        .news-ai-status {
            margin-left: auto;
            font-size: 0.65rem;
            color: #6ee7b7;
            background: rgba(0, 255, 150, 0.1);
            padding: 3px 8px;
            border-radius: 10px;
            border: 1px solid rgba(0, 255, 150, 0.2);
        }
        body.lang-en .news-ai-status { margin-left: 0; margin-right: auto; }

        .news-body {
            flex: 1;
            overflow-y: auto;
            padding: 12px 14px;
            min-height: 0;
        }
        .news-body::-webkit-scrollbar { width: 5px; }
        .news-body::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 5px; }

        .news-card {
            background: rgba(255, 255, 255, 0.04);
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 10px;
            border-right: 3px solid;
            animation: newsIn 0.5s ease;
            cursor: pointer;
            transition: background 0.2s;
        }
        .news-card:hover { background: rgba(255,255,255,0.08); }
        body.lang-en .news-card { border-right: none; border-left: 3px solid; }

        @keyframes newsIn {
            from { opacity: 0; transform: translateX(20px); }
            to   { opacity: 1; transform: translateX(0); }
        }

        .news-card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
            gap: 6px;
        }
        .news-country {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.78rem;
            color: #cbd5e1;
            font-weight: 700;
        }
        .news-country .flag { font-size: 1rem; }
        .news-tag {
            font-size: 0.65rem;
            padding: 3px 8px;
            border-radius: 10px;
            font-weight: 700;
            color: #fff;
            transition: all 0.3s;
        }
        .news-tag.loading {
            background: rgba(148, 163, 184, 0.3) !important;
            animation: pulseTag 1.5s infinite;
        }
        @keyframes pulseTag {
            0%, 100% { opacity: 0.5; }
            50%      { opacity: 1; }
        }

        .news-title {
            color: #fff;
            font-size: 0.85rem;
            line-height: 1.55;
            margin-bottom: 6px;
        }
        .news-meta {
            font-size: 0.7rem;
            color: #94a3b8;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            align-items: center;
        }
        .news-reason {
            font-size: 0.68rem;
            color: #64748b;
            margin-top: 4px;
            font-style: italic;
        }

        .news-empty {
            text-align: center;
            color: #64748b;
            padding: 40px 20px;
            font-size: 0.85rem;
        }

        .news-warning {
            background: rgba(255, 200, 0, 0.1);
            border: 1px solid rgba(255, 200, 0, 0.3);
            color: #FFD700;
            padding: 8px 12px;
            border-radius: 10px;
            font-size: 0.72rem;
            margin-bottom: 10px;
            text-align: center;
        }

        @media (max-width: 768px) {
            #news-panel {
                top: auto;
                bottom: 80px;
                right: 0;
                left: 0;
                width: 100%;
                max-height: 50vh;
                border-left: none;
                border-top: 1px solid rgba(56, 189, 248, 0.3);
                border-radius: 20px 20px 0 0;
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

    const hasKey = typeof getAIKey === 'function' && getAIKey();

    newsPanel = document.createElement('div');
    newsPanel.id = 'news-panel';
    newsPanel.innerHTML = `
        <div class="news-header">
            <span class="live-dot"></span>
            <span>🌍 أخبار العالم العربي — مباشر</span>
            <span class="news-ai-status" id="aiStatus">${hasKey ? '🤖 AI مُفعّل' : '⚠️ بدون AI'}</span>
        </div>
        <div class="news-body" id="newsBody">
            ${hasKey ? '' : '<div class="news-warning">⚠️ مفتاح AI غير مُعد. التصنيف يعمل بالكلمات المفتاحية فقط.</div>'}
            <div class="news-empty">⏳ جاري تحميل الأخبار...</div>
        </div>
    `;
    document.body.appendChild(newsPanel);
    newsBody = document.getElementById('newsBody');
}

// ============================================================
//  📰 جلب أخبار دولة
// ============================================================
async function fetchCountryNews(country) {
    try {
        const query = encodeURIComponent(country.q);
        const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}%20sourcelang:arabic%20OR%20sourcelang:english&mode=artlist&maxrecords=6&format=json&sort=datedesc`;

        const res = await fetch(url);
        if (!res.ok) throw new Error('HTTP ' + res.status);

        const data = await res.json();
        if (!data.articles || data.articles.length === 0) return [];

        return data.articles
            .filter(a => a.title && a.title.length > 15)
            .map(a => ({
                country: country,
                title: a.title,
                url: a.url || '#',
                date: a.seendate || ''
            }));
    } catch (err) {
        console.warn(`⚠️ فشل جلب ${country.name}:`, err.message);
        return [];
    }
}

// ============================================================
//  🔄 جلب عشوائي
// ============================================================
let recentCountries = [];

async function fetchRandomCountry() {
    let country;
    let attempts = 0;
    do {
        country = ARAB_COUNTRIES[Math.floor(Math.random() * ARAB_COUNTRIES.length)];
        attempts++;
    } while (recentCountries.includes(country.code) && attempts < 15);

    recentCountries.push(country.code);
    if (recentCountries.length > 5) recentCountries.shift();

    const articles = await fetchCountryNews(country);
    processArticles(country, articles);
}

// ============================================================
//  📊 معالجة الأخبار (مع AI)
// ============================================================
function processArticles(country, articles) {
    articles.forEach(a => {
        // 1. تصنيف فوري بالكلمات المفتاحية (fast)
        const initial = typeof keywordClassify === 'function'
            ? keywordClassify(a.title)
            : { category: 'politics', sentiment: 'neutral', mood: 'neutral', impact: 30, reason: '' };

        a.category = initial.category;
        a.sentiment = initial.sentiment;
        a.mood = initial.mood;
        a.impact = initial.impact;
        a.reason = initial.reason;
        a.aiPending = true;
        a.source = 'keyword';

        // 2. حدّث الإحصائيات مبدئياً
        updateStats(country, a);

        // 3. اظهر البطاقة فوراً (بحالة loading)
        const cardEl = displayNewsCard(a);

        // 4. نقطة على الخريطة
        dropMapMarker(country, a.mood);

        // 5. شغّل التصنيف بالـ AI في الخلفية
        if (typeof classifyWithSmartAI === 'function' && typeof getAIKey === 'function' && getAIKey()) {
            classifyInBackground(a, country, cardEl);
        }
    });
}

// ============================================================
//  🤖 التصنيف بالـ AI في الخلفية
// ============================================================
async function classifyInBackground(news, country, cardEl) {
    try {
        const result = await classifyWithSmartAI(news.title, country.name);

        if (!result) {
            // فشل الـ AI — خلي التصنيف بالكلمات
            if (cardEl) {
                cardEl.dataset.aiPending = 'false';
                updateCardAIState(cardEl, null);
            }
            return;
        }

        // ✅ نجح الـ AI — حدّث الخبر
        // احذف التصنيف القديم من الإحصائيات
        removeFromStats(country, news);

        // حدّث الحقول
        news.category = result.category;
        news.sentiment = result.sentiment;
        news.mood = result.mood;
        news.impact = result.impact;
        news.reason = result.reason;
        news.source = result.source || 'ai';
        news.aiPending = false;

        // أضف للإحصائيات الجديدة
        updateStats(country, news);

        // حدّث البطاقة
        if (cardEl) {
            cardEl.dataset.aiPending = 'false';
            updateCardAIState(cardEl, news);
        }

        // حدّث الخريطة
        refreshMapMarker(country, news.mood);

    } catch (err) {
        console.warn('⚠️ فشل تصنيف AI:', err.message);
        if (cardEl) {
            cardEl.dataset.aiPending = 'false';
            updateCardAIState(cardEl, null);
        }
    }
}

// ============================================================
//  📊 الإحصائيات
// ============================================================
function updateStats(country, news) {
    const cat = news.category;

    // عالمية
    window.__realNewsMood[cat] = (window.__realNewsMood[cat] || 0) + 1;

    // الدولة
    if (!window.__realCountryMoods[country.code]) {
        window.__realCountryMoods[country.code] = {};
    }
    window.__realCountryMoods[country.code][cat] =
        (window.__realCountryMoods[country.code][cat] || 0) + 1;

    // قوة التأثير
    if (!window.__realCountryImpact[country.code]) {
        window.__realCountryImpact[country.code] = [];
    }
    window.__realCountryImpact[country.code].push(news.impact);
}

function removeFromStats(country, news) {
    const cat = news.category;

    if (window.__realNewsMood[cat]) {
        window.__realNewsMood[cat] = Math.max(0, window.__realNewsMood[cat] - 1);
    }

    if (window.__realCountryMoods[country.code] && window.__realCountryMoods[country.code][cat]) {
        window.__realCountryMoods[country.code][cat] = Math.max(0,
            window.__realCountryMoods[country.code][cat] - 1
        );
    }

    if (window.__realCountryImpact[country.code]) {
        const idx = window.__realCountryImpact[country.code].indexOf(news.impact);
        if (idx > -1) window.__realCountryImpact[country.code].splice(idx, 1);
    }
}

// ============================================================
//  🎬 عرض بطاقة
// ============================================================
function displayNewsCard(news) {
    if (!newsBody) return null;

    const empty = newsBody.querySelector('.news-empty');
    if (empty) empty.remove();

    const cat = (typeof AI_CATEGORIES !== 'undefined' && AI_CATEGORIES[news.category])
        ? AI_CATEGORIES[news.category]
        : { emoji: '🏛️', label: 'أخبار', color: '#9370DB' };

    const card = document.createElement('div');
    card.className = 'news-card';
    card.dataset.aiPending = 'true';
    card.style.borderRightColor = cat.color;
    if (document.body.classList.contains('lang-en')) {
        card.style.borderLeftColor = cat.color;
    }

    card.innerHTML = `
        <div class="news-card-top">
            <div class="news-country">
                <span class="flag">${news.country.flag}</span>
                <span>${news.country.name}</span>
            </div>
            <span class="news-tag loading" data-cat>⏳ جاري التحليل...</span>
        </div>
        <div class="news-title">${escapeHTML(news.title)}</div>
        <div class="news-meta" data-meta></div>
        <div class="news-reason" data-reason style="display:none;"></div>
    `;

    card.onclick = () => {
        if (news.url && news.url !== '#') window.open(news.url, '_blank');
    };

    newsBody.insertBefore(card, newsBody.firstChild);

    while (newsBody.children.length > 40) {
        newsBody.removeChild(newsBody.lastChild);
    }

    // حدّث الحالة الأولية
    updateCardAIState(card, null);

    // ربط البطاقة بالخبر
    news._card = card;

    return card;
}

// ============================================================
//  🎨 تحديث البطاقة حسب حالة AI
// ============================================================
function updateCardAIState(cardEl, news) {
    if (!cardEl) return;

    const tagEl = cardEl.querySelector('[data-cat]');
    const metaEl = cardEl.querySelector('[data-meta]');
    const reasonEl = cardEl.querySelector('[data-reason]');

    if (!news) {
        // لا يوجد AI — استخدم الكلمات المفتاحية (نستخرج من dataset)
        // (يعني البطاقة راح تبقى loading، بس نغير النص)
        if (tagEl) {
            tagEl.classList.remove('loading');
            tagEl.textContent = '📊 تصنيف أساسي';
            tagEl.style.background = 'rgba(148, 163, 184, 0.3)';
        }
        return;
    }

    const cat = (typeof AI_CATEGORIES !== 'undefined' && AI_CATEGORIES[news.category])
        ? AI_CATEGORIES[news.category]
        : { emoji: '🏛️', label: 'أخبار', color: '#9370DB' };

    const sentiment = (typeof AI_IMPACT_LABELS !== 'undefined' && AI_IMPACT_LABELS[news.sentiment])
        ? AI_IMPACT_LABELS[news.sentiment]
        : { label: 'محايد', color: '#94a3b8' };

    if (tagEl) {
        tagEl.classList.remove('loading');
        tagEl.textContent = `${cat.emoji} ${cat.label}`;
        tagEl.style.background = cat.color;
    }

    if (metaEl) {
        const source = news.source === 'ai' ? '🤖 AI' : '🔤 أساسي';
        metaEl.innerHTML = `
            <span style="color:${sentiment.color};">💭 ${sentiment.label}</span>
            <span>💥 ${news.impact}/100</span>
            <span style="opacity:0.7;">${source}</span>
        `;
    }

    if (reasonEl && news.reason) {
        reasonEl.textContent = '📝 ' + news.reason;
        reasonEl.style.display = 'block';
    }

    // حدّث لون الحدود
    cardEl.style.borderRightColor = cat.color;
    if (document.body.classList.contains('lang-en')) {
        cardEl.style.borderLeftColor = cat.color;
    }
}

// ============================================================
//  📍 النقاط على الخريطة
// ============================================================
const mapMarkers = new Map();

function dropMapMarker(country, mood) {
    if (typeof dropEmotion !== 'function' || typeof EMOTIONS === 'undefined') return;

    const emoKey = mood || 'neutral';
    if (!EMOTIONS[emoKey]) return;

    const lat = country.lat + (Math.random() - 0.5) * 2;
    const lng = country.lng + (Math.random() - 0.5) * 2;
    const id = `${country.code}_${Date.now()}_${Math.random()}`;

    try {
        const emo = EMOTIONS[emoKey];
        const icon = L.divIcon({
            className: 'emo-marker',
            html: `<div class="emo-marker-inner" style="color:${emo.color};">
                     <span class="emo-marker-emoji">${emo.emoji}</span>
                   </div>`,
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });

        const marker = L.marker([lat, lng], { icon, interactive: false }).addTo(map);
        const timeout = setTimeout(() => {
            map.removeLayer(marker);
            mapMarkers.delete(id);
        }, 25000);

        mapMarkers.set(id, { marker, timeout, country, mood });
    } catch (e) {}
}

function refreshMapMarker(country, newMood) {
    // ما نعدل الموجود — الماركرز تختفي بعد 25 ثانية.
    // لما AI يخلص، راح نحط ماركر جديد بلون صحيح.
    dropMapMarker(country, newMood);
}

// ============================================================
//  🛡️ حماية
// ============================================================
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

// ============================================================
//  🚀 جلب أولي
// ============================================================
async function fetchAllInitial() {
    console.log('🚀 جاري جلب أخبار الدول العربية...');

    const shuffled = [...ARAB_COUNTRIES].sort(() => Math.random() - 0.5);
    const batchSize = 3;

    for (let i = 0; i < shuffled.length; i += batchSize) {
        const batch = shuffled.slice(i, i + batchSize);
        await Promise.all(batch.map(async country => {
            const articles = await fetchCountryNews(country);
            processArticles(country, articles);
        }));
        // تأخير بسيط بين الدفعات
        await new Promise(r => setTimeout(r, 800));
    }

    console.log('✅ تم جلب كل الأخبار الأولية');
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initNewsFeature() {
    injectNewsStyles();
    buildNewsPanel();

    fetchAllInitial();
    setInterval(fetchRandomCountry, 8000);

    console.log('✅ تم تفعيل نافذة الأخبار!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initNewsFeature, 1300));
} else {
    setTimeout(initNewsFeature, 1300);
}