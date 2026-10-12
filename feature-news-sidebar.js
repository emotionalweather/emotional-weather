// ============================================================
//  feature-news-sidebar.js - 📰 نافذة الأخبار (RSS Edition)
//  - مصادر RSS عربية وعالمية موثوقة
//  - بدون rate limits
//  - تصنيف بالـ AI (مع تدوير الوكلاء)
//  - كشف تلقائي للدولة من عنوان الخبر
// ============================================================

console.log('📰 جاري تحميل نافذة الأخبار (RSS)...');

// ============================================================
//  🌐 مصادر RSS (عربية + عالمية)
// ============================================================
const RSS_SOURCES = [
    // ============ قنوات عربية ============
    {
        id: 'bbc_ar',
        name: 'BBC عربي',
        url: 'https://feeds.bbci.co.uk/arabic/rss.xml'
    },
    {
        id: 'aljazeera_ar',
        name: 'الجزيرة',
        url: 'https://www.aljazeera.net/aljazeerarss/a7c186be-1baa-4bd4-9d80-a84db769f779/73d0e1b4-532f-45ef-b135-bfdff8b8cab9'
    },
    {
        id: 'dw_ar',
        name: 'DW عربية',
        url: 'https://rss.dw.com/rdf/rss-ar-all'
    },
    {
        id: 'cnn_ar',
        name: 'CNN عربي',
        url: 'https://arabic.cnn.com/api/v1/rss/rss.xml'
    },
    {
        id: 'rt_ar',
        name: 'RT عربي',
        url: 'https://arabic.rt.com/rss/'
    },
    {
        id: 'skynews_ar',
        name: 'سكاي نيوز عربية',
        url: 'https://www.skynewsarabia.com/web/rss/'
    },
    {
        id: 'alarabiya_ar',
        name: 'العربية',
        url: 'http://www.alarabiya.net/.mrss/ar/arab-and-world.xml'
    },
    {
        id: 'alhadath_ar',
        name: 'الحدث',
        url: 'https://www.alhadath.net/rss'
    },
    {
        id: 'asharq_ar',
        name: 'الشرق للأخبار',
        url: 'https://asharq.com/rss'
    },
    {
        id: 'alhurra_ar',
        name: 'الحرة',
        url: 'https://www.alhurra.com/rss'
    },
    {
        id: 'almayadeen_ar',
        name: 'الميادين',
        url: 'https://www.almayadeen.net/rss'
    },
    {
        id: 'almanar_ar',
        name: 'المنار',
        url: 'https://www.almanar.com.lb/rss'
    },

    // ============ قنوات عالمية ============
    {
        id: 'bbc_en',
        name: 'BBC World',
        url: 'https://feeds.bbci.co.uk/news/world/rss.xml'
    },
    {
        id: 'cnn_en',
        name: 'CNN World',
        url: 'http://rss.cnn.com/rss/edition_world.rss'
    },
    {
        id: 'aljazeera_en',
        name: 'Al Jazeera English',
        url: 'https://www.aljazeera.com/xml/rss/all.xml'
    },
    {
        id: 'reuters_en',
        name: 'Reuters',
        url: 'https://www.reutersagency.com/feed/?best-regions=world&post_type=best'
    },
    {
        id: 'ap_en',
        name: 'Associated Press',
        url: 'https://apnews.com/hub/ap-top-news/rss'
    },
    {
        id: 'france24_en',
        name: 'France 24 English',
        url: 'https://www.france24.com/en/rss'
    },
    {
        id: 'dw_en',
        name: 'DW English',
        url: 'https://rss.dw.com/rdf/rss-en-all'
    },
    {
        id: 'skynews_en',
        name: 'Sky News',
        url: 'https://feeds.skynews.com/feeds/rss/world.xml'
    },
    {
        id: 'guardian_en',
        name: 'The Guardian',
        url: 'https://www.theguardian.com/world/rss'
    },
    {
        id: 'nytimes_en',
        name: 'New York Times',
        url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'
    }
];

