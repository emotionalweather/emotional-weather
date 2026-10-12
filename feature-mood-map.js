// ============================================================
//  feature-mood-map.js - 🎨 تلوين الخريطة حسب المزاج
//  - 7 مستويات من اللون الأحمر (سيء) للأخضر (مزدهر)
//  - شريط ألوان في الأسفل يشرح كل مستوى
// ============================================================

console.log('🎨 جاري تحميل خريطة المزاج...');

// ============================================================
//  🌍 ربط أكواد الدول
//  GeoJSON يستخدم ISO3 (SAU)، وأكوادنا ISO2 (SA)
// ============================================================
// نستخدم ISO3_TO_ISO2 من data-countries.js
const ISO3_TO_ISO2 = window.ISO3_TO_ISO2 || {
    'SAU': 'SA', 'ARE': 'AE', 'QAT': 'QA', 'KWT': 'KW', 'BHR': 'BH',
    'OMN': 'OM', 'YEM': 'YE', 'EGY': 'EG', 'SDN': 'SD', 'LBY': 'LY',
    'TUN': 'TN', 'DZA': 'DZ', 'MAR': 'MA', 'MRT': 'MR', 'JOR': 'JO',
    'LBN': 'LB', 'SYR': 'SY', 'IRQ': 'IQ', 'PSE': 'PS', 'DJI': 'DJ',
    'SOM': 'SO', 'COM': 'KM'
};

// ============================================================
//  🎨 مستويات المزاج (7 ألوان)
//  من الأحمر (سيء جداً) للأخضر (مزدهر جداً)
// ============================================================
const MOOD_LEVELS = [
    { min: 0,  max: 20,  color: '#8B0000', label: 'متأزم جداً', ar: 'متأزم جداً',  en: 'Severe Crisis' },
    { min: 20, max: 35,  color: '#FF2200', label: 'متأزم',      ar: 'متأزم',       en: 'Crisis' },
    { min: 35, max: 48,  color: '#FF8C00', label: 'متوتر',      ar: 'متوتر',       en: 'Tense' },
    { min: 48, max: 55,  color: '#FFD700', label: 'محايد',      ar: 'محايد',       en: 'Neutral' },
    { min: 55, max: 68,  color: '#9ACD32', label: 'هادئ',       ar: 'هادئ',        en: 'Calm' },
    { min: 68, max: 82,  color: '#32CD32', label: 'إيجابي',     ar: 'إيجابي',      en: 'Positive' },
    { min: 82, max: 101, color: '#00AA00', label: 'مزدهر',      ar: 'مزدهر',       en: 'Thriving' }
];

// ============================================================
//  📊 تصنيفات مؤثرة
// ============================================================
const GOOD_CATS = ['sports', 'culture', 'positive', 'economy'];
const BAD_CATS = ['war', 'disaster', 'crisis', 'health'];

// ============================================================
//  🎯 حساب درجة المزاج (0-100)
// ============================================================
function computeMoodScore(countryCode) {
    const moods = (window.__realCountryMoods || {})[countryCode];
    if (!moods) return null;

    const total = Object.values(moods).reduce((a, b) => a + b, 0);
    if (total === 0) return null;

    let score = 50;
    Object.entries(moods).forEach(([cat, count]) => {
        const ratio = count / total;
        if (GOOD_CATS.includes(cat)) score += ratio * 35;
        if (BAD_CATS.includes(cat)) score -= ratio * 35;
    });

    return Math.max(0, Math.min(100, score));
}

function getMoodColor(score) {
    for (const lvl of MOOD_LEVELS) {
        if (score >= lvl.min && score < lvl.max) return lvl.color;
    }
    return MOOD_LEVELS[MOOD_LEVELS.length - 1].color;
}

function getMoodLabel(score, lang) {
    lang = lang || 'ar';
    for (const lvl of MOOD_LEVELS) {
        if (score >= lvl.min && score < lvl.max) {
            return lang === 'ar' ? lvl.ar : lvl.en;
        }
    }
    return '';
}

// ============================================================
//  🗺️ طبقة تلوين الدول
// ============================================================
let moodLayer = null;

async function loadMoodMap() {
    try {
        if (typeof map === 'undefined') {
            console.warn('⚠️ الخريطة ما تحملت بعد');
            return;
        }

        // إنشاء pane خاص للتلوين (فوق الخريطة، تحت النقاط)
        if (!map.getPane('moodPane')) {
            map.createPane('moodPane');
            map.getPane('moodPane').style.zIndex = 350;
        }

        const res = await fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
        if (!res.ok) throw new Error('GeoJSON fetch failed');
        const data = await res.json();

        moodLayer = L.geoJSON(data, {
            pane: 'moodPane',
            style: feature => {
                const iso2 = ISO3_TO_ISO2[feature.id];
                if (!iso2) return { fillOpacity: 0, weight: 0, opacity: 0 };

                const score = computeMoodScore(iso2);
                if (score === null) {
                    return {
                        fillColor: '#1e293b',
                        fillOpacity: 0.15,
                        color: '#475569',
                        weight: 0.5,
                        opacity: 0.3
                    };
                }

                const color = getMoodColor(score);
                return {
                    fillColor: color,
                    fillOpacity: 0.45,
                    color: color,
                    weight: 1.5,
                    opacity: 0.85
                };
            },
            onEachFeature: (feature, layer) => {
                const iso2 = ISO3_TO_ISO2[feature.id];
                if (!iso2) {
                    layer.options.interactive = false;
                    return;
                }

                const countryName = feature.properties.name || '';
                layer.bindTooltip(countryName, { sticky: true });

                // إضافة تلميح عند التحويم
                layer.on('mouseover', () => {
                    const score = computeMoodScore(iso2);
                    if (score !== null) {
                        const label = getMoodLabel(score, 'ar');
                        layer.setTooltipContent(
                            `<strong>${countryName}</strong><br>المزاج: ${label} (${score.toFixed(0)}%)`
                        );
                    }
                });
            }
        }).addTo(map);

        console.log('✅ تم تحميل خريطة المزاج');
    } catch (err) {
        console.warn('⚠️ فشل تحميل خريطة المزاج:', err.message);
    }
}

