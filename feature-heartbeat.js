// ============================================================
//  feature-heartbeat.js - 🌍 نبض البشرية (نسخة حقيقية 100%)
//  يبني الإحصائيات من الأخبار الحقيقية فقط — بدون محاكاة
// ============================================================

console.log('🌍 جاري تحميل نبض البشرية...');

// ============================================================
//  🎨 CSS
// ============================================================
function injectHeartbeatStyles() {
    if (document.getElementById('heartbeat-styles')) return;
    const style = document.createElement('style');
    style.id = 'heartbeat-styles';
    style.textContent = `
        #heartbeat-btn {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: rgba(15, 25, 40, 0.92);
            border: 1px solid rgba(56, 189, 248, 0.5);
            color: #38bdf8;
            font-size: 1.2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            flex-shrink: 0;
            animation: heartbeatGlow 2s infinite;
        }
        @keyframes heartbeatGlow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.4); }
            50%      { box-shadow: 0 0 0 10px rgba(56, 189, 248, 0); }
        }

        #heartbeat-modal {
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse at center, rgba(5, 10, 20, 0.97), rgba(0, 0, 0, 0.99));
            z-index: 6000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            backdrop-filter: blur(10px);
            overflow: hidden;
        }
        #heartbeat-modal.show { display: flex; }

        .heartbeat-scene {
            position: relative;
            width: 100%;
            max-width: 560px;
            text-align: center;
            color: #fff;
        }

        .heartbeat-header { margin-bottom: 24px; }
        .heartbeat-header h2 {
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(90deg, #38bdf8, #FF69B4, #FFD700);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 6px;
        }
        .heartbeat-header p {
            color: #94a3b8;
            font-size: 0.8rem;
        }

        .heartbeat-stage {
            position: relative;
            width: 320px;
            height: 320px;
            margin: 0 auto 26px;
        }

        .pulse-wave {
            position: absolute;
            top: 50%; left: 50%;
            width: 100px; height: 100px;
            border-radius: 50%;
            border: 2px solid;
            transform: translate(-50%, -50%);
            animation: waveOut 3s infinite;
            pointer-events: none;
        }
        @keyframes waveOut {
            0%   { width: 100px; height: 100px; opacity: 1; }
            100% { width: 320px; height: 320px; opacity: 0; }
        }

        .heartbeat-globe {
            position: absolute;
            top: 50%; left: 50%;
            width: 180px; height: 180px;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.8s ease;
            animation: globeBreathe 3s infinite ease-in-out;
            box-shadow: inset -20px -20px 60px rgba(0,0,0,0.6),
                        0 0 80px currentColor;
        }
        @keyframes globeBreathe {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50%      { transform: translate(-50%, -50%) scale(1.06); }
        }

        .heartbeat-globe::before {
            content: '';
            position: absolute;
            inset: 8px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 45%);
            pointer-events: none;
        }

        .heartbeat-globe-inner {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%,
                rgba(255,255,255,0.35) 0%, transparent 55%),
                radial-gradient(circle at center,
                currentColor 0%, rgba(0,0,0,0.85) 100%);
            opacity: 0.95;
        }

        .heartbeat-core {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            animation: coreThrob 1.4s infinite;
            text-shadow: 0 0 20px rgba(255,255,255,0.7);
            z-index: 2;
            pointer-events: none;
        }
        @keyframes coreThrob {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            30%      { transform: translate(-50%, -50%) scale(1.18); }
            45%      { transform: translate(-50%, -50%) scale(0.95); }
            60%      { transform: translate(-50%, -50%) scale(1.08); }
        }

        .heartbeat-dominant { margin-bottom: 26px; }
        .heartbeat-dominant-label {
            color: #94a3b8;
            font-size: 0.8rem;
            letter-spacing: 2px;
            margin-bottom: 8px;
        }
        .heartbeat-dominant-emotion {
            font-size: 1.8rem;
            font-weight: 800;
            color: #fff;
            transition: color 0.8s;
        }
        .heartbeat-dominant-percent {
            font-size: 0.9rem;
            color: #94a3b8;
            margin-top: 4px;
        }

        .heartbeat-stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-bottom: 20px;
            max-height: 200px;
            overflow-y: auto;
            padding: 4px;
        }
        .heartbeat-stats::-webkit-scrollbar { width: 4px; }
        .heartbeat-stats::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 4px; }

        .stat-item {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 10px;
            padding: 8px 10px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.75rem;
            transition: all 0.3s;
        }
        .stat-item.dominant {
            background: rgba(56, 189, 248, 0.15);
            border-color: rgba(56, 189, 248, 0.4);
        }
        .stat-item .stat-emoji { font-size: 1.1rem; }
        .stat-item .stat-name { flex: 1; color: #cbd5e1; text-align: right; }
        .stat-item .stat-pct { font-weight: 700; }

        .heartbeat-close {
            padding: 12px 40px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            color: #fff;
            border-radius: 12px;
            cursor: pointer;
            font-family: inherit;
            font-size: 0.9rem;
            transition: all 0.2s;
        }
        .heartbeat-close:hover { background: rgba(255,255,255,0.15); }

        .star-particle {
            position: absolute;
            width: 2px; height: 2px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.4;
            animation: starTwinkle 4s infinite;
        }
        @keyframes starTwinkle {
            0%, 100% { opacity: 0.2; }
            50%      { opacity: 0.9; }
        }

        .heartbeat-empty {
            text-align: center;
            color: #94a3b8;
            padding: 30px 20px;
            font-size: 0.85rem;
        }

        @media (max-width: 500px) {
            .heartbeat-stage { width: 240px; height: 240px; }
            .heartbeat-globe { width: 140px; height: 140px; }
            .heartbeat-core { font-size: 2.2rem; }
            .heartbeat-header h2 { font-size: 1.2rem; }
            .heartbeat-dominant-emotion { font-size: 1.4rem; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  🔘 إضافة الزر
// ============================================================
function addHeartbeatButton() {
    if (document.getElementById('heartbeat-btn')) return;
    const topBar = document.getElementById('top-bar');
    if (!topBar) return;

    const btn = document.createElement('button');
    btn.id = 'heartbeat-btn';
    btn.title = 'نبض البشرية';
    btn.textContent = '🌍';
    btn.onclick = openHeartbeat;
    topBar.appendChild(btn);
}

// ============================================================
//  📊 الإحصائيات الحقيقية (مبنية على الأخبار)
// ============================================================
function getRealGlobalStats() {
    const newsMood = window.__realNewsMood || {};

    // تحويل تصنيفات الأخبار إلى مشاعر
    const newsToEmotion = {
        war: 'angry',
        disaster: 'sad',
        crisis: 'anxious',
        economy: 'calm',
        politics: 'neutral',
        sports: 'joy',
        health: 'anxious',
        culture: 'joy',
        positive: 'hope'
    };

    const counts = {};
    Object.entries(newsMood).forEach(([cat, count]) => {
        const emoKey = newsToEmotion[cat] || 'neutral';
        counts[emoKey] = (counts[emoKey] || 0) + count;
    });

    // لو ما فيه بيانات بعد
    if (Object.keys(counts).length === 0) {
        return [];
    }

    const stats = [];
    let total = 0;
    Object.entries(counts).forEach(([key, weight]) => {
        stats.push({ key, weight });
        total += weight;
    });

    stats.sort((a, b) => b.weight - a.weight);

    return stats.map(s => ({
        key: s.key,
        percent: (s.weight / total) * 100
    }));
}

// ============================================================
//  🪟 النافذة
// ============================================================
let heartbeatInterval = null;
let heartbeatStarsAdded = false;

function openHeartbeat() {
    let modal = document.getElementById('heartbeat-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'heartbeat-modal';
        modal.innerHTML = `
            <div class="heartbeat-scene">
                <div class="heartbeat-header">
                    <h2>🌍 نبض البشرية</h2>
                    <p>مشاعر العالم العربي في هذه اللحظة — مبني على الأخبار الحقيقية</p>
                </div>

                <div class="heartbeat-stage" id="heartbeatStage">
                    <div class="heartbeat-globe" id="heartbeatGlobe">
                        <div class="heartbeat-globe-inner"></div>
                    </div>
                    <div class="heartbeat-core" id="heartbeatCore">💓</div>
                </div>

                <div class="heartbeat-dominant">
                    <div class="heartbeat-dominant-label">المشعر السائد الآن</div>
                    <div class="heartbeat-dominant-emotion" id="hbDominantName">—</div>
                    <div class="heartbeat-dominant-percent" id="hbDominantPct">—</div>
                </div>

                <div class="heartbeat-stats" id="hbStats"></div>

                <button class="heartbeat-close" id="heartbeatCloseBtn">إغلاق</button>
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeHeartbeat();
        });
        document.getElementById('heartbeatCloseBtn').onclick = closeHeartbeat;
    }
    modal.classList.add('show');

    if (!heartbeatStarsAdded) {
        addStars();
        heartbeatStarsAdded = true;
    }

    updateHeartbeat();
    if (heartbeatInterval) clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(updateHeartbeat, 5000);
}