// ============================================================
//  🏳️ كلمات مفتاحية للدول (لكشف الدولة من العنوان)
// ============================================================
const COUNTRY_KEYWORDS = {
    SA: ['السعودية', 'الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة المنورة', 'أبها', 'الطائف', 'Saudi', 'Riyadh', 'Jeddah'],
    AE: ['الإمارات', 'دبي', 'أبوظبي', 'الشارقة', 'عجمان', 'الفجيرة', 'UAE', 'Dubai', 'Abu Dhabi'],
    QA: ['قطر', 'الدوحة', 'Qatar', 'Doha'],
    KW: ['الكويت', 'Kuwait'],
    BH: ['البحرين', 'المنامة', 'Bahrain', 'Manama'],
    OM: ['عُمان', 'عمان', 'مسقط', 'Oman', 'Muscat'],
    YE: ['اليمن', 'صنعاء', 'عدن', 'تعز', 'الحديدة', 'Yemen', 'Sanaa', 'Aden'],
    EG: ['مصر', 'القاهرة', 'الإسكندرية', 'الجيزة', 'الأقصر', 'أسوان', 'Egypt', 'Cairo', 'Alexandria'],
    SD: ['السودان', 'الخرطوم', 'أم درمان', 'Sudan', 'Khartoum'],
    LY: ['ليبيا', 'طرابلس', 'بنغازي', 'مصراتة', 'Libya', 'Tripoli', 'Benghazi'],
    TN: ['تونس', 'قرطاج', 'صفاقس', 'Tunisia', 'Tunis', 'Sfax'],
    DZ: ['الجزائر', 'وهران', 'قسنطينة', 'Algeria', 'Algiers', 'Oran'],
    MA: ['المغرب', 'الرباط', 'الدار البيضاء', 'مراكش', 'فاس', 'طنجة', 'Morocco', 'Rabat', 'Casablanca', 'Marrakech'],
    MR: ['موريتانيا', 'نواكشوط', 'Mauritania', 'Nouakchott'],
    JO: ['الأردن', 'عمّان', 'إربد', 'الزرقاء', 'Jordan', 'Amman', 'Irbid'],
    LB: ['لبنان', 'بيروت', 'طرابلس', 'صيدا', 'صور', 'Lebanon', 'Beirut', 'Sidon'],
    SY: ['سوريا', 'دمشق', 'حلب', 'حمص', 'اللاذقية', 'Syria', 'Damascus', 'Aleppo', 'Homs'],
    IQ: ['العراق', 'بغداد', 'البصرة', 'الموصل', 'أربيل', 'النجف', 'Iraq', 'Baghdad', 'Basra', 'Mosul', 'Erbil'],
    PS: ['فلسطين', 'غزة', 'القدس', 'رام الله', 'نابلس', 'الخليل', 'Palestine', 'Gaza', 'Jerusalem', 'Ramallah'],
    DJ: ['جيبوتي', 'Djibouti'],
    SO: ['الصومال', 'مقديشو', 'Somalia', 'Mogadishu'],
    KM: ['جزر القمر', 'موروني', 'Comoros', 'Moroni']
};

// ============================================================
//  💾 متغيرات عامة
// ============================================================
window.__realNewsMood = {};
window.__realCountryMoods = {};
window.__realCountryImpact = {};

