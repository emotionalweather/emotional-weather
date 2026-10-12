// ============================================================
//  data-ai-agents.js - 🤖 وكلاء AI + نظام الأولوية
//  - 5 موديلات مجانية على OpenRouter
//  - تدوير تلقائي عند 429
//  - تأخير 10 ثواني قبل كل طلب
//  - نظام أولوية للخبر (حرب/كوارث أولاً)
// ============================================================

console.log('🤖 جاري تحميل وكلاء AI...');

// ============================================================
//  🔑 المفتاح
// ============================================================
const AI_KEY_STORAGE = 'ai_openrouter_key';

function getAIKey() {
    return localStorage.getItem(AI_KEY_STORAGE) || '';
}

function setAIKey(key) {
    localStorage.setItem(AI_KEY_STORAGE, key.trim());
    console.log('🔑 تم حفظ مفتاح OpenRouter');
    return true;
}

// ============================================================
//  ⚙️ الوكلاء
// ============================================================
const AI_AGENTS = [
    {
        id: 'nemotron-super',
        name: 'NVIDIA Nemotron 3 Super 120B',
        emoji: '🥇',
        model: 'nvidia/nemotron-3-super-120b-a12b:free',
        priority: 1,
        cooldownMs: 90000,
        lastFailure: 0,
        enabled: true
    },
    {
        id: 'nemotron-lightning',
        name: 'NVIDIA Nemotron 3.5 Lightning',
        emoji: '🥈',
        model: 'nvidia/nemotron-3.5-lightning:free',
        priority: 2,
        cooldownMs: 90000,
        lastFailure: 0,
        enabled: true
    },
    {
        id: 'nemotron-ultra',
        name: 'NVIDIA Nemotron 3 Ultra 550B',
        emoji: '🥉',
        model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
        priority: 3,
        cooldownMs: 120000,
        lastFailure: 0,
        enabled: true
    },
    {
        id: 'nemotron-nano',
        name: 'NVIDIA Nemotron 3 Nano',
        emoji: '4️⃣',
        model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
        priority: 4,
        cooldownMs: 90000,
        lastFailure: 0,
        enabled: true
    },
    {
        id: 'gemma-4',
        name: 'Google Gemma 4 26B',
        emoji: '5️⃣',
        model: 'google/gemma-4-26b-a4b-it:free',
        priority: 5,
        cooldownMs: 120000,
        lastFailure: 0,
        enabled: true
    }
];

// ============================================================
//  📊 الإحصائيات
// ============================================================
const AGENT_STATS = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    fallbackCount: 0,
    perAgent: {}
};

AI_AGENTS.forEach(a => {
    AGENT_STATS.perAgent[a.id] = { success: 0, fail: 0 };
});

// ============================================================
//  📋 التصنيفات
// ============================================================
const AI_CATEGORIES = {
    war:      { emoji: '⚔️', label: 'حرب', color: '#FF4500' },
    disaster: { emoji: '🌊', label: 'كارثة', color: '#4A90E2' },
    crisis:   { emoji: '⚠️', label: 'أزمة', color: '#8A2BE2' },
    economy:  { emoji: '💹', label: 'اقتصاد', color: '#00CED1' },
    politics: { emoji: '🏛️', label: 'سياسة', color: '#9370DB' },
    sports:   { emoji: '⚽', label: 'رياضة', color: '#FFD700' },
    health:   { emoji: '🏥', label: 'صحة', color: '#FF69B4' },
    culture:  { emoji: '🎭', label: 'ثقافة', color: '#FFB300' },
    positive: { emoji: '✨', label: 'إيجابي', color: '#00ff96' }
};

const AI_IMPACT_LABELS = {
    very_negative: { label: 'سلبي جداً', color: '#8B0000' },
    negative:      { label: 'سلبي', color: '#FF4500' },
    neutral:       { label: 'محايد', color: '#94a3b8' },
    positive:      { label: 'إيجابي', color: '#32CD32' },
    very_positive: { label: 'إيجابي جداً', color: '#00AA00' }
};

// ============================================================
//  🎯 نظام الأولوية للخبر
//  رقم أصغر = أولوية أعلى
// ============================================================
const CATEGORY_PRIORITY = {
    war: 1,        // حرب (أعلى أولوية)
    disaster: 2,   // كارثة
    crisis: 3,     // أزمة
    health: 4,     // صحة
    politics: 5,   // سياسة
    economy: 6,    // اقتصاد
    sports: 7,     // رياضة
    culture: 8,    // ثقافة
    positive: 9    // إيجابي (أقل أولوية)
};

// ============================================================
//  📚 الذاكرة المؤقتة
// ============================================================
const memoryCache = new Map();

function getCacheKey(title) {
    return 'ai_cls_' + title.slice(0, 80).replace(/\s/g, '_');
}

