// ============================================================
//  feature-news-sidebar.js - 📰 نافذة الأخبار (بطيء ومنظم)
//  - 27 مصدر RSS (عربي + عالمي)
//  - معالجة بطابور (خبر واحد كل 15 ثانية)
//  - AI ياخذ راحته (10 ثواني قبل كل طلب)
//  - زمن الدورة الكاملة: ~5 دقائق
// ============================================================

console.log('📰 جاري تحميل نافذة الأخبار (بطيء)...');

// ============================================================
//  🌐 مصادر RSS (27 مصدر)
// ============================================================
const RSS_SOURCES = [
    // ============ عربية (15) ============
    { id: 'bbc_ar', name: 'BBC عربي', url: 'https://feeds.bbci.co.uk/arabic/rss.xml' },
    { id: 'dw_ar', name: 'DW عربية', url: 'https://rss.dw.com/rdf/rss-ar-all' },
    { id: 'cnn_ar', name: 'CNN عربي', url: 'https://arabic.cnn.com/api/v1/rss/rss.xml' },
    { id: 'rt_ar', name: 'RT عربي', url: 'https://arabic.rt.com/rss/' },
    { id: 'skynews_ar', name: 'سكاي نيوز عربية', url: 'https://www.skynewsarabia.com/web/rss/' },
    { id: 'alarabiya_ar', name: 'العربية', url: 'https://www.alarabiya.net/.mrss/ar/arab-and-world.xml' },
    { id: 'alhadath_ar', name: 'الحدث', url: 'https://www.alhadath.net/rss' },
    { id: 'asharq_ar', name: 'الشرق للأخبار', url: 'https://asharq.com/rss' },
    { id: 'alhurra_ar', name: 'الحرة', url: 'https://www.alhurra.com/rss' },
    { id: 'almayadeen_ar', name: 'الميادين', url: 'https://www.almayadeen.net/rss' },
    { id: 'france24_ar', name: 'فرانس 24 عربي', url: 'https://www.france24.com/ar/rss' },
    { id: 'euronews_ar', name: 'يورونيوز عربي', url: 'https://arabic.euronews.com/rss' },
    { id: 'trt_ar', name: 'TRT عربي', url: 'https://www.trtarabi.com/rss' },
    { id: 'independent_ar', name: 'اندبندنت عربية', url: 'https://www.independentarabia.com/rss' },
    { id: 'asharq_awsat_ar', name: 'الشرق الأوسط', url: 'https://aawsat.com/feed' },

    // ============ عالمية (12) ============
    { id: 'bbc_en', name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
    { id: 'cnn_en', name: 'CNN World', url: 'http://rss.cnn.com/rss/edition_world.rss' },
    { id: 'aljazeera_en', name: 'Al Jazeera English', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
    { id: 'france24_en', name: 'France 24 English', url: 'https://www.france24.com/en/rss' },
    { id: 'dw_en', name: 'DW English', url: 'https://rss.dw.com/rdf/rss-en-all' },
    { id: 'guardian_en', name: 'The Guardian', url: 'https://www.theguardian.com/world/rss' },
    { id: 'nytimes_en', name: 'New York Times', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml' },
    { id: 'reuters_en', name: 'Reuters', url: 'https://www.reutersagency.com/feed/?best-regions=world&post_type=best' },
    { id: 'ap_en', name: 'Associated Press', url: 'https://apnews.com/hub/ap-top-news/rss' },
    { id: 'skynews_en', name: 'Sky News', url: 'https://feeds.skynews.com/feeds/rss/world.xml' },
    { id: 'euronews_en', name: 'Euronews English', url: 'https://www.euronews.com/rss' },
    { id: 'npr_en', name: 'NPR World', url: 'https://feeds.npr.org/1004/rss.xml' }
];

// ============================================================
//  🏳️ كلمات الدول
// ============================================================
const COUNTRY_KEYWORDS = {
    SA: ['السعودية', 'الرياض', 'جدة', 'الدمام', 'مكة', 'Saudi', 'Riyadh', 'Jeddah'],
    AE: ['الإمارات', 'دبي', 'أبوظبي', 'الشارقة', 'UAE', 'Dubai'],
    QA: ['قطر', 'الدوحة', 'Qatar', 'Doha'],
    KW: ['الكويت', 'Kuwait'],
    BH: ['البحرين', 'المنامة', 'Bahrain'],
    OM: ['عُمان', 'عمان', 'مسقط', 'Oman'],
    YE: ['اليمن', 'صنعاء', 'عدن', 'Yemen'],
    EG: ['مصر', 'القاهرة', 'الإسكندرية', 'Egypt', 'Cairo'],
    SD: ['السودان', 'الخرطوم', 'Sudan'],
    LY: ['ليبيا', 'طرابلس', 'بنغازي', 'Libya'],
    TN: ['تونس', 'Tunisia', 'Tunis'],
    DZ: ['الجزائر', 'وهران', 'Algeria', 'Algiers'],
    MA: ['المغرب', 'الرباط', 'الدار البيضاء', 'مراكش', 'Morocco', 'Rabat'],
    MR: ['موريتانيا', 'نواكشوط', 'Mauritania'],
    JO: ['الأردن', 'عمّان', 'Jordan', 'Amman'],
    LB: ['لبنان', 'بيروت', 'Lebanon', 'Beirut'],
    SY: ['سوريا', 'دمشق', 'حلب', 'Syria', 'Damascus'],
    IQ: ['العراق', 'بغداد', 'البصرة', 'الموصل', 'Iraq', 'Baghdad'],
    PS: ['فلسطين', 'غزة', 'القدس', 'Palestine', 'Gaza'],
    DJ: ['جيبوتي', 'Djibouti'],
    SO: ['الصومال', 'مقديشو', 'Somalia'],
    KM: ['جزر القمر', 'Comoros']
};

// ============================================================
//  🌍 معلومات الدول
// ============================================================
const COUNTRY_INFO = {
    SA:{flag:'🇸🇦',name:'السعودية',lat:24.7,lng:46.7},
    AE:{flag:'🇦🇪',name:'الإمارات',lat:25.2,lng:55.3},
    QA:{flag:'🇶🇦',name:'قطر',lat:25.3,lng:51.5},
    KW:{flag:'🇰🇼',name:'الكويت',lat:29.4,lng:47.9},
    BH:{flag:'🇧🇭',name:'البحرين',lat:26.2,lng:50.6},
    OM:{flag:'🇴🇲',name:'عُمان',lat:23.6,lng:58.4},
    YE:{flag:'🇾🇪',name:'اليمن',lat:15.4,lng:44.2},
    EG:{flag:'🇪🇬',name:'مصر',lat:30.0,lng:31.2},
    SD:{flag:'🇸🇩',name:'السودان',lat:15.5,lng:32.5},
    LY:{flag:'🇱🇾',name:'ليبيا',lat:32.9,lng:13.2},
    TN:{flag:'🇹🇳',name:'تونس',lat:36.8,lng:10.2},
    DZ:{flag:'🇩🇿',name:'الجزائر',lat:36.7,lng:3.1},
    MA:{flag:'🇲🇦',name:'المغرب',lat:34.0,lng:-6.8},
    MR:{flag:'🇲🇷',name:'موريتانيا',lat:18.1,lng:-15.9},
    JO:{flag:'🇯🇴',name:'الأردن',lat:31.9,lng:35.9},
    LB:{flag:'🇱🇧',name:'لبنان',lat:33.9,lng:35.5},
    SY:{flag:'🇸🇾',name:'سوريا',lat:33.5,lng:36.3},
    IQ:{flag:'🇮🇶',name:'العراق',lat:33.3,lng:44.4},
    PS:{flag:'🇵🇸',name:'فلسطين',lat:31.9,lng:35.2},
    DJ:{flag:'🇩🇯',name:'جيبوتي',lat:11.6,lng:43.1},
    SO:{flag:'🇸🇴',name:'الصومال',lat:2.0,lng:45.3},
    KM:{flag:'🇰🇲',name:'جزر القمر',lat:-11.7,lng:43.3}
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
//  📋 الطابور
// ============================================================
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
            position: fixed;
            top: 110px; right: 0; bottom: 60px;
            width: 380px;
            background: rgba(10, 18, 30, 0.98);
            border-left: 1px solid rgba(56, 189, 248, 0.3);
            z-index: 900; backdrop-filter: blur(20px);
            display: flex; flex-direction: column;
            font-family: inherit;
            box-shadow: -5px 0 30px rgba(0,0,0,0.5);
        }
        body.lang-en #news-panel {
            right: auto; left: 0;
            border-left: none;
            border-right: 1px solid rgba(56, 189, 248, 0.3);
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
        .news-ai-status {
            margin-left: auto; font-size: 0.65rem;
            color: #6ee7b7;
            background: rgba(0,255,150,0.1);
            padding: 3px 8px; border-radius: 10px;
            border: 1px solid rgba(0,255,150,0.2);
        }
        body.lang-en .news-ai-status { margin-left: 0; margin-right: auto; }

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
            color: #fff; font-size: 0.85rem; line-height: 1.55; margin-bottom: 6px;
        }
        .news-meta {
            font-size: 0.7rem; color: #94a3b8;
            display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
        }
        .news-reason {
            font-size: 0.68rem; color: #64748b;
            margin-top: 4px; font-style: italic;
        }
        .news-source {
            font-size: 0.62rem; color: #64748b; margin-top: 4px;
        }
        .news-empty {
            text-align: center; color: #64748b;
            padding: 40px 20px; font-size: 0.85rem; line-height: 1.8;
        }
        .news-warning {
            background: rgba(255,200,0,0.1);
            border: 1px solid rgba(255,200,0,0.3);
            color: #FFD700; padding: 8px 12px;
            border-radius: 10px; font-size: 0.72rem;
            margin-bottom: 10px; text-align: center;
        }
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
            <div class="news-empty">
                ⏳ جاري تحميل الأخبار من 27 مصدر...<br>
                <span style="font-size:0.75rem;color:#94a3b8;margin-top:10px;display:inline-block;">
                    🤖 التحليل بالذكاء الاصطناعي يأخذ وقتاً — الأخبار تظهر تدريجياً<br>
                    (الدورة الكاملة ~5 دقائق)
                </span>
            </div>
        </div>
    `;
    document.body.appendChild(newsPanel);
    newsBody = document.getElementById('newsBody');
}

// ============================================================
//  📡 جلب RSS عبر rss2json
// ============================================================
async function fetchRSSAsJSON(rssUrl) {
    try {
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=10`;
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        if (data.status !== 'ok') throw new Error(data.message || 'فشل');
        return data.items || [];
    } catch (err) {
        console.warn(`⚠️ rss2json فشل:`, err.message);
        return null;
    }
}

