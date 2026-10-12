// ============================================================
//  feature-news-sidebar.js - 📰 أخبار العالم (54 مصدر)
//  - allorigins Proxy (بدون مفتاح API)
//  - صياغة AI < 30 كلمة
//  - نظام أولوية ذكي
//  - بدون ذكر المصدر
// ============================================================

console.log('📰 جاري تحميل نافذة الأخبار (54 مصدر)...');

// ============================================================
//  🌐 54 مصدر
// ============================================================
const RSS_SOURCES = [
    // عربية (10)
    { id: 'bbc_ar', name: 'BBC عربي', url: 'https://feeds.bbci.co.uk/arabic/rss.xml' },
    { id: 'dw_ar', name: 'DW عربية', url: 'https://rss.dw.com/rdf/rss-ar-all' },
    { id: 'france24_ar', name: 'France24 عربي', url: 'https://www.france24.com/ar/rss' },
    { id: 'skynews_ar', name: 'Sky News عربية', url: 'https://www.skynewsarabia.com/web/rss/' },
    { id: 'alhurra_ar', name: 'الحرة', url: 'https://www.alhurra.com/rss' },
    { id: 'euronews_ar', name: 'Euronews عربي', url: 'https://arabic.euronews.com/rss' },
    { id: 'trt_ar', name: 'TRT عربي', url: 'https://www.trtarabi.com/rss' },
    { id: 'independent_ar', name: 'Independent عربية', url: 'https://www.independentarabia.com/rss' },
    { id: 'alarabiya_ar', name: 'العربية', url: 'https://www.alarabiya.net/.mrss/ar/arab-and-world.xml' },
    { id: 'aawsat_ar', name: 'الشرق الأوسط', url: 'https://aawsat.com/feed' },

    // أوروبا (10)
    { id: 'bbc_en', name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
    { id: 'guardian_en', name: 'The Guardian', url: 'https://www.theguardian.com/world/rss' },
    { id: 'telegraph_en', name: 'The Telegraph', url: 'https://www.telegraph.co.uk/news/worldnews/rss' },
    { id: 'skynews_en', name: 'Sky News', url: 'https://feeds.skynews.com/feeds/rss/world.xml' },
    { id: 'france24_en', name: 'France24 English', url: 'https://www.france24.com/en/rss' },
    { id: 'dw_en', name: 'DW English', url: 'https://rss.dw.com/rdf/rss-en-all' },
    { id: 'euronews_en', name: 'Euronews English', url: 'https://www.euronews.com/rss' },
    { id: 'elpais', name: 'El País', url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada' },
    { id: 'lemonde', name: 'Le Monde', url: 'https://www.lemonde.fr/rss/une.xml' },
    { id: 'corriere', name: 'Corriere della Sera', url: 'https://www.corriere.it/rss/homepage.xml' },

    // روسيا وأوروبا الشرقية (4)
    { id: 'rt_en', name: 'RT', url: 'https://www.rt.com/rss/news/' },
    { id: 'tass', name: 'TASS', url: 'https://tass.com/rss/v2.xml' },
    { id: 'kyivindependent', name: 'Kyiv Independent', url: 'https://kyivindependent.com/feed/' },
    { id: 'meduza', name: 'Meduza', url: 'https://meduza.io/rss/en/all' },

    // أمريكا الشمالية (8)
    { id: 'cnn_en', name: 'CNN World', url: 'http://rss.cnn.com/rss/edition_world.rss' },
    { id: 'nytimes_en', name: 'NY Times', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml' },
    { id: 'wapo', name: 'Washington Post', url: 'https://feeds.washingtonpost.com/rss/world' },
    { id: 'npr_en', name: 'NPR World', url: 'https://feeds.npr.org/1004/rss.xml' },
    { id: 'reuters_en', name: 'Reuters', url: 'https://www.reutersagency.com/feed/?best-regions=world&post_type=best' },
    { id: 'ap_en', name: 'AP News', url: 'https://apnews.com/hub/ap-top-news/rss' },
    { id: 'cbc', name: 'CBC Canada', url: 'https://www.cbc.ca/webfeed/rss/rss-world' },
    { id: 'politico', name: 'Politico', url: 'https://www.politico.com/rss/politicopicks.xml' },

    // أمريكا الجنوبية (5)
    { id: 'infobae', name: 'Infobae', url: 'https://www.infobae.com/feeds/rss/' },
    { id: 'mercopress', name: 'MercoPress', url: 'https://en.mercopress.com/rss/' },
    { id: 'globo', name: 'Globo', url: 'https://g1.globo.com/rss/g1/' },
    { id: 'eltiempo', name: 'El Tiempo', url: 'https://www.eltiempo.com/rss/' },
    { id: 'clarin', name: 'Clarín', url: 'https://www.clarin.com/rss/' },

    // أفريقيا (5)
    { id: 'allafrica', name: 'AllAfrica', url: 'https://allafrica.com/tools/headlines/rdf/latest/headlines.rdf' },
    { id: 'africanews', name: 'Africanews', url: 'https://www.africanews.com/feed/rss' },
    { id: 'news24', name: 'News24', url: 'https://feeds.24.com/articles/news24/TopStories/rss' },
    { id: 'dailynation', name: 'Daily Nation', url: 'https://nation.africa/kenya/rss' },
    { id: 'premiumtimes', name: 'Premium Times', url: 'https://www.premiumtimesng.com/feed' },

    // آسيا (7)
    { id: 'aljazeera_en', name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
    { id: 'scmp', name: 'SCMP', url: 'https://www.scmp.com/rss/91/feed' },
    { id: 'japantimes', name: 'Japan Times', url: 'https://www.japantimes.co.jp/feed/' },
    { id: 'nhk', name: 'NHK World', url: 'https://www3.nhk.or.jp/nhkworld/en/news/rss/all.xml' },
    { id: 'toi_india', name: 'Times of India', url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms' },
    { id: 'straitstimes', name: 'Straits Times', url: 'https://www.straitstimes.com/news/world/rss.xml' },
    { id: 'bangkokpost', name: 'Bangkok Post', url: 'https://www.bangkokpost.com/rss/data/most-recent.xml' },

    // الشرق الأوسط (3)
    { id: 'toi', name: 'Times of Israel', url: 'https://www.timesofisrael.com/feed/' },
    { id: 'haaretz', name: 'Haaretz', url: 'https://www.haaretz.com/srv/haaretz-latest-headlines-rss' },
    { id: 'iranintl', name: 'Iran International', url: 'https://www.iranintl.com/en/rss' },

    // أوقيانوسيا (2)
    { id: 'abc_au', name: 'ABC Australia', url: 'https://www.abc.net.au/news/feed/51120/rss.xml' },
    { id: 'rnz', name: 'RNZ', url: 'https://www.rnz.co.nz/rss/news.xml' }
];

// ============================================================
//  🏳️ كلمات الدول
// ============================================================
const COUNTRY_KEYWORDS = {
    SA: ['السعودية','الرياض','جدة','Saudi','Riyadh'], AE: ['الإمارات','دبي','UAE','Dubai'],
    QA: ['قطر','الدوحة','Qatar'], KW: ['الكويت','Kuwait'], BH: ['البحرين','Bahrain'],
    OM: ['عُمان','مسقط','Oman'], YE: ['اليمن','صنعاء','Yemen'],
    EG: ['مصر','القاهرة','Egypt'], SD: ['السودان','الخرطوم','Sudan'],
    LY: ['ليبيا','طرابلس','Libya'], TN: ['تونس','Tunisia'], DZ: ['الجزائر','Algeria'],
    MA: ['المغرب','الرباط','Morocco'], MR: ['موريتانيا','Mauritania'],
    JO: ['الأردن','عمّان','Jordan'], LB: ['لبنان','بيروت','Lebanon'],
    SY: ['سوريا','دمشق','Syria'], IQ: ['العراق','بغداد','Iraq'],
    PS: ['فلسطين','غزة','Palestine','Gaza'], DJ: ['جيبوتي','Djibouti'],
    SO: ['الصومال','Somalia'], KM: ['جزر القمر','Comoros']
};

const COUNTRY_INFO = {
    SA:{flag:'🇸🇦',name:'السعودية',lat:24.7,lng:46.7}, AE:{flag:'🇦🇪',name:'الإمارات',lat:25.2,lng:55.3},
    QA:{flag:'🇶🇦',name:'قطر',lat:25.3,lng:51.5}, KW:{flag:'🇰🇼',name:'الكويت',lat:29.4,lng:47.9},
    BH:{flag:'🇧🇭',name:'البحرين',lat:26.2,lng:50.6}, OM:{flag:'🇴🇲',name:'عُمان',lat:23.6,lng:58.4},
    YE:{flag:'🇾🇪',name:'اليمن',lat:15.4,lng:44.2}, EG:{flag:'🇪🇬',name:'مصر',lat:30.0,lng:31.2},
    SD:{flag:'🇸🇩',name:'السودان',lat:15.5,lng:32.5}, LY:{flag:'🇱🇾',name:'ليبيا',lat:32.9,lng:13.2},
    TN:{flag:'🇹🇳',name:'تونس',lat:36.8,lng:10.2}, DZ:{flag:'🇩🇿',name:'الجزائر',lat:36.7,lng:3.1},
    MA:{flag:'🇲🇦',name:'المغرب',lat:34.0,lng:-6.8}, MR:{flag:'🇲🇷',name:'موريتانيا',lat:18.1,lng:-15.9},
    JO:{flag:'🇯🇴',name:'الأردن',lat:31.9,lng:35.9}, LB:{flag:'🇱🇧',name:'لبنان',lat:33.9,lng:35.5},
    SY:{flag:'🇸🇾',name:'سوريا',lat:33.5,lng:36.3}, IQ:{flag:'🇮🇶',name:'العراق',lat:33.3,lng:44.4},
    PS:{flag:'🇵🇸',name:'فلسطين',lat:31.9,lng:35.2}, DJ:{flag:'🇩🇯',name:'جيبوتي',lat:11.6,lng:43.1},
    SO:{flag:'🇸🇴',name:'الصومال',lat:2.0,lng:45.3}, KM:{flag:'🇰🇲',name:'جزر القمر',lat:-11.7,lng:43.3}
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
        }
        @keyframes livePulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,68,68,0.5); }
            50% { opacity: 0.6; box-shadow: 0 0 0 10px rgba(255,68,68,0); }
        }
        .news-body {
            flex: 1; overflow-y: auto; padding: 12px 14px; min-height: 0;
        }
        .news-body::-webkit-scrollbar { width: 5px; }
        .news-body::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 5px; }
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
            color: #fff; font-size: 0.85rem; line-height: 1.6; margin-bottom: 6px;
            font-weight: 500;
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
        @media (max-width: 768px) {
            #news-panel {
                top: auto; bottom: 80px; right: 0; left: 0;
                width: 100%; max-height: 50vh;
                border-left: none;
                border-top: 1px solid rgba(56,189,248,0.3);
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
    newsPanel = document.createElement('div');
    newsPanel.id = 'news-panel';
    newsPanel.innerHTML = `
        <div class="news-header">
            <span class="live-dot"></span>
            <span>🌍 أخبار العالم — مباشر</span>
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
}

// ============================================================
//  📡 جلب RSS عبر CORS Proxies + XML Parser
// ============================================================
async function fetchRSSAsJSON(rssUrl) {
    const proxies = [
        (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
        (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
        (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`
    ];

    for (const proxyFn of proxies) {
        try {
            const proxyUrl = proxyFn(rssUrl);
            const res = await fetch(proxyUrl);
            if (!res.ok) throw new Error('HTTP ' + res.status);

            const text = await res.text();
            if (!text || text.length < 100) throw new Error('رد فاضي');

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');

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

                const descEl = item.querySelector('description, summary');
                const description = descEl ? descEl.textContent.trim() : '';

                const contentEl = item.querySelector('encoded, content');
                const content = contentEl ? contentEl.textContent.trim() : '';

                const dateEl = item.querySelector('pubDate, published, updated');
                const pubDate = dateEl ? dateEl.textContent.trim() : '';

                if (title && title.length > 10) {
                    articles.push({ title, description, content, link: link || '#', pubDate });
                }
            });

            return articles;

        } catch (err) {
            console.warn(`   ⚠️ Proxy فشل: ${err.message}`);
        }
    }

    return null;
}

