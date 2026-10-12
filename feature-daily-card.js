// ============================================================
//  feature-daily-card.js - 🎴 بطاقة اليوم
// ============================================================

console.log('🎴 جاري تحميل بطاقة اليوم...');

// ============================================================
//  💬 العبارات الملهمة (حسب المشعر)
// ============================================================
const INSPIRING_QUOTES = {
    joy: [
        'افرش الفرح في كل خطوة تخطيها اليوم 🌟',
        'الفرح اللي فيك، بذرة لأشياء أعظم',
        'لا تخاف تكثر ضحك اليوم، مو حرام',
        'سعادتك تنعكس على اللي حولك، مبسوط بيك'
    ],
    sad: [
        'كل حزن مرحلة، مو نهاية الحكاية 🤍',
        'أصعب الأيام تصنع أقوى الناس',
        'قلبك اللي يعرف الحزن، بيعرف الفرح أكثر',
        'لا تقارن بدايتك بنهاية غيرك'
    ],
    angry: [
        'غضبك مش ضعف، معناه إنت تهتم بشي 🔥',
        'حول طاقتك لشيء يغيّر الواقع',
        'خذ نفس، العالم ما راح يهرب',
        'اللي بقلبك قوي، هو اللي يقدر يكسر الحديد'
    ],
    calm: [
        'الهدوء مو فراغ، هو أعمق أنواع الحضور 🌊',
        'إنت بمكان قوي الليلة، استمتع به',
        'لا تسرع، الطريق نفسه يستاهل التأمل',
        'السلام الداخلي نعمة، حافظ عليها'
    ],
    anxious: [
        'أفكارك مو كلها حقائق، بعضها خوف فقط 🌙',
        'خذ نفس عميق، إنت أقوى مما تظن',
        'كل خطوة صغيرة، إنجاز حقيقي',
        'اللي تخاف منه، أساساً يمكن ما يصير'
    ],
    grateful: [
        'الامتنان يفتح أبواب ما كنت تشوفها 🤲',
        'قلبك الممتن، أغلى شي تملكه',
        'لا تحتقر النعم الصغيرة، هي اللي تعيشك',
        'اشكر، تكسب أكثر'
    ],
    love: [
        'الحب مو ضعف، هو أقوى قوة في الكون ❤️',
        'قلبك اللي يعطي، ما راح يخسر أبداً',
        'أحب اليوم بلا حساب',
        'الحب الصادق ما يحتاج إثبات'
    ],
    fear: [
        'خوفك مو عدوك، هو دليلك للطريق الصح 🛡️',
        'الشجعان مو اللي ما يخافون، اللي يخافون ويكملون',
        'لحظة الخوف، لحظة نموّك الحقيقية',
        'خل الخوف يمشي جنبك، لا يقودك'
    ],
    hope: [
        'الأمل آخر شي يموت، وقلبك ما زال حي 🌟',
        'الغد أفضل، بس بشرط تصدّق',
        'كل يوم جديد، فرصة جديدة',
        'اللي عنده أمل، ما يعرف الهزيمة'
    ],
    tired: [
        'الراحة مو ضعف، هي إعادة شحن 🔋',
        'إنت تعبان لأنك تعطي، وهذا إنجاز',
        'خذ وقتك، ما فيه أحد يلحقك',
        'النوم مو هروب، هو هدية تستحقها'
    ],
    proud: [
        'افتخر بكل شي وصلت له، حتى الصغير 😎',
        'إنت اليوم أفضل من إنت قبل سنة',
        'اللي تعبه، حق يفتخر',
        'استحق النجاح، لا تعتذر'
    ],
    neutral: [
        'اليوم ممكن يكون عادي، وممكن يكون بداية 🌱',
        'لا تحتاج كل يوم يكون استثنائي',
        'اللحظة الحاضرة، مكان جميل لتعيش فيه',
        'خفف التوقعات، استمتع بالبسيط'
    ],
    default: [
        'كل لحظة عايشها، تستاهل تقف عندها ✨',
        'إنت جزء من قصة أكبر مما تظن',
        'مشاعرك مهمة، وهي اللي تصنعك',
        'اليوم هو هدية، عيشه'
    ]
};

