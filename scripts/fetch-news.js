// ============================================================
//  scripts/fetch-news.js - نسخة محسّنة (سريعة + محدودة)
// ============================================================

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

console.log(`🔑 API Key: ${OPENROUTER_KEY ? 'مضاف ✅' : 'مفقود ❌'}`);

// ============================================================
//  🌐 المصادر
// ============================================================
const RSS_SOURCES = [
    { id:'bbc_ar', name:'BBC عربي', url:'https://feeds.bbci.co.uk/arabic/rss.xml' },
    { id:'dw_ar', name:'DW عربية', url:'https://rss.dw.com/rdf/rss-ar-all' },
    { id:'france24_ar', name:'France24 عربي', url:'https://www.france24.com/ar/rss' },
    { id:'skynews_ar', name:'Sky News عربية', url:'https://www.skynewsarabia.com/web/rss/' },
    { id:'alhurra_ar', name:'الحرة', url:'https://www.alhurra.com/rss' },
    { id:'euronews_ar', name:'Euronews عربي', url:'https://arabic.euronews.com/rss' },
    { id:'trt_ar', name:'TRT عربي', url:'https://www.trtarabi.com/rss' },
    { id:'independent_ar', name:'Independent عربية', url:'https://www.independentarabia.com/rss' },
    { id:'alarabiya_ar', name:'العربية', url:'https://www.alarabiya.net/.mrss/ar/arab-and-world.xml' },
    { id:'aawsat_ar', name:'الشرق الأوسط', url:'https://aawsat.com/feed' },
    { id:'bbc_en', name:'BBC World', url:'https://feeds.bbci.co.uk/news/world/rss.xml' },
    { id:'guardian_en', name:'The Guardian', url:'https://www.theguardian.com/world/rss' },
    { id:'skynews_en', name:'Sky News', url:'https://feeds.skynews.com/feeds/rss/world.xml' },
    { id:'france24_en', name:'France24 English', url:'https://www.france24.com/en/rss' },
    { id:'dw_en', name:'DW English', url:'https://rss.dw.com/rdf/rss-en-all' },
    { id:'euronews_en', name:'Euronews English', url:'https://www.euronews.com/rss' },
    { id:'lemonde', name:'Le Monde', url:'https://www.lemonde.fr/rss/une.xml' },
    { id:'elpais', name:'El País', url:'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada' },
    { id:'rt_en', name:'RT', url:'https://www.rt.com/rss/news/' },
    { id:'kyivindependent', name:'Kyiv Independent', url:'https://kyivindependent.com/feed/' },
    { id:'cnn_en', name:'CNN World', url:'http://rss.cnn.com/rss/edition_world.rss' },
    { id:'nytimes_en', name:'NY Times', url:'https://rss.nytimes.com/services/xml/rss/nyt/World.xml' },
    { id:'npr_en', name:'NPR World', url:'https://feeds.npr.org/1004/rss.xml' },
    { id:'ap_en', name:'AP News', url:'https://apnews.com/hub/ap-top-news/rss' },
    { id:'cbc', name:'CBC Canada', url:'https://www.cbc.ca/webfeed/rss/rss-world' },
    { id:'infobae', name:'Infobae', url:'https://www.infobae.com/feeds/rss/' },
    { id:'mercopress', name:'MercoPress', url:'https://en.mercopress.com/rss/' },
    { id:'globo', name:'Globo', url:'https://g1.globo.com/rss/g1/' },
    { id:'allafrica', name:'AllAfrica', url:'https://allafrica.com/tools/headlines/rdf/latest/headlines.rdf' },
    { id:'africanews', name:'Africanews', url:'https://www.africanews.com/feed/rss' },
    { id:'news24', name:'News24', url:'https://feeds.24.com/articles/news24/TopStories/rss' },
    { id:'premiumtimes', name:'Premium Times', url:'https://www.premiumtimesng.com/feed' },
    { id:'aljazeera_en', name:'Al Jazeera', url:'https://www.aljazeera.com/xml/rss/all.xml' },
    { id:'scmp', name:'SCMP', url:'https://www.scmp.com/rss/91/feed' },
    { id:'japantimes', name:'Japan Times', url:'https://www.japantimes.co.jp/feed/' },
    { id:'toi_india', name:'Times of India', url:'https://timesofindia.indiatimes.com/rssfeedstopstories.cms' },
    { id:'straitstimes', name:'Straits Times', url:'https://www.straitstimes.com/news/world/rss.xml' },
    { id:'toi', name:'Times of Israel', url:'https://www.timesofisrael.com/feed/' },
    { id:'iranintl', name:'Iran International', url:'https://www.iranintl.com/en/rss' },
    { id:'abc_au', name:'ABC Australia', url:'https://www.abc.net.au/news/feed/51120/rss.xml' },
    { id:'rnz', name:'RNZ', url:'https://www.rnz.co.nz/rss/news.xml' }
];

