// ============================================================
//  feature-mirror.js - 🪞 مرآة المشاعر (نسخة حقيقية 100%)
//  تعتمد على بيانات الأخبار الحقيقية — بدون أي محاكاة
// ============================================================

console.log('🪞 جاري تحميل مرآة المشاعر...');

// ============================================================
//  🌍 قائمة الدول العربية (نستخدمها للطيران)
// ============================================================
const MIRROR_COUNTRIES = {
    SA: { name: 'السعودية', flag: '🇸🇦', lat: 24.7, lng: 46.7 },
    AE: { name: 'الإمارات', flag: '🇦🇪', lat: 25.2, lng: 55.3 },
    QA: { name: 'قطر', flag: '🇶🇦', lat: 25.3, lng: 51.5 },
    KW: { name: 'الكويت', flag: '🇰🇼', lat: 29.4, lng: 47.9 },
    BH: { name: 'البحرين', flag: '🇧🇭', lat: 26.2, lng: 50.6 },
    OM: { name: 'عُمان', flag: '🇴🇲', lat: 23.6, lng: 58.4 },
    YE: { name: 'اليمن', flag: '🇾🇪', lat: 15.4, lng: 44.2 },
    EG: { name: 'مصر', flag: '🇪🇬', lat: 30.0, lng: 31.2 },
    SD: { name: 'السودان', flag: '🇸🇩', lat: 15.5, lng: 32.5 },
    LY: { name: 'ليبيا', flag: '🇱🇾', lat: 32.9, lng: 13.2 },
    TN: { name: 'تونس', flag: '🇹🇳', lat: 36.8, lng: 10.2 },
    DZ: { name: 'الجزائر', flag: '🇩🇿', lat: 36.7, lng: 3.1 },
    MA: { name: 'المغرب', flag: '🇲🇦', lat: 34.0, lng: -6.8 },
    MR: { name: 'موريتانيا', flag: '🇲🇷', lat: 18.1, lng: -15.9 },
    JO: { name: 'الأردن', flag: '🇯🇴', lat: 31.9, lng: 35.9 },
    LB: { name: 'لبنان', flag: '🇱🇧', lat: 33.9, lng: 35.5 },
    SY: { name: 'سوريا', flag: '🇸🇾', lat: 33.5, lng: 36.3 },
    IQ: { name: 'العراق', flag: '🇮🇶', lat: 33.3, lng: 44.4 },
    PS: { name: 'فلسطين', flag: '🇵🇸', lat: 31.9, lng: 35.2 },
    DJ: { name: 'جيبوتي', flag: '🇩🇯', lat: 11.6, lng: 43.1 },
    SO: { name: 'الصومال', flag: '🇸🇴', lat: 2.0, lng: 45.3 },
    KM: { name: 'جزر القمر', flag: '🇰🇲', lat: -11.7, lng: 43.3 }
};

