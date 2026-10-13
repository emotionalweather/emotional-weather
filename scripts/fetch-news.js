// ============================================================
//  scripts/fetch-news.js - يجلب + يصنّف + يحسب المزاج
//  يشتغل على GitHub Actions (كل ساعة)
// ============================================================

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// ============================================================
//  🌐 54 مصدر
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
//  🏳️ كلمات الدول (195 دولة)
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
//  📰 تحليل RSS (regex)
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
    // نرتب الكلمات حسب الطول (الأطول أول)
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
//  🔤 تصنيف احتياطي
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
                return { category: cat, sentiment, mood, impact, summary: title, reason: 'تصنيف أساسي' };
            }
        }
    }
    return { category: 'politics', sentiment: 'neutral', mood: 'neutral', impact: 25, summary: title, reason: '' };
}

// ============================================================
//  🤖 AI Classification
// ============================================================
const AI_MODELS = [
    'nvidia/nemotron-3-super-120b-a12b:free',
    'nvidia/nemotron-3.5-lightning:free',
    'google/gemma-4-26b-a4b-it:free',
    'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free'
];

let currentModel = 0;

async function classifyWithAI(title, description) {
    if (!OPENROUTER_KEY) return keywordClassify(title);

    const prompt = `You are a professional news analyst. Analyze this news and return JSON only.

TITLE: "${title}"
${description ? `DESCRIPTION: "${description.slice(0, 600)}"` : ''}

Return ONLY this JSON (no markdown):
{
  "category": "war" | "disaster" | "crisis" | "health" | "politics" | "economy" | "sports" | "culture" | "positive",
  "sentiment": "very_negative" | "negative" | "slightly_negative" | "neutral" | "slightly_positive" | "positive" | "very_positive",
  "mood": "angry" | "sad" | "anxious" | "calm" | "neutral" | "joy" | "hope",
  "impact": 0-100,
  "summary": "A neutral journalistic summary in under 25 words, in the SAME language as the title"
}

SENTIMENT RULES:
- War/mass casualties → very_negative
- Disasters/severe crises → negative
- Minor issues/protests → slightly_negative
- Regular political/economic news → neutral
- Minor improvements → slightly_positive
- Good economic/social news → positive
- Peace agreements/major achievements → very_positive

IMPACT RULES:
- War/natural disasters → 80-100
- Major crises → 60-80
- Regular politics → 30-55
- Economy/sports/culture → 20-50
- Minor news → 10-30

Be ACCURATE. Do not default to politics or neutral.`;

    for (let attempt = 0; attempt < AI_MODELS.length; attempt++) {
        const model = AI_MODELS[currentModel];
        try {
            const res = await fetch(OPENROUTER_URL, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + OPENROUTER_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.2,
                    max_tokens: 250
                }),
                signal: AbortSignal.timeout(30000)
            });

            if (!res.ok) {
                if (res.status === 429) {
                    currentModel = (currentModel + 1) % AI_MODELS.length;
                    await new Promise(r => setTimeout(r, 3000));
                    continue;
                }
                throw new Error('HTTP ' + res.status);
            }

            const data = await res.json();
            const content = data.choices?.[0]?.message?.content || '';
            const clean = content.replace(/```json\s*/g,'').replace(/```\s*/g,'').trim();
            const match = clean.match(/\{[\s\S]*\}/);
            if (!match) throw new Error('ما لقينا JSON');

            const parsed = JSON.parse(match[0]);
            return {
                category: parsed.category || 'politics',
                sentiment: parsed.sentiment || 'neutral',
                mood: parsed.mood || 'neutral',
                impact: Math.max(0, Math.min(100, parseInt(parsed.impact) || 30)),
                summary: parsed.summary || title,
                reason: ''
            };
        } catch (err) {
            console.log(`   ⚠️ فشل ${model}: ${err.message}`);
        }
    }
    return keywordClassify(title);
}

// ============================================================
//  📊 حساب مزاج الدولة (تراكم + وقت + تأثير)
// ============================================================
const SENTIMENT_SCORE = {
    'very_negative': -100,
    'negative': -60,
    'slightly_negative': -25,
    'neutral': 0,
    'slightly_positive': 25,
    'positive': 60,
    'very_positive': 100
};

function computeCountryScore(articles) {
    // مقالات آخر 24 ساعة فقط
    const now = Date.now();
    const DAY = 24 * 60 * 60 * 1000;
    const recent = articles.filter(a => (now - a.timestamp) < DAY);
    if (recent.length === 0) return null;

    const HALF_LIFE_HOURS = 8; // نصف الوزن كل 8 ساعات
    let weightedSum = 0;
    let weightSum = 0;

    recent.forEach(a => {
        const ageHours = (now - a.timestamp) / (1000 * 60 * 60);
        const timeWeight = Math.pow(0.5, ageHours / HALF_LIFE_HOURS);
        const impactWeight = 0.3 + (a.impact / 100) * 0.7; // التأثير
        const weight = timeWeight * impactWeight;

        const sentScore = SENTIMENT_SCORE[a.sentiment] || 0;
        weightedSum += sentScore * weight;
        weightSum += weight;
    });

    const avgSent = weightSum > 0 ? weightedSum / weightSum : 0;
    // تحويل -100..100 إلى 0..100
    // مع انحياز طفيف للإيجابية (الناس بطبعهم يفضلون الرضا)
    let score = 50 + (avgSent * 0.5);
    return Math.round(Math.max(0, Math.min(100, score)));
}