// ============================================================
//  🏳️ كلمات الدول
// ============================================================
const COUNTRY_KEYWORDS = {
    SA:['السعودية','الرياض','جدة','Saudi','Riyadh','Jeddah'],
    AE:['الإمارات','دبي','أبوظبي','UAE','Dubai','Emirates'],
    QA:['قطر','الدوحة','Qatar','Doha'],
    KW:['الكويت','Kuwait'],
    BH:['البحرين','المنامة','Bahrain'],
    OM:['عُمان','مسقط','Oman','Muscat'],
    YE:['اليمن','صنعاء','عدن','Yemen','Sanaa'],
    EG:['مصر','القاهرة','Egypt','Cairo'],
    SD:['السودان','الخرطوم','Sudan'],
    LY:['ليبيا','طرابلس','Libya','Tripoli'],
    TN:['تونس','Tunisia','Tunis'],
    DZ:['الجزائر','Algeria','Algiers'],
    MA:['المغرب','الرباط','Morocco','Rabat'],
    MR:['موريتانيا','Mauritania'],
    JO:['الأردن','عمّان','Jordan','Amman'],
    LB:['لبنان','بيروت','Lebanon','Beirut'],
    SY:['سوريا','دمشق','Syria','Damascus'],
    IQ:['العراق','بغداد','Iraq','Baghdad'],
    PS:['فلسطين','غزة','القدس','Palestine','Gaza'],
    DJ:['جيبوتي','Djibouti'],
    SO:['الصومال','Somalia'],
    KM:['جزر القمر','Comoros'],
    US:['الولايات المتحدة','أمريكا','واشنطن','نيويورك','United States','USA','Washington','America'],
    GB:['بريطانيا','لندن','United Kingdom','UK','Britain','London','England'],
    FR:['فرنسا','باريس','France','Paris'],
    DE:['ألمانيا','برلين','Germany','Berlin'],
    IT:['إيطاليا','روما','Italy','Rome'],
    ES:['إسبانيا','مدريد','Spain','Madrid'],
    PT:['البرتغال','Portugal','Lisbon'],
    NL:['هولندا','Netherlands','Amsterdam'],
    BE:['بلجيكا','Belgium','Brussels'],
    CH:['سويسرا','Switzerland','Geneva'],
    AT:['النمسا','Austria','Vienna'],
    SE:['السويد','Sweden','Stockholm'],
    NO:['النرويج','Norway','Oslo'],
    DK:['الدنمارك','Denmark','Copenhagen'],
    FI:['فنلندا','Finland','Helsinki'],
    IS:['آيسلندا','Iceland'],
    IE:['إيرلندا','Ireland','Dublin'],
    PL:['بولندا','Poland','Warsaw'],
    CZ:['التشيك','Czech','Prague'],
    HU:['هنغاريا','Hungary','Budapest'],
    RO:['رومانيا','Romania','Bucharest'],
    BG:['بلغاريا','Bulgaria','Sofia'],
    GR:['اليونان','Greece','Athens'],
    RU:['روسيا','موسكو','Russia','Moscow'],
    UA:['أوكرانيا','كييف','Ukraine','Kyiv'],
    TR:['تركيا','أنقرة','Turkey','Ankara','Istanbul'],
    CN:['الصين','بكين','China','Beijing','Chinese'],
    JP:['اليابان','طوكيو','Japan','Tokyo'],
    KR:['كوريا','South Korea','Seoul'],
    IN:['الهند','نيودلهي','India','Delhi','Mumbai'],
    PK:['باكستان','Pakistan','Karachi'],
    ID:['إندونيسيا','Indonesia','Jakarta'],
    TH:['تايلاند','Thailand','Bangkok'],
    VN:['فيتنام','Vietnam','Hanoi'],
    PH:['الفلبين','Philippines','Manila'],
    MY:['ماليزيا','Malaysia'],
    SG:['سنغافورة','Singapore'],
    BD:['بنغلاديش','Bangladesh','Dhaka'],
    IR:['إيران','طهران','Iran','Tehran'],
    IL:['إسرائيل','Israel','Tel Aviv'],
    AF:['أفغانستان','Afghanistan','Kabul'],
    ZA:['جنوب أفريقيا','South Africa','Johannesburg'],
    NG:['نيجيريا','Nigeria','Lagos'],
    KE:['كينيا','Kenya','Nairobi'],
    ET:['إثيوبيا','Ethiopia'],
    GH:['غانا','Ghana','Accra'],
    TZ:['تنزانيا','Tanzania'],
    UG:['أوغندا','Uganda'],
    CM:['الكاميرون','Cameroon'],
    AU:['أستراليا','Australia','Sydney'],
    NZ:['نيوزيلندا','New Zealand','Auckland'],
    KZ:['كازاخستان','Kazakhstan'],
    UZ:['أوزبكستان','Uzbekistan'],
    BR:['البرازيل','Brazil','Brasilia','Sao Paulo'],
    AR:['الأرجنتين','Argentina','Buenos Aires'],
    CO:['كولومبيا','Colombia','Bogota'],
    VE:['فنزويلا','Venezuela','Caracas'],
    PE:['بيرو','Peru','Lima'],
    CL:['تشيلي','Chile','Santiago'],
    MX:['المكسيك','Mexico','Mexico City'],
    CA:['كندا','Canada','Ottawa','Toronto'],
    BY:['بيلاروسيا','Belarus','Minsk'],
    LT:['ليتوانيا','Lithuania'],
    LV:['لاتفيا','Latvia'],
    EE:['إستونيا','Estonia'],
    HR:['كرواتيا','Croatia'],
    RS:['صربيا','Serbia','Belgrade'],
    SK:['سلوفاكيا','Slovakia'],
    SI:['سلوفينيا','Slovenia'],
    LU:['لوكسمبورغ','Luxembourg']
};

