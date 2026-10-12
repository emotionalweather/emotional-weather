// ============================================================
//  features.js - الميزات الإضافية
// ============================================================

console.log('✅ تم تحميل ملف الميزات!');

// ============================================================
//  🎭 الميزة 1: كل المشاعر الإنسانية
// ============================================================
const EXTRA_EMOTIONS = {
    love:        { name: 'حب',      color: '#FF1493', emoji: '❤️' },
    fear:        { name: 'خوف',     color: '#6A0DAD', emoji: '😨' },
    hope:        { name: 'أمل',     color: '#FFA500', emoji: '🌟' },
    frustration: { name: 'إحباط',   color: '#B22222', emoji: '😤' },
    surprise:    { name: 'دهشة',    color: '#FFB300', emoji: '😲' },
    bored:       { name: 'ملل',     color: '#696969', emoji: '😒' },
    proud:       { name: 'فخر',     color: '#9370DB', emoji: '😎' },
    shy:         { name: 'خجل',     color: '#FFB6C1', emoji: '😳' },
    excited:     { name: 'حماس',    color: '#FF4500', emoji: '🤩' },
    lonely:      { name: 'وحدة',    color: '#483D8B', emoji: '🥺' },
    relief:      { name: 'ارتياح',  color: '#00FA9A', emoji: '😮‍💨' },
    guilty:      { name: 'ذنب',     color: '#8B4513', emoji: '😔' },
    longing:     { name: 'شوق',     color: '#DA70D6', emoji: '🥹' },
    curious:     { name: 'فضول',    color: '#20B2AA', emoji: '🤔' },
    thoughtful:  { name: 'تأمل',    color: '#708090', emoji: '🤨' },
    confused:    { name: 'حيرة',    color: '#B8860B', emoji: '😕' },
    nostalgic:   { name: 'حنين',    color: '#CD853F', emoji: '😌' },
    inspired:    { name: 'إلهام',   color: '#FF69B4', emoji: '✨' },
    neutral:     { name: 'محايد',   color: '#94a3b8', emoji: '😐' },
    tired:       { name: 'متعب',    color: '#64748b', emoji: '😴' },
    sick:        { name: 'مريض',    color: '#7F1D1D', emoji: '🤒' },
    stressed:    { name: 'توتر',    color: '#DC2626', emoji: '😖' },
    peaceful:    { name: 'سلام',    color: '#0EA5E9', emoji: '🕊️' },
    overwhelmed: { name: 'إنهاك',   color: '#5B21B6', emoji: '😵' },
    determined:  { name: 'عزيمة',   color: '#059669', emoji: '💪' },
    playful:     { name: 'مرح',     color: '#F59E0B', emoji: '🤪' },
    disgusted:   { name: 'اشمئزاز', color: '#65A30D', emoji: '🤢' },
    awed:        { name: 'انبهار',  color: '#8B5CF6', emoji: '🤯' },
    sympathetic: { name: 'تعاطف',   color: '#EC4899', emoji: '🤗' }
};

// إضافة المشاعر الجديدة للنظام
Object.assign(EMOTIONS, EXTRA_EMOTIONS);
console.log(`🎭 إجمالي المشاعر: ${Object.keys(EMOTIONS).length}`);

// ============================================================
//  🔄 إعادة بناء شريط المشاعر (تمرير أفقي)
// ============================================================
function rebuildEmotionBar() {
    const container = document.getElementById('emotions');
    if (!container) return;

    container.innerHTML = '';
    // اجعله قابلاً للتمرير الأفقي
    container.style.cssText = `
        display: flex !important;
        overflow-x: auto;
        overflow-y: hidden;
        gap: 8px;
        padding: 10px 12px 16px;
        background: rgba(10, 15, 25, 0.95);
        backdrop-filter: blur(12px);
        border-top: 1px solid rgba(80, 110, 140, 0.15);
        z-index: 1000;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
    `;

    // إضافة شريط تمرير رقيق
    const style = document.createElement('style');
    style.textContent = `
        #emotions::-webkit-scrollbar { height: 4px; }
        #emotions::-webkit-scrollbar-track { background: transparent; }
        #emotions::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 4px; }
        .emo-btn { min-width: 72px !important; flex-shrink: 0 !important; }
    `;
    document.head.appendChild(style);

    Object.entries(EMOTIONS).forEach(([key, emo]) => {
        const btn = document.createElement('button');
        btn.className = 'emo-btn';
        btn.dataset.key = key;
        btn.style.borderColor = emo.color;
        btn.style.color = emo.color;
        btn.innerHTML = `<span class="emo-icon">${emo.emoji}</span><span>${emo.name}</span>`;
        btn.onclick = () => onEmotionButtonClick(key);
        container.appendChild(btn);
    });
}

