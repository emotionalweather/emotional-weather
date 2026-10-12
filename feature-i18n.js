// ============================================================
//  feature-i18n.js - 🌍 نظام الترجمة (عربي + إنجليزي)
// ============================================================

console.log('🌍 جاري تحميل نظام الترجمة...');

// ============================================================
//  📚 القواميس
// ============================================================
const TRANSLATIONS = {
    ar: {
        app_title: 'الطقس العاطفي',
        app_subtitle: 'نبض مشاعر البشرية في اللحظة هذه',
        search_placeholder: 'ابحث عن مدينة، حي، أو شارع...',
        privacy_title: 'الخصوصية',
        toast_locating: '⏳ جاري تحديد موقعك...',
        toast_found: '📍 تم تحديد موقعك',
        toast_cant_locate: '⚠️ تعذر تحديد موقعك، اختر مكاناً على الخريطة',
        toast_privacy_on: '🔒 وضع الخصوصية: يظهر الحي فقط',
        toast_privacy_off: '👁️ وضع دقيق: يظهر موقعك بالضبط',
        toast_browser_no_geo: '⚠️ المتصفح لا يدعم تحديد الموقع',
        toast_finding_place: '⏳ جاري تحديد المكان...',
        search_no_results: 'لا توجد نتائج',
        send_modal_title: 'أرسل مشعرك إلى',
        cancel: 'إلغاء'
    },
    en: {
        app_title: 'Emotional Weather',
        app_subtitle: 'Humanity\'s emotions pulse in this moment',
        search_placeholder: 'Search city, neighborhood, or street...',
        privacy_title: 'Privacy',
        toast_locating: '⏳ Locating you...',
        toast_found: '📍 Location found',
        toast_cant_locate: '⚠️ Couldn\'t locate you, choose a place on the map',
        toast_privacy_on: '🔒 Privacy mode: neighborhood only',
        toast_privacy_off: '👁️ Precise mode: your exact location',
        toast_browser_no_geo: '⚠️ Browser doesn\'t support geolocation',
        toast_finding_place: '⏳ Finding place...',
        search_no_results: 'No results',
        send_modal_title: 'Send your emotion to',
        cancel: 'Cancel'
    }
};

// ============================================================
//  🌐 الحالة
// ============================================================
let currentLang = localStorage.getItem('site_lang') || detectDefaultLang();

function detectDefaultLang() {
    const browserLang = (navigator.language || 'ar').toLowerCase();
    return browserLang.startsWith('ar') ? 'ar' : 'en';
}

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
            letter-spacing: 0.5px;
        }
        #lang-btn:hover { transform: scale(1.08); }

        /* الاتجاه الإنجليزي */
        body.lang-en { direction: ltr; }
        body.lang-en #header h1,
        body.lang-en #header p { direction: ltr; }

        /* نافذة البحث تتحرك لليسار في الإنجليزي */
        body.lang-en .search-box .search-icon {
            right: auto;
            left: 14px;
        }
        body.lang-en .search-box input {
            padding: 10px 15px 10px 40px;
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  🔘 زر اللغة
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
//  🔄 تبديل
// ============================================================
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('site_lang', currentLang);
    applyLanguage();

    // أبلغ باقي الميزات
    window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { lang: currentLang }
    }));

    console.log(`🌍 Language switched to: ${currentLang}`);
}

// ============================================================
//  ✅ تطبيق اللغة
// ============================================================
function applyLanguage() {
    const isAr = currentLang === 'ar';

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

    // زر الخصوصية
    const privacyBtn = document.getElementById('privacy-btn');
    if (privacyBtn) privacyBtn.title = t('privacy_title');

    // نافذة الإرسال
    const sendTitle = document.querySelector('#send-modal .modal-card h3');
    const cancelBtn = document.querySelector('#send-modal .cancel-btn');
    if (sendTitle) sendTitle.textContent = t('send_modal_title');
    if (cancelBtn) cancelBtn.textContent = t('cancel');
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
window.currentLang = currentLang;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initI18n, 1400));
} else {
    setTimeout(initI18n, 1400);
}