// ============================================================
//  🎯 كشف الدولة
// ============================================================
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
//  📊 معالجة مقال (يستنى AI)
// ============================================================
async function processArticle(article) {
    const countryCode = detectCountry(article.title);
    article.countryCode = countryCode;
    article.countryInfo = countryCode ? COUNTRY_INFO[countryCode] : null;

    const initial = typeof keywordClassify === 'function'
        ? keywordClassify(article.title)
        : { category:'politics', sentiment:'neutral', mood:'neutral', impact:30, reason:'' };

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

    // ⚠️ نستنى AI يخلص قبل ما نكمل
    if (typeof classifyWithSmartAI === 'function' && typeof getAIKey === 'function' && getAIKey()) {
        await classifyInBackground(article, cardEl);
    }
}

// ============================================================
//  🤖 التصنيف بالـ AI
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
        console.warn('⚠️ فشل AI:', err.message);
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
            window.__realCountryMoods[code][cat] = Math.max(0, window.__realCountryMoods[code][cat] - 1);
        }
        if (window.__realCountryImpact[code]) {
            const idx = window.__realCountryImpact[code].indexOf(article.impact);
            if (idx > -1) window.__realCountryImpact[code].splice(idx, 1);
        }
    }
}

// ============================================================
//  🎬 بطاقة
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

    while (newsBody.children.length > 40) {
        newsBody.removeChild(newsBody.lastChild);
    }

    updateCardAIState(card, null);
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
            tagEl.style.background = 'rgba(148,163,184,0.3)';
        }
        return;
    }

    const cat = (typeof AI_CATEGORIES !== 'undefined' && AI_CATEGORIES[article.category])
        ? AI_CATEGORIES[article.category]
        : { emoji:'🏛️', label:'أخبار', color:'#9370DB' };

    const sentiment = (typeof AI_IMPACT_LABELS !== 'undefined' && AI_IMPACT_LABELS[article.sentiment])
        ? AI_IMPACT_LABELS[article.sentiment]
        : { label:'محايد', color:'#94a3b8' };

    if (tagEl) {
        tagEl.classList.remove('loading');
        tagEl.textContent = `${cat.emoji} ${cat.label}`;
        tagEl.style.background = cat.color;
    }
    if (metaEl) {
        const src = article.source_type === 'ai' ? '🤖 AI' : '🔤 أساسي';
        metaEl.innerHTML = `
            <span style="color:${sentiment.color};">💭 ${sentiment.label}</span>
            <span>💥 ${article.impact}/100</span>
            <span style="opacity:0.7;">${src}</span>
        `;
    }
    if (reasonEl && article.reason) {
        reasonEl.textContent = '📝 ' + article.reason;
        reasonEl.style.display = 'block';
    }
    cardEl.style.borderRightColor = cat.color;
    if (document.body.classList.contains('lang-en')) cardEl.style.borderRightColor = 'transparent';
    if (document.body.classList.contains('lang-en')) cardEl.style.borderLeftColor = cat.color;
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

