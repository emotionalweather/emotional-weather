// ============================================================
//  feature-mirror.js - 🪞 ميزة مرآة المشاعر
// ============================================================

console.log('🪞 جاري تحميل مرآة المشاعر...');

// ============================================================
//  🌍 قاعدة بيانات المدن (40+ مدينة)
// ============================================================
const MIRROR_CITIES = [
    { name: 'الرياض', country: 'السعودية', flag: '🇸🇦', lat: 24.7136, lng: 46.6753 },
    { name: 'جدة', country: 'السعودية', flag: '🇸🇦', lat: 21.4858, lng: 39.1925 },
    { name: 'الدمام', country: 'السعودية', flag: '🇸🇦', lat: 26.4207, lng: 50.0888 },
    { name: 'مكة المكرمة', country: 'السعودية', flag: '🇸🇦', lat: 21.3891, lng: 39.8579 },
    { name: 'دبي', country: 'الإمارات', flag: '🇦🇪', lat: 25.2048, lng: 55.2708 },
    { name: 'أبوظبي', country: 'الإمارات', flag: '🇦🇪', lat: 24.4539, lng: 54.3773 },
    { name: 'الدوحة', country: 'قطر', flag: '🇶🇦', lat: 25.2854, lng: 51.5310 },
    { name: 'الكويت', country: 'الكويت', flag: '🇰🇼', lat: 29.3759, lng: 47.9774 },
    { name: 'مسقط', country: 'عُمان', flag: '🇴🇲', lat: 23.5880, lng: 58.3829 },
    { name: 'المنامة', country: 'البحرين', flag: '🇧🇭', lat: 26.2285, lng: 50.5860 },
    { name: 'القاهرة', country: 'مصر', flag: '🇪🇬', lat: 30.0444, lng: 31.2357 },
    { name: 'الإسكندرية', country: 'مصر', flag: '🇪🇬', lat: 31.2001, lng: 29.9187 },
    { name: 'بيروت', country: 'لبنان', flag: '🇱🇧', lat: 33.8938, lng: 35.5018 },
    { name: 'دمشق', country: 'سوريا', flag: '🇸🇾', lat: 33.5138, lng: 36.2765 },
    { name: 'بغداد', country: 'العراق', flag: '🇮🇶', lat: 33.3152, lng: 44.3661 },
    { name: 'عمّان', country: 'الأردن', flag: '🇯🇴', lat: 31.9454, lng: 35.9284 },
    { name: 'القدس', country: 'فلسطين', flag: '🇵🇸', lat: 31.7683, lng: 35.2137 },
    { name: 'غزة', country: 'فلسطين', flag: '🇵🇸', lat: 31.5017, lng: 34.4668 },
    { name: 'الخرطوم', country: 'السودان', flag: '🇸🇩', lat: 15.5007, lng: 32.5599 },
    { name: 'طرابلس', country: 'ليبيا', flag: '🇱🇾', lat: 32.8872, lng: 13.1913 },
    { name: 'تونس', country: 'تونس', flag: '🇹🇳', lat: 36.8065, lng: 10.1815 },
    { name: 'الجزائر', country: 'الجزائر', flag: '🇩🇿', lat: 36.7538, lng: 3.0588 },
    { name: 'الرباط', country: 'المغرب', flag: '🇲🇦', lat: 34.0209, lng: -6.8416 },
    { name: 'نواكشوط', country: 'موريتانيا', flag: '🇲🇷', lat: 18.0735, lng: -15.9582 },
    { name: 'صنعاء', country: 'اليمن', flag: '🇾🇪', lat: 15.3694, lng: 44.1910 },
    { name: 'إسطنبول', country: 'تركيا', flag: '🇹🇷', lat: 41.0082, lng: 28.9784 },
    { name: 'طهران', country: 'إيران', flag: '🇮🇷', lat: 35.6892, lng: 51.3890 },
    { name: 'كراتشي', country: 'باكستان', flag: '🇵🇰', lat: 24.8607, lng: 67.0011 },
    { name: 'دلهي', country: 'الهند', flag: '🇮🇳', lat: 28.6139, lng: 77.2090 },
    { name: 'مومباي', country: 'الهند', flag: '🇮🇳', lat: 19.0760, lng: 72.8777 },
    { name: 'دكا', country: 'بنغلاديش', flag: '🇧🇩', lat: 23.8103, lng: 90.4125 },
    { name: 'جاكرتا', country: 'إندونيسيا', flag: '🇮🇩', lat: -6.2088, lng: 106.8456 },
    { name: 'كوالالمبور', country: 'ماليزيا', flag: '🇲🇾', lat: 3.1390, lng: 101.6869 },
    { name: 'بانكوك', country: 'تايلاند', flag: '🇹🇭', lat: 13.7563, lng: 100.5018 },
    { name: 'سنغافورة', country: 'سنغافورة', flag: '🇸🇬', lat: 1.3521, lng: 103.8198 },
    { name: 'بكين', country: 'الصين', flag: '🇨🇳', lat: 39.9042, lng: 116.4074 },
    { name: 'شنغهاي', country: 'الصين', flag: '🇨🇳', lat: 31.2304, lng: 121.4737 },
    { name: 'هونغ كونغ', country: 'الصين', flag: '🇭🇰', lat: 22.3193, lng: 114.1694 },
    { name: 'طوكيو', country: 'اليابان', flag: '🇯🇵', lat: 35.6762, lng: 139.6503 },
    { name: 'أوساكا', country: 'اليابان', flag: '🇯🇵', lat: 34.6937, lng: 135.5023 },
    { name: 'سيول', country: 'كوريا الجنوبية', flag: '🇰🇷', lat: 37.5665, lng: 126.9780 },
    { name: 'سيدني', country: 'أستراليا', flag: '🇦🇺', lat: -33.8688, lng: 151.2093 },
    { name: 'ملبورن', country: 'أستراليا', flag: '🇦🇺', lat: -37.8136, lng: 144.9631 },
    { name: 'أوكلاند', country: 'نيوزيلندا', flag: '🇳🇿', lat: -36.8485, lng: 174.7633 },
    { name: 'موسكو', country: 'روسيا', flag: '🇷🇺', lat: 55.7558, lng: 37.6173 },
    { name: 'كييف', country: 'أوكرانيا', flag: '🇺🇦', lat: 50.4501, lng: 30.5234 },
    { name: 'برلين', country: 'ألمانيا', flag: '🇩🇪', lat: 52.5200, lng: 13.4050 },
    { name: 'باريس', country: 'فرنسا', flag: '🇫🇷', lat: 48.8566, lng: 2.3522 },
    { name: 'لندن', country: 'بريطانيا', flag: '🇬🇧', lat: 51.5074, lng: -0.1278 },
    { name: 'روما', country: 'إيطاليا', flag: '🇮🇹', lat: 41.9028, lng: 12.4964 },
    { name: 'مدريد', country: 'إسبانيا', flag: '🇪🇸', lat: 40.4168, lng: -3.7038 },
    { name: 'أمستردام', country: 'هولندا', flag: '🇳🇱', lat: 52.3676, lng: 4.9041 },
    { name: 'ستوكهولم', country: 'السويد', flag: '🇸🇪', lat: 59.3293, lng: 18.0686 },
    { name: 'أوسلو', country: 'النرويج', flag: '🇳🇴', lat: 59.9139, lng: 10.7522 },
    { name: 'نيويورك', country: 'أمريكا', flag: '🇺🇸', lat: 40.7128, lng: -74.0060 },
    { name: 'لوس أنجلوس', country: 'أمريكا', flag: '🇺🇸', lat: 34.0522, lng: -118.2437 },
    { name: 'شيكاغو', country: 'أمريكا', flag: '🇺🇸', lat: 41.8781, lng: -87.6298 },
    { name: 'ميامي', country: 'أمريكا', flag: '🇺🇸', lat: 25.7617, lng: -80.1918 },
    { name: 'تورنتو', country: 'كندا', flag: '🇨🇦', lat: 43.6532, lng: -79.3832 },
    { name: 'فانكوفر', country: 'كندا', flag: '🇨🇦', lat: 49.2827, lng: -123.1207 },
    { name: 'مكسيكو سيتي', country: 'المكسيك', flag: '🇲🇽', lat: 19.4326, lng: -99.1332 },
    { name: 'ساو باولو', country: 'البرازيل', flag: '🇧🇷', lat: -23.5505, lng: -46.6333 },
    { name: 'ريو دي جانيرو', country: 'البرازيل', flag: '🇧🇷', lat: -22.9068, lng: -43.1729 },
    { name: 'بوينس آيرس', country: 'الأرجنتين', flag: '🇦🇷', lat: -34.6037, lng: -58.3816 },
    { name: 'نيودلهي', country: 'الهند', flag: '🇮🇳', lat: 28.6139, lng: 77.2090 },
    { name: 'لاغوس', country: 'نيجيريا', flag: '🇳🇬', lat: 6.5244, lng: 3.3792 },
    { name: 'نيروبي', country: 'كينيا', flag: '🇰🇪', lat: -1.2921, lng: 36.8219 },
    { name: 'كيب تاون', country: 'جنوب أفريقيا', flag: '🇿🇦', lat: -33.9249, lng: 18.4241 },
    { name: 'الدار البيضاء', country: 'المغرب', flag: '🇲🇦', lat: 33.5731, lng: -7.5898 },
    { name: 'مراكش', country: 'المغرب', flag: '🇲🇦', lat: 31.6295, lng: -7.9811 },
    { name: 'إستانبول', country: 'تركيا', flag: '🇹🇷', lat: 41.0082, lng: 28.9784 },
    { name: 'أنقرة', country: 'تركيا', flag: '🇹🇷', lat: 39.9334, lng: 32.8597 },
    { name: 'عشق آباد', country: 'تركمانستان', flag: '🇹🇲', lat: 37.9601, lng: 58.3261 },
    { name: 'باكو', country: 'أذربيجان', flag: '🇦🇿', lat: 40.4093, lng: 49.8671 },
    { name: 'تبليسي', country: 'جورجيا', flag: '🇬🇪', lat: 41.7151, lng: 44.8271 },
    { name: 'يريفان', country: 'أرمينيا', flag: '🇦🇲', lat: 40.1792, lng: 44.4991 },
    { name: 'كابول', country: 'أفغانستان', flag: '🇦🇫', lat: 34.5553, lng: 69.2075 },
    { name: 'طشقند', country: 'أوزبكستان', flag: '🇺🇿', lat: 41.2995, lng: 69.2401 }
];

