// ============================================================
//  feature-chat.js - 💬 دردشة المشاعر المتطابقة
//  ملاحظة: حالياً محاكاة. لما نضيف Firebase، تصير حقيقية.
// ============================================================

console.log('💬 جاري تحميل ميزة الدردشة...');

// ============================================================
//  🎨 CSS
// ============================================================
function injectChatStyles() {
    if (document.getElementById('chat-styles')) return;
    const style = document.createElement('style');
    style.id = 'chat-styles';
    style.textContent = `
        #chat-btn {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: rgba(15, 25, 40, 0.92);
            border: 1px solid rgba(0, 255, 150, 0.5);
            color: #00ff96;
            font-size: 1.2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            flex-shrink: 0;
            animation: chatGlow 3s infinite;
        }
        @keyframes chatGlow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 150, 0.4); }
            50%      { box-shadow: 0 0 0 8px rgba(0, 255, 150, 0); }
        }

        #chat-modal {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(2, 8, 15, 0.98);
            z-index: 7000;
            display: none;
            flex-direction: column;
            backdrop-filter: blur(10px);
        }
        #chat-modal.show { display: flex; }

        /* ===== شريط علوي ===== */
        .chat-topbar {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 18px;
            border-bottom: 1px solid rgba(0, 255, 150, 0.15);
            background: rgba(10, 20, 30, 0.9);
        }
        .chat-back-btn {
            background: transparent;
            border: none;
            color: #00ff96;
            font-size: 1.4rem;
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
        }
        .chat-partner-info {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .chat-partner-avatar {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            border: 2px solid;
        }
        .chat-partner-text { line-height: 1.3; }
        .chat-partner-name {
            color: #fff;
            font-weight: 700;
            font-size: 0.9rem;
        }
        .chat-partner-status {
            color: #00ff96;
            font-size: 0.72rem;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .status-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #00ff96;
            box-shadow: 0 0 6px #00ff96;
            animation: statusPulse 1.5s infinite;
        }
        @keyframes statusPulse {
            0%, 100% { opacity: 1; }
            50%      { opacity: 0.4; }
        }

        .chat-timer {
            background: rgba(255, 80, 80, 0.15);
            color: #ff5555;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 700;
            border: 1px solid rgba(255, 80, 80, 0.3);
        }

        /* ===== منطقة الرسائل ===== */
        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background:
                radial-gradient(circle at 20% 30%, rgba(0, 255, 150, 0.03), transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.03), transparent 40%);
        }
        .chat-messages::-webkit-scrollbar { width: 5px; }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(0, 255, 150, 0.3); border-radius: 5px; }

        .chat-empty {
            text-align: center;
            color: #64748b;
            font-size: 0.85rem;
            padding: 40px 20px;
            line-height: 1.8;
        }
        .chat-empty .huge-emoji {
            font-size: 3.5rem;
            display: block;
            margin-bottom: 14px;
            animation: floatEmoji 2.5s infinite ease-in-out;
        }
        @keyframes floatEmoji {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-10px); }
        }

        .msg {
            max-width: 78%;
            padding: 10px 14px;
            border-radius: 18px;
            font-size: 0.9rem;
            line-height: 1.5;
            word-wrap: break-word;
            position: relative;
            animation: msgIn 0.35s ease;
        }
        @keyframes msgIn {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        .msg-me {
            align-self: flex-start;
            background: linear-gradient(135deg, #00ff96, #00cc77);
            color: #002a1a;
            border-bottom-right-radius: 4px;
            font-weight: 600;
        }
        .msg-them {
            align-self: flex-end;
            background: rgba(30, 45, 70, 0.9);
            color: #e2e8f0;
            border: 1px solid rgba(56, 189, 248, 0.15);
            border-bottom-left-radius: 4px;
        }
        .msg-system {
            align-self: center;
            background: rgba(255, 200, 50, 0.1);
            color: #ffd700;
            font-size: 0.75rem;
            padding: 6px 14px;
            border-radius: 20px;
            border: 1px dashed rgba(255, 200, 50, 0.3);
            max-width: 90%;
            text-align: center;
        }

        .msg-meta {
            font-size: 0.65rem;
            opacity: 0.6;
            margin-top: 4px;
            display: flex;
            align-items: center;
            gap: 6px;
            justify-content: space-between;
        }
        .msg-burn-timer {
            color: #ff5555;
            font-weight: 700;
        }

        /* تأثير الحرق */
        .msg-burning {
            animation: burnAway 1s forwards;
        }
        @keyframes burnAway {
            0%   { filter: blur(0); opacity: 1; transform: scale(1); }
            50%  { filter: blur(2px); opacity: 0.5; color: #ff5555; }
            100% { filter: blur(8px); opacity: 0; transform: scale(0.85); }
        }

        /* مؤشر الكتابة */
        .typing-indicator {
            align-self: flex-end;
            background: rgba(30, 45, 70, 0.9);
            padding: 12px 18px;
            border-radius: 18px;
            border-bottom-left-radius: 4px;
            display: flex;
            gap: 5px;
            align-items: center;
        }
        .typing-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #94a3b8;
            animation: typingBounce 1.2s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .typing-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes typingBounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
            30%           { transform: translateY(-8px); opacity: 1; }
        }

        /* ===== منطقة الإدخال ===== */
        .chat-input-area {
            padding: 12px 16px 16px;
            background: rgba(10, 20, 30, 0.95);
            border-top: 1px solid rgba(0, 255, 150, 0.15);
            display: flex;
            gap: 10px;
            align-items: center;
        }
        .chat-input-area input {
            flex: 1;
            padding: 13px 18px;
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(80, 120, 160, 0.3);
            border-radius: 25px;
            color: #fff;
            font-size: 0.9rem;
            font-family: inherit;
            outline: none;
        }
        .chat-input-area input:focus {
            border-color: #00ff96;
            box-shadow: 0 0 15px rgba(0, 255, 150, 0.2);
        }
        .chat-send-btn {
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00ff96, #00cc77);
            border: none;
            color: #002a1a;
            font-size: 1.2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            transition: all 0.2s;
        }
        .chat-send-btn:hover { transform: scale(1.08); box-shadow: 0 0 20px rgba(0, 255, 150, 0.5); }
        .chat-send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        /* ===== شاشة البحث ===== */
        .chat-finding {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            text-align: center;
            padding: 40px 20px;
        }
        .chat-finding-emoji {
            font-size: 4rem;
            margin-bottom: 20px;
            animation: floatEmoji 2s infinite ease-in-out;
        }
        .chat-finding-text {
            font-size: 1rem;
            color: #cbd5e1;
            margin-bottom: 8px;
        }
        .chat-finding-sub {
            font-size: 0.8rem;
            color: #64748b;
            max-width: 280px;
            line-height: 1.6;
        }
        .chat-finding-bar {
            width: 200px;
            height: 4px;
            background: rgba(255,255,255,0.1);
            border-radius: 4px;
            overflow: hidden;
            margin-top: 24px;
        }
        .chat-finding-fill {
            height: 100%;
            background: linear-gradient(90deg, #00ff96, #00cc77);
            width: 0%;
            animation: findFill 3s ease forwards;
        }
        @keyframes findFill {
            from { width: 0%; }
            to   { width: 100%; }
        }

        /* ===== زر إغلاق الجلسة ===== */
        .chat-end-btn {
            background: rgba(255, 80, 80, 0.15);
            color: #ff8080;
            border: 1px solid rgba(255, 80, 80, 0.3);
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.72rem;
            cursor: pointer;
            font-family: inherit;
            font-weight: 600;
        }
        .chat-end-btn:hover { background: rgba(255, 80, 80, 0.25); }

        @media (max-width: 500px) {
            .chat-partner-name { font-size: 0.82rem; }
            .msg { font-size: 0.85rem; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  🔘 إضافة الزر
// ============================================================
function addChatButton() {
    if (document.getElementById('chat-btn')) return;
    const topBar = document.getElementById('top-bar');
    if (!topBar) return;

    const btn = document.createElement('button');
    btn.id = 'chat-btn';
    btn.title = 'دردشة المشاعر';
    btn.textContent = '💬';
    btn.onclick = openChatFlow;
    topBar.appendChild(btn);
}

// ============================================================
//  💬 الردود المحاكاة (بمشاعر متطابقة)
// ============================================================
const BOT_REPLIES = {
    joy: [
        'هههههه! أنا اليوم مبسوط من غير سبب 😄',
        'إحساس غريب حلو كذا؟ وش صار اليوم معك؟',
        'أمس كنت زعلان، اليوم الدنيا حلوة 🌟',
        'خلني أخمن، صحيت الصباح وإنت مبسوط؟',
        'الفرح معدل صحي، الله يديمه 🙏'
    ],
    sad: [
        'أعرف هذا الإحساس... تعب.',
        'هل تحس إنك ما تبي تحكي مع أحد؟ وأنا كذلك.',
        'مو لازم نحكي كثير، بس لا تقعد لحالك.',
        'أنا هنا. حتى لو سكتنا.',
        'الحزن مو ضعف. حزنك يعني إنت حي.'
    ],
    angry: [
        'تعبت من التطنيش. تعبت من كل شي.',
        'وش الي مضايقك اليوم؟',
        'أعصابي مشدودة من الصباح 😤',
        'أحياناً كل الي نحتاجه نصرخ شوي.',
        'خلني أطلع الي بقلبي، وأنت اطلع الي بقلبك.'
    ],
    calm: [
        'أنا رايق اليوم. جالس أشرب قهوة ☕',
        'الهدوء نعمة. حنا محظوظين الليلة.',
        'ما يهمني شي اليوم. عادي.',
        'الله يديم هذا الرضا 🤲',
        'كل شي تمام. لا تستعجل.'
    ],
    anxious: [
        'ما أقدر أوقف تفكيري. أفكاري كثير.',
        'أنا معك. نفس الإحساس.',
        'توك تحس كذا؟ أنا من الصباح.',
        'لازم نتنفس. خذ شهيق عميق معي؟',
        'خلنا نتكلم، يمكن نرتاح شوي.'
    ],
    grateful: [
        'أنا ممتن لكل شي اليوم. حتى الصغير.',
        'الحمد لله على كل حال 🤍',
        'أحس قلبي شبعان من الامتنان.',
        'وش أكثر شي ممتن له اليوم؟',
        'ربنا كريم. الحمد لله.'
    ],
    love: [
        'قلبي مليان حب اليوم ❤️',
        'هذا إحساس جميل، لا تخليه يضيع.',
        'أنا أحب الحياة اليوم.',
        'الحب أعمق من الكلام.',
        'خلنا نستلذ باللحظة.'
    ],
    fear: [
        'الخوف شعور ثقيل. أعرف.',
        'وش تخاف منه بالضبط؟',
        'أنا كذلك. لكن خلنا نواجهه مع بعض.',
        'الخوف ما يعني إنك ضعيف.',
        'خذ نفس عميق. أنا معك.'
    ],
    hope: [
        'أحس إن الغد أجمل. إنت كذلك؟',
        'الأمل هو الشيء الوحيد الي ما يخيب.',
        'خلنا نتفاءل. الدنيا بخير.',
        'لو ما فيه أمل، ما كملنا 🌟',
        'أنا أنتظر شي حلو يجي.'
    ],
    default: [
        'أشعر بنفس إحساسك. غريب صح؟',
        'إحساس مشترك. خلنا نتكلم.',
        'أنا سعيد إني لقيت شخص مثلي.',
        'وش الشي الي خلاك تحس كذا؟',
        'لحظة جميلة، لا تضيعها.'
    ]
};

function getBotReply(emotionKey) {
    const list = BOT_REPLIES[emotionKey] || BOT_REPLIES.default;
    return list[Math.floor(Math.random() * list.length)];
}

// ============================================================
//  🌍 أسماء عشوائية للمستخدم الآخر
// ============================================================
const PARTNER_CITIES = [
    'شخص في الرياض', 'شخص في دبي', 'شخص في القاهرة', 'شخص في بيروت',
    'شخص في إسطنبول', 'شخص في طوكيو', 'شخص في لندن', 'شخص في نيويورك',
    'شخص في باريس', 'شخص في برلين', 'شخص في سيول', 'شخص في سيدني',
    'شخص في ميامي', 'شخص في تورنتو', 'شخص في ساو باولو', 'شخص في الدار البيضاء'
];

// ============================================================
//  🚀 بدء العملية
// ============================================================
let chatState = {
    emotion: null,
    partner: null,
    messages: [],
    active: false,
    burnTimers: new Map()
};

function openChatFlow() {
    let modal = document.getElementById('chat-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'chat-modal';
        document.body.appendChild(modal);
    }
    modal.classList.add('show');
    showEmotionPicker();
}

function closeChat() {
    const modal = document.getElementById('chat-modal');
    if (modal) modal.classList.remove('show');
    // نظف كل المؤقتات
    chatState.burnTimers.forEach(t => clearTimeout(t));
    chatState.burnTimers.clear();
    chatState = { emotion: null, partner: null, messages: [], active: false, burnTimers: new Map() };
}

// ============================================================
//  🎭 شاشة اختيار المشعر
// ============================================================
function showEmotionPicker() {
    const modal = document.getElementById('chat-modal');
    modal.innerHTML = `
        <div class="chat-topbar">
            <button class="chat-back-btn" id="chatBackBtn">←</button>
            <div style="flex:1;color:#fff;font-weight:700;">دردشة المشاعر</div>
        </div>
        <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:20px;">
            <div style="max-width:500px;width:100%;text-align:center;">
                <div class="chat-finding-emoji">💬</div>
                <div style="color:#fff;font-size:1.2rem;font-weight:700;margin-bottom:8px;">كيف تشعر الآن؟</div>
                <div style="color:#94a3b8;font-size:0.85rem;margin-bottom:24px;">سنجد لك شخصاً يشعر بنفس شعورك للدردشة معه</div>
                <div class="mirror-emotions" id="chatEmoGrid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-height:400px;overflow-y:auto;padding:4px;"></div>
            </div>
        </div>
    `;
    document.getElementById('chatBackBtn').onclick = closeChat;

    const grid = document.getElementById('chatEmoGrid');
    Object.entries(EMOTIONS).forEach(([key, emo]) => {
        const b = document.createElement('button');
        b.style.cssText = `
            padding:12px 4px; border:1.5px solid ${emo.color}; border-radius:12px;
            background:rgba(0,0,0,0.3); color:${emo.color}; font-size:0.7rem;
            cursor:pointer; font-family:inherit; display:flex; flex-direction:column;
            align-items:center; gap:4px; font-weight:600; transition:all 0.2s;
        `;
        b.innerHTML = `<span style="font-size:1.5rem;">${emo.emoji}</span><span>${emo.name}</span>`;
        b.onmouseover = () => b.style.transform = 'translateY(-3px)';
        b.onmouseout = () => b.style.transform = 'translateY(0)';
        b.onclick = () => startFindingPartner(key);
        grid.appendChild(b);
    });
}

// ============================================================
//  🔍 شاشة البحث عن شخص
// ============================================================
function startFindingPartner(emotionKey) {
    chatState.emotion = emotionKey;
    const emo = EMOTIONS[emotionKey];
    const modal = document.getElementById('chat-modal');

    modal.innerHTML = `
        <div class="chat-topbar">
            <button class="chat-back-btn" id="chatBackBtn">←</button>
            <div style="flex:1;color:#fff;font-weight:700;">جاري البحث...</div>
        </div>
        <div class="chat-finding">
            <div class="chat-finding-emoji">${emo.emoji}</div>
            <div class="chat-finding-text">نبحث عن شخص يشعر بـ "${emo.name}"</div>
            <div class="chat-finding-sub">عبر 8 مليارات إنسان... لحظة، قريب نلقاه.</div>
            <div class="chat-finding-bar"><div class="chat-finding-fill"></div></div>
        </div>
    `;
    document.getElementById('chatBackBtn').onclick = closeChat;

    // بعد 3 ثواني، نفتح الدردشة
    setTimeout(() => {
        chatState.partner = PARTNER_CITIES[Math.floor(Math.random() * PARTNER_CITIES.length)];
        openChatRoom();
    }, 3000);
}

// ============================================================
//  💬 غرفة الدردشة
// ============================================================
function openChatRoom() {
    const emo = EMOTIONS[chatState.emotion];
    const modal = document.getElementById('chat-modal');

    modal.innerHTML = `
        <div class="chat-topbar">
            <button class="chat-back-btn" id="chatBackBtn">←</button>
            <div class="chat-partner-avatar" style="border-color:${emo.color};background:rgba(0,0,0,0.4);">${emo.emoji}</div>
            <div class="chat-partner-info" style="flex-direction:column;align-items:flex-start;gap:0;">
                <div class="chat-partner-name">${chatState.partner}</div>
                <div class="chat-partner-status">
                    <span class="status-dot"></span>
                    متصل الآن • ${emo.name}
                </div>
            </div>
            <button class="chat-end-btn" id="chatEndBtn">إنهاء</button>
        </div>
        <div class="chat-messages" id="chatMessages">
            <div class="chat-empty">
                <span class="huge-emoji">${emo.emoji}</span>
                وجدناك! شخص في مكان ما يشعر بـ "${emo.name}" مثلك.<br>
                <span style="font-size:0.75rem;color:#94a3b8;margin-top:8px;display:inline-block;">
                    ⚠️ كل رسالة تختفي نهائياً بعد دقيقة من قراءتها.
                </span>
            </div>
        </div>
        <div class="chat-input-area">
            <input type="text" id="chatInput" placeholder="اكتب رسالة..." maxlength="300" autocomplete="off">
            <button class="chat-send-btn" id="chatSendBtn">➤</button>
        </div>
    `;

    document.getElementById('chatBackBtn').onclick = confirmLeave;
    document.getElementById('chatEndBtn').onclick = confirmLeave;

    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSendBtn');

    sendBtn.onclick = () => sendMessage();
    input.onkeydown = (e) => { if (e.key === 'Enter') sendMessage(); };

    setTimeout(() => input.focus(), 200);

    // رسالة ترحيبية من الطرف الآخر بعد ثانيتين
    setTimeout(() => {
        const greeting = ['أهلاً 👋', 'هاي', 'أهلاً فيك', 'هلا'][Math.floor(Math.random() * 4)];
        addMessage(greeting, 'them');
    }, 2000);
}

function confirmLeave() {
    if (confirm('هل تبي تخرج؟ الرسائل راح تختفي للأبد.')) {
        closeChat();
    }
}

// ============================================================
//  📤 إرسال رسالة
// ============================================================
let userMsgCount = 0;

function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'me');
    input.value = '';
    userMsgCount++;

    // "الطرف الآخر يكتب..."
    setTimeout(() => showTyping(), 600 + Math.random() * 800);

    // الرد بعد ثواني
    const replyDelay = 2000 + Math.random() * 2500;
    setTimeout(() => {
        hideTyping();
        const reply = getBotReply(chatState.emotion);
        addMessage(reply, 'them');
    }, replyDelay + 1500);
}

// ============================================================
//  📥 إضافة رسالة
// ============================================================
function addMessage(text, who) {
    const container = document.getElementById('chatMessages');
    if (!container) return;

    // إزالة الشاشة الفارغة إن وجدت
    const empty = container.querySelector('.chat-empty');
    if (empty) empty.remove();

    const msg = document.createElement('div');
    msg.className = `msg msg-${who}`;

    const time = new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' });

    msg.innerHTML = `
        <div>${escapeHTML(text)}</div>
        <div class="msg-meta">
            <span>${time}</span>
            ${who === 'them' ? '<span class="msg-burn-timer" style="display:none;">🔥 60</span>' : ''}
        </div>
    `;

    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;

    // 🔥 منطق الحرق بعد القراءة
    // نبدأ العد فقط بعد ما "يقرأها" الطرف الآخر (بعد ثانيتين مثلاً)
    if (who === 'me' || who === 'them') {
        scheduleBurn(msg, who === 'me' ? 3000 : 1000);
    }
}

// ============================================================
//  🔥 منطق الحرق بعد القراءة
// ============================================================
function scheduleBurn(msgEl, readDelay) {
    // انتظر لين "تُقرأ" الرسالة
    setTimeout(() => {
        const timerEl = msgEl.querySelector('.msg-burn-timer');
        if (timerEl) timerEl.style.display = 'inline';

        let secondsLeft = 60;
        const burnInterval = setInterval(() => {
            secondsLeft--;
            if (timerEl) timerEl.textContent = `🔥 ${secondsLeft}`;
            if (secondsLeft <= 0) {
                clearInterval(burnInterval);
                burnMessage(msgEl);
            }
        }, 1000);

        // نحفظ المؤقت للتنظيف
        chatState.burnTimers.set(msgEl, burnInterval);
    }, readDelay);
}

function burnMessage(msgEl) {
    msgEl.classList.add('msg-burning');
    setTimeout(() => {
        if (msgEl.parentNode) msgEl.parentNode.removeChild(msgEl);
    }, 1000);
}

// ============================================================
//  ⌨️ مؤشر "يكتب الآن"
// ============================================================
let typingEl = null;

function showTyping() {
    hideTyping();
    const container = document.getElementById('chatMessages');
    if (!container) return;
    typingEl = document.createElement('div');
    typingEl.className = 'typing-indicator';
    typingEl.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    container.appendChild(typingEl);
    container.scrollTop = container.scrollHeight;
}

function hideTyping() {
    if (typingEl && typingEl.parentNode) {
        typingEl.parentNode.removeChild(typingEl);
    }
    typingEl = null;
}

// ============================================================
//  🔐 حماية HTML
// ============================================================
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initChatFeature() {
    injectChatStyles();
    addChatButton();
    console.log('✅ تم تفعيل الدردشة!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initChatFeature, 1000));
} else {
    setTimeout(initChatFeature, 1000);
}