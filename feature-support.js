// ============================================================
//  feature-support.js - ☕ زر الدعم
// ============================================================

console.log('☕ جاري تحميل زر الدعم...');

// ============================================================
//  ⚙️ عدل هذي المعلومات بمعلوماتك
// ============================================================
const SUPPORT_CONFIG = {
    walletName: 'BNB Chain (BSC) - MetaMask',
    walletNumber: '0xC3fe99402A56Cf9d50B8A12d1F30548B7d58938d',
    message: 'ساهم في استمرار الموقع وتطويره 🤍',
    note: 'أي مبلغ، حتى لو صغير، يساعدنا نستمر'
};

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
            text-align: left;
            direction: ltr;
        }
        .support-wallet-label {
            color: #94a3b8;
            font-size: 0.7rem;
            margin-bottom: 6px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .support-wallet-name {
            color: #FFD700;
            font-size: 0.85rem;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .support-wallet-number {
            color: #fff;
            font-size: 0.78rem;
            font-family: 'Courier New', monospace;
            word-break: break-all;
            background: rgba(0,0,0,0.4);
            padding: 10px 12px;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s;
            position: relative;
        }
        .support-wallet-number:hover { background: rgba(0,0,0,0.6); }
        .support-wallet-number.copied::after {
            content: '✓ تم النسخ';
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            color: #00ff96;
            font-size: 0.7rem;
            font-weight: 700;
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
//  🔘 إضافة الزر
// ============================================================
function addSupportButton() {
    if (document.getElementById('support-btn')) return;
    const topBar = document.getElementById('top-bar');
    if (!topBar) return;

    const btn = document.createElement('button');
    btn.id = 'support-btn';
    btn.title = 'ادعمني';
    btn.textContent = '☕';
    btn.onclick = openSupport;
    topBar.appendChild(btn);
}

// ============================================================
//  🪟 فتح وإغلاق
// ============================================================
function openSupport() {
    let modal = document.getElementById('support-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'support-modal';
        modal.innerHTML = `
            <div class="support-card">
                <div class="support-emoji">🤍</div>
                <div class="support-title">ادعم الموقع</div>
                <div class="support-msg">${SUPPORT_CONFIG.message}</div>
                <div class="support-wallet">
                    <div class="support-wallet-label">محفظة الدعم</div>
                    <div class="support-wallet-name">${SUPPORT_CONFIG.walletName}</div>
                    <div class="support-wallet-number" id="walletNum">${SUPPORT_CONFIG.walletNumber}</div>
                </div>
                <div class="support-note">${SUPPORT_CONFIG.note}</div>
                <button class="support-close" onclick="closeSupport()">إغلاق</button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', e => {
            if (e.target === modal) closeSupport();
        });
        document.getElementById('walletNum').onclick = copyWallet;
    }
    modal.classList.add('show');
}

function closeSupport() {
    const modal = document.getElementById('support-modal');
    if (modal) modal.classList.remove('show');
}

function copyWallet() {
    const el = document.getElementById('walletNum');
    navigator.clipboard.writeText(SUPPORT_CONFIG.walletNumber).then(() => {
        el.classList.add('copied');
        setTimeout(() => el.classList.remove('copied'), 2000);
    });
}

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