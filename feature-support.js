// ============================================================
//  feature-support.js - ☕ زر الدعم (عربي + إنجليزي)
//  محفظة BNB Chain على MetaMask
// ============================================================

console.log('☕ جاري تحميل زر الدعم...');

// ============================================================
//  ⚙️ إعدادات المحفظة
// ============================================================
const SUPPORT_CONFIG = {
    walletNumber: '0xC3fe99402A56Cf9d50B8A12d1F30548B7d58938d',
    walletName: {
        ar: 'MetaMask (شبكة BNB Chain)',
        en: 'MetaMask (BNB Chain)'
    },
    message: {
        ar: 'ساهم في استمرار الموقع وتطويره 🤍',
        en: 'Contribute to keeping this site running and improving 🤍'
    },
    note: {
        ar: 'أي مبلغ، حتى لو صغير، يساعدنا نستمر',
        en: 'Any amount, however small, helps us continue'
    },
    title: {
        ar: 'ادعم الموقع',
        en: 'Support the Site'
    },
    walletLabel: {
        ar: 'محفظة الدعم',
        en: 'Support Wallet'
    },
    closeBtn: {
        ar: 'إغلاق',
        en: 'Close'
    },
    copiedMsg: {
        ar: '✓ تم النسخ',
        en: '✓ Copied'
    },
    copyHint: {
        ar: 'اضغط على العنوان لنسخه',
        en: 'Click address to copy'
    }
};

// ============================================================
//  🌐 الترجمة
// ============================================================
function getLangSup() {
    return document.body.classList.contains('lang-en') ? 'en' : 'ar';
}

function getText(key) {
    const lang = getLangSup();
    const val = SUPPORT_CONFIG[key];
    if (typeof val === 'object' && val !== null) {
        return val[lang] || val.ar;
    }
    return val;
}

// ============================================================
//  🎨 CSS
// ============================================================
function injectSupportStyles() {
    if (document.getElementById('support-styles')) return;
    const style = document.createElement('style');
    style.id = 'support-styles';
    style.textContent = `
        #support-btn {
            width: 42px; height: 42px;
            border-radius: 50%;
            background: rgba(15, 25, 40, 0.92);
            border: 1px solid rgba(255, 200, 0, 0.6);
            color: #FFD700;
            font-size: 1.2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            flex-shrink: 0;
            animation: supportGlow 3s infinite;
        }
        @keyframes supportGlow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255, 200, 0, 0.4); }
            50%      { box-shadow: 0 0 0 10px rgba(255, 200, 0, 0); }
        }

        #support-modal {
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse at center, rgba(30, 20, 5, 0.97), rgba(0,0,0,0.99));
            z-index: 6500;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            backdrop-filter: blur(8px);
        }
        #support-modal.show { display: flex; }

        .support-card {
            background: linear-gradient(160deg, rgba(40, 30, 10, 0.98), rgba(15, 10, 5, 0.98));
            border: 1px solid rgba(255, 200, 0, 0.4);
            border-radius: 24px;
            padding: 32px 26px;
            max-width: 440px;
            width: 100%;
            text-align: center;
            color: #fff;
            box-shadow: 0 0 80px rgba(255, 200, 0, 0.2);
            animation: supportIn 0.5s ease;
        }
        @keyframes supportIn {
            from { opacity: 0; transform: scale(0.9); }
            to   { opacity: 1; transform: scale(1); }
        }

        .support-emoji {
            font-size: 4rem;
            margin-bottom: 12px;
            animation: heartBeat 1.5s infinite;
        }
        @keyframes heartBeat {
            0%, 100% { transform: scale(1); }
            20%      { transform: scale(1.15); }
            40%      { transform: scale(1); }
        }

        .support-title {
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(90deg, #FFD700, #FF8C00);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
        }
        .support-msg {
            color: #cbd5e1;
            font-size: 0.9rem;
            line-height: 1.7;
            margin-bottom: 20px;
        }

        .support-wallet {
            background: rgba(255, 215, 0, 0.08);
            border: 1px solid rgba(255, 215, 0, 0.3);
            border-radius: 14px;
            padding: 16px;
            margin-bottom: 18px;
            direction: ltr;
            text-align: left;
        }
        .support-wallet-label {
            color: #94a3b8;
            font-size: 0.7rem;
            margin-bottom: 6px;
            letter-spacing: 1px;
            text-transform: uppercase;
            direction: inherit;
            text-align: inherit;
        }
        .support-wallet-name {
            color: #FFD700;
            font-size: 0.85rem;
            font-weight: 700;
            margin-bottom: 10px;
            direction: inherit;
            text-align: inherit;
        }
        .support-wallet-number {
            color: #fff;
            font-size: 0.75rem;
            font-family: 'Courier New', monospace;
            word-break: break-all;
            background: rgba(0,0,0,0.4);
            padding: 10px 12px;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s;
            position: relative;
            direction: ltr;
            text-align: left;
        }
        .support-wallet-number:hover { background: rgba(0,0,0,0.6); }
        .support-wallet-number.copied::after {
            content: attr(data-copied);
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            color: #00ff96;
            font-size: 0.7rem;
            font-weight: 700;
            background: rgba(0,0,0,0.7);
            padding: 3px 8px;
            border-radius: 6px;
        }

        .support-copy-hint {
            color: #64748b;
            font-size: 0.68rem;
            margin-top: 8px;
            direction: inherit;
            text-align: inherit;
        }

        .support-note {
            color: #64748b;
            font-size: 0.75rem;
            font-style: italic;
            margin-bottom: 20px;
        }

        .support-close {
            padding: 12px 32px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #fff;
            border-radius: 12px;
            cursor: pointer;
            font-family: inherit;
            font-size: 0.9rem;
        }
        .support-close:hover { background: rgba(255, 255, 255, 0.15); }
    `;
    document.head.appendChild(style);
}

