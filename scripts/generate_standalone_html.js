import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read assets as base64
const heroPath = path.join(rootDir, 'src/assets/images/hero_banner_1784250790825.jpg');
const logoPath = path.join(rootDir, 'src/assets/images/imei_logo_1779678454395.png');

const heroB64 = fs.existsSync(heroPath) ? `data:image/jpeg;base64,${fs.readFileSync(heroPath).toString('base64')}` : '';
const logoB64 = fs.existsSync(logoPath) ? `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}` : '';

const htmlContent = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>數位好鄰居 X 高齡數位互動體驗 - KIOSK 點餐機</title>
  <style>
    /* CSS Reset & Base */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    
    html, body {
      width: 100%;
      height: 100%;
      height: 100dvh;
      overflow: hidden;
      background-color: #FFF8E7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang TC", "Heiti TC", "Microsoft JhengHei", sans-serif;
      color: #1f2937;
    }

    button {
      font-family: inherit;
      cursor: pointer;
      border: none;
      outline: none;
      transition: transform 0.1s ease, background-color 0.15s ease, opacity 0.15s ease;
    }
    button:active {
      transform: scale(0.96);
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }

    /* Kiosk Container */
    #app {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .kiosk-frame {
      width: 100%;
      height: 100%;
      max-width: 1920px;
      max-height: 1080px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    @media (min-width: 640px) {
      .kiosk-frame {
        border-radius: 1.5rem;
        border: 12px solid #2E7D32;
      }
    }
    @media (min-width: 1280px) {
      .kiosk-frame {
        border-width: 20px;
      }
    }

    .step-view {
      display: none;
      flex: 1;
      width: 100%;
      height: 100%;
      min-height: 0;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }
    .step-view.active {
      display: flex;
    }

    /* Common Header */
    .kiosk-header {
      background-color: #2E7D32;
      color: #ffffff;
      padding: 1.5rem 1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }
    .kiosk-header h1 {
      font-size: 2rem;
      font-weight: 900;
      letter-spacing: 0.05em;
    }
    .progress-bar {
      width: 100%;
      max-width: 600px;
      height: 8px;
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 9999px;
      overflow: hidden;
      margin-top: 0.5rem;
    }
    .progress-fill {
      height: 100%;
      background-color: #ffffff;
      border-radius: 9999px;
      transition: width 0.3s ease;
    }

    /* Step 1: Welcome */
    .welcome-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 1.5rem 1.25rem;
      justify-content: space-between;
      align-items: center;
      max-width: 960px;
      margin: 0 auto;
      width: 100%;
      position: relative;
      z-index: 10;
    }

    .welcome-hero {
      height: 28%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .welcome-hero img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 1.5rem;
      mix-blend-mode: multiply;
      filter: drop-shadow(0 15px 15px rgba(0,0,0,0.1));
      pointer-events: none;
      -webkit-user-drag: none;
    }

    .welcome-title-badge {
      height: 11%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .badge-inner {
      background-color: #2E7D32;
      color: #ffffff;
      padding: 0.85rem 1.5rem;
      border-radius: 2rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
      border: 4px solid rgba(255, 255, 255, 0.6);
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      white-space: nowrap;
      font-weight: 900;
      font-size: clamp(1.3rem, 5vw, 2.7rem);
      letter-spacing: 0.05em;
    }
    .badge-x {
      color: #FACC15;
      margin: 0 0.5rem;
      font-size: 1.2em;
    }

    .welcome-guide-card {
      height: 42%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0.25rem 0;
    }
    .guide-inner {
      background-color: rgba(255, 255, 255, 0.96);
      border: 4px solid rgba(46, 125, 50, 0.35);
      border-radius: 2rem;
      padding: 1.5rem 1.25rem;
      text-align: center;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08);
    }
    .guide-title {
      font-size: clamp(1.3rem, 3.5vw, 2rem);
      font-weight: 900;
      color: #1B5E20;
      margin-bottom: 0.25rem;
    }
    .guide-subtitle {
      font-size: clamp(0.95rem, 2.5vw, 1.25rem);
      font-weight: 700;
      color: #4b5563;
    }
    .guide-steps-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
      margin: auto 0;
    }
    .guide-step-item {
      background-color: #E8F5E9;
      border: 2px solid rgba(46, 125, 50, 0.35);
      border-radius: 1.25rem;
      padding: 0.85rem 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.04);
    }
    .guide-step-icon {
      font-size: clamp(1.8rem, 5vw, 2.8rem);
      margin-bottom: 0.25rem;
      line-height: 1;
    }
    .guide-step-name {
      font-size: clamp(0.95rem, 2.5vw, 1.35rem);
      font-weight: 900;
      color: #1B5E20;
      white-space: nowrap;
    }
    .guide-step-desc {
      font-size: clamp(0.75rem, 1.8vw, 0.95rem);
      font-weight: 700;
      color: #4b5563;
      margin-top: 0.2rem;
      white-space: nowrap;
    }
    .guide-hint-badge {
      background-color: #fffbeb;
      border: 2px solid #fde68a;
      color: #92400e;
      border-radius: 1rem;
      padding: 0.5rem 0.75rem;
      font-size: clamp(0.85rem, 2vw, 1.15rem);
      font-weight: 800;
    }

    .welcome-btn-start {
      height: 14%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-green-main {
      width: 100%;
      height: 100%;
      max-height: 96px;
      background-color: #2E7D32;
      color: #ffffff;
      font-size: clamp(1.6rem, 4.5vw, 2.6rem);
      font-weight: 900;
      border-radius: 1.75rem;
      box-shadow: 0 12px 24px -4px rgba(27, 94, 32, 0.4);
      letter-spacing: 0.1em;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pulseBtn 2.2s infinite;
    }
    @keyframes pulseBtn {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }

    /* Step Content Panels */
    .step-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      overflow-y: auto;
      align-items: center;
      justify-content: center;
      min-height: 0;
    }
    .step-footer {
      padding: 1.25rem 1.5rem;
      background-color: #f9fafb;
      display: flex;
      gap: 1rem;
      border-top: 2px solid #e5e7eb;
      flex-shrink: 0;
    }

    /* Option button styles */
    .option-btn {
      width: 100%;
      background: #ffffff;
      border: 4px solid #d1d5db;
      border-radius: 1.25rem;
      padding: 1.25rem 1.5rem;
      font-size: clamp(1.2rem, 3.2vw, 1.8rem);
      font-weight: 900;
      color: #374151;
      text-align: left;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      transition: all 0.15s ease;
    }
    .option-btn.selected {
      border-color: #2E7D32;
      background-color: #E8F5E9;
      color: #2E7D32;
    }

    /* Keypad Buttons */
    .key-btn {
      background: #ffffff;
      border: 3px solid #d1d5db;
      border-radius: 1rem;
      font-weight: 900;
      color: #1f2937;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.06);
      transition: all 0.12s ease;
    }
    .key-btn:active {
      background-color: #E8F5E9;
      border-color: #2E7D32;
    }
    .key-btn-clear {
      background-color: #fef2f2;
      border-color: #fecaca;
      color: #dc2626;
    }
    .key-btn-back {
      background-color: #f3f4f6;
      border-color: #d1d5db;
      color: #374151;
    }

    /* Phone Responsive Layout */
    .phone-layout {
      width: 100%;
      max-width: 960px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
    }
    @media (orientation: landscape) and (min-width: 768px) {
      .phone-layout {
        flex-direction: row;
        gap: 2.5rem;
      }
    }

    /* Consent Check Button */
    .consent-check-btn {
      width: 100%;
      padding: 1rem 1.25rem;
      border-radius: 1rem;
      border: 4px solid #d1d5db;
      background: #ffffff;
      display: flex;
      align-items: center;
      gap: 1rem;
      text-align: left;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }
    .consent-check-btn.checked {
      border-color: #2E7D32;
      background-color: #E8F5E9;
      color: #1B5E20;
    }
    .consent-checkbox-box {
      width: 40px;
      height: 40px;
      border-radius: 0.65rem;
      border: 4px solid #9ca3af;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .consent-check-btn.checked .consent-checkbox-box {
      border-color: #2E7D32;
      background-color: #2E7D32;
      color: #ffffff;
    }

    /* Age Choice Grid */
    .age-grid {
      width: 100%;
      max-width: 760px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    @media (min-width: 640px) {
      .age-grid {
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
      }
    }
    .age-btn {
      min-height: 130px;
      padding: 1.5rem;
      border-radius: 1.5rem;
      border: 4px solid #d1d5db;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: #1f2937;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    .age-btn.selected {
      border-color: #2E7D32;
      background-color: #E8F5E9;
      color: #1B5E20;
    }

    /* Toast */
    .toast {
      position: absolute;
      top: 5.5rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: #2E7D32;
      color: #ffffff;
      padding: 0.85rem 2rem;
      border-radius: 9999px;
      font-size: 1.35rem;
      font-weight: 800;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
      z-index: 50;
      display: none;
    }

    /* On-Screen Receipt Card Preview */
    .receipt-box {
      width: 100%;
      max-width: 420px;
      background: #ffffff;
      padding: 2rem;
      border-radius: 0.75rem;
      box-shadow: 0 15px 30px rgba(0,0,0,0.15);
      border-top: 8px solid #2E7D32;
      text-align: center;
      position: relative;
    }

    /* Dedicated Print Area: Hidden on Screen */
    #print-area {
      display: none;
    }

    /* ================================================= */
    /* THERMAL RECEIPT PRINTING STYLES (EPSON TM-T70II) */
    /* ================================================= */
    @media print {
      @page {
        size: 80mm auto;
        margin: 0;
      }
      
      html, body {
        width: 80mm !important;
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
        overflow: visible !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      /* Completely hide the interactive app and overlays */
      #app, .toast, .no-print {
        display: none !important;
        visibility: hidden !important;
      }

      /* The print area is the ONLY thing in the document */
      #print-area {
        display: block !important;
        visibility: visible !important;
        position: static !important;
        width: 80mm !important;
        max-width: 80mm !important;
        margin: 0 !important;
        padding: 3mm 5mm !important;
        box-sizing: border-box !important;
        background: #ffffff !important;
        color: #000000 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
      }

      #print-area * {
        visibility: visible !important;
        color: #000000 !important;
        box-sizing: border-box !important;
      }
    }
  </style>