// ============================================================
//  🎨 إضافة CSS
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
            top: 0; left: 0; right: 0; bottom: 0;
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

        .mirror-loading {
            padding: 40px 0;
        }
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
        .mirror-loading .pulse-core {
            position: absolute;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: radial-gradient(#FF69B4, transparent);
            margin: -70px auto 0;
        }
        .mirror-loading-text {
            color: #FF69B4;
            font-size: 0.95rem;
            margin-top: 20px;
        }

        .mirror-result {
            padding: 10px 0;
        }
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
    `;
    document.head.appendChild(style);
}

// ============================================================
//  🔘 إضافة زر "مرآة المشاعر"
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
//  🪟 فتح نافذة المرآة
// ============================================================
function openMirrorModal() {
    let modal = document.getElementById('mirror-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'mirror-modal';
        modal.innerHTML = `
            <div class="mirror-card" id="mirrorCardInner"></div>
        `;
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
//  🎭 الخطوة 1: عرض المشاعر للاختيار
// ============================================================
function showMirrorEmotionPicker() {
    const inner = document.getElementById('mirrorCardInner');
    if (!inner) return;

    inner.innerHTML = `
        <div class="mirror-title">🪞 مرآة المشاعر</div>
        <div class="mirror-subtitle">اختر مشعرك، ودعنا نجد شخصاً يشعر مثلك في مكان ما في العالم</div>
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
//  ⏳ الخطوة 2: التحميل
// ============================================================
function startMirrorSearch(emotionKey) {
    const inner = document.getElementById('mirrorCardInner');
    const emo = EMOTIONS[emotionKey];
    inner.innerHTML = `
        <div class="mirror-loading">
            <div style="position:relative; height:80px;">
                <div class="pulse-ring"></div>
                <div class="pulse-core"></div>
            </div>
            <div class="mirror-loading-text">
                🔍 نبحث في العالم عن شخص يشعر بـ "${emo.name}"...
            </div>
        </div>
    `;

    // نبحث عن مدينة عشوائية بعد تأخير (محاكاة للبحث)
    setTimeout(() => {
        const city = MIRROR_CITIES[Math.floor(Math.random() * MIRROR_CITIES.length)];
        // عدد عشوائي منطقي (5,000 - 250,000)
        const count = 5000 + Math.floor(Math.random() * 245000);
        showMirrorResult(city, count, emotionKey);
    }, 2200);
}

// ============================================================
//  ✅ الخطوة 3: عرض النتيجة
// ============================================================
function showMirrorResult(city, count, emotionKey) {
    const inner = document.getElementById('mirrorCardInner');
    const emo = EMOTIONS[emotionKey];

    inner.innerHTML = `
        <div class="mirror-result">
            <div style="font-size: 3rem; margin-bottom: 10px;">${emo.emoji}</div>
            <div class="mirror-result-city">${city.flag} ${city.name}</div>
            <div class="mirror-result-country">${city.country}</div>
            <div class="mirror-result-count">${count.toLocaleString('ar-EG')}</div>
            <div class="mirror-result-label">شخص يشعر بـ "${emo.name}" في نفس هذه اللحظة</div>
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

    document.getElementById('mirrorFlyBtn').onclick = () => flyToMirrorCity(city, emotionKey);
    document.getElementById('mirrorAgainBtn').onclick = showMirrorEmotionPicker;
    document.getElementById('mirrorCloseBtn').onclick = closeMirrorModal;
}

// ============================================================
//  ✈️ الطيران إلى المدينة
// ============================================================
function flyToMirrorCity(city, emotionKey) {
    closeMirrorModal();

    // نطير للخريطة
    map.flyTo([city.lat, city.lng], 11, { duration: 2.5 });

    // نضيف 30 مشعر عشوائي في المدينة (محاكاة للنبض)
    const emoKeys = Object.keys(EMOTIONS);
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const offsetLat = (Math.random() - 0.5) * 0.15;
            const offsetLng = (Math.random() - 0.5) * 0.15;
            const k = Math.random() < 0.6 ? emotionKey : emoKeys[Math.floor(Math.random() * emoKeys.length)];
            if (typeof dropEmotion === 'function') {
                dropEmotion(city.lat + offsetLat, city.lng + offsetLng, k, `${city.flag} ${city.name}`);
            }
        }, i * 100);
    }

    // إشعار
    if (typeof showToast === 'function') {
        showToast(`✈️ وصلت إلى ${city.flag} ${city.name} — ${EMOTIONS[emotionKey].emoji} مشاعر متطابقة!`);
    }
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initMirrorFeature() {
    injectMirrorStyles();
    addMirrorButton();
    console.log('✅ تم تفعيل مرآة المشاعر!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initMirrorFeature, 800));
} else {
    setTimeout(initMirrorFeature, 800);
}