function closeHeartbeat() {
    const modal = document.getElementById('heartbeat-modal');
    if (modal) modal.classList.remove('show');
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
    }
}

// ============================================================
//  ⭐ نجوم
// ============================================================
function addStars() {
    const stage = document.getElementById('heartbeatStage');
    if (!stage) return;
    for (let i = 0; i < 40; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = (Math.random() * 4) + 's';
        stage.appendChild(star);
    }
}

// ============================================================
//  🎨 تحديث النبض
// ============================================================
function updateHeartbeat() {
    const stats = getRealGlobalStats();
    const nameEl = document.getElementById('hbDominantName');
    const pctEl = document.getElementById('hbDominantPct');
    const statsEl = document.getElementById('hbStats');
    const globe = document.getElementById('heartbeatGlobe');
    const core = document.getElementById('heartbeatCore');

    // لو ما فيه بيانات بعد
    if (stats.length === 0) {
        if (nameEl) { nameEl.textContent = 'جاري التحليل...'; nameEl.style.color = '#94a3b8'; }
        if (pctEl) pctEl.textContent = 'في انتظار الأخبار';
        if (statsEl) statsEl.innerHTML = '<div class="heartbeat-empty">📡 ننتظر الأخبار عشان نحلل المزاج...</div>';
        return;
    }

    const dominant = stats[0];
    const emo = EMOTIONS[dominant.key] || EMOTIONS.neutral;

    if (globe) globe.style.color = emo.color;
    if (core) core.textContent = emo.emoji;
    if (nameEl) {
        nameEl.textContent = emo.name;
        nameEl.style.color = emo.color;
    }
    if (pctEl) {
        pctEl.textContent = `يمثل ${dominant.percent.toFixed(1)}% من الأخبار`;
    }

    renderStats(stats, dominant.key);

    // نبضة جديدة
    spawnPulseWave(emo.color);
}