function getCached(title) {
    if (memoryCache.has(title)) return memoryCache.get(title);
    try {
        const raw = localStorage.getItem(getCacheKey(title));
        if (raw) {
            const parsed = JSON.parse(raw);
            memoryCache.set(title, parsed);
            return parsed;
        }
    } catch (e) {}
    return null;
}

function setCache(title, result) {
    memoryCache.set(title, result);
    try {
        localStorage.setItem(getCacheKey(title), JSON.stringify(result));
    } catch (e) {}
}

// ============================================================
//  🔤 التصنيف السريع (قبل AI)
// ============================================================
const KEYWORD_CATEGORIES = {
    war: {
        keywords: ['war','attack','bomb','conflict','military','قتال','حرب','هجوم','قصف','عسكري','قتل','اشتباك','صاروخ','غارة'],
        emotion: 'angry', impact: 90
    },
    disaster: {
        keywords: ['earthquake','flood','fire','storm','disaster','زلزال','فيضان','حريق','كارثة','عاصفة','انفجار','انهيار'],
        emotion: 'sad', impact: 80
    },
    crisis: {
        keywords: ['crisis','emergency','collapse','inflation','أزمة','طوارئ','انهيار','تضخم','احتجاج','إضراب'],
        emotion: 'anxious', impact: 70
    },
    health: {
        keywords: ['health','hospital','vaccine','disease','virus','صحة','مستشفى','لقاح','مرض','فيروس','وباء','جائحة'],
        emotion: 'anxious', impact: 60
    },
    politics: {
        keywords: ['election','president','minister','parliament','government','انتخابات','رئيس','وزير','برلمان','حكومة','قرار'],
        emotion: 'neutral', impact: 40
    },
    economy: {
        keywords: ['economy','market','trade','investment','econom','اقتصاد','سوق','تجارة','استثمار','بورصة','دولار'],
        emotion: 'calm', impact: 35
    },
    sports: {
        keywords: ['football','match','olympic','championship','goal','كرة','مباراة','أولمبياد','بطولة','دوري','هدف'],
        emotion: 'joy', impact: 30
    },
    culture: {
        keywords: ['culture','festival','art','museum','ثقافة','مهرجان','فن','متحف','تراث','معرض','موسيقى'],
        emotion: 'joy', impact: 30
    },
    positive: {
        keywords: ['peace','agreement','growth','success','reform','سلام','اتفاق','نمو','نجاح','إصلاح','تقدم','تعاون'],
        emotion: 'hope', impact: 75
    }
};

function keywordClassify(title) {
    const lower = (title || '').toLowerCase();
    for (const [cat, data] of Object.entries(KEYWORD_CATEGORIES)) {
        for (const w of data.keywords) {
            if (lower.includes(w.toLowerCase())) {
                return {
                    category: cat,
                    sentiment: (cat === 'war' || cat === 'disaster' || cat === 'crisis') ? 'negative' :
                               (cat === 'sports' || cat === 'culture' || cat === 'positive') ? 'positive' : 'neutral',
                    mood: data.emotion,
                    impact: data.impact,
                    summary: title,
                    reason: '',
                    source: 'keyword'
                };
            }
        }
    }
    return {
        category: 'politics',
        sentiment: 'neutral',
        mood: 'neutral',
        impact: 30,
        summary: title,
        reason: '',
        source: 'keyword'
    };
}

// ============================================================
//  🎯 حساب درجة الأولوية (رقم أصغر = أولوية أعلى)
// ============================================================
function computePriorityScore(article) {
    const cat = article.category || 'politics';
    const categoryScore = CATEGORY_PRIORITY[cat] || 5;
    const impact = article.impact || 30;

    // (التصنيف × 1000) - قوة التأثير
    // الرقم الأصغر = أولوية أعلى
    return categoryScore * 1000 - impact;
}

// ============================================================
//  🎯 الوكلاء المتاحون
// ============================================================
function getAvailableAgents() {
    const now = Date.now();
    return AI_AGENTS
        .filter(a => a.enabled && (now - a.lastFailure >= a.cooldownMs))
        .sort((a, b) => a.priority - b.priority);
}

// ============================================================
//  🤖 التصنيف + الصياغة
// ============================================================
async function classifyWithSmartAI(title, countryName, fullText) {
    const apiKey = getAIKey();
    if (!apiKey) {
        console.warn('⚠️ لا يوجد مفتاح');
        return null;
    }

    const cached = getCached(title);
    if (cached) {
        console.log('📦 من الذاكرة');
        return cached;
    }

    const agents = getAvailableAgents();
    if (agents.length === 0) {
        console.warn('⚠️ كل الوكلاء في فترة تبريد');
        return null;
    }

    for (const agent of agents) {
        try {
            console.log(`⏳ انتظار 10 ثواني قبل ${agent.emoji} ${agent.name}...`);
            await new Promise(r => setTimeout(r, 10000));

            const result = await tryAgent(agent, apiKey, title, countryName, fullText);

            if (result) {
                agent.lastFailure = 0;
                AGENT_STATS.successfulRequests++;
                AGENT_STATS.perAgent[agent.id].success++;
                result.agent = agent.id;
                result.source = 'ai';
                setCache(title, result);
                console.log(`✅ ${agent.emoji} ${agent.name} نجح`);
                return result;
            }
        } catch (err) {
            agent.lastFailure = Date.now();
            AGENT_STATS.failedRequests++;
            AGENT_STATS.perAgent[agent.id].fail++;
            console.warn(`❌ ${agent.emoji} ${agent.name}: ${err.message}`);

            console.log(`⏳ انتظار 8 ثواني قبل المحاولة التالية...`);
            await new Promise(r => setTimeout(r, 8000));
        }
    }

    AGENT_STATS.fallbackCount++;
    console.warn('⚠️ كل الوكلاء فشلوا');
    return null;
}

