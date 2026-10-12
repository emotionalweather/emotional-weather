// ============================================================
//  scripts/fetch-news.js
//  يجلب الأخبار من 54 مصدر (يشتغل على GitHub Actions)
// ============================================================

const fs = require('fs');
const path = require('path');

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

    // أوروبا (8)
    { id: 'bbc_en', name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
    { id: 'guardian_en', name: 'The Guardian', url: 'https://www.theguardian.com/world/rss' },
    { id: 'skynews_en', name: 'Sky News', url: 'https://feeds.skynews.com/feeds/rss/world.xml' },
    { id: 'france24_en', name: 'France24 English', url: 'https://www.france24.com/en/rss' },
    { id: 'dw_en', name: 'DW English', url: 'https://rss.dw.com/rdf/rss-en-all' },
    { id: 'euronews_en', name: 'Euronews English', url: 'https://www.euronews.com/rss' },
    { id: 'lemonde', name: 'Le Monde', url: 'https://www.lemonde.fr/rss/une.xml' },
    { id: 'elpais', name: 'El País', url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada' },

    // روسيا (2)
    { id: 'rt_en', name: 'RT', url: 'https://www.rt.com/rss/news/' },
    { id: 'kyivindependent', name: 'Kyiv Independent', url: 'https://kyivindependent.com/feed/' },

    // أمريكا الشمالية (5)
    { id: 'cnn_en', name: 'CNN World', url: 'http://rss.cnn.com/rss/edition_world.rss' },
    { id: 'nytimes_en', name: 'NY Times', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml' },
    { id: 'npr_en', name: 'NPR World', url: 'https://feeds.npr.org/1004/rss.xml' },
    { id: 'ap_en', name: 'AP News', url: 'https://apnews.com/hub/ap-top-news/rss' },
    { id: 'cbc', name: 'CBC Canada', url: 'https://www.cbc.ca/webfeed/rss/rss-world' },

    // أمريكا الجنوبية (3)
    { id: 'infobae', name: 'Infobae', url: 'https://www.infobae.com/feeds/rss/' },
    { id: 'mercopress', name: 'MercoPress', url: 'https://en.mercopress.com/rss/' },
    { id: 'globo', name: 'Globo', url: 'https://g1.globo.com/rss/g1/' },

    // أفريقيا (4)
    { id: 'allafrica', name: 'AllAfrica', url: 'https://allafrica.com/tools/headlines/rdf/latest/headlines.rdf' },
    { id: 'africanews', name: 'Africanews', url: 'https://www.africanews.com/feed/rss' },
    { id: 'news24', name: 'News24', url: 'https://feeds.24.com/articles/news24/TopStories/rss' },
    { id: 'premiumtimes', name: 'Premium Times', url: 'https://www.premiumtimesng.com/feed' },

    // آسيا (5)
    { id: 'aljazeera_en', name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
    { id: 'scmp', name: 'SCMP', url: 'https://www.scmp.com/rss/91/feed' },
    { id: 'japantimes', name: 'Japan Times', url: 'https://www.japantimes.co.jp/feed/' },
    { id: 'toi_india', name: 'Times of India', url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms' },
    { id: 'straitstimes', name: 'Straits Times', url: 'https://www.straitstimes.com/news/world/rss.xml' },

    // الشرق الأوسط (2)
    { id: 'toi', name: 'Times of Israel', url: 'https://www.timesofisrael.com/feed/' },
    { id: 'iranintl', name: 'Iran International', url: 'https://www.iranintl.com/en/rss' },

    // أوقيانوسيا (2)
    { id: 'abc_au', name: 'ABC Australia', url: 'https://www.abc.net.au/news/feed/51120/rss.xml' },
    { id: 'rnz', name: 'RNZ', url: 'https://www.rnz.co.nz/rss/news.xml' }
];

// ============================================================
//  📖 تحليل XML (بدون مكتبات)
// ============================================================
function parseRSSXML(xmlText) {
    const articles = [];
    const itemRegex = /<(item|entry)[\s>]([\s\S]*?)<\/\1>/gi;
    let match;

    while ((match = itemRegex.exec(xmlText)) !== null) {
        const itemXML = match[2];

        let title = '';
        const titleMatch = itemXML.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
        if (titleMatch) title = titleMatch[1].trim();

        let link = '';
        const linkMatch = itemXML.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
        if (linkMatch) link = linkMatch[1].trim();
        else {
            const linkHref = itemXML.match(/<link[^>]*href=["']([^"']+)["']/i);
            if (linkHref) link = linkHref[1].trim();
        }

        let description = '';
        const descMatch = itemXML.match(/<description[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
        if (descMatch) description = descMatch[1].trim();

        if (title && title.length > 10 && !title.includes('<')) {
            articles.push({ title, link, description });
        }
    }

    return articles;
}

function stripHTML(html) {
    return (html || '')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
}

// ============================================================
//  📡 جلب كل المصادر
// ============================================================
async function fetchAll() {
    const allArticles = [];
    console.log(`🚀 جاري جلب ${RSS_SOURCES.length} مصدر...`);

    for (let i = 0; i < RSS_SOURCES.length; i++) {
        const source = RSS_SOURCES[i];
        console.log(`📡 [${i + 1}/${RSS_SOURCES.length}] ${source.name}`);

        try {
            const res = await fetch(source.url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (NewsBot)' },
                signal: AbortSignal.timeout(15000)
            });

            if (!res.ok) {
                console.log(`   ❌ HTTP ${res.status}`);
                continue;
            }

            const text = await res.text();
            const items = parseRSSXML(text);

            items.slice(0, 5).forEach(item => {
                allArticles.push({
                    title: stripHTML(item.title),
                    description: stripHTML(item.description).slice(0, 500),
                    link: item.link,
                    source: source.name,
                    sourceId: source.id
                });
            });

            console.log(`   ✅ ${items.length}`);
        } catch (err) {
            console.log(`   ❌ ${err.message}`);
        }

        await new Promise(r => setTimeout(r, 1000));
    }

    const seen = new Set();
    const unique = allArticles.filter(a => {
        const k = a.title.slice(0, 40);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });

    console.log(`\n✅ تم جلب ${unique.length} خبر فريد`);

    const outputDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const output = {
        updated_at: new Date().toISOString(),
        total: unique.length,
        articles: unique
    };

    fs.writeFileSync(
        path.join(outputDir, 'news.json'),
        JSON.stringify(output, null, 2)
    );

    console.log(`💾 تم الحفظ في data/news.json`);
}

fetchAll().catch(err => {
    console.error('❌ خطأ:', err);
    process.exit(1);
});