// ============================================================
//  🌊 موجة
// ============================================================
function spawnPulseWave(color) {
    const stage = document.getElementById('heartbeatStage');
    if (!stage) return;
    const wave = document.createElement('div');
    wave.className = 'pulse-wave';
    wave.style.borderColor = color;
    wave.style.color = color;
    stage.appendChild(wave);
    setTimeout(() => wave.remove(), 3000);
}

// ============================================================
//  📊 عرض الإحصائيات
// ============================================================
function renderStats(stats, dominantKey) {
    const container = document.getElementById('hbStats');
    if (!container) return;
    container.innerHTML = '';

    stats.forEach(s => {
        const emo = EMOTIONS[s.key];
        if (!emo) return;
        const item = document.createElement('div');
        item.className = 'stat-item' + (s.key === dominantKey ? ' dominant' : '');
        item.innerHTML = `
            <span class="stat-emoji">${emo.emoji}</span>
            <span class="stat-name">${emo.name}</span>
            <span class="stat-pct" style="color:${emo.color};">${s.percent.toFixed(1)}%</span>
        `;
        container.appendChild(item);
    });
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initHeartbeatFeature() {
    injectHeartbeatStyles();
    addHeartbeatButton();
    console.log('✅ تم تفعيل نبض البشرية (حقيقي)!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initHeartbeatFeature, 900));
} else {
    setTimeout(initHeartbeatFeature, 900);
}