// ============================================================
//  🚀 الجلب
// ============================================================
async function fetchAll() {
    console.log(`🚀 جلب ${RSS_SOURCES.length} مصدر...`);
    const rawArticles = [];

    for (let i = 0; i < RSS_SOURCES.length; i++) {
        const src = RSS_SOURCES[i];
        console.log(`📡 [${i+1}/${RSS_SOURCES.length}] ${src.name}`);
        try {
            const res = await fetch(src.url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (NewsBot)' },
                signal: AbortSignal.timeout(15000)
            });
            if (!res.ok) { console.log(`   ❌ HTTP ${res.status}`); continue; }
            const text = await res.text();
            const items = parseRSS(text);
            items.slice(0, 5).forEach(item => {
                rawArticles.push({
                    title: stripHTML(item.title),
                    description: stripHTML(item.description).slice(0, 500),
                    link: item.link,
                    source: src.name,
                    sourceId: src.id
                });
            });
            console.log(`   ✅ ${items.length}`);
        } catch (err) {
            console.log(`   ❌ ${err.message}`);
        }
        await new Promise(r => setTimeout(r, 800));
    }

    console.log(`\n📊 ${rawArticles.length} خبر خام`);

    // إزالة المكرر
    const seen = new Set();
    const unique = rawArticles.filter(a => {
        const k = hashTitle(a.title);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });
    console.log(`📊 ${unique.length} خبر فريد`);

    // تحميل الذاكرة السابقة
    let previous = { articles: [], byHash: {} };
    const outputPath = path.join(__dirname, '..', 'data', 'news.json');
    if (fs.existsSync(outputPath)) {
        try {
            const old = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
            if (old.articles) {
                old.articles.forEach(a => {
                    previous.byHash[a.hash] = a;
                });
                previous.articles = old.articles;
                console.log(`📦 ذاكرة سابقة: ${old.articles.length} خبر`);
            }
        } catch (e) {}
    }

    // احتفظ بمقالات آخر 48 ساعة فقط من الذاكرة
    const now = Date.now();
    const DAY2 = 48 * 60 * 60 * 1000;
    const keptOld = previous.articles.filter(a => (now - a.timestamp) < DAY2);

    // حدد الأخبار الجديدة
    const newArticles = unique.filter(a => !previous.byHash[hashTitle(a.title)]);
    console.log(`🆕 ${newArticles.length} خبر جديد للتصنيف`);

    // صنّف الأخبار الجديدة
    const classifiedNew = [];
    for (let i = 0; i < newArticles.length; i++) {
        const a = newArticles[i];
        const hash = hashTitle(a.title);
        const countryCode = detectCountry(a.title);
        console.log(`   [${i+1}/${newArticles.length}] ${a.title.slice(0,60)}...`);

        const cls = await classifyWithAI(a.title, a.description);

        classifiedNew.push({
            hash,
            title: a.title,
            summary: cls.summary,
            link: a.link,
            source: a.source,
            countryCode,
            category: cls.category,
            sentiment: cls.sentiment,
            mood: cls.mood,
            impact: cls.impact,
            timestamp: Date.now()
        });

        // تأخير 2 ثانية بين كل خبر
        await new Promise(r => setTimeout(r, 2000));
    }

    // ادمج الجديد + القديم
    const allArticles = [...classifiedNew, ...keptOld];

    // احتفظ بآخر 600 خبر فقط
    allArticles.sort((a,b) => b.timestamp - a.timestamp);
    const finalArticles = allArticles.slice(0, 600);

    // احسب مزاج كل دولة
    const countries = {};
    const countryCodes = new Set();
    finalArticles.forEach(a => { if (a.countryCode) countryCodes.add(a.countryCode); });

    countryCodes.forEach(code => {
        const countryArticles = finalArticles.filter(a => a.countryCode === code);
        const score = computeCountryScore(countryArticles);
        if (score !== null) {
            const moods = {};
            countryArticles.forEach(a => {
                moods[a.category] = (moods[a.category] || 0) + 1;
            });
            countries[code] = {
                score,
                articleCount: countryArticles.length,
                categories: moods
            };
        }
    });

    // الإحصائيات العالمية
    const globalCounts = {};
    finalArticles.forEach(a => {
        globalCounts[a.category] = (globalCounts[a.category] || 0) + 1;
    });

    const globalScore = (() => {
        let sum = 0, count = 0;
        finalArticles.forEach(a => {
            sum += SENTIMENT_SCORE[a.sentiment] || 0;
            count++;
        });
        if (count === 0) return 50;
        const avg = sum / count;
        return Math.round(50 + avg * 0.5);
    })();

    const output = {
        updated_at: new Date().toISOString(),
        total: finalArticles.length,
        new_count: classifiedNew.length,
        global: {
            score: globalScore,
            totalArticles: finalArticles.length,
            categories: globalCounts
        },
        countries,
        articles: finalArticles
    };

    if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`\n💾 تم الحفظ في data/news.json`);
    console.log(`📊 إجمالي: ${finalArticles.length} خبر`);
    console.log(`🌍 ${Object.keys(countries).length} دولة محدّثة`);
    console.log(`🎯 المزاج العالمي: ${globalScore}/100`);
}

fetchAll().catch(err => {
    console.error('❌ خطأ:', err);
    process.exit(1);
});