// ============================================================
//  🔄 تحديث التلوين
// ============================================================
function refreshMoodMap() {
    if (!moodLayer) return;

    moodLayer.setStyle(feature => {
        const iso2 = ISO3_TO_ISO2[feature.id];
        if (!iso2) return { fillOpacity: 0, weight: 0, opacity: 0 };

        const score = computeMoodScore(iso2);
        if (score === null) {
            return {
                fillColor: '#1e293b',
                fillOpacity: 0.15,
                color: '#475569',
                weight: 0.5,
                opacity: 0.3
            };
        }

        const color = getMoodColor(score);
        return {
            fillColor: color,
            fillOpacity: 0.45,
            color: color,
            weight: 1.5,
            opacity: 0.85
        };
    });
}

// ============================================================
//  📊 شريط الألوان في الأسفل
// ============================================================
function addLegendBar() {
    if (document.getElementById('mood-legend')) return;

    const legend = document.createElement('div');
    legend.id = 'mood-legend';
    legend.innerHTML = `
        <span class="legend-title">🎨 مزاج الدول العربية</span>
        <div class="legend-items-wrap">
            ${MOOD_LEVELS.map(l => `
                <div class="legend-item">
                    <span class="legend-color" style="background:${l.color};"></span>
                    <span class="legend-label" data-ar="${l.ar}" data-en="${l.en}">${l.ar}</span>
                </div>
            `).join('')}
        </div>
    `;
    document.body.appendChild(legend);
}

// ============================================================
//  🎨 CSS
// ============================================================
function injectMoodMapStyles() {
    if (document.getElementById('mood-map-styles')) return;
    const style = document.createElement('style');
    style.id = 'mood-map-styles';
    style.textContent = `
        #mood-legend {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 380px;
            height: 55px;
            background: rgba(10, 18, 30, 0.98);
            border-top: 1px solid rgba(56, 189, 248, 0.3);
            z-index: 850;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            backdrop-filter: blur(15px);
            font-family: inherit;
            gap: 10px;
        }

        body.lang-en #mood-legend {
            right: 0;
            left: 380px;
        }

        .legend-title {
            color: #38bdf8;
            font-size: 0.8rem;
            font-weight: 700;
            white-space: nowrap;
            flex-shrink: 0;
        }

        .legend-items-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
            justify-content: flex-end;
            overflow-x: auto;
            padding: 4px 0;
            scrollbar-width: none;
        }
        .legend-items-wrap::-webkit-scrollbar { display: none; }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.72rem;
            color: #cbd5e1;
            white-space: nowrap;
            flex-shrink: 0;
        }

        .legend-color {
            width: 16px;
            height: 16px;
            border-radius: 4px;
            box-shadow: 0 0 8px rgba(255,255,255,0.15), inset 0 0 4px rgba(0,0,0,0.3);
            flex-shrink: 0;
            border: 1px solid rgba(255,255,255,0.15);
        }

        .legend-label {
            font-weight: 600;
        }

        @media (max-width: 768px) {
            #mood-legend {
                right: 0;
                left: 0;
                bottom: 0;
                height: auto;
                min-height: 52px;
                padding: 6px 10px;
                flex-direction: column;
                gap: 4px;
            }

            .legend-title {
                font-size: 0.7rem;
            }

            .legend-items-wrap {
                width: 100%;
                justify-content: center;
                gap: 8px;
            }

            .legend-item { font-size: 0.6rem; gap: 3px; }
            .legend-color { width: 12px; height: 12px; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  🔄 تحديث التسميات عند تغيير اللغة
// ============================================================
function updateLegendLanguage() {
    const lang = document.body.classList.contains('lang-en') ? 'en' : 'ar';
    document.querySelectorAll('.legend-label').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) el.textContent = text;
    });
}

window.addEventListener('languageChanged', () => {
    setTimeout(updateLegendLanguage, 100);
});

// ============================================================
//  🚀 التشغيل
// ============================================================
function initMoodMap() {
    injectMoodMapStyles();
    addLegendBar();
    loadMoodMap();

    // تحديث التلوين كل 6 ثواني (بعد ما يبدأ يجيب أخبار)
    setInterval(refreshMoodMap, 6000);

    console.log('✅ تم تفعيل خريطة المزاج!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initMoodMap, 1800));
} else {
    setTimeout(initMoodMap, 1800);
}