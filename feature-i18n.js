// ============================================================
//  feature-i18n.js - 🌍 نظام الترجمة (عربي + إنجليزي)
// ============================================================

console.log('🌍 جاري تحميل نظام الترجمة...');

// ============================================================
//  📚 القواميس
// ============================================================
const TRANSLATIONS = {
    ar: {
        // الترويسة
        app_title: 'الطقس العاطفي',
        app_subtitle: 'نبض مشاعر البشرية في اللحظة هذه',

        // البحث
        search_placeholder: 'ابحث عن مدينة، حي، أو شارع...',

        // الأزرار
        privacy_toggle: 'الخصوصية',
        mirror_btn: 'مرآة المشاعر',
        heartbeat_btn: 'نبض البشرية',
        support_btn: 'ادعمنا',

        // نافذة المرآة
        mirror_title: '🪞 مرآة المشاعر',
        mirror_subtitle: 'اختر مشعرك، ودعنا نجد شخصاً يشعر مثلك في مكان ما في العالم',
        mirror_finding: '🔍 نبحث في العالم عن شخص يشعر بـ',
        mirror_people: 'شخص يشعر بـ',
        mirror_moment: 'في نفس هذه اللحظة',
        mirror_fly: '✈️ طِر إلى هناك',
        mirror_again: '🔄 جرب مشعراً آخر',
        mirror_close: '✕ إغلاق',

        // نافذة نبض البشرية
        heartbeat_title: '🌍 نبض البشرية',
        heartbeat_subtitle: 'مشاعر 8 مليارات إنسان في هذه اللحظة',
        heartbeat_dominant: 'المشعر السائد الآن',
        heartbeat_represents: 'يمثل',
        heartbeat_of_humanity: 'من البشرية الآن',
        heartbeat_close: 'إغلاق',

        // نافذة الدعم
        support_title: 'ادعم الموقع',
        support_msg: 'ساهم في استمرار الموقع وتطويره 🤍',
        support_wallet: 'محفظة الدعم',
        support_note: 'أي مبلغ، حتى لو صغير، يساعدنا نستمر',
        support_close: 'إغلاق',

        // الأخبار
        news_title: '🌍 أخبار العالم العربي — مباشر',
        news_loading: '⏳ جاري تحميل الأخبار...',
        news_mood_board: '📊 مزاج الدول العربية',
        news_mood_expected: '💭 المزاج المتوقع:',
        news_no_results: 'لا توجد نتائج',

        // حالات المزاج
        mood_positive: 'إيجابي',
        mood_stable: 'مستقر',
        mood_tense: 'متوتر',
        mood_crisis: 'متأزم',

        // تصنيفات الأخبار
        cat_war: 'حرب/نزاع',
        cat_disaster: 'كارثة',
        cat_crisis: 'أزمة',
        cat_economy: 'اقتصاد',
        cat_politics: 'سياسة',
        cat_sports: 'رياضة',
        cat_health: 'صحة',
        cat_culture: 'ثقافة',
        cat_positive: 'إيجابي',

        // مشاعر
        emo_joy: 'فرح',
        emo_sad: 'حزن',
        emo_angry: 'غضب',
        emo_calm: 'هدوء',
        emo_anxious: 'قلق',
        emo_grateful: 'امتنان',
        emo_love: 'حب',
        emo_fear: 'خوف',
        emo_hope: 'أمل',
        emo_frustration: 'إحباط',
        emo_surprise: 'دهشة',
        emo_bored: 'ملل',
        emo_proud: 'فخر',
        emo_shy: 'خجل',
        emo_excited: 'حماس',
        emo_lonely: 'وحدة',
        emo_relief: 'ارتياح',
        emo_guilty: 'ذنب',
        emo_longing: 'شوق',
        emo_curious: 'فضول',
        emo_thoughtful: 'تأمل',
        emo_confused: 'حيرة',
        emo_nostalgic: 'حنين',
        emo_inspired: 'إلهام',
        emo_neutral: 'محايد',
        emo_tired: 'متعب',
        emo_sick: 'مريض',
        emo_stressed: 'توتر',
        emo_peaceful: 'سلام',
        emo_overwhelmed: 'إنهاك',
        emo_determined: 'عزيمة',
        emo_playful: 'مرح',
        emo_disgusted: 'اشمئزاز',
        emo_awed: 'انبهار',
        emo_sympathetic: 'تعاطف',

        // إشعارات
        toast_locating: '⏳ جاري تحديد موقعك...',
        toast_found: '📍 تم تحديد موقعك',
        toast_cant_locate: '⚠️ تعذر تحديد موقعك، اختر مكاناً على الخريطة',
        toast_sent: 'تم إرسال',
        toast_to: 'إلى',
        toast_privacy_on: '🔒 وضع الخصوصية: يظهر الحي فقط',
        toast_privacy_off: '👁️ وضع دقيق: يظهر موقعك بالضبط',
        toast_browser_no_geo: '⚠️ المتصفح لا يدعم تحديد الموقع',
        toast_finding_place: '⏳ جاري تحديد المكان...'
    },
    en: {
        // Header
        app_title: 'Emotional Weather',
        app_subtitle: 'Humanity\'s emotions pulse in this moment',

        // Search
        search_placeholder: 'Search for a city, neighborhood, or street...',

        // Buttons
        privacy_toggle: 'Privacy',
        mirror_btn: 'Emotion Mirror',
        heartbeat_btn: 'Humanity\'s Pulse',
        support_btn: 'Support Us',

        // Mirror
        mirror_title: '🪞 Emotion Mirror',
        mirror_subtitle: 'Choose your emotion, and let us find someone feeling like you somewhere in the world',
        mirror_finding: '🔍 Searching the world for someone feeling',
        mirror_people: 'people feel',
        mirror_moment: 'in this very moment',
        mirror_fly: '✈️ Fly There',
        mirror_again: '🔄 Try Another Emotion',
        mirror_close: '✕ Close',

        // Heartbeat
        heartbeat_title: '🌍 Humanity\'s Pulse',
        heartbeat_subtitle: '8 billion humans\' emotions right now',
        heartbeat_dominant: 'Dominant Emotion Now',
        heartbeat_represents: 'Represents',
        heartbeat_of_humanity: 'of humanity now',
        heartbeat_close: 'Close',

        // Support
        support_title: 'Support the Site',
        support_msg: 'Contribute to keeping the site running and improving 🤍',
        support_wallet: 'Support Wallet',
        support_note: 'Any amount, however small, helps us continue',
        support_close: 'Close',

        // News
        news_title: '🌍 Arab World News — Live',
        news_loading: '⏳ Loading news...',
        news_mood_board: '📊 Arab Countries Mood',
        news_mood_expected: '💭 Expected mood:',
        news_no_results: 'No results',

        // Mood states
        mood_positive: 'Positive',
        mood_stable: 'Stable',
        mood_tense: 'Tense',
        mood_crisis: 'Crisis',

        // News categories
        cat_war: 'War/Conflict',
        cat_disaster: 'Disaster',
        cat_crisis: 'Crisis',
        cat_economy: 'Economy',
        cat_politics: 'Politics',
        cat_sports: 'Sports',
        cat_health: 'Health',
        cat_culture: 'Culture',
        cat_positive: 'Positive',

        // Emotions
        emo_joy: 'Joy',
        emo_sad: 'Sad',
        emo_angry: 'Angry',
        emo_calm: 'Calm',
        emo_anxious: 'Anxious',
        emo_grateful: 'Grateful',
        emo_love: 'Love',
        emo_fear: 'Fear',
        emo_hope: 'Hope',
        emo_frustration: 'Frustration',
        emo_surprise: 'Surprise',
        emo_bored: 'Bored',
        emo_proud: 'Proud',
        emo_shy: 'Shy',
        emo_excited: 'Excited',
        emo_lonely: 'Lonely',
        emo_relief: 'Relief',
        emo_guilty: 'Guilty',
        emo_longing: 'Longing',
        emo_curious: 'Curious',
        emo_thoughtful: 'Thoughtful',
        emo_confused: 'Confused',
        emo_nostalgic: 'Nostalgic',
        emo_inspired: 'Inspired',
        emo_neutral: 'Neutral',
        emo_tired: 'Tired',
        emo_sick: 'Sick',
        emo_stressed: 'Stressed',
        emo_peaceful: 'Peaceful',
        emo_overwhelmed: 'Overwhelmed',
        emo_determined: 'Determined',
        emo_playful: 'Playful',
        emo_disgusted: 'Disgusted',
        emo_awed: 'Awed',
        emo_sympathetic: 'Sympathetic',

        // Toasts
        toast_locating: '⏳ Locating you...',
        toast_found: '📍 Location found',
        toast_cant_locate: '⚠️ Couldn\'t locate you, choose a place on the map',
        toast_sent: 'Sent',
        toast_to: 'to',
        toast_privacy_on: '🔒 Privacy mode: neighborhood only',
        toast_privacy_off: '👁️ Precise mode: your exact location',
        toast_browser_no_geo: '⚠️ Browser doesn\'t support geolocation',
        toast_finding_place: '⏳ Finding place...'
    }
};