// ============================================================
//  🔘 الزر
// ============================================================
function addSupportButton() {
    if (document.getElementById('support-btn')) return;
    const topBar = document.getElementById('top-bar');
    if (!topBar) return;

    const btn = document.createElement('button');
    btn.id = 'support-btn';
    btn.title = getText('title');
    btn.textContent = '☕';
    btn.onclick = openSupport;
    topBar.appendChild(btn);
}

// ============================================================
//  🪟 فتح النافذة
// ============================================================
function openSupport() {
    let modal = document.getElementById('support-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'support-modal';
        document.body.appendChild(modal);
        modal.addEventListener('click', e => {
            if (e.target === modal) closeSupport();
        });
    }
    renderSupportContent();
    modal.classList.add('show');
}

function renderSupportContent() {
    const modal = document.getElementById('support-modal');
    if (!modal) return;

    const lang = getLangSup();
    const isAr = lang === 'ar';

    modal.innerHTML = `
        <div class="support-card" style="direction: ${isAr ? 'rtl' : 'ltr'};">
            <div class="support-emoji">🤍</div>
            <div class="support-title">${getText('title')}</div>
            <div class="support-msg">${getText('message')}</div>

            <div class="support-wallet">
                <div class="support-wallet-label">${getText('walletLabel')}</div>
                <div class="support-wallet-name">${getText('walletName')}</div>
                <div class="support-wallet-number" id="walletNum" data-copied="${getText('copiedMsg')}">${SUPPORT_CONFIG.walletNumber}</div>
                <div class="support-copy-hint">${getText('copyHint')}</div>
            </div>

            <div class="support-note">${getText('note')}</div>

            <button class="support-close" onclick="closeSupport()">${getText('closeBtn')}</button>
        </div>
    `;

    document.getElementById('walletNum').onclick = copyWallet;
}

// ============================================================
//  📋 نسخ
// ============================================================
function copyWallet() {
    const el = document.getElementById('walletNum');
    if (!el) return;
    const wallet = SUPPORT_CONFIG.walletNumber;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(wallet).then(() => {
            showCopiedState(el);
        }).catch(() => {
            fallbackCopy(wallet, el);
        });
    } else {
        fallbackCopy(wallet, el);
    }
}

function fallbackCopy(text, el) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        showCopiedState(el);
    } catch (e) {
        console.warn('copy failed', e);
    }
    document.body.removeChild(ta);
}

function showCopiedState(el) {
    el.classList.add('copied');
    setTimeout(() => el.classList.remove('copied'), 2000);
}

// ============================================================
//  ❌ إغلاق
// ============================================================
function closeSupport() {
    const modal = document.getElementById('support-modal');
    if (modal) modal.classList.remove('show');
}

// ============================================================
//  🔄 تحديث عند تغيير اللغة
// ============================================================
window.addEventListener('languageChanged', () => {
    const btn = document.getElementById('support-btn');
    if (btn) btn.title = getText('title');

    const modal = document.getElementById('support-modal');
    if (modal && modal.classList.contains('show')) {
        renderSupportContent();
    }
});

// ============================================================
//  🚀 التشغيل
// ============================================================
window.closeSupport = closeSupport;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            injectSupportStyles();
            addSupportButton();
            console.log('✅ تم تفعيل زر الدعم!');
        }, 1200);
    });
} else {
    setTimeout(() => {
        injectSupportStyles();
        addSupportButton();
    }, 1200);
}