const WORLD_QUOTES = [
    'اليوم، ملايين القلوب تشعر بنفس إحساسك 🌍',
    'في مكان ما، شخص يفهمك بدون كلمة 🤝',
    'مشاعرك جزء من نبض البشرية 💫',
    'لا تقلق، إنت مو لحالك في هذا الإحساس',
    'الكون يستمع لكل قلب 🌌'
];

function getQuote(emotionKey) {
    const list = INSPIRING_QUOTES[emotionKey] || INSPIRING_QUOTES.default;
    return list[Math.floor(Math.random() * list.length)];
}

// ============================================================
//  🌍 بيانات المحاكاة
// ============================================================
const VIBE_CITIES = [
    { name: 'الرياض', flag: '🇸🇦' },
    { name: 'دبي', flag: '🇦🇪' },
    { name: 'القاهرة', flag: '🇪🇬' },
    { name: 'إسطنبول', flag: '🇹🇷' },
    { name: 'بيروت', flag: '🇱🇧' },
    { name: 'طوكيو', flag: '🇯🇵' },
    { name: 'باريس', flag: '🇫🇷' },
    { name: 'لندن', flag: '🇬🇧' },
    { name: 'نيويورك', flag: '🇺🇸' },
    { name: 'سيدني', flag: '🇦🇺' }
];

function getTodayVibe(emotionKey) {
    // نجيب مشعر اليوم للمستخدم من Streak
    let userEmotionKey = emotionKey;
    try {
        const streakData = JSON.parse(localStorage.getItem('emotional_streak_data') || '{}');
        if (streakData.history && streakData.history.length > 0) {
            userEmotionKey = streakData.history[streakData.history.length - 1].emotion || emotionKey;
        }
    } catch {}

    // مشعر عشوائي للمدينة
    const emoKeys = Object.keys(EMOTIONS);
    const cityEmotionKey = emoKeys[Math.floor(Math.random() * emoKeys.length)];

    // مشعر عشوائي للعالم
    const worldEmotionKey = emoKeys[Math.floor(Math.random() * emoKeys.length)];

    // مدينة عشوائية
    const city = VIBE_CITIES[Math.floor(Math.random() * VIBE_CITIES.length)];

    // نسبة عدد المستخدمين اللي يشاركون المشعر (محاكاة)
    const worldPercentage = (15 + Math.random() * 35).toFixed(1);

    return {
        userEmotionKey,
        cityEmotionKey,
        worldEmotionKey,
        cityName: city.name,
        cityFlag: city.flag,
        worldPercentage,
        quote: getQuote(userEmotionKey),
        worldQuote: WORLD_QUOTES[Math.floor(Math.random() * WORLD_QUOTES.length)],
        date: new Date()
    };
}