Object.keys(COUNTRY_KEYWORDS).forEach(code => {
    window.__realCountryMoods[code] = {};
    window.__realCountryImpact[code] = [];
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
            border-right: 3px solid #94a3b8;
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
            font-size: 0.75rem;
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
            background: rgba(148, 163, 184, 0.3);
            transition: all 0.3s;
        }
        .news-tag.loading { animation: pulseTag 1.5s infinite; }
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
        .news-source {
            font-size: 0.62rem;
            color: #64748b;
            margin-top: 4px;
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
            <span>🌍 أخبار العالم — مباشر</span>
            <span class="news-ai-status" id="aiStatus">${hasKey ? '🤖 AI مُفعّل' : '⚠️ بدون AI'}</span>
        </div>
        <div class="news-body" id="newsBody">
            ${hasKey ? '' : '<div class="news-warning">⚠️ مفتاح AI غير مُعد.</div>'}
            <div class="news-empty">⏳ جاري تحميل الأخبار من BBC، الجزيرة، DW...</div>
        </div>
    `;
    document.body.appendChild(newsPanel);
    newsBody = document.getElementById('newsBody');
}

// ============================================================
//  🌐 وكلاء CORS Proxy (للتعامل مع قيود المتصفح)
// ============================================================
const CORS_PROXIES = [
    (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
    (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
];

// ============================================================
//  📡 جلب RSS مع تدوير الـ Proxy
// ============================================================
async function fetchRSSWithProxy(rssUrl) {
    for (let i = 0; i < CORS_PROXIES.length; i++) {
        try {
            const proxyUrl = CORS_PROXIES[i](rssUrl);
            const res = await fetch(proxyUrl, {
                method: 'GET',
                headers: { 'Accept': 'application/xml, text/xml, */*' }
            });

            if (!res.ok) throw new Error('HTTP ' + res.status);

            const text = await res.text();
            if (!text || text.length < 100) throw new Error('رد فاضي');

            return text;
        } catch (err) {
            console.warn(`⚠️ Proxy ${i + 1} فشل:`, err.message);
            // ننتقل للـ proxy التالي
        }
    }
    return null;
}

// ============================================================
//  📖 تحليل XML واستخراج الأخبار
// ============================================================
function parseRSS(xmlText, source) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) throw new Error('XML غير صالح');

        const items = xmlDoc.querySelectorAll('item, entry');
        const articles = [];

        items.forEach(item => {
            const titleEl = item.querySelector('title');
            const title = titleEl ? titleEl.textContent.trim() : '';

            let link = '';
            const linkEl = item.querySelector('link');
            if (linkEl) {
                link = linkEl.textContent.trim() || linkEl.getAttribute('href') || '';
            }

            const dateEl = item.querySelector('pubDate, published, updated, dc\\:date');
            const date = dateEl ? dateEl.textContent.trim() : '';

            if (title && title.length > 15) {
                articles.push({
                    title,
                    link: link || '#',
                    date,
                    source: source.name,
                    sourceId: source.id
                });
            }
        });

        return articles;
    } catch (err) {
        console.warn(`⚠️ فشل تحليل ${source.name}:`, err.message);
        return [];
    }
}

// ============================================================
//  🎯 كشف الدولة من عنوان الخبر
// ============================================================
function detectCountry(title) {
    const lower = title.toLowerCase();
    for (const [code, keywords] of Object.entries(COUNTRY_KEYWORDS)) {
        for (const kw of keywords) {
            if (lower.includes(kw.toLowerCase())) {
                return code;
            }
        }
    }
    return null;
}

// ============================================================
//  🌍 الحصول على معلومات الدولة
// ============================================================
const COUNTRY_INFO = {
    SA: { flag: '🇸🇦', name: 'السعودية', lat: 24.7, lng: 46.7 },
    AE: { flag: '🇦🇪', name: 'الإمارات', lat: 25.2, lng: 55.3 },
    QA: { flag: '🇶🇦', name: 'قطر', lat: 25.3, lng: 51.5 },
    KW: { flag: '🇰🇼', name: 'الكويت', lat: 29.4, lng: 47.9 },
    BH: { flag: '🇧🇭', name: 'البحرين', lat: 26.2, lng: 50.6 },
    OM: { flag: '🇴🇲', name: 'عُمان', lat: 23.6, lng: 58.4 },
    YE: { flag: '🇾🇪', name: 'اليمن', lat: 15.4, lng: 44.2 },
    EG: { flag: '🇪🇬', name: 'مصر', lat: 30.0, lng: 31.2 },
    SD: { flag: '🇸🇩', name: 'السودان', lat: 15.5, lng: 32.5 },
    LY: { flag: '🇱🇾', name: 'ليبيا', lat: 32.9, lng: 13.2 },
    TN: { flag: '🇹🇳', name: 'تونس', lat: 36.8, lng: 10.2 },
    DZ: { flag: '🇩🇿', name: 'الجزائر', lat: 36.7, lng: 3.1 },
    MA: { flag: '🇲🇦', name: 'المغرب', lat: 34.0, lng: -6.8 },
    MR: { flag: '🇲🇷', name: 'موريتانيا', lat: 18.1, lng: -15.9 },
    JO: { flag: '🇯🇴', name: 'الأردن', lat: 31.9, lng: 35.9 },
    LB: { flag: '🇱🇧', name: 'لبنان', lat: 33.9, lng: 35.5 },
    SY: { flag: '🇸🇾', name: 'سوريا', lat: 33.5, lng: 36.3 },
    IQ: { flag: '🇮🇶', name: 'العراق', lat: 33.3, lng: 44.4 },
    PS: { flag: '🇵🇸', name: 'فلسطين', lat: 31.9, lng: 35.2 },
    DJ: { flag: '🇩🇯', name: 'جيبوتي', lat: 11.6, lng: 43.1 },
    SO: { flag: '🇸🇴', name: 'الصومال', lat: 2.0, lng: 45.3 },
    KM: { flag: '🇰🇲', name: 'جزر القمر', lat: -11.7, lng: 43.3 }
};

// ============================================================
//  📊 معالجة مقال واحد
// ============================================================
async function processArticle(article) {
    const countryCode = detectCountry(article.title);
    article.countryCode = countryCode;
    article.countryInfo = countryCode ? COUNTRY_INFO[countryCode] : null;

    const initial = typeof keywordClassify === 'function'
        ? keywordClassify(article.title)
        : { category: 'politics', sentiment: 'neutral', mood: 'neutral', impact: 30, reason: '' };

    article.category = initial.category;
    article.sentiment = initial.sentiment;
    article.mood = initial.mood;
    article.impact = initial.impact;
    article.reason = initial.reason;
    article.source_type = 'keyword';
    article.aiPending = true;

    const cardEl = displayNewsCard(article);

    updateStats(article);

    if (countryCode) dropMapMarker(article.countryInfo, article.mood);

    if (typeof classifyWithSmartAI === 'function' && typeof getAIKey === 'function' && getAIKey()) {
        classifyInBackground(article, cardEl);
    }
}

// ============================================================
//  🤖 التصنيف بالـ AI في الخلفية
// ============================================================
async function classifyInBackground(article, cardEl) {
    try {
        const countryName = article.countryInfo ? article.countryInfo.name : 'العالم';
        const result = await classifyWithSmartAI(article.title, countryName);

        if (!result) {
            if (cardEl) updateCardAIState(cardEl, null);
            return;
        }

        removeFromStats(article);

        article.category = result.category;
        article.sentiment = result.sentiment;
        article.mood = result.mood;
        article.impact = result.impact;
        article.reason = result.reason;
        article.source_type = result.source || 'ai';
        article.aiPending = false;

        updateStats(article);

        if (cardEl) updateCardAIState(cardEl, article);

        if (article.countryCode) dropMapMarker(article.countryInfo, article.mood);

    } catch (err) {
        console.warn('⚠️ فشل تصنيف AI:', err.message);
        if (cardEl) updateCardAIState(cardEl, null);
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
            window.__realCountryMoods[code][cat] = Math.max(0,
                window.__realCountryMoods[code][cat] - 1
            );
        }
        if (window.__realCountryImpact[code]) {
            const idx = window.__realCountryImpact[code].indexOf(article.impact);
            if (idx > -1) window.__realCountryImpact[code].splice(idx, 1);
        }
    }
}

// ============================================================
//  🎬 عرض بطاقة
// ============================================================
function displayNewsCard(article) {
    if (!newsBody) return null;

    const empty = newsBody.querySelector('.news-empty');
    if (empty) empty.remove();

    const card = document.createElement('div');
    card.className = 'news-card';
    card.dataset.aiPending = 'true';

    const sourceTag = article.countryInfo
        ? `<div class="news-country"><span class="flag">${article.countryInfo.flag}</span><span>${article.countryInfo.name}</span></div>`
        : `<div class="news-country"><span class="flag">🌍</span><span>عالمي</span></div>`;

    card.innerHTML = `
        <div class="news-card-top">
            ${sourceTag}
            <span class="news-tag loading" data-cat>⏳ تحليل...</span>
        </div>
        <div class="news-title">${escapeHTML(article.title)}</div>
        <div class="news-meta" data-meta></div>
        <div class="news-reason" data-reason style="display:none;"></div>
        <div class="news-source">📡 ${article.source || 'مصدر'}</div>
    `;

    card.onclick = () => {
        if (article.link && article.link !== '#') window.open(article.link, '_blank');
    };

    newsBody.insertBefore(card, newsBody.firstChild);

    while (newsBody.children.length > 50) {
        newsBody.removeChild(newsBody.lastChild);
    }

    updateCardAIState(card, null);
    article._card = card;

    return card;
}

// ============================================================
//  🎨 تحديث البطاقة
// ============================================================
function updateCardAIState(cardEl, article) {
    if (!cardEl) return;

    const tagEl = cardEl.querySelector('[data-cat]');
    const metaEl = cardEl.querySelector('[data-meta]');
    const reasonEl = cardEl.querySelector('[data-reason]');

    if (!article) {
        if (tagEl) {
            tagEl.classList.remove('loading');
            tagEl.textContent = '📊 تصنيف أساسي';
            tagEl.style.background = 'rgba(148, 163, 184, 0.3)';
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
        const sourceLabel = article.source_type === 'ai' ? '🤖 AI' : '🔤 أساسي';
        metaEl.innerHTML = `
            <span style="color:${sentiment.color};">💭 ${sentiment.label}</span>
            <span>💥 ${article.impact}/100</span>
            <span style="opacity:0.7;">${sourceLabel}</span>
        `;
    }

    if (reasonEl && article.reason) {
        reasonEl.textContent = '📝 ' + article.reason;
        reasonEl.style.display = 'block';
    }

    cardEl.style.borderRightColor = cat.color;
    if (document.body.classList.contains('lang-en')) {
        cardEl.style.borderLeftColor = cat.color;
    }
}

// ============================================================
//  📍 نقاط على الخريطة
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

// ============================================================
//  🛡️ حماية
// ============================================================
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

// ============================================================
//  🚀 جلب كل المصادر
// ============================================================
async function fetchAllSources() {
    console.log('🚀 جاري جلب الأخبار من RSS...');

    const fetchPromises = RSS_SOURCES.map(async (source) => {
        const xml = await fetchRSSWithProxy(source.url);
        if (!xml) return [];
        return parseRSS(xml, source);
    });

    const results = await Promise.all(fetchPromises);
    const allArticles = results.flat();

    const seen = new Set();
    const uniqueArticles = allArticles.filter(a => {
        const key = a.title.slice(0, 40);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    console.log(`✅ تم جلب ${uniqueArticles.length} خبر من ${RSS_SOURCES.length} مصدر`);

    for (let i = 0; i < uniqueArticles.length; i++) {
        await processArticle(uniqueArticles[i]);
        if (i % 5 === 0) await new Promise(r => setTimeout(r, 200));
    }
}

// ============================================================
//  🔄 تحديث دوري
// ============================================================
async function refreshNews() {
    const source = RSS_SOURCES[Math.floor(Math.random() * RSS_SOURCES.length)];
    const xml = await fetchRSSWithProxy(source.url);
    if (!xml) return;

    const articles = parseRSS(xml, source);
    if (articles.length === 0) return;

    const shuffled = articles.sort(() => Math.random() - 0.5).slice(0, 3);
    for (const article of shuffled) {
        await processArticle(article);
    }
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initNewsFeature() {
    injectNewsStyles();
    buildNewsPanel();

    fetchAllSources();
    setInterval(refreshNews, 30000);

    console.log('✅ تم تفعيل نافذة الأخبار (RSS)!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initNewsFeature, 1300));
} else {
    setTimeout(initNewsFeature, 1300);
}