// ============================================================
//  📰 RSS Parser
// ============================================================
function parseRSS(xml) {
    const articles = [];
    const itemRegex = /<(item|entry)[\s>]([\s\S]*?)<\/\1>/gi;
    let m;
    while ((m = itemRegex.exec(xml)) !== null) {
        const item = m[2];
        let title = '', link = '', desc = '';
        const t = item.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
        if (t) title = t[1].trim();
        const l = item.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
        if (l) link = l[1].trim();
        else {
            const lh = item.match(/<link[^>]*href=["']([^"']+)["']/i);
            if (lh) link = lh[1].trim();
        }
        const d = item.match(/<description[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
        if (d) desc = d[1].trim();
        if (title && title.length > 10 && !title.includes('<')) {
            articles.push({ title, link, description: desc });
        }
    }
    return articles;
}

function stripHTML(s) {
    return (s || '').replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim();
}

function hashTitle(title) {
    return crypto.createHash('md5').update(title.slice(0,100)).digest('hex').slice(0, 12);
}

function detectCountry(title) {
    if (!title) return null;
    const lower = title.toLowerCase();
    const entries = Object.entries(COUNTRY_KEYWORDS).sort((a,b) => {
        const aMax = Math.max(...a[1].map(k=>k.length));
        const bMax = Math.max(...b[1].map(k=>k.length));
        return bMax - aMax;
    });
    for (const [code, kws] of entries) {
        for (const kw of kws) {
            if (kw.length < 3) continue;
            if (lower.includes(kw.toLowerCase())) return code;
        }
    }
    return null;
}

// ============================================================
//  🔤 Fallback
// ============================================================
const KEYWORDS = {
    war:['war','attack','bomb','قتال','حرب','هجوم','قصف','عسكري','قتل','غارة','صاروخ','اشتباك'],
    disaster:['earthquake','flood','fire','زلزال','فيضان','حريق','كارثة','عاصفة','انفجار','انهيار'],
    crisis:['crisis','emergency','collapse','inflation','أزمة','طوارئ','انهيار','تضخم','احتجاج','إضراب'],
    health:['health','hospital','vaccine','disease','virus','صحة','مستشفى','لقاح','مرض','فيروس','وباء'],
    politics:['election','president','minister','parliament','government','انتخابات','رئيس','وزير','برلمان','حكومة'],
    economy:['economy','market','trade','investment','اقتصاد','سوق','تجارة','استثمار','بورصة','نمو'],
    sports:['football','match','goal','olympic','كرة','مباراة','بطولة','دوري','أولمبياد'],
    culture:['culture','festival','art','museum','ثقافة','مهرجان','فن','متحف','تراث'],
    positive:['peace','agreement','growth','success','سلام','اتفاق','نمو','نجاح','إصلاح','تقدم']
};

function keywordClassify(title) {
    const lower = (title || '').toLowerCase();
    for (const [cat, kws] of Object.entries(KEYWORDS)) {
        for (const w of kws) {
            if (lower.includes(w.toLowerCase())) {
                let sentiment = 'neutral', mood = 'neutral', impact = 30;
                if (cat === 'war') { sentiment = 'very_negative'; mood = 'angry'; impact = 90; }
                else if (cat === 'disaster') { sentiment = 'negative'; mood = 'sad'; impact = 80; }
                else if (cat === 'crisis') { sentiment = 'negative'; mood = 'anxious'; impact = 70; }
                else if (cat === 'health') { sentiment = 'negative'; mood = 'anxious'; impact = 55; }
                else if (cat === 'positive') { sentiment = 'positive'; mood = 'hope'; impact = 75; }
                else if (cat === 'sports' || cat === 'culture') { sentiment = 'positive'; mood = 'joy'; impact = 35; }
                else if (cat === 'economy') { sentiment = 'slightly_positive'; mood = 'calm'; impact = 45; }
                return { category: cat, sentiment, mood, impact, summary: title, reason: 'keyword' };
            }
        }
    }
    return { category: 'politics', sentiment: 'neutral', mood: 'neutral', impact: 25, summary: title, reason: 'keyword' };
}

// ============================================================
//  🤖 AI Classification
// ============================================================
const AI_MODELS = [
    'nvidia/nemotron-3-super-120b-a12b:free',
    'nvidia/nemotron-3.5-lightning:free'
];

function extractJSON(text) {
    if (!text) return null;
    let clean = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    try { return JSON.parse(clean); } catch (e) {}
    const match = clean.match(/\{[\s\S]*?\}/);
    if (match) { try { return JSON.parse(match[0]); } catch (e) {} }
    return null;
}

async function classifyWithAI(title) {
    if (!OPENROUTER_KEY) return keywordClassify(title);

    const prompt = `Classify this news and return ONLY JSON:

Title: "${title}"

Return: {"category":"war|disaster|crisis|health|politics|economy|sports|culture|positive","sentiment":"very_negative|negative|slightly_negative|neutral|slightly_positive|positive|very_positive","mood":"angry|sad|anxious|calm|neutral|joy|hope","impact":50,"summary":"ملخص عربي أقل من 25 كلمة"}

Return ONLY the JSON, nothing else.`;

    for (const model of AI_MODELS) {
        try {
            const res = await fetch(OPENROUTER_URL, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + OPENROUTER_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model,
                    messages: [
                        { role: 'system', content: 'You return only valid JSON.' },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.1,
                    max_tokens: 250
                }),
                signal: AbortSignal.timeout(20000)
            });

            if (!res.ok) {
                if (res.status === 429) await new Promise(r => setTimeout(r, 2000));
                continue;
            }

            const data = await res.json();
            const content = data.choices?.[0]?.message?.content || '';
            const parsed = extractJSON(content);
            if (!parsed) continue;

            return {
                category: parsed.category || 'politics',
                sentiment: parsed.sentiment || 'neutral',
                mood: parsed.mood || 'neutral',
                impact: Math.max(0, Math.min(100, parseInt(parsed.impact) || 30)),
                summary: parsed.summary || title,
                reason: 'ai'
            };
        } catch (err) {}
    }
    return keywordClassify(title);
}