// ============================================================
//  🎨 CSS
// ============================================================
function injectVibeStyles() {
    if (document.getElementById('vibe-styles')) return;
    const style = document.createElement('style');
    style.id = 'vibe-styles';
    style.textContent = `
        #vibe-btn {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: rgba(15, 25, 40, 0.92);
            border: 1px solid rgba(255, 200, 0, 0.5);
            color: #FFD700;
            font-size: 1.2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            flex-shrink: 0;
            animation: vibeGlow 3s infinite;
        }
        @keyframes vibeGlow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255, 200, 0, 0.4); }
            50%      { box-shadow: 0 0 0 8px rgba(255, 200, 0, 0); }
        }

        #vibe-modal {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(ellipse at center, rgba(20, 15, 30, 0.97), rgba(0,0,0,0.99));
            z-index: 5800;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 16px;
            backdrop-filter: blur(8px);
            overflow-y: auto;
        }
        #vibe-modal.show { display: flex; }

        .vibe-container {
            max-width: 480px;
            width: 100%;
            animation: vibeIn 0.5s ease;
        }
        @keyframes vibeIn {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* البطاقة الأساسية */
        .vibe-card {
            background: linear-gradient(160deg, #1a1f3a 0%, #0f0a1f 50%, #1a0a20 100%);
            border-radius: 24px;
            padding: 28px 24px;
            box-shadow: 0 0 80px rgba(255, 200, 0, 0.15), 0 20px 60px rgba(0,0,0,0.5);
            position: relative;
            overflow: hidden;
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .vibe-card::before {
            content: '';
            position: absolute;
            top: -50%; right: -50%;
            width: 200%; height: 200%;
            background: radial-gradient(circle, rgba(255, 200, 0, 0.08), transparent 60%);
            pointer-events: none;
        }

        .vibe-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 24px;
            position: relative;
            z-index: 1;
        }
        .vibe-brand {
            font-size: 0.7rem;
            color: #94a3b8;
            letter-spacing: 3px;
            text-transform: uppercase;
            font-weight: 700;
        }
        .vibe-date {
            font-size: 0.7rem;
            color: #94a3b8;
        }

        .vibe-section-label {
            font-size: 0.65rem;
            color: #64748b;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 6px;
            font-weight: 700;
            position: relative;
            z-index: 1;
        }

        .vibe-user-emotion {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 24px;
            position: relative;
            z-index: 1;
        }
        .vibe-user-emoji {
            font-size: 3.5rem;
            filter: drop-shadow(0 0 20px currentColor);
        }
        .vibe-user-text {
            flex: 1;
        }
        .vibe-user-name {
            font-size: 1.6rem;
            font-weight: 900;
            color: #fff;
            line-height: 1.1;
        }
        .vibe-user-sub {
            font-size: 0.75rem;
            color: #94a3b8;
            margin-top: 4px;
        }

        .vibe-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            margin: 20px 0;
            position: relative;
            z-index: 1;
        }

        .vibe-mini-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 24px;
            position: relative;
            z-index: 1;
        }
        .vibe-mini {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 14px;
            padding: 12px 14px;
        }
        .vibe-mini-label {
            font-size: 0.65rem;
            color: #64748b;
            margin-bottom: 6px;
            letter-spacing: 1px;
        }
        .vibe-mini-value {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            font-weight: 700;
            color: #fff;
        }
        .vibe-mini-emoji { font-size: 1.2rem; }

        .vibe-quote-box {
            background: linear-gradient(135deg, rgba(255, 200, 0, 0.1), rgba(255, 100, 150, 0.08));
            border-right: 3px solid #FFD700;
            border-radius: 12px;
            padding: 16px 18px;
            position: relative;
            z-index: 1;
        }
        .vibe-quote-text {
            font-size: 0.92rem;
            line-height: 1.7;
            color: #fff;
            font-weight: 600;
        }
        .vibe-quote-mark {
            font-size: 3rem;
            color: #FFD700;
            opacity: 0.3;
            line-height: 1;
            position: absolute;
            top: 0; right: 12px;
            font-family: Georgia, serif;
        }

        .vibe-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 24px;
            position: relative;
            z-index: 1;
        }
        .vibe-footer-brand {
            font-size: 0.68rem;
            color: #FFD700;
            font-weight: 700;
            letter-spacing: 1px;
        }
        .vibe-footer-hash {
            font-size: 0.65rem;
            color: #64748b;
        }

        /* أزرار العمل */
        .vibe-actions {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        .vibe-action {
            flex: 1;
            padding: 14px;
            border-radius: 14px;
            border: none;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            font-family: inherit;
            transition: all 0.2s;
        }
        .vibe-download {
            background: linear-gradient(135deg, #FFD700, #FF8C00);
            color: #1a0a00;
        }
        .vibe-download:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(255, 200, 0, 0.4); }
        .vibe-share {
            background: rgba(255, 255, 255, 0.08);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .vibe-share:hover { background: rgba(255, 255, 255, 0.15); }
        .vibe-close {
            background: transparent;
            color: #94a3b8;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .vibe-close:hover { background: rgba(255, 255, 255, 0.05); color: #fff; }

        @media (max-width: 500px) {
            .vibe-card { padding: 22px 18px; }
            .vibe-user-emoji { font-size: 2.8rem; }
            .vibe-user-name { font-size: 1.3rem; }
            .vibe-quote-text { font-size: 0.85rem; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  🔘 الزر
// ============================================================
function addVibeButton() {
    if (document.getElementById('vibe-btn')) return;
    const topBar = document.getElementById('top-bar');
    if (!topBar) return;

    const btn = document.createElement('button');
    btn.id = 'vibe-btn';
    btn.title = 'بطاقة اليوم';
    btn.textContent = '🎴';
    btn.onclick = openVibeCard;
    topBar.appendChild(btn);
}

// ============================================================
//  🪟 النافذة
// ============================================================
function openVibeCard() {
    let modal = document.getElementById('vibe-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'vibe-modal';
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeVibeCard();
        });
    }
    modal.classList.add('show');
    renderVibeCard();
}

function closeVibeCard() {
    const modal = document.getElementById('vibe-modal');
    if (modal) modal.classList.remove('show');
}

// ============================================================
//  🎨 عرض البطاقة
// ============================================================
function renderVibeCard() {
    const modal = document.getElementById('vibe-modal');

    // نجيب مشعر المستخدم من الـ Streak أو اللي اختاره آخر مرة
    let userEmotionKey = 'neutral';
    try {
        const streakData = JSON.parse(localStorage.getItem('emotional_streak_data') || '{}');
        if (streakData.history && streakData.history.length > 0) {
            userEmotionKey = streakData.history[streakData.history.length - 1].emotion;
        }
    } catch {}

    const vibe = getTodayVibe(userEmotionKey);
    const userEmo = EMOTIONS[vibe.userEmotionKey] || EMOTIONS.neutral;
    const cityEmo = EMOTIONS[vibe.cityEmotionKey] || EMOTIONS.neutral;
    const worldEmo = EMOTIONS[vibe.worldEmotionKey] || EMOTIONS.neutral;

    const dateStr = new Date().toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    modal.innerHTML = `
        <div class="vibe-container">
            <div class="vibe-card" id="vibeCardElement">
                <div class="vibe-header">
                    <div class="vibe-brand">🎴 Daily Vibe</div>
                    <div class="vibe-date">${dateStr}</div>
                </div>

                <div class="vibe-section-label">مشعرك اليوم</div>
                <div class="vibe-user-emotion">
                    <div class="vibe-user-emoji" style="color:${userEmo.color};">${userEmo.emoji}</div>
                    <div class="vibe-user-text">
                        <div class="vibe-user-name" style="color:${userEmo.color};">${userEmo.name}</div>
                        <div class="vibe-user-sub">اخترته بإرادتك اليوم</div>
                    </div>
                </div>

                <div class="vibe-divider"></div>

                <div class="vibe-mini-stats">
                    <div class="vibe-mini">
                        <div class="vibe-mini-label">${vibe.cityFlag} مشعر ${vibe.cityName}</div>
                        <div class="vibe-mini-value">
                            <span class="vibe-mini-emoji">${cityEmo.emoji}</span>
                            <span style="color:${cityEmo.color};">${cityEmo.name}</span>
                        </div>
                    </div>
                    <div class="vibe-mini">
                        <div class="vibe-mini-label">🌍 مشعر العالم</div>
                        <div class="vibe-mini-value">
                            <span class="vibe-mini-emoji">${worldEmo.emoji}</span>
                            <span style="color:${worldEmo.color};">${vibe.worldPercentage}%</span>
                        </div>
                    </div>
                </div>

                <div class="vibe-quote-box">
                    <div class="vibe-quote-mark">"</div>
                    <div class="vibe-quote-text">${vibe.quote}</div>
                </div>

                <div class="vibe-footer">
                    <div class="vibe-footer-brand">🌍 الطقس العاطفي</div>
                    <div class="vibe-footer-hash">#DailyVibe</div>
                </div>
            </div>

            <div class="vibe-actions">
                <button class="vibe-action vibe-download" onclick="downloadVibeCard()">💾 تحميل</button>
                <button class="vibe-action vibe-share" onclick="shareVibeCard()">📤 مشاركة</button>
                <button class="vibe-action vibe-close" onclick="closeVibeCard()">✕</button>
            </div>
        </div>
    `;
}

// ============================================================
//  🖼️ توليد الصورة (Canvas)
// ============================================================
async function generateVibeImage() {
    return new Promise((resolve, reject) => {
        try {
            const canvas = document.createElement('canvas');
            const W = 1080;
            const H = 1350;
            canvas.width = W;
            canvas.height = H;
            const ctx = canvas.getContext('2d');

            // نجيب البيانات مرة ثانية
            let userEmotionKey = 'neutral';
            try {
                const streakData = JSON.parse(localStorage.getItem('emotional_streak_data') || '{}');
                if (streakData.history && streakData.history.length > 0) {
                    userEmotionKey = streakData.history[streakData.history.length - 1].emotion;
                }
            } catch {}
            const vibe = getTodayVibe(userEmotionKey);
            const userEmo = EMOTIONS[vibe.userEmotionKey] || EMOTIONS.neutral;
            const cityEmo = EMOTIONS[vibe.cityEmotionKey] || EMOTIONS.neutral;
            const worldEmo = EMOTIONS[vibe.worldEmotionKey] || EMOTIONS.neutral;

            // 1) الخلفية (تدرج داكن)
            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, '#1a1f3a');
            bg.addColorStop(0.5, '#0f0a1f');
            bg.addColorStop(1, '#1a0a20');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // 2) توهج دائري
            const glow = ctx.createRadialGradient(W * 0.8, 0, 0, W * 0.8, 0, W);
            glow.addColorStop(0, 'rgba(255, 200, 0, 0.15)');
            glow.addColorStop(1, 'rgba(255, 200, 0, 0)');
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, W, H);

            // 3) الحدود
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 4;
            ctx.strokeRect(40, 40, W - 80, H - 80);

            // 4) الشعار
            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 24px Segoe UI, Tahoma';
            ctx.direction = 'ltr';
            ctx.textAlign = 'left';
            ctx.fillText('🎴 DAILY VIBE', 80, 130);

            // 5) التاريخ
            const dateStr = new Date().toLocaleDateString('ar-EG', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
            ctx.fillStyle = '#94a3b8';
            ctx.font = '22px Segoe UI, Tahoma';
            ctx.textAlign = 'right';
            ctx.fillText(dateStr, W - 80, 130);

            // 6) "مشعرك اليوم"
            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 22px Segoe UI, Tahoma';
            ctx.textAlign = 'right';
            ctx.fillText('مشعرك اليوم', W - 80, 240);

            // 7) الإيموجي الكبير
            ctx.font = '140px serif';
            ctx.textAlign = 'right';
            ctx.fillText(userEmo.emoji, W - 80, 400);

            // 8) اسم المشعر
            ctx.fillStyle = userEmo.color;
            ctx.font = 'bold 90px Segoe UI, Tahoma';
            ctx.textAlign = 'right';
            ctx.fillText(userEmo.name, W - 200, 400);

            // 9) فاصل
            const divGrad = ctx.createLinearGradient(80, 0, W - 80, 0);
            divGrad.addColorStop(0, 'rgba(255,255,255,0)');
            divGrad.addColorStop(0.5, 'rgba(255,255,255,0.15)');
            divGrad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = divGrad;
            ctx.fillRect(80, 480, W - 160, 2);

            // 10) مشعر المدينة
            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 20px Segoe UI, Tahoma';
            ctx.textAlign = 'right';
            ctx.fillText(`مشعر ${vibe.cityName} ${vibe.cityFlag}`, W - 80, 580);

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 60px Segoe UI, Tahoma';
            ctx.fillText(`${cityEmo.emoji}  ${cityEmo.name}`, W - 80, 660);

            // 11) مشعر العالم
            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 20px Segoe UI, Tahoma';
            ctx.fillText('مشعر العالم الآن', W - 80, 760);

            ctx.fillStyle = worldEmo.color;
            ctx.font = 'bold 60px Segoe UI, Tahoma';
            ctx.fillText(`${worldEmo.emoji}  ${worldEmo.name}`, W - 80, 840);

            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 32px Segoe UI, Tahoma';
            ctx.fillText(`${vibe.worldPercentage}% من البشرية تشعر بذلك`, W - 80, 895);

            // 12) مربع الاقتباس
            ctx.fillStyle = 'rgba(255, 200, 0, 0.08)';
            ctx.fillRect(80, 960, W - 160, 240);

            // شريط ذهبي على اليمين
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(W - 90, 960, 8, 240);

            // الاقتباس
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 38px Segoe UI, Tahoma';
            ctx.textAlign = 'right';
            const quote = vibe.quote;
            // نقسم الاقتباس لو طويل
            const maxWidth = W - 260;
            const words = quote.split(' ');
            const lines = [];
            let current = '';
            for (const w of words) {
                const test = current ? current + ' ' + w : w;
                if (ctx.measureText(test).width > maxWidth && current) {
                    lines.push(current);
                    current = w;
                } else {
                    current = test;
                }
            }
            if (current) lines.push(current);

            lines.forEach((line, i) => {
                ctx.fillText(line, W - 120, 1050 + i * 55);
            });

            // 13) التوقيع
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 30px Segoe UI, Tahoma';
            ctx.textAlign = 'right';
            ctx.fillText('🌍 الطقس العاطفي', W - 80, 1290);

            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 22px Segoe UI, Tahoma';
            ctx.textAlign = 'left';
            ctx.fillText('#DailyVibe', 80, 1290);

            // تحويل لصورة
            canvas.toBlob(blob => {
                if (blob) resolve(blob);
                else reject(new Error('canvas toBlob failed'));
            }, 'image/png', 0.95);

        } catch (err) {
            reject(err);
        }
    });
}

// ============================================================
//  💾 تحميل الصورة
// ============================================================
async function downloadVibeCard() {
    try {
        // نعرض حالة
        const btn = document.querySelector('.vibe-download');
        if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري التحضير...'; }

        const blob = await generateVibeImage();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `daily-vibe-${new Date().toISOString().slice(0, 10)}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (btn) { btn.disabled = false; btn.textContent = '💾 تحميل'; }

        if (typeof showToast === 'function') showToast('✅ تم تحميل البطاقة!');
    } catch (err) {
        console.error(err);
        alert('فشل التحضير: ' + err.message);
        const btn = document.querySelector('.vibe-download');
        if (btn) { btn.disabled = false; btn.textContent = '💾 تحميل'; }
    }
}

