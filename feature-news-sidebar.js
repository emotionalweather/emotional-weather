// ============================================================
//  feature-news-sidebar.js - 📰 نافذة الأخبار العربية (كامل)
//  - جلب عشوائي من 22 دولة
//  - فلترة اللغات (عربي/إنجليزي)
//  - تخزين البيانات لـ mirror + heartbeat + mood-map
// ============================================================

console.log('📰 جاري تحميل نافذة الأخبار...');

// ============================================================
//  🌍 الدول العربية الـ22
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
//  🎭 تصنيفات الأخبار
// ============================================================
const NEWS_CATEGORIES = {
    war:      { emoji: '⚔️', label: 'حرب', color: '#FF4500', mood: 'غضب', emotion: 'angry',
               keywords: ['war','attack','bomb','conflict','military','قتال','حرب','هجوم','قصف','عسكري','قتل'] },
    disaster: { emoji: '🌊', label: 'كارثة', color: '#4A90E2', mood: 'حزن', emotion: 'sad',
               keywords: ['earthquake','flood','fire','storm','زلزال','فيضان','حريق','كارثة','عاصفة'] },
    crisis:   { emoji: '⚠️', label: 'أزمة', color: '#8A2BE2', mood: 'قلق', emotion: 'anxious',
               keywords: ['crisis','emergency','collapse','inflation','أزمة','طوارئ','انهيار','تضخم'] },
    economy:  { emoji: '💹', label: 'اقتصاد', color: '#00CED1', mood: 'ترقب', emotion: 'calm',
               keywords: ['economy','market','trade','investment','econom','اقتصاد','سوق','تجارة','استثمار'] },
    politics: { emoji: '🏛️', label: 'سياسة', color: '#9370DB', mood: 'ترقب', emotion: 'neutral',
               keywords: ['election','president','minister','parliament','government','انتخابات','رئيس','وزير','برلمان','حكومة'] },
    sports:   { emoji: '⚽', label: 'رياضة', color: '#FFD700', mood: 'فرح', emotion: 'joy',
               keywords: ['football','match','olympic','championship','goal','كرة','مباراة','أولمبياد','بطولة','هدف'] },
    health:   { emoji: '🏥', label: 'صحة', color: '#FF69B4', mood: 'قلق', emotion: 'anxious',
               keywords: ['health','hospital','vaccine','disease','virus','صحة','مستشفى','لقاح','مرض','فيروس'] },
    culture:  { emoji: '🎭', label: 'ثقافة', color: '#FFB300', mood: 'فرح', emotion: 'joy',
               keywords: ['culture','festival','art','museum','ثقافة','مهرجان','فن','متحف','تراث'] },
    positive: { emoji: '✨', label: 'إيجابي', color: '#00ff96', mood: 'أمل', emotion: 'hope',
               keywords: ['peace','agreement','growth','success','reform','سلام','اتفاق','نمو','نجاح','إصلاح'] }
};

function classifyNews(text) {
    const lower = (text || '').toLowerCase();
    for (const [key, cat] of Object.entries(NEWS_CATEGORIES)) {
        for (const w of cat.keywords) {
            if (lower.includes(w.toLowerCase())) return key;
        }
    }
    return 'politics';
}

// ============================================================
//  💾 المتغيرات العامة (تستخدمها باقي الميزات)
// ============================================================
window.__realNewsMood = {};
window.__realCountryMoods = {};

