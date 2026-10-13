// ============================================================
//  feature-news-sidebar.js - 📰 نافذة الأخبار (بدون AI)
// ============================================================

console.log('📰 جاري تحميل نافذة الأخبار...');

const NEWS_JSON_URL = 'data/news.json';

// ============================================================
//  🌍 معلومات الدول (من data-countries.js)
// ============================================================
const COUNTRY_INFO = {};
if (typeof window.ALL_COUNTRIES !== 'undefined') {
    window.ALL_COUNTRIES.forEach(c => {
        COUNTRY_INFO[c.code] = {
            flag: c.flag,
            name: c.ar,
            lat: c.lat,
            lng: c.lng
        };
    });
    console.log(`✅ تم تحميل ${Object.keys(COUNTRY_INFO).length} دولة`);
}

// ============================================================
//  💾 بيانات عالمية
// ============================================================
window.__realCountryScores = {};
window.__realNewsMood = {};

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
            0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(255,68,68,0.5); }
            50% { opacity:0.6; box-shadow:0 0 0 10px rgba(255,68,68,0); }
        }
        #news-toggle-btn {
            display: none; margin-left: auto;
            width: 34px; height: 34px; border-radius: 50%;
            background: rgba(56,189,248,0.15);
            border: 1px solid rgba(56,189,248,0.35);
            color: #38bdf8; font-size: 1rem; cursor: pointer;
            align-items: center; justify-content: center;
            flex-shrink: 0; padding: 0; font-family: inherit;
        }
        body.lang-en #news-toggle-btn { margin-left: 0; margin-right: auto; }
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
        }
        .news-card:hover { background: rgba(255,255,255,0.08); }
        body.lang-en .news-card { border-right: none; border-left: 3px solid; }
        @keyframes newsIn {
            from { opacity:0; transform: translateX(20px); }
            to { opacity:1; transform: translateX(0); }
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
        }
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
        @media (max-width: 768px) {
            #news-panel {
                top: auto; bottom: 80px; right: 0; left: 0;
                width: 100%; max-height: 50vh;
                border-left: none;
                border-top: 1px solid rgba(56,189,248,0.3);
                border-radius: 20px 20px 0 0;
                transition: max-height 0.35s ease;
            }
            #news-toggle-btn { display: flex; }
            #news-panel.collapsed { max-height: 58px; }
            #news-panel.collapsed .news-body { display: none; }
            #news-panel.collapsed #news-toggle-btn { transform: rotate(180deg); }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  🏗️ البناء
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
            <button id="news-toggle-btn">▼</button>
        </div>
        <div class="news-body" id="newsBody">
            <div class="news-empty">⏳ جاري تحميل الأخبار...</div>
        </div>
    `;
    document.body.appendChild(newsPanel);
    newsBody = document.getElementById('newsBody');

    const toggleBtn = document.getElementById('news-toggle-btn');
    if (toggleBtn) toggleBtn.onclick = (e) => { e.stopPropagation(); toggleNewsPanel(); };

    if (localStorage.getItem('news_panel_collapsed') === '1') {
        newsPanel.classList.add('collapsed');
    }
}

function toggleNewsPanel() {
    if (!newsPanel) return;
    newsPanel.classList.toggle('collapsed');
    localStorage.setItem('news_panel_collapsed', newsPanel.classList.contains('collapsed') ? '1' : '0');
}
window.toggleNewsPanel = toggleNewsPanel;

// ============================================================
//  🎬 عرض البطاقة
// ============================================================
function displayNewsCard(article) {
    if (!newsBody) return;
    const empty = newsBody.querySelector('.news-empty');
    if (empty) empty.remove();

    const countryInfo = article.countryCode ? COUNTRY_INFO[article.countryCode] : null;

    const sourceTag = countryInfo
        ? `<div class="news-country"><span class="flag">${countryInfo.flag}</span><span>${countryInfo.name}</span></div>`
        : `<div class="news-country"><span class="flag">🌍</span><span>عالمي</span></div>`;

    const cat = (typeof AI_CATEGORIES !== 'undefined' && AI_CATEGORIES[article.category])
        ? AI_CATEGORIES[article.category]
        : { emoji: '🏛️', label: 'أخبار', color: '#9370DB' };

    const sentiment = (typeof AI_IMPACT_LABELS !== 'undefined' && AI_IMPACT_LABELS[article.sentiment])
        ? AI_IMPACT_LABELS[article.sentiment]
        : { label: 'محايد', color: '#94a3b8' };

    const card = document.createElement('div');
    card.className = 'news-card';
    card.style.borderRightColor = cat.color;

    card.innerHTML = `
        <div class="news-card-top">
            ${sourceTag}
            <span class="news-tag" style="background:${cat.color};">${cat.emoji} ${cat.label}</span>
        </div>
        <div class="news-title">${escapeHTML(article.summary || article.title)}</div>
        <div class="news-meta">
            <span style="color:${sentiment.color};">💭 ${sentiment.label}</span>
            <span>💥 ${article.impact}/100</span>
        </div>
    `;

    if (article.link && article.link !== '#') {
        card.onclick = () => window.open(article.link, '_blank');
    }

    newsBody.appendChild(card);
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
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
    try { dropEmotion(lat, lng, emoKey, `${countryInfo.flag} ${countryInfo.name}`); } catch (e) {}
}

// ============================================================
//  📥 التحميل
// ============================================================
async function fetchNews() {
    console.log('📥 جاري قراءة news.json...');
    try {
        const res = await fetch(NEWS_JSON_URL + '?t=' + Date.now());
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();

        if (!data.articles || data.articles.length === 0) {
            if (newsBody) newsBody.innerHTML = '<div class="news-empty">لا توجد أخبار حالياً</div>';
            return;
        }

        console.log(`✅ ${data.articles.length} خبر — آخر تحديث: ${data.updated_at}`);

        // 🌟 خزّن مزاج الدول للخريطة
        window.__realCountryScores = data.countries || {};
        window.__realNewsMood = (data.global && data.global.categories) || {};

        // 🔄 شغّل تحديث الخريطة
        if (typeof refreshMoodMap === 'function') {
            setTimeout(() => refreshMoodMap(), 500);
        }

        // 📰 اعرض الأخبار (عشوائياً للتنويع)
        const shuffled = [...data.articles].sort(() => Math.random() - 0.5);

        // 🔴 ابدأ بالأخبار المهمة (حرب/كوارث)
        const priorityOrder = { war:1, disaster:2, crisis:3, health:4, politics:5, economy:6, sports:7, culture:8, positive:9 };
        shuffled.sort((a, b) => {
            const pa = (priorityOrder[a.category] || 5) * 1000 - a.impact;
            const pb = (priorityOrder[b.category] || 5) * 1000 - b.impact;
            return pa - pb;
        });

        shuffled.slice(0, 40).forEach(displayNewsCard);

    } catch (err) {
        console.error('❌ فشل:', err.message);
        if (newsBody) newsBody.innerHTML = '<div class="news-empty">جاري تحديث الأخبار...</div>';
    }
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initNewsFeature() {
    injectNewsStyles();
    buildNewsPanel();
    fetchNews();
    console.log('✅ تم تفعيل نافذة الأخبار!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initNewsFeature, 1300));
} else {
    setTimeout(initNewsFeature, 1300);
}