function stripHTML(html) {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || '').trim();
}

function detectCountry(title) {
    const lower = title.toLowerCase();
    for (const [code, keywords] of Object.entries(COUNTRY_KEYWORDS)) {
        for (const kw of keywords) {
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
        : { category:'politics', sentiment:'neutral', mood:'neutral', impact:30, summary: article.title };

    article.category = initial.category;
    article.sentiment = initial.sentiment;
    article.mood = initial.mood;
    article.impact = initial.impact;
    article.summary = initial.summary || article.title;

    const cardEl = displayNewsCard(article);
    updateStats(article);
    if (countryCode) dropMapMarker(article.countryInfo, article.mood);

    if (typeof classifyWithSmartAI === 'function' && typeof getAIKey === 'function' && getAIKey()) {
        await classifyInBackground(article, cardEl);
    }
}

async function classifyInBackground(article, cardEl) {
    try {
        const countryName = article.countryInfo ? article.countryInfo.name : 'العالم';
        const fullText = article.fullText || '';

        const result = await classifyWithSmartAI(article.title, countryName, fullText);
        if (!result) return;

        removeFromStats(article);
        article.category = result.category;
        article.sentiment = result.sentiment;
        article.mood = result.mood;
        article.impact = result.impact;
        article.summary = result.summary || article.title;
        article.reason = result.reason || '';

        updateStats(article);
        if (cardEl) updateCardContent(cardEl, article);
        if (article.countryCode) dropMapMarker(article.countryInfo, article.mood);
    } catch (err) {
        console.warn('⚠️ فشل:', err.message);
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
    if (window.__realNewsMood[cat]) window.__realNewsMood[cat] = Math.max(0, window.__realNewsMood[cat] - 1);
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
    while (newsBody.children.length > 60) newsBody.removeChild(newsBody.lastChild);

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
        ? AI_CATEGORIES[article.category] : { emoji:'🏛️', label:'أخبار', color:'#9370DB' };
    const sentiment = (typeof AI_IMPACT_LABELS !== 'undefined' && AI_IMPACT_LABELS[article.sentiment])
        ? AI_IMPACT_LABELS[article.sentiment] : { label:'محايد', color:'#94a3b8' };

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
    if (document.body.classList.contains('lang-en')) cardEl.style.borderLeftColor = cat.color;
}

function dropMapMarker(countryInfo, mood) {
    if (!countryInfo || typeof dropEmotion !== 'function' || typeof EMOTIONS === 'undefined') return;
    const emoKey = mood || 'neutral';
    if (!EMOTIONS[emoKey]) return;
    const lat = countryInfo.lat + (Math.random() - 0.5) * 2;
    const lng = countryInfo.lng + (Math.random() - 0.5) * 2;
    try { dropEmotion(lat, lng, emoKey, `${countryInfo.flag} ${countryInfo.name}`); } catch (e) {}
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
        const initial = typeof keywordClassify === 'function' ? keywordClassify(a.title) : { category:'politics', impact:30 };
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

        try { await processArticle(article); }
        catch (err) { console.warn(`   ❌ [${workerId}]:`, err.message); }

        await new Promise(r => setTimeout(r, 15000));
    }
}

async function startQueueProcessor() {
    if (queueProcessorRunning) return;
    queueProcessorRunning = true;
    console.log(`🐢 بدء معالجة ${newsQueue.length} خبر (مرتب بالأولوية)...`);

    await Promise.all([processQueueWorker('W1'), processQueueWorker('W2')]);

    queueProcessorRunning = false;
    console.log('✅ انتهت المعالجة');
}

// ============================================================
//  🚀 جلب كل المصادر
// ============================================================
async function fetchAllSources() {
    console.log('🚀 جاري جلب الأخبار من 54 مصدر...');
    const results = [];

    for (let i = 0; i < RSS_SOURCES.length; i++) {
        const source = RSS_SOURCES[i];
        console.log(`📡 [${i + 1}/${RSS_SOURCES.length}] ${source.name}`);

        try {
            const items = await fetchRSSAsJSON(source.url);
            if (items && items.length > 0) {
                const articles = items.map(item => {
                    const desc = stripHTML(item.description || '');
                    const content = stripHTML(item.content || '');
                    const fullText = [desc, content].filter(Boolean).join(' ').slice(0, 2000);

                    return {
                        title: item.title || '',
                        fullText: fullText,
                        link: item.link || '#',
                        date: item.pubDate || '',
                        source: source.name,
                        sourceId: source.id
                    };
                }).filter(a => a.title.length > 15);

                results.push(...articles);
                console.log(`   ✅ ${articles.length}`);
            } else {
                console.log(`   ⚠️ لا يوجد أخبار`);
            }
        } catch (err) {
            console.warn(`   ❌ ${err.message}`);
        }

        if (i < RSS_SOURCES.length - 1) {
            await new Promise(r => setTimeout(r, 5000));
        }
    }

    const seen = new Set();
    const unique = results.filter(a => {
        const k = a.title.slice(0, 40);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });

    console.log(`✅ تم جلب ${unique.length} خبر من 54 مصدر`);

    if (unique.length === 0) {
        if (newsBody) newsBody.innerHTML = '<div class="news-empty">لا توجد أخبار حالياً</div>';
        return;
    }

    addToQueueWithPriority(unique);
    startQueueProcessor();
}

// ============================================================
//  🔄 تحديث دوري
// ============================================================
async function refreshNews() {
    const source = RSS_SOURCES[Math.floor(Math.random() * RSS_SOURCES.length)];
    try {
        const items = await fetchRSSAsJSON(source.url);
        if (!items || items.length === 0) return;

        const articles = items.map(item => {
            const desc = stripHTML(item.description || '');
            const content = stripHTML(item.content || '');
            const fullText = [desc, content].filter(Boolean).join(' ').slice(0, 2000);
            return {
                title: item.title || '',
                fullText: fullText,
                link: item.link || '#',
                date: item.pubDate || '',
                source: source.name,
                sourceId: source.id
            };
        }).filter(a => a.title.length > 15);

        if (articles.length > 0) {
            addToQueueWithPriority(articles.slice(0, 2));
            if (!queueProcessorRunning) startQueueProcessor();
        }
    } catch (err) {
        console.warn('⚠️ فشل التحديث:', err.message);
    }
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initNewsFeature() {
    injectNewsStyles();
    buildNewsPanel();
    fetchAllSources();
    setInterval(refreshNews, 900000); // كل 15 دقيقة
    console.log('✅ تم تفعيل نافذة الأخبار!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initNewsFeature, 1300));
} else {
    setTimeout(initNewsFeature, 1300);
}