// ============================================================
//  📤 مشاركة الصورة
// ============================================================
async function shareVibeCard() {
    try {
        const btn = document.querySelector('.vibe-share');
        if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري التحضير...'; }

        const blob = await generateVibeImage();
        const file = new File([blob], 'daily-vibe.png', { type: 'image/png' });

        // Web Share API
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'بطاقة اليوم - الطقس العاطفي',
                text: 'شوف مشعر اليوم 🌍'
            });
        } else {
            // fallback: نحمّل الصورة
            alert('متصفحك ما يدعم المشاركة المباشرة. راح نحمّل الصورة عشان تشاركها يدوياً.');
            await downloadVibeCard();
        }

        if (btn) { btn.disabled = false; btn.textContent = '📤 مشاركة'; }
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error(err);
        }
        const btn = document.querySelector('.vibe-share');
        if (btn) { btn.disabled = false; btn.textContent = '📤 مشاركة'; }
    }
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initVibeFeature() {
    injectVibeStyles();
    addVibeButton();
    console.log('✅ تم تفعيل بطاقة اليوم!');
}

// اجعل الدوال متاحة globally
window.openVibeCard = openVibeCard;
window.closeVibeCard = closeVibeCard;
window.downloadVibeCard = downloadVibeCard;
window.shareVibeCard = shareVibeCard;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initVibeFeature, 1100));
} else {
    setTimeout(initVibeFeature, 1100);
}