// ============================================================
//  📊 المزاج
// ============================================================
const SENTIMENT_SCORE = {
    'very_negative': -100, 'negative': -60, 'slightly_negative': -25,
    'neutral': 0, 'slightly_positive': 25, 'positive': 60, 'very_positive': 100
};

function computeCountryScore(articles) {
    const now = Date.now();
    const recent = articles.filter(a => (now - a.timestamp) < 24*60*60*1000);
    if (recent.length === 0) return null;

    let weightedSum = 0, weightSum = 0;
    recent.forEach(a => {
        const ageHours = (now - a.timestamp) / (1000 * 60 * 60);
        const timeWeight = Math.pow(0.5, ageHours / 8);
        const impactWeight = 0.3 + (a.impact / 100) * 0.7;
        const weight = timeWeight * impactWeight;
        weightedSum += (SENTIMENT_SCORE[a.sentiment] || 0) * weight;
        weightSum += weight;
    });
    const avg = weightSum > 0 ? weightedSum / weightSum : 0;
    return Math.round(Math.max(0, Math.min(100, 50 + avg * 0.5)));
}

// ============================================================
//  🚀 Main
// ============================================================
async function main() {
    console.log(`🚀 جلب ${RSS_SOURCES.length} مصدر...`);
    const raw = [];

    for (let i = 0; i < RSS_SOURCES.length; i++) {
        const src = RSS_SOURCES[i];
        console.log(`📡 [${i+1}/${RSS_SOURCES.length}] ${src.name}`);
        try {
            const res = await fetch(src.url, {
                headers: { 'User-Agent': 'Mozilla/5.0' },
                signal: AbortSignal.timeout(12000)
            });
            if (!res.ok) continue;
            const text = await res.text();
            const items = parseRSS(text);
            items.slice(0, 3).forEach(item => {
                raw.push({
                    title: stripHTML(item.title),
                    description: stripHTML(item.description).slice(0, 400),
                    link: item.link,
                    source: src.name
                });
            });
            console.log(`   ✅ ${items.length}`);
        } catch (err) {
            console.log(`   ❌ ${err.message}`);
        }
        await new Promise(r => setTimeout(r, 500));
    }

    const seen = new Set();
    const unique = raw.filter(a => {
        const k = hashTitle(a.title);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });
    console.log(`📊 ${unique.length} خبر فريد`);

    // ذاكرة سابقة
    let previous = { articles: [], byHash: {} };
    const outPath = path.join(__dirname, '..', 'data', 'news.json');
    if (fs.existsSync(outPath)) {
        try {
            const old = JSON.parse(fs.readFileSync(outPath, 'utf8'));
            if (old.articles) {
                old.articles.forEach(a => { previous.byHash[a.hash] = a; });
                previous.articles = old.articles;
                console.log(`📦 ذاكرة: ${old.articles.length} خبر`);
            }
        } catch (e) {}
    }

    const now = Date.now();
    const kept = previous.articles.filter(a => (now - a.timestamp) < 48*60*60*1000);
    const newArticles = unique.filter(a => !previous.byHash[hashTitle(a.title)]);
    console.log(`🆕 ${newArticles.length} خبر جديد`);

    // ⚠️ الحد الأقصى 40 خبر لكل دورة
    const MAX = 40;
    const toProcess = newArticles.slice(0, MAX);
    if (newArticles.length > MAX) {
        console.log(`⚠️ سنعالج ${MAX} فقط من ${newArticles.length}`);
    }

    const classified = [];
    let aiOk = 0, kwFallback = 0;

    for (let i = 0; i < toProcess.length; i++) {
        const a = toProcess[i];
        const hash = hashTitle(a.title);
        const country = detectCountry(a.title);

        console.log(`\n   [${i+1}/${toProcess.length}] ${a.title.slice(0,60)}`);

        const cls = await classifyWithAI(a.title);
        if (cls.reason === 'ai') aiOk++; else kwFallback++;

        classified.push({
            hash, title: a.title, summary: cls.summary, link: a.link,
            source: a.source, countryCode: country,
            category: cls.category, sentiment: cls.sentiment,
            mood: cls.mood, impact: cls.impact, timestamp: Date.now()
        });

        await new Promise(r => setTimeout(r, 1000));
    }

    console.log(`\n📊 النتائج: AI=${aiOk}, Fallback=${kwFallback}`);

    const all = [...classified, ...kept].sort((a,b) => b.timestamp - a.timestamp).slice(0, 600);

    const countries = {};
    const codes = new Set();
    all.forEach(a => { if (a.countryCode) codes.add(a.countryCode); });
    codes.forEach(code => {
        const arr = all.filter(a => a.countryCode === code);
        const score = computeCountryScore(arr);
        if (score !== null) {
            const cats = {};
            arr.forEach(a => { cats[a.category] = (cats[a.category] || 0) + 1; });
            countries[code] = { score, articleCount: arr.length, categories: cats };
        }
    });

    const globalCats = {};
    all.forEach(a => { globalCats[a.category] = (globalCats[a.category] || 0) + 1; });

    let sum = 0;
    all.forEach(a => { sum += SENTIMENT_SCORE[a.sentiment] || 0; });
    const globalScore = all.length > 0 ? Math.round(50 + (sum / all.length) * 0.5) : 50;

    const output = {
        updated_at: new Date().toISOString(),
        total: all.length,
        new_count: classified.length,
        ai_success: aiOk,
        ai_fallback: kwFallback,
        global: { score: globalScore, totalArticles: all.length, categories: globalCats },
        countries,
        articles: all
    };

    if (!fs.existsSync(path.dirname(outPath))) fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(output, null, 2));

    console.log(`\n💾 تم الحفظ: ${all.length} خبر`);
    console.log(`🌍 ${Object.keys(countries).length} دولة`);
    console.log(`🎯 المزاج العالمي: ${globalScore}/100`);
}

main().catch(err => { console.error('❌', err); process.exit(1); });