// ============================================================
//  🌐 الحالة الحالية
// ============================================================
let currentLang = localStorage.getItem('site_lang') || detectDefaultLang();

function detectDefaultLang() {
    const browserLang = (navigator.language || 'ar').toLowerCase();
    return browserLang.startsWith('ar') ? 'ar' : 'en';
}

// ============================================================
//  🔤 دالة الترجمة
// ============================================================
function t(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key;
}

// ============================================================
//  🎨 CSS
// ============================================================
function injectI18nStyles() {
    if (document.getElementById('i18n-styles')) return;
    const style = document.createElement('style');
    style.id = 'i18n-styles';
    style.textContent = `
        #lang-btn {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: rgba(15, 25, 40, 0.92);
            border: 1px solid rgba(139, 92, 246, 0.5);
            color: #a78bfa;
            font-size: 0.75rem;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            flex-shrink: 0;
            font-family: inherit;
            transition: all 0.2s;
        }
        #lang-btn:hover { transform: scale(1.08); }

        /* للغة الإنجليزية نغير اتجاه الصفحة */
        body.lang-en { direction: ltr; }
        body.lang-en #header h1 { direction: ltr; }
        body.lang-en #news-panel {
            left: 12px;
            right: auto;
        }
        body.lang-en .news-card { border-right: none; border-left: 3px solid; }
        @media (max-width: 768px) {
            body.lang-en #news-panel { left: 10px; right: 10px; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  🔘 إضافة زر اللغة
// ============================================================
function addLangButton() {
    if (document.getElementById('lang-btn')) return;
    const topBar = document.getElementById('top-bar');
    if (!topBar) return;

    const btn = document.createElement('button');
    btn.id = 'lang-btn';
    btn.title = 'Switch Language / تغيير اللغة';
    btn.textContent = currentLang === 'ar' ? 'EN' : 'ع';
    btn.onclick = toggleLanguage;
    topBar.appendChild(btn);
}

// ============================================================
//  🔄 تبديل اللغة
// ============================================================
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('site_lang', currentLang);
    applyLanguage();
}

// ============================================================
//  ✅ تطبيق اللغة على الصفحة
// ============================================================
function applyLanguage() {
    const isAr = currentLang === 'ar';

    // اتجاه الصفحة
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-en', !isAr);

    // زر اللغة
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = isAr ? 'EN' : 'ع';

    // الترويسة
    const h1 = document.querySelector('#header h1');
    const subtitle = document.querySelector('#header p');
    if (h1) h1.textContent = t('app_title');
    if (subtitle) subtitle.textContent = t('app_subtitle');

    // البحث
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = t('search_placeholder');

    // أزرار Top Bar
    const privacyBtn = document.getElementById('privacy-btn');
    if (privacyBtn) privacyBtn.title = t('privacy_toggle');

    const mirrorBtn = document.getElementById('mirror-btn');
    if (mirrorBtn) mirrorBtn.title = t('mirror_btn');

    const heartbeatBtn = document.getElementById('heartbeat-btn');
    if (heartbeatBtn) heartbeatBtn.title = t('heartbeat_btn');

    const supportBtn = document.getElementById('support-btn');
    if (supportBtn) supportBtn.title = t('support_btn');

    // حدث النوافذ المفتوحة (نقفلها عشان تفتح باللغة الجديدة)
    const modals = ['mirror-modal', 'heartbeat-modal', 'support-modal'];
    modals.forEach(id => {
        const m = document.getElementById(id);
        if (m) m.classList.remove('show');
    });

    // نافذة الأخبار
    const newsHeader = document.querySelector('#news-panel .news-header span:last-child');
    if (newsHeader) newsHeader.textContent = t('news_title');

    const moodBoardTitle = document.querySelector('.mood-board-title');
    if (moodBoardTitle) moodBoardTitle.textContent = t('news_mood_board');

    console.log(`🌍 Language switched to: ${currentLang}`);
}

// ============================================================
//  🚀 التشغيل
// ============================================================
function initI18n() {
    injectI18nStyles();
    addLangButton();
    applyLanguage();
    console.log('✅ تم تفعيل نظام الترجمة!');
}

// اجعل الدوال متاحة globally
window.t = t;
window.toggleLanguage = toggleLanguage;
window.applyLanguage = applyLanguage;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initI18n, 1400));
} else {
    setTimeout(initI18n, 1400);
}