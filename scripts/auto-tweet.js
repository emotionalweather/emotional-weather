// ============================================================
//  scripts/auto-tweet.js - نشر تغريدة تلقائية على Twitter
//  يقرأ news.json ويولّد تغريدة ذكية
// ============================================================

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ============================================================
//  🔑 مفاتيح Twitter
// ============================================================
const TW = {
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET
};

// ============================================================
//  🎭 ترجمة التصنيفات
// ============================================================
const MOOD_EMOJI = {
    war: '⚔️', disaster: '🌊', crisis: '⚠️',
    health: '🏥', politics: '🏛️', economy: '💹',
    sports: '⚽', culture: '🎭', positive: '✨'
};

const SENTIMENT_LABEL = {
    very_negative: '😢 Very Negative',
    negative: '😟 Negative',
    slightly_negative: '😕 Slightly Negative',
    neutral: '😐 Neutral',
    slightly_positive: '🙂 Slightly Positive',
    positive: '😊 Positive',
    very_positive: '🌟 Very Positive'
};

// ============================================================
//  🔐 OAuth 1.0a Signature
// ============================================================
function percentEncode(str) {
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/\*/g, '%2A')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29');
}

function generateOAuthHeader(method, url, params = {}) {
    const oauthParams = {
        oauth_consumer_key: TW.apiKey,
        oauth_nonce: crypto.randomBytes(16).toString('hex'),
        oauth_signature_method: 'HMAC-SHA256',
        oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
        oauth_token: TW.accessToken,
        oauth_version: '1.0'
    };

    const allParams = { ...params, ...oauthParams };

    // ترتيب أبجدي
    const sortedKeys = Object.keys(allParams).sort();
    const paramString = sortedKeys
        .map(k => `${percentEncode(k)}=${percentEncode(allParams[k])}`)
        .join('&');

    // Signature Base String
    const baseString = [
        method.toUpperCase(),
        percentEncode(url),
        percentEncode(paramString)
    ].join('&');

    // Signing Key
    const signingKey = `${percentEncode(TW.apiSecret)}&${percentEncode(TW.accessSecret)}`;

    // Signature
    const signature = crypto
        .createHmac('sha256', signingKey)
        .update(baseString)
        .digest('base64');

    oauthParams.oauth_signature = signature;

    // Header
    const header = 'OAuth ' + Object.keys(oauthParams)
        .sort()
        .map(k => `${percentEncode(k)}="${percentEncode(oauthParams[k])}"`)
        .join(', ');

    return header;
}

// ============================================================
//  🐦 نشر تغريدة
// ============================================================
async function postTweet(text) {
    const url = 'https://api.twitter.com/2/tweets';
    const body = JSON.stringify({ text });

    const authHeader = generateOAuthHeader('POST', url);

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
        },
        body
    });

    const data = await res.json();

    if (!res.ok) {
        console.error('❌ فشل النشر:', JSON.stringify(data, null, 2));
        return null;
    }

    console.log(`✅ تم النشر! Tweet ID: ${data.data?.id}`);
    return data.data;
}

// ============================================================
//  📝 توليد التغريدة
// ============================================================
function generateTweet(newsData) {
    const countries = newsData.countries || {};
    const global = newsData.global || {};

    if (Object.keys(countries).length === 0) {
        return '🌍 Live world mood map\n\n' +
               'Track the emotional state of 195 countries, updated in real-time.\n\n' +
               'emotionalweather.github.io/emotional-weather/';
    }

    // ترتيب الدول
    const countryList = Object.entries(countries)
        .map(([code, data]) => ({ code, ...data }))
        .sort((a, b) => b.score - a.score);

    const topPositive = countryList.slice(0, 3);
    const topNegative = countryList.slice(-3).reverse();

    const globalScore = global.score || 50;
    const globalEmoji = globalScore >= 70 ? '😊' :
                       globalScore >= 55 ? '🙂' :
                       globalScore >= 45 ? '😐' :
                       globalScore >= 30 ? '😟' : '😢';

    // اختيار نوع التغريدة (حسب الوقت)
    const hour = new Date().getUTCHours();
    let tweet = '';

    if (hour < 14) {
        // تغريدة الصباح — Global mood
        tweet = `🌍 Today's World Mood: ${globalEmoji} ${globalScore}%\n\n` +
                `😊 Most positive:\n` +
                topPositive.map(c => `  • ${c.code} (${c.score}%)`).join('\n') +
                `\n\n😢 Most negative:\n` +
                topNegative.map(c => `  • ${c.code} (${c.score}%)`).join('\n') +
                `\n\n📍 See the live map 👇\n` +
                `emotionalweather.github.io/emotional-weather/`;
    } else {
        // تغريدة المساء — تفاصيل
        const totalNews = global.totalArticles || 0;
        const topCategory = Object.entries(global.categories || {})
            .sort((a, b) => b[1] - a[1])[0];

        const catInfo = topCategory
            ? `${MOOD_EMOJI[topCategory[0]]} Dominant topic: ${topCategory[0]} (${topCategory[1]} articles)`
            : '';

        tweet = `📊 World Mood Update\n\n` +
                `🎯 Global score: ${globalScore}%\n` +
                `📰 ${totalNews} recent headlines analyzed\n` +
                `${catInfo}\n\n` +
                `Track the world in real-time 👇\n` +
                `emotionalweather.github.io/emotional-weather/\n\n` +
                `#WorldMood #DataViz`;
    }

    return tweet;
}

// ============================================================
//  🚀 التشغيل
// ============================================================
async function main() {
    console.log('🐦 بدء نشر التغريدة...');

    // تأكد من المفاتيح
    const missing = [];
    if (!TW.apiKey) missing.push('TWITTER_API_KEY');
    if (!TW.apiSecret) missing.push('TWITTER_API_SECRET');
    if (!TW.accessToken) missing.push('TWITTER_ACCESS_TOKEN');
    if (!TW.accessSecret) missing.push('TWITTER_ACCESS_SECRET');

    if (missing.length > 0) {
        console.error(`❌ مفاتيح ناقصة: ${missing.join(', ')}`);
        process.exit(1);
    }

    console.log('✅ كل المفاتيح موجودة');

    // اقرأ news.json
    const newsPath = path.join(__dirname, '..', 'data', 'news.json');
    if (!fs.existsSync(newsPath)) {
        console.error('❌ news.json غير موجود');
        process.exit(1);
    }

    const newsData = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
    console.log(`📊 قرأت ${newsData.total} خبر من ${Object.keys(newsData.countries || {}).length} دولة`);

    // ولّد التغريدة
    const tweet = generateTweet(newsData);
    console.log('\n📝 التغريدة:\n' + '─'.repeat(50));
    console.log(tweet);
    console.log('─'.repeat(50) + '\n');

    // تأكد من الطول
    if (tweet.length > 280) {
        console.log(`⚠️ التغريدة ${tweet.length} حرف — أطول من 280، نقصّر`);
    }

    // انشر
    await postTweet(tweet);

    console.log('✅ تم!');
}

main().catch(err => {
    console.error('❌ خطأ:', err);
    process.exit(1);
});