// ============================================================
//  🛡️ حماية
// ============================================================
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

// ============================================================
//  🐢 معالج الطابور (بطيء)
// ============================================================
async function processQueueWorker(workerId) {
    while (newsQueue.length > 0) {
        const article = newsQueue.shift();
        if (!article) break;

        console.log(`👷 [${workerId}] (${newsQueue.length} متبقي) ${article.title.slice(0, 50)}...`);

        try {
            await processArticle(article);
        } catch (err) {
            console.warn(`   ❌ [${workerId}] فشل:`, err.message);
        }

        // 🐢 15 ثانية بين كل خبر
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
    console.log('✅ تم معالجة كل الأخبار!');
}

// ============================================================
//  🚀 جلب كل المصادر (بطيء جداً)
// ============================================================
async function fetchAllSources() {
    console.log('🚀 جاري جلب الأخبار من RSS (بطيء)...');

    const results = [];

    for (let i = 0; i < RSS_SOURCES.length; i++) {
        const source = RSS_SOURCES[i];
        console.log(`📡 [${i + 1}/${RSS_SOURCES.length}] ${source.name}`);

        try {
            const items = await fetchRSSAsJSON(source.url);
            if (items && items.length > 0) {
                const articles = items.map(item => ({
                    title: item.title || '',
                    link: item.link || '#',
                    date: item.pubDate || '',
                    source: source.name,
                    sourceId: source.id
                })).filter(a => a.title.length > 15);

                results.push(...articles);
                console.log(`   ✅ ${articles.length} خبر`);
            }
        } catch (err) {
            console.warn(`   ❌ فشل: ${err.message}`);
        }

        // 🐢 11 ثانية بين كل مصدر (27 مصدر × 11 = ~5 دقائق)
        if (i < RSS_SOURCES.length - 1) {
            await new Promise(r => setTimeout(r, 11000));
        }
    }

    // إزالة المكرر
    const seen = new Set();
    const unique = results.filter(a => {
        const k = a.title.slice(0, 40);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });

    console.log(`✅ تم جلب ${unique.length} خبر فريد`);

    if (unique.length === 0) {
        if (newsBody) newsBody.innerHTML = '<div class="news-empty">❌ لم يتم جلب أي أخبار. جرب تحديث الصفحة.</div>';
        return;
    }

    // خلط عشوائي
    unique.sort(() => Math.random() - 0.5);

    // أضف للطابور
    newsQueue.push(...unique);

    // ابدأ المعالجة
    startQueueProcessor();
}

// ============================================================
//  🔄 تحديث دوري
// ============================================================
async function refreshNews() {
    const source = RSS_SOURCES[Math.floor(Math.random() * RSS_SOURCES.length)];
    console.log(`🔄 تحديث دوري: ${source.name}`);

    try {
        const items = await fetchRSSAsJSON(source.url);
        if (!items || items.length === 0) return;

        const articles = items.map(item => ({
            title: item.title || '',
            link: item.link || '#',
            date: item.pubDate || '',
            source: source.name,
            sourceId: source.id
        })).filter(a => a.title.length > 15);

        if (articles.length > 0) {
            const shuffled = articles.sort(() => Math.random() - 0.5).slice(0, 3);
            newsQueue.push(...shuffled);

            if (!queueProcessorRunning) {
                startQueueProcessor();
            }
        }
    } catch (err) {
        console.warn('⚠️ فشل التحديث الدوري:', err.message);
    }
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initNewsFeature() {
    injectNewsStyles();
    buildNewsPanel();

    fetchAllSources();

    // ⏱️ التحديث كل 10 دقائق
    setInterval(refreshNews, 600000);

    console.log('✅ تم تفعيل نافذة الأخبار (بطيء 5 دقائق)!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initNewsFeature, 1300));
} else {
    setTimeout(initNewsFeature, 1300);
}