// ============================================================
//  🎬 محاولة وكيل واحد
// ============================================================
async function tryAgent(agent, apiKey, title, countryName, fullText) {
    AGENT_STATS.totalRequests++;

    const prompt = buildPrompt(title, countryName, fullText);

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apiKey,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://emotionalweather.github.io/emotional-weather',
            'X-Title': 'Emotional Weather'
        },
        body: JSON.stringify({
            model: agent.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 300
        })
    });

    if (!res.ok) {
        if (res.status === 429) throw new Error('429 Rate Limit');
        if (res.status === 404) {
            agent.enabled = false;
            throw new Error('404 Model Not Found');
        }
        if (res.status === 401 || res.status === 403) {
            throw new Error('Auth Error');
        }
        throw new Error('HTTP ' + res.status);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';
    const clean = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    let parsed;
    try {
        parsed = JSON.parse(clean);
    } catch (e) {
        const match = clean.match(/\{[\s\S]*\}/);
        if (match) parsed = JSON.parse(match[0]);
        else throw new Error('رد غير JSON');
    }

    return {
        category: AI_CATEGORIES[parsed.category] ? parsed.category : 'politics',
        sentiment: parsed.sentiment || 'neutral',
        mood: parsed.mood || 'neutral',
        impact: Math.max(0, Math.min(100, parseInt(parsed.impact) || 30)),
        summary: parsed.summary || title,
        reason: parsed.reason || ''
    };
}

// ============================================================
//  📝 بناء البروموت (تصنيف + صياغة)
// ============================================================
function buildPrompt(title, countryName, fullText) {
    const textSection = fullText ? `\n\nFULL ARTICLE:\n"""${fullText.slice(0, 1500)}"""` : '';

    return `You are a professional neutral journalist working for a global news agency (like Reuters/BBC).

TASK:
1. Read the news article carefully.
2. Rewrite it as a SHORT, professional news summary in UNDER 30 words.
3. Classify it for a "Mood Map" app.

NEWS TITLE: "${title}"
COUNTRY: ${countryName}${textSection}

RULES FOR SUMMARY:
- MUST be under 30 words.
- MUST be neutral and journalistic.
- MUST preserve the original meaning — never invent facts.
- MUST NOT copy the original title verbatim.
- Same language as the title (Arabic if Arabic, English if English).

Return ONLY valid JSON:
{
  "category": "war" | "disaster" | "crisis" | "economy" | "politics" | "sports" | "health" | "culture" | "positive",
  "sentiment": "very_negative" | "negative" | "neutral" | "positive" | "very_positive",
  "mood": "angry" | "sad" | "anxious" | "calm" | "neutral" | "joy" | "hope",
  "impact": 0-100,
  "summary": "Rewritten news in under 30 words",
  "reason": "Brief Arabic explanation (max 10 words)"
}

CLASSIFICATION RULES:
- War/Bombing/Attack → war, very_negative, angry, 85-100
- Disaster/Casualties → disaster, negative, sad, 70-95
- Economic crisis/Inflation → crisis, negative, anxious, 60-85
- Elections/Politics → politics, neutral, neutral, 30-60
- Sports/Achievement → sports, positive, joy, 20-50
- Peace/Recovery/Reform → positive, very_positive, hope, 70-90
- Regular economy news → economy, neutral, neutral, 25-45

Be ACCURATE. Read carefully. Never default to politics.`;
}

// ============================================================
//  🌐 التصدير
// ============================================================
window.AI_AGENTS = AI_AGENTS;
window.AGENT_STATS = AGENT_STATS;
window.AI_CATEGORIES = AI_CATEGORIES;
window.AI_IMPACT_LABELS = AI_IMPACT_LABELS;
window.CATEGORY_PRIORITY = CATEGORY_PRIORITY;
window.getAIKey = getAIKey;
window.setAIKey = setAIKey;
window.classifyWithSmartAI = classifyWithSmartAI;
window.keywordClassify = keywordClassify;
window.getAvailableAgents = getAvailableAgents;
window.computePriorityScore = computePriorityScore;

console.log(`✅ تم تحميل ${AI_AGENTS.length} وكلاء AI + نظام الأولوية`);