// ============================================================
//  🔄 إعادة بناء نافذة الإرسال (مع كل المشاعر + تمرير)
// ============================================================
function rebuildSendModal() {
    const container = document.getElementById('modalEmotions');
    if (!container) return;

    container.innerHTML = '';
    container.style.cssText = `
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-bottom: 16px;
        max-height: 350px;
        overflow-y: auto;
        padding: 4px;
    `;

    Object.entries(EMOTIONS).forEach(([key, emo]) => {
        const btn = document.createElement('button');
        btn.className = 'modal-emo';
        btn.style.borderColor = emo.color;
        btn.style.color = emo.color;
        btn.innerHTML = `<span class="emo-icon">${emo.emoji}</span><span>${emo.name}</span>`;
        btn.onclick = () => sendEmotionToTarget(key);
        container.appendChild(btn);
    });
}

// ============================================================
//  🔍 الميزة 2: البحث المتقدم + عرض مشاعر المكان
// ============================================================

// عند اختيار نتيجة بحث، نعرض مشاعر المكان
function enhanceSearch() {
    const originalRenderSearchResults = window.renderSearchResults;
    if (!originalRenderSearchResults) return;

    window.renderSearchResults = function(items) {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';
        if (!items || items.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">لا توجد نتائج</div>';
            searchResults.classList.add('show');
            return;
        }
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.textContent = '📍 ' + item.display_name;
            div.onclick = () => {
                const lat = parseFloat(item.lat);
                const lng = parseFloat(item.lon);
                const shortName = item.name || item.display_name.split(',')[0];
                map.setView([lat, lng], 15, { animate: true });
                searchInput.value = '';
                searchResults.classList.remove('show');
                // نعرض مشاعر المكان بعد 1 ثانية
                setTimeout(() => scanAreaEmotions(lat, lng, shortName), 1000);
            };
            searchResults.appendChild(div);
        });
        searchResults.classList.add('show');
    };
}

// مسح مشاعر منطقة معينة
function scanAreaEmotions(lat, lng, name) {
    const emoKeys = Object.keys(EMOTIONS);
    const count = 8 + Math.floor(Math.random() * 6); // 8-14 مشعر

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            // نقطة عشوائية قريبة من المركز
            const offsetLat = (Math.random() - 0.5) * 0.05;
            const offsetLng = (Math.random() - 0.5) * 0.05;
            const key = emoKeys[Math.floor(Math.random() * emoKeys.length)];
            dropEmotion(lat + offsetLat, lng + offsetLng, key, name);
        }, i * 200);
    }

    // إشعار
    showToast(`🔍 جاري مسح مشاعر ${name}...`);
}

// ============================================================
//  📊 نافذة معلومات المكان (تظهر عند البحث)
// ============================================================
function showLocationInfo(lat, lng, name) {
    // إزالة النافذة القديمة إن وجدت
    const old = document.getElementById('location-info');
    if (old) old.remove();

    const panel = document.createElement('div');
    panel.id = 'location-info';
    panel.style.cssText = `
        position: fixed;
        top: 110px;
        right: 12px;
        background: rgba(20, 30, 45, 0.97);
        border: 1px solid rgba(56, 189, 248, 0.4);
        border-radius: 12px;
        padding: 12px 16px;
        color: #fff;
        font-size: 0.8rem;
        z-index: 1500;
        max-width: 220px;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    `;
    panel.innerHTML = `
        <div style="color:#38bdf8; font-weight:bold; margin-bottom:6px;">📍 ${name}</div>
        <div style="color:#94a3b8; font-size:0.7rem;">الإحداثيات: ${lat.toFixed(3)}, ${lng.toFixed(3)}</div>
        <div style="color:#6ee7b7; font-size:0.7rem; margin-top:6px;">🔍 يظهر المشاعر الحالية هنا</div>
    `;
    document.body.appendChild(panel);

    // يختفي بعد 15 ثانية
    setTimeout(() => panel.remove(), 15000);
}

// ============================================================
//  🚀 تشغيل
// ============================================================
function activateAllFeatures() {
    rebuildEmotionBar();
    rebuildSendModal();
    enhanceSearch();
    // نضيف showLocationInfo عند الضغط على أي مكان
    const originalOpenSendModal = window.openSendModal;
    window.openSendModal = function(lat, lng, name) {
        showLocationInfo(lat, lng, name);
        originalOpenSendModal(lat, lng, name);
    };
    console.log('🚀 تم تشغيل كل الميزات!');
}

// انتظر لين تحمّل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(activateAllFeatures, 500));
} else {
    setTimeout(activateAllFeatures, 500);
}