// ============================================================
//  🎨 CSS
// ============================================================
function injectMirrorStyles() {
    if (document.getElementById('mirror-styles')) return;
    const style = document.createElement('style');
    style.id = 'mirror-styles';
    style.textContent = `
        #mirror-btn {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: rgba(15, 25, 40, 0.92);
            border: 1px solid rgba(255, 105, 180, 0.5);
            color: #FF69B4;
            font-size: 1.2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            flex-shrink: 0;
            animation: mirrorGlow 3s infinite;
        }
        @keyframes mirrorGlow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.4); }
            50%      { box-shadow: 0 0 0 8px rgba(255, 105, 180, 0); }
        }

        #mirror-modal {
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse at center, rgba(30, 10, 40, 0.95), rgba(0,0,0,0.98));
            z-index: 5000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            backdrop-filter: blur(8px);
        }
        #mirror-modal.show { display: flex; }

        .mirror-card {
            background: linear-gradient(135deg, rgba(30, 20, 50, 0.98), rgba(15, 10, 30, 0.98));
            border: 1px solid rgba(255, 105, 180, 0.4);
            border-radius: 24px;
            padding: 32px 26px;
            max-width: 480px;
            width: 100%;
            text-align: center;
            box-shadow: 0 0 60px rgba(255, 105, 180, 0.3);
            animation: mirrorIn 0.5s ease;
        }
        @keyframes mirrorIn {
            from { opacity: 0; transform: scale(0.9); }
            to   { opacity: 1; transform: scale(1); }
        }

        .mirror-title {
            font-size: 1.4rem;
            font-weight: 800;
            background: linear-gradient(90deg, #FF69B4, #FFD700);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 8px;
        }
        .mirror-subtitle {
            color: #94a3b8;
            font-size: 0.85rem;
            margin-bottom: 24px;
        }

        .mirror-emotions {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            max-height: 350px;
            overflow-y: auto;
            padding: 4px;
            margin-bottom: 18px;
        }
        .mirror-emotions::-webkit-scrollbar { width: 5px; }
        .mirror-emotions::-webkit-scrollbar-thumb { background: rgba(255,105,180,0.4); border-radius: 5px; }

        .mirror-emo-btn {
            padding: 12px 4px;
            border: 1.5px solid;
            border-radius: 12px;
            background: rgba(0,0,0,0.4);
            color: #fff;
            font-size: 0.7rem;
            cursor: pointer;
            font-family: inherit;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            font-weight: 600;
            transition: all 0.2s;
        }
        .mirror-emo-btn:hover { transform: translateY(-3px); box-shadow: 0 0 15px currentColor; }
        .mirror-emo-btn .emo-icon { font-size: 1.5rem; }

        .mirror-loading { padding: 40px 0; }
        .mirror-loading .pulse-ring {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 3px solid #FF69B4;
            margin: 0 auto 20px;
            animation: ringPulse 1.5s infinite;
        }
        @keyframes ringPulse {
            0%   { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(1.6); opacity: 0; }
        }
        .mirror-loading-text {
            color: #FF69B4;
            font-size: 0.95rem;
            margin-top: 20px;
        }

        .mirror-result { padding: 10px 0; }
        .mirror-result-city {
            font-size: 1.6rem;
            font-weight: 800;
            color: #fff;
            margin-bottom: 6px;
        }
        .mirror-result-country {
            font-size: 1rem;
            color: #94a3b8;
            margin-bottom: 20px;
        }
        .mirror-result-count {
            font-size: 2.2rem;
            font-weight: 800;
            background: linear-gradient(90deg, #FFD700, #FF69B4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 16px 0 6px;
        }
        .mirror-result-label {
            color: #94a3b8;
            font-size: 0.85rem;
            margin-bottom: 24px;
        }

        .mirror-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .mirror-action-btn {
            padding: 14px;
            border-radius: 12px;
            border: none;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            font-family: inherit;
            transition: all 0.2s;
        }
        .mirror-action-primary {
            background: linear-gradient(90deg, #FF69B4, #FF1493);
            color: #fff;
        }
        .mirror-action-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(255,105,180,0.4); }
        .mirror-action-secondary {
            background: rgba(255, 255, 255, 0.08);
            color: #fff;
            border: 1px solid rgba(255,255,255,0.15);
        }
        .mirror-action-secondary:hover { background: rgba(255,255,255,0.15); }

        .mirror-empty {
            padding: 40px 20px;
            text-align: center;
        }
        .mirror-empty-emoji {
            font-size: 3rem;
            margin-bottom: 16px;
            opacity: 0.6;
        }
        .mirror-empty-title {
            color: #FF69B4;
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .mirror-empty-text {
            color: #94a3b8;
            font-size: 0.85rem;
            line-height: 1.7;
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  🔘 إضافة الزر
// ============================================================
function addMirrorButton() {
    if (document.getElementById('mirror-btn')) return;
    const topBar = document.getElementById('top-bar');
    if (!topBar) return;

    const btn = document.createElement('button');
    btn.id = 'mirror-btn';
    btn.title = 'مرآة المشاعر';
    btn.textContent = '🪞';
    btn.onclick = openMirrorModal;
    topBar.appendChild(btn);
}

// ============================================================
//  🪟 فتح النافذة
// ============================================================
function openMirrorModal() {
    let modal = document.getElementById('mirror-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'mirror-modal';
        modal.innerHTML = '<div class="mirror-card" id="mirrorCardInner"></div>';
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeMirrorModal();
        });
    }
    modal.classList.add('show');
    showMirrorEmotionPicker();
}

function closeMirrorModal() {
    const modal = document.getElementById('mirror-modal');
    if (modal) modal.classList.remove('show');
}

// ============================================================
//  🎭 عرض المشاعر للاختيار
// ============================================================
function showMirrorEmotionPicker() {
    const inner = document.getElementById('mirrorCardInner');
    if (!inner) return;

    inner.innerHTML = `
        <div class="mirror-title">🪞 مرآة المشاعر</div>
        <div class="mirror-subtitle">اختر مشعرك، ودعنا نجد دولة عربية تشعر مثلك الآن (مبني على الأخبار الحقيقية)</div>
        <div class="mirror-emotions" id="mirrorEmotionsGrid"></div>
    `;

    const grid = document.getElementById('mirrorEmotionsGrid');
    Object.entries(EMOTIONS).forEach(([key, emo]) => {
        const b = document.createElement('button');
        b.className = 'mirror-emo-btn';
        b.style.borderColor = emo.color;
        b.style.color = emo.color;
        b.innerHTML = `<span class="emo-icon">${emo.emoji}</span><span>${emo.name}</span>`;
        b.onclick = () => startMirrorSearch(key);
        grid.appendChild(b);
    });
}

// ============================================================
//  ⏳ تحميل ونتيجة
// ============================================================
function startMirrorSearch(emotionKey) {
    const inner = document.getElementById('mirrorCardInner');
    const emo = EMOTIONS[emotionKey];
    inner.innerHTML = `
        <div class="mirror-loading">
            <div class="pulse-ring"></div>
            <div class="mirror-loading-text">
                🔍 نبحث في الأخبار الحقيقية عن دولة تشعر بـ "${emo.name}"...
            </div>
        </div>
    `;

    setTimeout(() => {
        const result = findCountryByEmotion(emotionKey);

        if (result) {
            showMirrorResult(result.country, result.count, emotionKey);
        } else {
            showMirrorEmpty(emotionKey);
        }
    }, 1500);
}

// ============================================================
//  🎯 البحث عن دولة حقيقية بمشعر معين
// ============================================================
function findCountryByEmotion(emotionKey) {
    // نقرأ بيانات المزاج الحقيقية اللي جمعها news-sidebar
    const countryMoods = window.__realCountryMoods || {};

    // تحويل المشعر لمشاعر الأخبار
    const emotionToCategories = {
        angry: ['war'],
        sad: ['disaster'],
        anxious: ['crisis', 'health'],
        calm: ['economy'],
        neutral: ['politics'],
        joy: ['sports', 'culture'],
        hope: ['positive']
    };

    const targetCats = emotionToCategories[emotionKey] || [];

    // نبحث عن دول عندها أخبار بهذي الفئات
    const matches = [];
    Object.entries(countryMoods).forEach(([code, moods]) => {
        let count = 0;
        targetCats.forEach(cat => { count += (moods[cat] || 0); });
        if (count > 0) {
            matches.push({ code, count });
        }
    });

    if (matches.length === 0) return null;

    // نرتب حسب العدد
    matches.sort((a, b) => b.count - a.count);

    // نختار دولة عشوائية من أعلى 3
    const topMatches = matches.slice(0, 3);
    const picked = topMatches[Math.floor(Math.random() * topMatches.length)];

    const country = MIRROR_COUNTRIES[picked.code];
    if (!country) return null;

    return { country, count: picked.count };
}

// ============================================================
//  ✅ عرض النتيجة
// ============================================================
function showMirrorResult(country, count, emotionKey) {
    const inner = document.getElementById('mirrorCardInner');
    const emo = EMOTIONS[emotionKey];

    inner.innerHTML = `
        <div class="mirror-result">
            <div style="font-size: 3rem; margin-bottom: 10px;">${emo.emoji}</div>
            <div class="mirror-result-city">${country.flag} ${country.name}</div>
            <div class="mirror-result-country">تشعر بـ "${emo.name}" الآن</div>
            <div class="mirror-result-count">${count}</div>
            <div class="mirror-result-label">خبر حقيقي مصنّف بهذا المشعر</div>
            <div class="mirror-actions">
                <button class="mirror-action-btn mirror-action-primary" id="mirrorFlyBtn">
                    ✈️ طِر إلى هناك
                </button>
                <button class="mirror-action-btn mirror-action-secondary" id="mirrorAgainBtn">
                    🔄 جرب مشعراً آخر
                </button>
                <button class="mirror-action-btn mirror-action-secondary" id="mirrorCloseBtn">
                    ✕ إغلاق
                </button>
            </div>
        </div>
    `;

    document.getElementById('mirrorFlyBtn').onclick = () => flyToMirrorCountry(country, emotionKey);
    document.getElementById('mirrorAgainBtn').onclick = showMirrorEmotionPicker;
    document.getElementById('mirrorCloseBtn').onclick = closeMirrorModal;
}

// ============================================================
//  📭 لا توجد بيانات
// ============================================================
function showMirrorEmpty(emotionKey) {
    const inner = document.getElementById('mirrorCardInner');
    const emo = EMOTIONS[emotionKey];

    inner.innerHTML = `
        <div class="mirror-empty">
            <div class="mirror-empty-emoji">${emo.emoji}</div>
            <div class="mirror-empty-title">لا توجد أخبار حقيقية بهذا المشعر حالياً</div>
            <div class="mirror-empty-text">
                لم نجد في الأخبار الحقيقية لدول العالم العربي، حالياً، أي خبر مصنّف بهذا المشعر.<br>
                جرّب مشعراً آخر، أو عد لاحقاً بعد تحديث الأخبار.
            </div>
            <div class="mirror-actions" style="margin-top: 20px;">
                <button class="mirror-action-btn mirror-action-primary" id="mirrorBackBtn">
                    🔄 اختر مشعراً آخر
                </button>
                <button class="mirror-action-btn mirror-action-secondary" id="mirrorCloseBtn2">
                    ✕ إغلاق
                </button>
            </div>
        </div>
    `;

    document.getElementById('mirrorBackBtn').onclick = showMirrorEmotionPicker;
    document.getElementById('mirrorCloseBtn2').onclick = closeMirrorModal;
}

// ============================================================
//  ✈️ الطيران إلى الدولة
// ============================================================
function flyToMirrorCountry(country, emotionKey) {
    closeMirrorModal();

    if (typeof map !== 'undefined' && map && map.flyTo) {
        map.flyTo([country.lat, country.lng], 7, { duration: 2.5 });
    }

    if (typeof showToast === 'function') {
        showToast(`✈️ وصلت إلى ${country.flag} ${country.name}`);
    }
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initMirrorFeature() {
    injectMirrorStyles();
    addMirrorButton();
    console.log('✅ تم تفعيل مرآة المشاعر (حقيقية)!');
}

window.openMirrorModal = openMirrorModal;
window.closeMirrorModal = closeMirrorModal;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initMirrorFeature, 800));
} else {
    setTimeout(initMirrorFeature, 800);
}