ARAB_COUNTRIES.forEach(c => {
    window.__realCountryMoods[c.code] = {};
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
        }

        .news-title {
            color: #fff;
            font-size: 0.85rem;
            line-height: 1.55;
            margin-bottom: 6px;
        }
        .news-mood {
            font-size: 0.7rem;
            color: #94a3b8;
        }

        .news-empty {
            text-align: center;
            color: #64748b;
            padding: 40px 20px;
            font-size: 0.85rem;
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

    newsPanel = document.createElement('div');
    newsPanel.id = 'news-panel';
    newsPanel.innerHTML = `
        <div class="news-header">
            <span class="live-dot"></span>
            <span>🌍 أخبار العالم العربي — مباشر</span>
        </div>
        <div class="news-body" id="newsBody">
            <div class="news-empty">⏳ جاري تحميل الأخبار من 22 دولة عربية...</div>
        </div>
    `;
    document.body.appendChild(newsPanel);
    newsBody = document.getElementById('newsBody');
}

// ============================================================
//  📰 جلب أخبار دولة (فلتر لغات)
// ============================================================
async function fetchCountryNews(country) {
    try {
        const query = encodeURIComponent(country.q);
        // فلتر: عربي أو إنجليزي فقط
        const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}%20sourcelang:arabic%20OR%20sourcelang:english&mode=artlist&maxrecords=10&format=json&sort=datedesc`;

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
//  🔄 جلب عشوائي (بدون تكرار متتابع)
// ============================================================
let recentCountries = [];

async function fetchRandomCountry() {
    let country;
    let attempts = 0;
    do {
        country = ARAB_COUNTRIES[Math.floor(Math.random() * ARAB_COUNTRIES.length)];
        attempts++;
    } while (recentCountries.includes(country.code) && attempts < 20);

    recentCountries.push(country.code);
    if (recentCountries.length > 6) recentCountries.shift();

    const articles = await fetchCountryNews(country);
    processArticles(country, articles);
}

// ============================================================
//  📊 معالجة الأخبار
// ============================================================
function processArticles(country, articles) {
    articles.forEach(a => {
        const cat = classifyNews(a.title);
        a.category = cat;

        // إحصائيات عالمية
        window.__realNewsMood[cat] = (window.__realNewsMood[cat] || 0) + 1;

        // إحصائيات الدولة
        if (!window.__realCountryMoods[country.code]) {
            window.__realCountryMoods[country.code] = {};
        }
        window.__realCountryMoods[country.code][cat] =
            (window.__realCountryMoods[country.code][cat] || 0) + 1;

        // عرض البطاقة
        displayNewsCard(a);

        // نقطة على الخريطة
        if (typeof dropEmotion === 'function' && typeof EMOTIONS !== 'undefined') {
            const emoKey = NEWS_CATEGORIES[cat].emotion;
            if (EMOTIONS[emoKey]) {
                dropEmotion(
                    country.lat + (Math.random() - 0.5) * 2,
                    country.lng + (Math.random() - 0.5) * 2,
                    emoKey,
                    `${country.flag} ${country.name}`
                );
            }
        }
    });
}

// ============================================================
//  🎬 عرض بطاقة
// ============================================================
function displayNewsCard(news) {
    if (!newsBody) return;

    const empty = newsBody.querySelector('.news-empty');
    if (empty) empty.remove();

    const cat = NEWS_CATEGORIES[news.category] || NEWS_CATEGORIES.politics;

    const card = document.createElement('div');
    card.className = 'news-card';
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
            <span class="news-tag" style="background:${cat.color};">${cat.emoji} ${cat.label}</span>
        </div>
        <div class="news-title">${escapeHTML(news.title)}</div>
        <div class="news-mood">💭 المزاج: <strong style="color:${cat.color};">${cat.mood}</strong></div>
    `;

    card.onclick = () => {
        if (news.url && news.url !== '#') window.open(news.url, '_blank');
    };

    newsBody.insertBefore(card, newsBody.firstChild);

    while (newsBody.children.length > 40) {
        newsBody.removeChild(newsBody.lastChild);
    }
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

// ============================================================
//  🚀 جلب أولي لكل الدول (مرة وحدة)
// ============================================================
async function fetchAllInitial() {
    console.log('🚀 جاري جلب أخبار كل الدول العربية...');

    // نخلط الترتيب عشان ما يكون ثابت
    const shuffled = [...ARAB_COUNTRIES].sort(() => Math.random() - 0.5);

    for (const country of shuffled) {
        const articles = await fetchCountryNews(country);
        processArticles(country, articles);
        await new Promise(r => setTimeout(r, 400));
    }
    console.log('✅ تم جلب كل الأخبار الأولية');
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initNewsFeature() {
    injectNewsStyles();
    buildNewsPanel();

    // جلب أولي لكل الدول
    fetchAllInitial();

    // بعدها جلب عشوائي كل 5 ثواني
    setInterval(fetchRandomCountry, 5000);

    console.log('✅ تم تفعيل نافذة الأخبار!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initNewsFeature, 1300));
} else {
    setTimeout(initNewsFeature, 1300);
}