</head>
<body>
  <!-- ================= INTERACTIVE KIOSK APP ================= -->
  <div id="app">
    <div class="kiosk-frame">
      
      <!-- ================= STEP 1: WELCOME & START ================= -->
      <div id="step-1" class="step-view active">
        <!-- Secret Click Count Toast -->
        <div id="admin-click-hint" class="toast" style="background-color: #1f2937; color: #facc15; top: 1.5rem;"></div>

        <div class="welcome-container">
          <!-- ① Hero Mascot (Tap 5 times for Admin) -->
          <div class="welcome-hero" onclick="handleAdminTrigger()" title="連續點選5次進入管理員模式">
            <img src="${heroB64}" alt="數位好鄰居 Mascot" draggable="false">
          </div>

          <!-- ② Title Badge (Also supports 5 clicks for Admin) -->
          <div class="welcome-title-badge" onclick="handleAdminTrigger()" title="連續點選5次進入管理員模式">
            <div class="badge-inner">
              <span>數位好鄰居</span>
              <span class="badge-x">X</span>
              <span>高齡數位互動體驗</span>
            </div>
          </div>

          <!-- ③ 3-Step Friendly Guide Card -->
          <div class="welcome-guide-card">
            <div class="guide-inner">
              <div>
                <h2 class="guide-title">歡迎體驗高齡數位好生活！</h2>
                <p class="guide-subtitle">樂齡數位共創推動計畫，完成體驗輕鬆領取活動好禮</p>
              </div>

              <div class="guide-steps-grid">
                <div class="guide-step-item">
                  <div class="guide-step-icon">📝</div>
                  <div class="guide-step-name">1. 資格確認</div>
                  <div class="guide-step-desc">個資同意與登記</div>
                </div>
                <div class="guide-step-item">
                  <div class="guide-step-icon">🎁</div>
                  <div class="guide-step-name">2. 點餐與問卷</div>
                  <div class="guide-step-desc">趣味互動體驗</div>
                </div>
                <div class="guide-step-item">
                  <div class="guide-step-icon">🧾</div>
                  <div class="guide-step-name">3. 領取收據</div>
                  <div class="guide-step-desc">自動出單兌換</div>
                </div>
              </div>

              <div class="guide-hint-badge">
                ✨ 點擊下方綠色按鈕即可直接開始體驗 ✨
              </div>
            </div>
          </div>

          <!-- ④ Big Start Action Button -->
          <div class="welcome-btn-start">
            <button class="btn-green-main" onclick="goToStep(2)">
              👉 點此開始體驗 👈
            </button>
          </div>
        </div>
      </div>

      <!-- ================= STEP 2 (LAYER 1): PRIVACY CONSENT ================= -->
      <div id="step-2" class="step-view">
        <div class="kiosk-header">
          <h1>個人資料提供同意書</h1>
          <div class="progress-bar"><div class="progress-fill" style="width: 9%;"></div></div>
        </div>

        <div class="step-main" style="background-color: #f9fafb; justify-content: flex-start; gap: 1rem; padding: 1.25rem; overflow: hidden;">
          <div style="flex: 1; min-height: 0; width: 100%; max-width: 920px; background: #ffffff; border: 4px solid rgba(46,125,50,0.3); border-radius: 1.25rem; padding: 1.5rem; overflow-y: auto; user-select: text;">
            <div style="text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.85rem; margin-bottom: 1rem;">
              <p style="font-size: 1.15rem; font-weight: 800; color: #2E7D32;">數位發展部 數位產業署</p>
              <h2 style="font-size: 1.55rem; font-weight: 900; color: #111827; margin-top: 0.25rem;">蒐集個人資料告知事項暨個人資料提供同意書</h2>
            </div>

            <div style="font-size: 1.15rem; line-height: 1.75; color: #1f2937; font-weight: 500; display: flex; flex-direction: column; gap: 0.75rem;">
              <p>
                數位發展部 數位產業署委託計畫執行單位-台北市電腦商業同業公會辦理「樂齡數位共創推動計畫－樂齡數位好夥伴推動計畫」(以下簡稱本計畫)，因應個人資料保護法及相關個人資料保護規定，在向您蒐集個人資料之前，依法向您告知下列事項，表示您已閱讀、瞭解並同意接受本同意書之所有內容：
              </p>
              <p><strong style="color: #1B5E20;">一、蒐集目的及類別：</strong>為辦理本計畫數位體驗活動，確認參與者身分、避免重複參與體驗及領取體驗完成禮，爰蒐集您的手機號碼及年齡資料，僅供本次活動參與紀錄及禮品領取資格核對使用。</p>
              <p><strong style="color: #1B5E20;">二、個人資料利用之期間、地區、對象及方式：</strong><br>您的個人資料，除涉及國際業務或活動外，將提供本機關(構)於中華民國領域，於上述蒐集目的之必要合理範圍內加以利用至前述蒐集目的消失為止。</p>
              <p><strong style="color: #1B5E20;">三、當事人權利行使：</strong><br>依據個人資料保護法第3條，您可向計畫執行單位請求查詢或閱覽、製給複製本、補充或更正、停止蒐集/處理/利用或刪除您的個人資料。</p>
              <p><strong style="color: #1B5E20;">四、不提供個人資料之權益影響：</strong><br>如您不提供或未提供正確之個人資料，或要求停止蒐集/處理/利用/刪除個人資料、服務訊息的取消訂閱，本機關(構)將無法為您提供蒐集目的之相關服務。</p>
              <p><strong style="color: #1B5E20;">五、</strong>各項通知服務、相關訊息之停止寄送，可透過訊息內容提供之取消訂閱連結通知。您可於上班時間聯繫計畫執行單位活動承辦人 張家蓁（02-2570-2300 # 9201）。就違反本個資聲明事項之行為，請與活動承辦人反映。</p>
              <div style="background-color: #f0fdf4; border: 2px solid rgba(46,125,50,0.3); border-radius: 0.85rem; padding: 1rem; margin-top: 0.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
                <p style="font-weight: 900; color: #1B5E20;">個人資料同意提供：</p>
                <p>一、本人確已閱讀並瞭解上述告知事項，並勾選「我同意」授權貴機關(構)於所列目的之必要合理範圍內，蒐集、處理及利用本人之個人資料。</p>
                <p>二、本人瞭解此同意書符合個人資料保護法及相關法規之要求，並同意提供予貴機關(構)留存及日後查證使用。</p>
              </div>
            </div>
          </div>

          <button id="btn-consent-check" class="consent-check-btn" style="max-width: 920px;" onclick="toggleConsent()">
            <div class="consent-checkbox-box" id="consent-checkbox-box"></div>
            <span style="font-size: clamp(1.1rem, 2.5vw, 1.45rem); font-weight: 900; line-height: 1.4;">
              我同意：本人已閱讀並瞭解上述個人資料告知事項暨同意書內容
            </span>
          </button>
        </div>

        <div class="step-footer">
          <button onclick="goToStep(1)" style="flex: 1; height: 75px; background: #fff; border: 4px solid #9ca3af; color: #4b5563; font-size: 1.65rem; font-weight: 900; border-radius: 1rem;">
            返回首頁
          </button>
          <button id="btn-consent-next" disabled onclick="goToStep(3)" class="btn-green-main" style="flex: 2; height: 75px; font-size: 1.9rem;">
            同意並繼續
          </button>
        </div>
      </div>

      <!-- ================= STEP 3 (LAYER 2): PHONE NUMBER ================= -->
      <div id="step-3" class="step-view">
        <div class="kiosk-header">
          <h1>請輸入您的手機號碼</h1>
          <div class="progress-bar"><div class="progress-fill" style="width: 18%;"></div></div>
        </div>

        <div class="step-main">
          <div class="phone-layout">
            <div style="flex: 1; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
              <p style="font-size: 1.35rem; font-weight: 800; color: #4b5563; text-align: center;">
                僅用於活動參與紀錄與避免重複領取好禮
              </p>
              <div id="phone-display-box" style="width: 100%; border: 4px solid #2E7D32; border-radius: 1.25rem; padding: 1.15rem 1.5rem; text-align: center; background: #f9fafb;">
                <span id="phone-display" style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; font-family: monospace; letter-spacing: 0.15em; color: #d1d5db;">09...</span>
              </div>
              <div id="phone-hint" style="font-size: 1.1rem; font-weight: 700; color: #6b7280; text-align: center; min-height: 2.5rem;">
                請輸入 10 碼手機號碼（目前已輸入 0 / 10 碼）
              </div>
              <div id="phone-err" style="display: none; color: #dc2626; background: #fef2f2; border: 2px solid #fecaca; border-radius: 0.85rem; padding: 0.65rem 1rem; font-size: 1.15rem; font-weight: 900; text-align: center;"></div>
            </div>

            <div style="width: 100%; max-width: 380px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; flex-shrink: 0;">
              <button class="key-btn" style="height: 68px; font-size: 2rem;" onclick="pressPhoneKey('1')">1</button>
              <button class="key-btn" style="height: 68px; font-size: 2rem;" onclick="pressPhoneKey('2')">2</button>
              <button class="key-btn" style="height: 68px; font-size: 2rem;" onclick="pressPhoneKey('3')">3</button>
              <button class="key-btn" style="height: 68px; font-size: 2rem;" onclick="pressPhoneKey('4')">4</button>
              <button class="key-btn" style="height: 68px; font-size: 2rem;" onclick="pressPhoneKey('5')">5</button>
              <button class="key-btn" style="height: 68px; font-size: 2rem;" onclick="pressPhoneKey('6')">6</button>
              <button class="key-btn" style="height: 68px; font-size: 2rem;" onclick="pressPhoneKey('7')">7</button>
              <button class="key-btn" style="height: 68px; font-size: 2rem;" onclick="pressPhoneKey('8')">8</button>
              <button class="key-btn" style="height: 68px; font-size: 2rem;" onclick="pressPhoneKey('9')">9</button>
              <button class="key-btn key-btn-clear" style="height: 68px; font-size: 1.35rem;" onclick="pressPhoneKey('clear')">清除</button>
              <button class="key-btn" style="height: 68px; font-size: 2rem;" onclick="pressPhoneKey('0')">0</button>
              <button class="key-btn key-btn-back" style="height: 68px;" onclick="pressPhoneKey('back')">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><line x1="18" x2="12" y1="9" y2="15"/><line x1="12" x2="18" y1="9" y2="15"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="step-footer">
          <button onclick="goToStep(2)" style="flex: 1; height: 75px; background: #fff; border: 4px solid #9ca3af; color: #4b5563; font-size: 1.65rem; font-weight: 900; border-radius: 1rem;">
            上一步
          </button>
          <button id="btn-phone-next" disabled onclick="validatePhoneAndNext()" class="btn-green-main" style="flex: 2; height: 75px; font-size: 1.9rem;">
            下一步
          </button>
        </div>
      </div>

      <!-- ================= STEP 4 (LAYER 3): AGE 55+ CHECK ================= -->
      <div id="step-4" class="step-view">
        <div class="kiosk-header">
          <h1>資格確認：是否年滿 55 歲</h1>
          <div class="progress-bar"><div class="progress-fill" style="width: 27%;"></div></div>
        </div>

        <div class="step-main" style="background-color: #f9fafb; gap: 2rem;">
          <div style="width: 100%; max-width: 760px; background: #ffffff; border: 4px solid #e5e7eb; border-radius: 1.5rem; padding: 2rem; text-align: center;">
            <p style="font-size: 1.3rem; font-weight: 800; color: #2E7D32; margin-bottom: 0.5rem;">樂齡數位共創推動計畫</p>
            <h2 style="font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 900; color: #111827;">請問您是否年滿 55 歲（含）以上？</h2>
            <p style="font-size: 1.2rem; font-weight: 700; color: #6b7280; margin-top: 0.75rem;">請點選下方符合您的選項，完成後即可開始點餐體驗</p>
          </div>

          <div class="age-grid">
            <button class="age-btn" onclick="selectAgeOver55('是', this)">
              <span style="font-size: 2.8rem; font-weight: 900;">是</span>
              <span style="font-size: 1.3rem; font-weight: 800; opacity: 0.85;">已年滿 55 歲（含）以上</span>
            </button>
            <button class="age-btn" onclick="selectAgeOver55('否', this)">
              <span style="font-size: 2.8rem; font-weight: 900;">否</span>
              <span style="font-size: 1.3rem; font-weight: 800; opacity: 0.85;">未滿 55 歲</span>
            </button>
          </div>
        </div>

        <div class="step-footer">
          <button onclick="goToStep(3)" style="flex: 1; height: 75px; background: #fff; border: 4px solid #9ca3af; color: #4b5563; font-size: 1.65rem; font-weight: 900; border-radius: 1rem;">
            上一步
          </button>
          <button id="btn-age-next" disabled onclick="goToStep(5)" class="btn-green-main" style="flex: 2; height: 75px; font-size: 1.9rem;">
            下一步，開始體驗
          </button>
        </div>
      </div>

      <!-- ================= STEP 5: SELECT ITEM ================= -->
      <div id="step-5" class="step-view">
        <div id="toast" class="toast">只能選擇一項</div>
        <div class="kiosk-header">
          <h1>請選擇您的餐點</h1>
          <div class="progress-bar"><div class="progress-fill" style="width: 36%;"></div></div>
        </div>

        <div class="step-main">
          <div style="background-color: #E8F5E9; color: #2E7D32; border: 4px solid #2E7D32; padding: 0.6rem 1.5rem; border-radius: 9999px; font-size: 1.4rem; font-weight: 900; margin-bottom: 1.5rem;">
            👇 請點選餐點圖片 👇
          </div>

          <div id="item-card" onclick="toggleSelectItem()" style="width: 280px; height: 280px; background: #fff; border-radius: 1.5rem; border: 4px solid #d1d5db; position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;">
            <img src="${logoB64}" alt="活動贈品" id="item-img" draggable="false" style="width: 85%; height: 85%; object-fit: contain; filter: grayscale(100%); opacity: 0.75; transition: all 0.2s; pointer-events: none;">
            <div id="item-badge" style="position: absolute; top: 12px; right: 12px; background: #2E7D32; color: #fff; width: 44px; height: 44px; border-radius: 9999px; display: none; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900;">1</div>
          </div>

          <div style="margin-top: 1.5rem; font-size: 1.8rem; font-weight: 900; color: #2E7D32;">
            單價: NT$ 0
          </div>

          <div style="display: flex; gap: 2rem; margin-top: 1.5rem; background: #f9fafb; border: 2px dashed #d1d5db; padding: 1rem 2.5rem; border-radius: 1rem;">
            <div style="text-align: center;">
              <div style="font-size: 0.95rem; font-weight: 700; color: #6b7280;">選擇數量</div>
              <div id="qty-display" style="font-size: 2.8rem; font-weight: 900; color: #111827;">0</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 0.95rem; font-weight: 700; color: #6b7280;">合計金額</div>
              <div style="font-size: 2.8rem; font-weight: 900; color: #2E7D32;">$0</div>
            </div>
          </div>
        </div>

        <div class="step-footer">
          <button id="btn-confirm-item" disabled class="btn-green-main" style="width: 100%; height: 75px; font-size: 2rem;" onclick="goToStep(6)">
            確認選擇
          </button>
        </div>
      </div>

      <!-- ================= STEP 6: CONFIRM ORDER ================= -->
      <div id="step-6" class="step-view">
        <div class="kiosk-header">
          <h1>確認您的訂單</h1>
          <div class="progress-bar"><div class="progress-fill" style="width: 45%;"></div></div>
        </div>

        <div class="step-main">
          <div style="width: 100%; max-width: 520px; background: #fff; border: 4px solid #2E7D32; border-radius: 1.5rem; padding: 2rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            <h3 style="font-size: 1.8rem; font-weight: 900; color: #2E7D32; border-bottom: 3px solid #f3f4f6; padding-bottom: 1rem; margin-bottom: 1.5rem;">訂單明細</h3>

            <div style="display: flex; justify-content: space-between; font-size: 1.6rem; margin-bottom: 2rem;">
              <span style="font-weight: 900; color: #111827;">活動贈品</span>
              <span style="font-weight: 900; color: #6b7280;">x 1</span>
            </div>

            <div style="border-top: 4px dashed #d1d5db; padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 1.8rem; font-weight: 900; color: #1f2937;">總計金額</span>
              <span style="font-size: 2.8rem; font-weight: 900; color: #2E7D32;">NT$ 0</span>
            </div>
          </div>
        </div>

        <div class="step-footer">
          <button onclick="goToStep(1)" style="flex: 1; height: 75px; background: #fff; border: 4px solid #9ca3af; color: #4b5563; font-size: 1.8rem; font-weight: 900; border-radius: 1rem;">
            取消
          </button>
          <button onclick="goToStep(7)" class="btn-green-main" style="flex: 2; height: 75px; font-size: 2rem;">
            確認結帳
          </button>
        </div>
      </div>

      <!-- ================= STEP 7: PAYMENT METHOD ================= -->
      <div id="step-7" class="step-view">
        <div class="kiosk-header">
          <h1>選擇付款方式</h1>
          <div class="progress-bar"><div class="progress-fill" style="width: 54%;"></div></div>
        </div>

        <div class="step-main">
          <div style="background-color: #E8F5E9; border: 4px solid #2E7D32; border-radius: 1rem; padding: 1rem 3rem; text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 1.1rem; font-weight: 700; color: #2E7D32;">結帳總額</div>
            <div style="font-size: 2.8rem; font-weight: 900; color: #111827;">NT$ 0</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 500px;">
            <button onclick="goToStep(8)" style="background: #fff; border: 6px solid #0091D5; border-radius: 1.5rem; padding: 1.8rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0091D5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              <span style="font-size: 2rem; font-weight: 900; color: #111827;">悠遊卡 / 一卡通</span>
            </button>

            <button onclick="goToStep(8)" style="background: #fff; border: 6px solid #f97316; border-radius: 1.5rem; padding: 1.8rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
              <span style="font-size: 2rem; font-weight: 900; color: #111827;">現金支付</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ================= STEP 8: PAYMENT SUCCESS ================= -->
      <div id="step-8" class="step-view">
        <div class="kiosk-header">
          <h1>交易完成</h1>
          <div class="progress-bar"><div class="progress-fill" style="width: 63%;"></div></div>
        </div>

        <div class="step-main">
          <div style="width: 120px; height: 120px; background-color: #E8F5E9; border: 5px solid #2E7D32; border-radius: 2rem; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; box-shadow: 0 10px 25px rgba(46,125,50,0.2);">
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h2 style="font-size: 3rem; font-weight: 900; color: #111827; margin-bottom: 1rem;">付款成功！</h2>
          <p style="font-size: 1.5rem; font-weight: 700; color: #4b5563; text-align: center; line-height: 1.6;">
            感謝您的參與，<br>請協助我們完成一份簡單的問卷。
          </p>
        </div>

        <div class="step-footer">
          <button onclick="goToStep(9)" class="btn-green-main" style="width: 100%; height: 75px; font-size: 2rem;">
            開始填寫問卷
          </button>
        </div>
      </div>

      <!-- ================= STEP 9: SURVEY 1 ================= -->
      <div id="step-9" class="step-view">
        <div class="kiosk-header">
          <h1>互動數位體驗</h1>
          <div class="progress-bar"><div class="progress-fill" style="width: 72%;"></div></div>
        </div>

        <div class="step-main" style="justify-content: flex-start; padding-top: 2rem;">
          <div style="width: 100%; max-width: 700px; background: #fff; padding: 1.5rem; border-radius: 1.25rem; border: 4px solid #e5e7eb; margin-bottom: 1.5rem;">
            <p style="color: #2E7D32; font-weight: 900; font-size: 1.2rem; margin-bottom: 0.5rem;">內容式防詐小問題</p>
            <h2 style="font-size: 1.7rem; font-weight: 900; color: #111827; line-height: 1.4;">
              接到陌生來電，對方要你操作ATM，下列哪一個是正確作法？
            </h2>
          </div>

          <div style="width: 100%; max-width: 700px; display: flex; flex-direction: column; gap: 0.85rem;">
            <button class="option-btn" onclick="selectSurveyOption(1, 'A. 依照對方指示', this)">A. 依照對方指示</button>
            <button class="option-btn" onclick="selectSurveyOption(1, 'B. 掛掉電話，撥打165電話', this)">B. 掛掉電話，撥打165電話</button>
            <button class="option-btn" onclick="selectSurveyOption(1, 'C. 提供個資給對方', this)">C. 提供個資給對方</button>
            <button class="option-btn" onclick="selectSurveyOption(1, 'D. 匯款給對方', this)">D. 匯款給對方</button>
          </div>
        </div>

        <div class="step-footer">
          <button id="btn-survey-1" disabled onclick="goToStep(10)" class="btn-green-main" style="width: 100%; height: 75px; font-size: 2rem;">
            下一題
          </button>
        </div>
      </div>

      <!-- ================= STEP 10: SURVEY 2 ================= -->
      <div id="step-10" class="step-view">
        <div class="kiosk-header">
          <h1>問卷 2 / 3</h1>
          <div class="progress-bar"><div class="progress-fill" style="width: 81%;"></div></div>
        </div>

        <div class="step-main" style="justify-content: flex-start; padding-top: 2rem;">
          <div style="width: 100%; max-width: 700px; background: #fff; padding: 1.5rem; border-radius: 1.25rem; border: 4px solid #e5e7eb; margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.7rem; font-weight: 900; color: #111827; line-height: 1.4;">
              過去一年內，您有參加過像今天這樣結合數位科技的活動體驗嗎？
            </h2>
          </div>

          <div style="width: 100%; max-width: 700px; display: flex; flex-direction: column; gap: 0.85rem;">
            <button class="option-btn" onclick="selectSurveyOption(2, '經常參加', this)">經常參加</button>
            <button class="option-btn" onclick="selectSurveyOption(2, '偶爾參加', this)">偶爾參加</button>
            <button class="option-btn" onclick="selectSurveyOption(2, '很少參加', this)">很少參加</button>
            <button class="option-btn" onclick="selectSurveyOption(2, '從未參加', this)">從未參加</button>
          </div>
        </div>

        <div class="step-footer">
          <button id="btn-survey-2" disabled onclick="goToStep(11)" class="btn-green-main" style="width: 100%; height: 75px; font-size: 2rem;">
            下一題
          </button>
        </div>
      </div>

      <!-- ================= STEP 11: SURVEY 3 ================= -->
      <div id="step-11" class="step-view">
        <div class="kiosk-header">
          <h1>問卷 3 / 3</h1>
          <div class="progress-bar"><div class="progress-fill" style="width: 90%;"></div></div>
        </div>

        <div class="step-main" style="justify-content: flex-start; padding-top: 2rem;">
          <div style="width: 100%; max-width: 700px; background: #fff; padding: 1.5rem; border-radius: 1.25rem; border: 4px solid #e5e7eb; margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.7rem; font-weight: 900; color: #111827; line-height: 1.4;">
              今天活動的整體感受如何？
            </h2>
          </div>

          <div style="width: 100%; max-width: 700px; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <button class="option-btn" style="text-align: center; padding: 1.5rem 1rem;" onclick="selectSurveyOption(3, '流程順暢', this)">流程順暢</button>
            <button class="option-btn" style="text-align: center; padding: 1.5rem 1rem;" onclick="selectSurveyOption(3, '介面清楚', this)">介面清楚</button>
            <button class="option-btn" style="text-align: center; padding: 1.5rem 1rem;" onclick="selectSurveyOption(3, '需要協助', this)">需要協助</button>
            <button class="option-btn" style="text-align: center; padding: 1.5rem 1rem;" onclick="selectSurveyOption(3, '其他建議', this)">其他建議</button>
          </div>
        </div>

        <div class="step-footer">
          <button id="btn-survey-3" disabled onclick="submitAllSurvey()" class="btn-green-main" style="width: 100%; height: 75px; font-size: 2rem;">
            送出問卷
          </button>
        </div>
      </div>

      <!-- ================= STEP 12: RECEIPT & PRINTING ================= -->
      <div id="step-12" class="step-view">
        <div class="kiosk-header">
          <h1>領取收據</h1>
          <div class="progress-bar"><div class="progress-fill" style="width: 100%;"></div></div>
        </div>

        <div class="step-main" style="background-color: #f3f4f6;">
          <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 1.2rem;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            <h2 style="font-size: 1.8rem; font-weight: 900; color: #1f2937;">資料處理完成</h2>
          </div>

          <!-- On-Screen Visual Receipt Card -->
          <div class="receipt-box">
            <h3 style="font-size: 2rem; font-weight: 900; color: #111827; border-bottom: 3px solid #f3f4f6; padding-bottom: 0.8rem; margin-bottom: 1rem;">取餐收據</h3>

            <div style="text-align: left; padding: 0.5rem 0;">
              <p style="font-size: 1rem; color: #6b7280; font-weight: 800; margin-bottom: 0.25rem;">點餐內容</p>
              <div style="display: flex; justify-content: space-between; font-size: 1.5rem; font-weight: 900; color: #111827;">
                <span>活動贈品</span>
                <span>x 1</span>
              </div>
            </div>

            <div style="text-align: left; padding-top: 0.8rem; margin-top: 0.8rem; border-top: 2px dashed #d1d5db;">
              <p style="font-size: 1rem; color: #6b7280; font-weight: 800; margin-bottom: 0.25rem;">總計金額</p>
              <p style="font-size: 2rem; font-weight: 900; color: #2E7D32;">NT$ 0</p>
            </div>

            <div style="background-color: #E8F5E9; border: 3px solid #2E7D32; border-radius: 1rem; padding: 1rem; margin: 1.2rem 0;">
              <p style="font-size: 1.1rem; font-weight: 900; color: #2E7D32; margin-bottom: 0.25rem;">憑此編號取餐</p>
              <p id="receipt-serial" style="font-size: 3rem; font-weight: 900; font-family: monospace; letter-spacing: 0.1em; color: #111827;">----</p>
            </div>

            <p id="receipt-time" style="font-size: 0.95rem; color: #9ca3af; font-weight: 700; padding-top: 0.5rem; border-top: 2px dashed #d1d5db;"></p>
          </div>

          <p style="margin-top: 1.5rem; font-size: 1.4rem; font-weight: 800; color: #6b7280; text-align: center; line-height: 1.6;">
            請拿取印表機印出的收據<br>
            <span id="countdown-text" style="font-size: 1.1rem; opacity: 0.85; margin-top: 0.25rem; display: inline-block;">(畫面將在 8 秒後自動返回)</span>
          </p>
        </div>
      </div>

      <!-- ================= STEP 99: ADMIN PANEL ================= -->
      <div id="step-99" class="step-view">
        <div id="admin-login-view" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem; position: relative;">
          <button onclick="goToStep(1)" style="position: absolute; top: 1.5rem; right: 1.5rem; background: #e5e7eb; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-size: 1.25rem; font-weight: 800;">返回</button>
          <h2 style="font-size: 2.2rem; font-weight: 900; color: #1B5E20; margin-bottom: 1.5rem;">管理員登入</h2>
          
          <input type="password" id="admin-pwd" placeholder="請輸入密碼 (預設1234)" onkeydown="if(event.key==='Enter') checkAdminLogin()" style="border: 4px solid #2E7D32; border-radius: 1rem; padding: 0.85rem; font-size: 1.8rem; text-align: center; width: 100%; max-width: 340px; outline: none; margin-bottom: 0.5rem; letter-spacing: 0.1em;">
          
          <div id="admin-pwd-err" style="color: #ef4444; font-weight: 800; font-size: 1.1rem; height: 1.5rem; margin-bottom: 0.75rem;"></div>

          <!-- On-Screen Keypad for Kiosk Touchscreen -->
          <div style="width: 100%; max-width: 340px; margin-bottom: 1rem;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
              <button class="key-btn" style="height: 58px; font-size: 1.8rem;" onclick="pressAdminKey('1')">1</button>
              <button class="key-btn" style="height: 58px; font-size: 1.8rem;" onclick="pressAdminKey('2')">2</button>
              <button class="key-btn" style="height: 58px; font-size: 1.8rem;" onclick="pressAdminKey('3')">3</button>
              <button class="key-btn" style="height: 58px; font-size: 1.8rem;" onclick="pressAdminKey('4')">4</button>
              <button class="key-btn" style="height: 58px; font-size: 1.8rem;" onclick="pressAdminKey('5')">5</button>
              <button class="key-btn" style="height: 58px; font-size: 1.8rem;" onclick="pressAdminKey('6')">6</button>
              <button class="key-btn" style="height: 58px; font-size: 1.8rem;" onclick="pressAdminKey('7')">7</button>
              <button class="key-btn" style="height: 58px; font-size: 1.8rem;" onclick="pressAdminKey('8')">8</button>
              <button class="key-btn" style="height: 58px; font-size: 1.8rem;" onclick="pressAdminKey('9')">9</button>
              <button class="key-btn key-btn-clear" style="height: 58px; font-size: 1.3rem;" onclick="pressAdminKey('clear')">清除</button>
              <button class="key-btn" style="height: 58px; font-size: 1.8rem;" onclick="pressAdminKey('0')">0</button>
              <button class="key-btn key-btn-back" style="height: 58px;" onclick="pressAdminKey('back')">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><line x1="18" x2="12" y1="9" y2="15"/><line x1="12" x2="18" y1="9" y2="15"/></svg>
              </button>
            </div>
          </div>

          <button onclick="checkAdminLogin()" class="btn-green-main" style="width: 100%; max-width: 340px; height: 64px; font-size: 1.6rem;">登入</button>
        </div>

        <div id="admin-dash-view" style="display: none; flex: 1; flex-direction: column; height: 100%; background: #f3f4f6;">
          <header style="background: #111827; color: #fff; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center;">
            <h2 style="font-size: 1.6rem; font-weight: 900;">問卷統計報表</h2>
            <div style="display: flex; gap: 0.75rem;">
              <button onclick="clearAdminRecords()" style="background: #6b7280; color: #fff; padding: 0.6rem 1.2rem; border-radius: 0.5rem; font-weight: 700; font-size: 1.1rem;">清除紀錄</button>
              <button onclick="exportCSV()" style="background: #3b82f6; color: #fff; padding: 0.6rem 1.2rem; border-radius: 0.5rem; font-weight: 700; font-size: 1.1rem;">匯出 CSV</button>
              <button onclick="goToStep(1)" style="background: #ef4444; color: #fff; padding: 0.6rem 1.2rem; border-radius: 0.5rem; font-weight: 700; font-size: 1.1rem;">關閉</button>
            </div>
          </header>

          <main style="flex: 1; overflow: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
              <div style="background: #fff; border-radius: 1rem; padding: 1.15rem; border: 2px solid #e5e7eb;">
                <div style="font-size: 0.95rem; font-weight: 800; color: #6b7280;">總參與人次</div>
                <div id="stat-total" style="font-size: 2rem; font-weight: 900; color: #111827; margin-top: 0.25rem;">0 人</div>
              </div>
              <div style="background: #fff; border-radius: 1rem; padding: 1.15rem; border: 2px solid rgba(46,125,50,0.35);">
                <div style="font-size: 0.95rem; font-weight: 800; color: #2E7D32;">年滿 55 歲（是）</div>
                <div id="stat-over55" style="font-size: 2rem; font-weight: 900; color: #1B5E20; margin-top: 0.25rem;">0 人 (0%)</div>
              </div>
              <div style="background: #fff; border-radius: 1rem; padding: 1.15rem; border: 2px solid #e5e7eb;">
                <div style="font-size: 0.95rem; font-weight: 800; color: #6b7280;">未滿 55 歲（否）</div>
                <div id="stat-under55" style="font-size: 2rem; font-weight: 900; color: #374151; margin-top: 0.25rem;">0 人 (0%)</div>
              </div>
            </div>

            <div id="admin-table-wrap" style="background: #fff; border-radius: 1rem; border: 2px solid #e5e7eb; overflow: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <table style="width: 100%; border-collapse: collapse; text-align: left; min-width: 1000px;">
                <thead style="background: #f9fafb; border-bottom: 2px solid #e5e7eb; font-weight: 900; color: #374151;">
                  <tr>
                    <th style="padding: 1rem;">填寫時間</th>
                    <th style="padding: 1rem;">聯絡電話</th>
                    <th style="padding: 1rem;">是否年滿55歲</th>
                    <th style="padding: 1rem;">個資同意</th>
                    <th style="padding: 1rem;">Q1: 接到陌生來電，操作ATM？</th>
                    <th style="padding: 1rem;">Q2: 過去一年參加過類似體驗？</th>
                    <th style="padding: 1rem;">Q3: 今日整體感受？</th>
                  </tr>
                </thead>
                <tbody id="admin-tbody"></tbody>
              </table>
            </div>
            <div id="admin-empty-text" style="display: none; text-align: center; padding: 4rem 1rem; color: #9ca3af; font-size: 1.5rem; font-weight: 800; background: #fff; border-radius: 1rem; border: 2px solid #e5e7eb;">
              目前無問卷資料
            </div>
          </main>
        </div>
      </div>

    </div>
  </div>

  <!-- ================= DEDICATED PRINT AREA (ONLY VISIBLE ON PRINT) ================= -->
  <div id="print-area">
    <!-- Header -->
    <div style="text-align: center; border-bottom: 2px solid #000000; padding-bottom: 8px; margin-bottom: 10px;">
      <div style="font-size: 13px; font-weight: 800; letter-spacing: 1px; margin-bottom: 3px;">數位好鄰居 X 高齡數位體驗</div>
      <h2 style="font-size: 26px; font-weight: 900; letter-spacing: 3px; margin: 0; line-height: 1.2;">取餐收據</h2>
    </div>

    <!-- Items -->
    <div style="padding: 4px 0 8px 0;">
      <div style="font-size: 13px; font-weight: 800; margin-bottom: 4px;">點餐內容</div>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 20px; font-weight: 900;">
        <span>活動贈品</span>
        <span>x 1</span>
      </div>
    </div>

    <!-- Total -->
    <div style="border-top: 2px dashed #000000; padding-top: 8px; margin-top: 4px; display: flex; justify-content: space-between; align-items: baseline;">
      <span style="font-size: 14px; font-weight: 800;">總計金額</span>
      <span style="font-size: 24px; font-weight: 900;">NT$ 0</span>
    </div>

    <!-- Pickup Serial Box -->
    <div style="border: 2px solid #000000; padding: 10px 8px; margin: 12px 0; text-align: center; background: #ffffff;">
      <div style="font-size: 15px; font-weight: 900; letter-spacing: 1px; margin-bottom: 4px;">憑此編號取餐</div>
      <div id="print-receipt-serial" style="font-size: 38px; font-weight: 900; font-family: monospace, Courier, sans-serif; letter-spacing: 4px; line-height: 1.1;">----</div>
    </div>

    <!-- Footer timestamp -->
    <div id="print-receipt-time" style="font-size: 12px; font-weight: 800; border-top: 2px dashed #000000; padding-top: 6px; text-align: center; letter-spacing: 0.5px;"></div>
  </div>

  <script>
    // State
    let currentStep = 1;
    let adminClicks = 0;
    let adminTimer = null;
    let consentAgreed = false;
    let phoneInput = '';
    let ageOver55 = '';
    let selectedQuantity = 0;
    let surveyAnswers = { q1: '', q2: '', q3: '' };
    let countdownTimer = null;
    let printTimer = null;

    // Keyboard shortcut to open admin & phone keyboard support
    window.addEventListener('keydown', (e) => {
      if (e.key === 'F2' || (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        goToStep(99);
        return;
      }
      if (currentStep === 3) {
        if (e.key >= '0' && e.key <= '9') {
          pressPhoneKey(e.key);
        } else if (e.key === 'Backspace') {
          pressPhoneKey('back');
        } else if (e.key === 'Enter' && phoneInput.length === 10) {
          validatePhoneAndNext();
        }
      }
    });

    function goToStep(step) {
      if (countdownTimer) clearInterval(countdownTimer);
      if (printTimer) clearTimeout(printTimer);

      document.querySelectorAll('.step-view').forEach(el => el.classList.remove('active'));
      const nextEl = document.getElementById('step-' + step);
      if (nextEl) nextEl.classList.add('active');
      currentStep = step;

      if (step === 1) {
        resetKiosk();
      } else if (step === 12) {
        setupReceiptStep();
      } else if (step === 99) {
        setupAdminStep();
      }
    }

    function resetKiosk() {
      consentAgreed = false;
      phoneInput = '';
      ageOver55 = '';
      selectedQuantity = 0;
      surveyAnswers = { q1: '', q2: '', q3: '' };

      // Reset Consent UI
      const consentBtn = document.getElementById('btn-consent-check');
      const consentBox = document.getElementById('consent-checkbox-box');
      if (consentBtn) consentBtn.classList.remove('checked');
      if (consentBox) consentBox.innerHTML = '';
      const consentNext = document.getElementById('btn-consent-next');
      if (consentNext) consentNext.disabled = true;

      // Reset Phone UI
      updatePhoneUI();

      // Reset Age UI
      document.querySelectorAll('.age-btn').forEach(b => b.classList.remove('selected'));
      const ageNext = document.getElementById('btn-age-next');
      if (ageNext) ageNext.disabled = true;

      updateItemUI();
      document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
      document.getElementById('btn-survey-1').disabled = true;
      document.getElementById('btn-survey-2').disabled = true;
      document.getElementById('btn-survey-3').disabled = true;
      document.getElementById('admin-login-view').style.display = 'flex';
      document.getElementById('admin-dash-view').style.display = 'none';
      document.getElementById('admin-pwd').value = '';
      document.getElementById('admin-pwd-err').innerText = '';
    }

    // Step 1: Admin Trigger (5 clicks on Mascot or Title badge)
    function handleAdminTrigger() {
      adminClicks++;
      if (adminTimer) clearTimeout(adminTimer);
      adminTimer = setTimeout(() => {
        adminClicks = 0;
        const hint = document.getElementById('admin-click-hint');
        if (hint) hint.style.display = 'none';
      }, 3500);

      const hint = document.getElementById('admin-click-hint');
      if (hint && adminClicks >= 2 && adminClicks < 5) {
        hint.innerText = '管理員驗證：' + adminClicks + ' / 5';
        hint.style.display = 'block';
      }

      if (adminClicks >= 5) {
        adminClicks = 0;
        if (hint) hint.style.display = 'none';
        goToStep(99);
      }
    }

    // Step 2 (Layer 1): Privacy Consent
    function toggleConsent() {
      consentAgreed = !consentAgreed;
      const btn = document.getElementById('btn-consent-check');
      const box = document.getElementById('consent-checkbox-box');
      const nextBtn = document.getElementById('btn-consent-next');
      if (consentAgreed) {
        btn.classList.add('checked');
        box.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        nextBtn.disabled = false;
      } else {
        btn.classList.remove('checked');
        box.innerHTML = '';
        nextBtn.disabled = true;
      }
    }

    // Step 3 (Layer 2): Phone Input
    function pressPhoneKey(key) {
      if (key === 'clear') {
        phoneInput = '';
      } else if (key === 'back') {
        phoneInput = phoneInput.slice(0, -1);
      } else if (phoneInput.length < 10) {
        phoneInput += key;
      }
      updatePhoneUI();
    }

    function updatePhoneUI() {
      const disp = document.getElementById('phone-display');
      const hint = document.getElementById('phone-hint');
      const err = document.getElementById('phone-err');
      const box = document.getElementById('phone-display-box');
      const nextBtn = document.getElementById('btn-phone-next');

      if (disp) {
        disp.innerText = phoneInput || '09...';
        disp.style.color = phoneInput ? '#111827' : '#d1d5db';
      }
      if (hint) {
        hint.innerText = '請輸入 10 碼手機號碼（目前已輸入 ' + phoneInput.length + ' / 10 碼）';
      }
      if (err) {
        err.style.display = 'none';
        err.innerText = '';
      }
      if (box) {
        box.style.borderColor = '#2E7D32';
        box.style.backgroundColor = '#f9fafb';
      }
      if (nextBtn) {
        nextBtn.disabled = phoneInput.length < 10;
      }
    }

    function validatePhoneAndNext() {
      const err = document.getElementById('phone-err');
      const box = document.getElementById('phone-display-box');
      if (!/^09\\d{8}$/.test(phoneInput)) {
        err.innerText = '⚠️ 請輸入正確的 10 碼手機號碼（09 開頭）';
        err.style.display = 'block';
        box.style.borderColor = '#ef4444';
        box.style.backgroundColor = '#fef2f2';
        return;
      }
      try {
        const records = JSON.parse(localStorage.getItem('kiosk_records') || '[]');
        const exists = records.some(r => r.phone === phoneInput);
        if (exists) {
          err.innerText = '⚠️ 此手機號碼已參加過本活動，為避免重複領取，無法重複使用';
          err.style.display = 'block';
          box.style.borderColor = '#ef4444';
          box.style.backgroundColor = '#fef2f2';
          return;
        }
      } catch (e) {}
      goToStep(4);
    }

    // Step 4 (Layer 3): Age Over 55 Check
    function selectAgeOver55(val, btnEl) {
      ageOver55 = val;
      document.querySelectorAll('.age-btn').forEach(b => b.classList.remove('selected'));
      btnEl.classList.add('selected');
      document.getElementById('btn-age-next').disabled = false;
    }

    // Step 5: Select Item
    function toggleSelectItem() {
      if (selectedQuantity === 0) {
        selectedQuantity = 1;
        updateItemUI();
      } else {
        showToast('只能選擇一項');
      }
    }

    function updateItemUI() {
      const card = document.getElementById('item-card');
      const img = document.getElementById('item-img');
      const badge = document.getElementById('item-badge');
      const qtyDisplay = document.getElementById('qty-display');
      const confirmBtn = document.getElementById('btn-confirm-item');

      qtyDisplay.innerText = selectedQuantity;

      if (selectedQuantity > 0) {
        card.style.borderColor = '#2E7D32';
        card.style.backgroundColor = '#E8F5E9';
        img.style.filter = 'none';
        img.style.opacity = '1';
        badge.style.display = 'flex';
        confirmBtn.disabled = false;
      } else {
        card.style.borderColor = '#d1d5db';
        card.style.backgroundColor = '#ffffff';
        img.style.filter = 'grayscale(100%)';
        img.style.opacity = '0.75';
        badge.style.display = 'none';
        confirmBtn.disabled = true;
      }
    }

    function showToast(text) {
      const toast = document.getElementById('toast');
      toast.innerText = text;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2000);
    }

    // Survey
    function selectSurveyOption(qNum, value, btnEl) {
      surveyAnswers['q' + qNum] = value;
      const parent = btnEl.parentElement;
      parent.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
      btnEl.classList.add('selected');
      document.getElementById('btn-survey-' + qNum).disabled = false;
    }

    function submitAllSurvey() {
      // Save record to localStorage
      try {
        const records = JSON.parse(localStorage.getItem('kiosk_records') || '[]');
        records.push({
          timestamp: new Date().toISOString(),
          consent: consentAgreed,
          phone: phoneInput,
          ageOver55: ageOver55,
          q1: surveyAnswers.q1,
          q2: surveyAnswers.q2,
          q3: surveyAnswers.q3
        });
        localStorage.setItem('kiosk_records', JSON.stringify(records));
      } catch (e) {
        console.error(e);
      }

      goToStep(12);
    }

    // Step 12: Receipt Print & Auto Countdown
    function setupReceiptStep() {
      // 4-digit random serial (1000 - 9999)
      const randomCode = Math.floor(Math.random() * 9000 + 1000).toString();
      document.getElementById('receipt-serial').innerText = randomCode;
      document.getElementById('print-receipt-serial').innerText = randomCode;
      
      const now = new Date();
      const timeStr = now.toLocaleString('zh-TW', { hour12: false });
      document.getElementById('receipt-time').innerText = timeStr;
      document.getElementById('print-receipt-time').innerText = timeStr;

      // Auto trigger print after 1s
      printTimer = setTimeout(() => {
        triggerPrintNow();
      }, 1000);
    }

    function triggerPrintNow() {
      window.print();
      
      // Start 8-second countdown after print
      if (countdownTimer) clearInterval(countdownTimer);
      let secondsLeft = 8;
      const countdownEl = document.getElementById('countdown-text');
      if (countdownEl) countdownEl.innerText = '(畫面將在 8 秒後自動返回)';
      
      countdownTimer = setInterval(() => {
        secondsLeft--;
        if (secondsLeft <= 0) {
          clearInterval(countdownTimer);
          goToStep(1);
        } else {
          if (countdownEl) countdownEl.innerText = '(畫面將在 ' + secondsLeft + ' 秒後自動返回)';
        }
      }, 1000);
    }

    // Step 99: Admin Panel
    function setupAdminStep() {
      document.getElementById('admin-login-view').style.display = 'flex';
      document.getElementById('admin-dash-view').style.display = 'none';
      const pwdInput = document.getElementById('admin-pwd');
      pwdInput.value = '';
      document.getElementById('admin-pwd-err').innerText = '';
      setTimeout(() => pwdInput.focus(), 100);
    }

    function pressAdminKey(key) {
      const pwdInput = document.getElementById('admin-pwd');
      document.getElementById('admin-pwd-err').innerText = '';
      if (key === 'clear') {
        pwdInput.value = '';
      } else if (key === 'back') {
        pwdInput.value = pwdInput.value.slice(0, -1);
      } else {
        pwdInput.value += key;
      }
    }

    function checkAdminLogin() {
      const pwd = document.getElementById('admin-pwd').value;
      if (pwd === '1234') {
        document.getElementById('admin-login-view').style.display = 'none';
        document.getElementById('admin-dash-view').style.display = 'flex';
        renderAdminRecords();
      } else {
        document.getElementById('admin-pwd-err').innerText = '密碼錯誤 (預設 1234)';
      }
    }

    function renderAdminRecords() {
      let records = [];
      try {
        records = JSON.parse(localStorage.getItem('kiosk_records') || '[]');
      } catch (e) {}

      const totalCount = records.length;
      const over55Count = records.filter(r => r.ageOver55 === '是').length;
      const under55Count = records.filter(r => r.ageOver55 === '否').length;
      const over55Pct = totalCount > 0 ? Math.round((over55Count / totalCount) * 100) : 0;
      const under55Pct = totalCount > 0 ? Math.round((under55Count / totalCount) * 100) : 0;

      document.getElementById('stat-total').innerText = totalCount + ' 人';
      document.getElementById('stat-over55').innerText = over55Count + ' 人 (' + over55Pct + '%)';
      document.getElementById('stat-under55').innerText = under55Count + ' 人 (' + under55Pct + '%)';

      const tbody = document.getElementById('admin-tbody');
      const emptyText = document.getElementById('admin-empty-text');
      const tableWrap = document.getElementById('admin-table-wrap');

      tbody.innerHTML = '';
      if (records.length === 0) {
        tableWrap.style.display = 'none';
        emptyText.style.display = 'block';
        return;
      }

      tableWrap.style.display = 'block';
      emptyText.style.display = 'none';

      records.forEach(r => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid #f3f4f6';
        tr.innerHTML = \`
          <td style="padding: 1rem; color: #6b7280; font-size: 0.95rem; white-space: nowrap;">\${new Date(r.timestamp).toLocaleString()}</td>
          <td style="padding: 1rem; font-weight: 800; font-family: monospace; color: #111827; white-space: nowrap;">\${r.phone || '-'}</td>
          <td style="padding: 1rem; font-weight: 800; color: #374151; white-space: nowrap;">\${r.ageOver55 || '-'}</td>
          <td style="padding: 1rem; font-weight: 800; color: #2E7D32; white-space: nowrap;">\${r.consent ? '已同意' : '-'}</td>
          <td style="padding: 1rem; font-weight: 700; color: #374151;">\${r.q1 || '-'}</td>
          <td style="padding: 1rem; font-weight: 700; color: #374151;">\${r.q2 || '-'}</td>
          <td style="padding: 1rem; font-weight: 700; color: #374151;">\${r.q3 || '-'}</td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function clearAdminRecords() {
      if (confirm('確定要清空所有問卷紀錄嗎？')) {
        localStorage.removeItem('kiosk_records');
        renderAdminRecords();
      }
    }

    function exportCSV() {
      let records = [];
      try {
        records = JSON.parse(localStorage.getItem('kiosk_records') || '[]');
      } catch (e) {}

      if (records.length === 0) {
        alert('目前無紀錄可匯出');
        return;
      }

      const csvContent = "\\uFEFF" 
        + "填寫時間,聯絡電話,是否年滿55歲,個資同意,Q1: 接到陌生來電操作ATM,Q2: 過去一年類似體驗,Q3: 今日感受\\n"
        + records.map(r => \`"\${new Date(r.timestamp).toLocaleString()}","\${r.phone ? '\\t' + r.phone : ''}","\${r.ageOver55 || ''}","\${r.consent ? '已同意' : ''}","\${r.q1||''}","\${r.q2||''}","\${r.q3||''}"\`).join("\\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "kiosk_survey_report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  </script>
</body>
</html>
`;

// Write to kiosk.html in root
const rootKioskPath = path.join(rootDir, 'kiosk.html');
fs.writeFileSync(rootKioskPath, htmlContent, 'utf-8');
console.log('Successfully wrote:', rootKioskPath);

// Write to public/kiosk.html so Vite build includes it
const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const publicKioskPath = path.join(publicDir, 'kiosk.html');
fs.writeFileSync(publicKioskPath, htmlContent, 'utf-8');
console.log('Successfully wrote:', publicKioskPath);

// Also write to dist/kiosk.html if dist exists
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  const distKioskPath = path.join(distDir, 'kiosk.html');
  fs.writeFileSync(distKioskPath, htmlContent, 'utf-8');
  console.log('Successfully wrote:', distKioskPath);
}
