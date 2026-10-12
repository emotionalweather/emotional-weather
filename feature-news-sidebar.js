// ============================================================
//  feature-news-sidebar.js - 📰 نافذة الأخبار العربية
//  تجيب أخبار 22 دولة عربية وتحلل مزاجها
// ============================================================

console.log('📰 جاري تحميل نافذة الأخبار...');

// ============================================================
//  🌍 الدول العربية الـ22
// ============================================================
const ARAB_COUNTRIES = [
    { code: 'SA', name: 'السعودية', flag: '🇸🇦', q: 'Saudi Arabia', lat: 24.7, lng: 46.7 },
    { code: 'AE', name: 'الإمارات', flag: '🇦🇪', q: 'United Arab Emirates', lat: 25.2, lng: 55.3 },
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
//  🎭 تصنيف الأخبار → مشاعر
// ============================================================
const NEWS_CATEGORIES = {
    war:      { emoji: '⚔️', label: 'حرب/نزاع', color: '#FF4500', mood: 'غضب وحزن',
               keywords: ['war','attack','bomb','conflict','military','strike','kill','قتال','حرب','هجوم','قصف','عسكري','قتل'] },
    disaster: { emoji: '🌊', label: 'كارثة', color: '#4A90E2', mood: 'حزن',
               keywords: ['earthquake','flood','fire','storm','disaster','زلزال','فيضان','حريق','كارثة','عاصفة'] },
    crisis:   { emoji: '⚠️', label: 'أزمة', color: '#8A2BE2', mood: 'قلق',
               keywords: ['crisis','emergency','collapse','inflation','أزمة','طوارئ','انهيار','تضخم'] },
    economy:  { emoji: '💹', label: 'اقتصاد', color: '#00CED1', mood: 'ترقب',
               keywords: ['economy','market','trade','investment','stock','اقتصاد','سوق','تجارة','استثمار','بورصة'] },
    politics: { emoji: '🏛️', label: 'سياسة', color: '#9370DB', mood: 'ترقب',
               keywords: ['election','president','minister','parliament','government','انتخابات','رئيس','وزير','برلمان','حكومة'] },
    sports:   { emoji: '⚽', label: 'رياضة', color: '#FFD700', mood: 'فرح',
               keywords: ['football','match','olympic','championship','goal','كرة','مباراة','أولمبياد','بطولة','هدف'] },
    health:   { emoji: '🏥', label: 'صحة', color: '#FF69B4', mood: 'قلق',
               keywords: ['health','hospital','vaccine','disease','virus','صحة','مستشفى','لقاح','مرض','فيروس'] },
    culture:  { emoji: '🎭', label: 'ثقافة', color: '#FFB300', mood: 'فرح',
               keywords: ['culture','festival','art','museum','heritage','ثقافة','مهرجان','فن','متحف','تراث'] },
    positive: { emoji: '✨', label: 'إيجابي', color: '#00ff96', mood: 'أمل',
               keywords: ['peace','agreement','growth','success','reform','سلام','اتفاق','نمو','نجاح','إصلاح'] }
};

function classifyNews(text) {
    const lower = (text || '').toLowerCase();
    for (const [key, cat] of Object.entries(NEWS_CATEGORIES)) {
        for (const w of cat.keywords) {
            if (lower.includes(w.toLowerCase())) return key;
        }
    }
    return 'politics'; // افتراضي
}

// ============================================================
//  📊 تتبع مزاج كل دولة
// ============================================================
const countryMood = {}; // { SA: { war: 3, economy: 2, ... } }
ARAB_COUNTRIES.forEach(c => countryMood[c.code] = {});

// ============================================================
//  🎨 CSS للنافذة
// ============================================================
function injectNewsStyles() {
    if (document.getElementById('news-styles')) return;
    const style = document.createElement('style');
    style.id = 'news-styles';
    style.textContent = `
        #news-panel {
            position: fixed;
            top: 80px;
            right: 12px;
            width: 340px;
            max-height: calc(100vh - 200px);
            background: rgba(10, 18, 30, 0.97);
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 16px;
            z-index: 900;
            backdrop-filter: blur(15px);
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            font-family: inherit;
        }

        .news-header {
            padding: 12px 16px;
            background: linear-gradient(90deg, rgba(56, 189, 248, 0.15), rgba(139, 92, 246, 0.15));
            border-bottom: 1px solid rgba(56, 189, 248, 0.2);
            display: flex;
            align-items: center;
            gap: 8px;
            color: #38bdf8;
            font-weight: 700;
            font-size: 0.85rem;
        }
        .news-header .live-dot {
            width: 8px; height: 8px;
            background: #ff4444;
            border-radius: 50%;
            animation: livePulse 1.5s infinite;
        }
        @keyframes livePulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.5); }
            50%      { opacity: 0.6; box-shadow: 0 0 0 8px rgba(255, 68, 68, 0); }
        }

        .news-body {
            flex: 1;
            overflow-y: auto;
            padding: 12px;
            min-height: 200px;
            max-height: 400px;
        }
        .news-body::-webkit-scrollbar { width: 4px; }
        .news-body::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 4px; }

        .news-card {
            background: rgba(255, 255, 255, 0.04);
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 10px;
            border-right: 3px solid;
            animation: newsIn 0.5s ease;
        }
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
            font-size: 0.82rem;
            line-height: 1.55;
            margin-bottom: 6px;
        }
        .news-mood {
            font-size: 0.7rem;
            color: #94a3b8;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .news-empty {
            text-align: center;
            color: #64748b;
            padding: 40px 20px;
            font-size: 0.8rem;
        }

        /* لوحة المزاج العربي */
        .arabic-mood-board {
            border-top: 1px solid rgba(56, 189, 248, 0.2);
            padding: 12px;
            background: rgba(0,0,0,0.3);
            max-height: 220px;
            overflow-y: auto;
        }
        .arabic-mood-board::-webkit-scrollbar { width: 4px; }
        .arabic-mood-board::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 4px; }

        .mood-board-title {
            font-size: 0.72rem;
            color: #38bdf8;
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: 1px;
        }

        .mood-row {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 4px;
            font-size: 0.72rem;
            border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .mood-row:last-child { border-bottom: none; }
        .mood-row .flag { font-size: 0.95rem; }
        .mood-row .name { flex: 1; color: #cbd5e1; }
        .mood-row .bar {
            width: 60px;
            height: 6px;
            background: rgba(255,255,255,0.08);
            border-radius: 3px;
            overflow: hidden;
        }
        .mood-row .bar-fill {
            height: 100%;
            transition: width 0.5s;
        }
        .mood-row .mood-label {
            font-size: 0.68rem;
            font-weight: 700;
            min-width: 50px;
            text-align: left;
        }

        /* للجوال */
        @media (max-width: 768px) {
            #news-panel {
                top: auto;
                bottom: 10px;
                right: 10px;
                left: 10px;
                width: auto;
                max-height: 45vh;
            }
            .news-body { max-height: 180px; }
            .arabic-mood-board { max-height: 140px; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  🏗️ بناء النافذة
// ============================================================
let newsPanel, newsBody, moodBoard;
let currentCountryIdx = 0;
let newsQueue = [];
let displayInterval = null;
let fetchInterval = null;

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
            <div class="news-empty">⏳ جاري تحميل الأخبار...</div>
        </div>
        <div class="arabic-mood-board" id="moodBoard">
            <div class="mood-board-title">📊 مزاج الدول العربية</div>
            <div id="moodRows"></div>
        </div>
    `;
    document.body.appendChild(newsPanel);

    newsBody = document.getElementById('newsBody');
    moodBoard = document.getElementById('moodRows');
}

// ============================================================
//  📰 جلب الأخبار من GDELT (لكل دولة)
// ============================================================
async function fetchCountryNews(country) {
    try {
        const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(country.q)}&mode=artlist&maxrecords=5&format=json&sort=DateDesc&timespan=24h`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        return (data.articles || []).map(a => ({
            country: country,
            title: a.title || '',
            url: a.url || '',
            date: a.seendate || ''
        }));
    } catch (err) {
        console.warn(`⚠️ فشل جلب أخبار ${country.name}:`, err.message);
        return [];
    }
}

// ============================================================
//  🔄 دورة الجلب (كل 5 ثواني دولة)
// ============================================================
async function fetchNextCountry() {
    const country = ARAB_COUNTRIES[currentCountryIdx];
    const articles = await fetchCountryNews(country);

    if (articles.length > 0) {
        // حلل كل خبر وأضفه للطابور
        articles.forEach(a => {
            const cat = classifyNews(a.title);
            a.category = cat;

            // حدث مزاج الدولة
            if (!countryMood[country.code][cat]) countryMood[country.code][cat] = 0;
            countryMood[country.code][cat]++;

            // ضع الخبر في الطابور
            newsQueue.push(a);

            // أضف نقطة على الخريطة
            try {
                if (typeof dropEmotion === 'function' && typeof EMOTIONS !== 'undefined') {
                    const emoKey = NEWS_CATEGORIES[cat].emotion || 'neutral';
                    const jitterLat = country.lat + (Math.random() - 0.5) * 1.5;
                    const jitterLng = country.lng + (Math.random() - 0.5) * 1.5;
                    dropEmotion(jitterLat, jitterLng, emoKey, `${country.flag} ${country.name}`);
                }
            } catch (e) {}
        });

        updateMoodBoard();
    }

    // انتقل للدولة التالية
    currentCountryIdx = (currentCountryIdx + 1) % ARAB_COUNTRIES.length;
}

// ============================================================
//  🎬 عرض الأخبار (كل 5 ثواني)
// ============================================================
function displayNextNews() {
    if (newsQueue.length === 0) return;

    const news = newsQueue.shift();
    const cat = NEWS_CATEGORIES[news.category] || NEWS_CATEGORIES.politics;

    // إذا الـ body فيه رسالة "جاري التحميل"، امسحها
    const empty = newsBody.querySelector('.news-empty');
    if (empty) empty.remove();

    const card = document.createElement('div');
    card.className = 'news-card';
    card.style.borderRightColor = cat.color;
    card.innerHTML = `
        <div class="news-card-top">
            <div class="news-country">
                <span class="flag">${news.country.flag}</span>
                <span>${news.country.name}</span>
            </div>
            <span class="news-tag" style="background:${cat.color};">${cat.emoji} ${cat.label}</span>
        </div>
        <div class="news-title">${escapeHTML(news.title)}</div>
        <div class="news-mood">💭 المزاج المتوقع: <strong style="color:${cat.color};">${cat.mood}</strong></div>
    `;

    // أضف في الأعلى
    newsBody.insertBefore(card, newsBody.firstChild);

    // احتفظ بآخر 15 خبر فقط
    while (newsBody.children.length > 15) {
        newsBody.removeChild(newsBody.lastChild);
    }
}

// ============================================================
//  📊 تحديث لوحة المزاج
// ============================================================
function updateMoodBoard() {
    if (!moodBoard) return;
    moodBoard.innerHTML = '';

    // احسب مزاج كل دولة
    const countryMoods = ARAB_COUNTRIES.map(c => {
        const moods = countryMood[c.code] || {};
        const total = Object.values(moods).reduce((a, b) => a + b, 0);

        if (total === 0) {
            return { country: c, total: 0, dominant: null, score: 0 };
        }

        // المشعر السائد
        let dominant = null, max = 0;
        for (const [k, v] of Object.entries(moods)) {
            if (v > max) { max = v; dominant = k; }
        }

        // حساب "درجة المزاج" (0-100)
        const goodCats = ['sports', 'culture', 'positive'];
        const badCats = ['war', 'disaster', 'crisis'];
        let score = 50;
        for (const [k, v] of Object.entries(moods)) {
            const ratio = v / total;
            if (goodCats.includes(k)) score += ratio * 50;
            if (badCats.includes(k)) score -= ratio * 50;
        }
        score = Math.max(0, Math.min(100, score));

        return { country: c, total, dominant, score };
    });

    // رتب حسب الدرجة تنازلياً
    countryMoods.sort((a, b) => b.score - a.score);

    // اعرض كل الدول
    countryMoods.forEach(cm => {
        if (cm.total === 0) return;

        const cat = NEWS_CATEGORIES[cm.dominant] || NEWS_CATEGORIES.politics;
        let moodLabel, moodColor;
        if (cm.score >= 70) { moodLabel = 'إيجابي'; moodColor = '#00ff96'; }
        else if (cm.score >= 50) { moodLabel = 'مستقر'; moodColor = '#38bdf8'; }
        else if (cm.score >= 30) { moodLabel = 'متوتر'; moodColor = '#FFB300'; }
        else { moodLabel = 'متأزم'; moodColor = '#ff5555'; }

        const row = document.createElement('div');
        row.className = 'mood-row';
        row.innerHTML = `
            <span class="flag">${cm.country.flag}</span>
            <span class="name">${cm.country.name}</span>
            <div class="bar">
                <div class="bar-fill" style="width:${cm.score}%; background:${moodColor};"></div>
            </div>
            <span class="mood-label" style="color:${moodColor};">${moodLabel}</span>
        `;
        moodBoard.appendChild(row);
    });
}

// ============================================================
//  🔐 حماية HTML
// ============================================================
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initNewsFeature() {
    injectNewsStyles();
    buildNewsPanel();

    // أول جلب فوري
    fetchNextCountry();

    // جلب كل 5 ثواني (دولة)
    fetchInterval = setInterval(fetchNextCountry, 5000);

    // عرض كل 5 ثواني
    displayInterval = setInterval(displayNextNews, 5000);

    console.log('✅ تم تفعيل نافذة الأخبار!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initNewsFeature, 1300));
} else {
    setTimeout(initNewsFeature, 1300);
}