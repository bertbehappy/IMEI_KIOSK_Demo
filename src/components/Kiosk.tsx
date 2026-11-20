import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, CreditCard, Banknote, Printer, Check, Delete, ShieldCheck, Phone, UserCheck } from 'lucide-react';
import { StepType, SurveyState } from '../types';
import mascotImg from '../assets/images/hero_banner_1784250790825.jpg';
import imeiLogoImg from '../assets/images/imei_logo_1779678454395.png';

function StepWelcome({ onNext, onAdmin }: { onNext: () => void, onAdmin: () => void }) {
  const [clicks, setClicks] = useState(0);

  const handleTitleClick = () => {
    if (clicks + 1 >= 5) {
      onAdmin();
      setClicks(0);
    } else {
      setClicks(c => c + 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col landscape:flex-row text-center overflow-hidden relative h-full gap-0 landscape:gap-8 max-w-[1920px] mx-auto items-center w-full justify-between landscape:justify-evenly portrait:p-0 p-4 sm:p-6 lg:p-8">
      {/* Background Artwork */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden portrait:block overflow-hidden bg-[#FFF8E7]">
        <div className="absolute -top-[5%] -left-[5%] w-[110%] h-[35%] bg-gradient-to-b from-[#A5D6A7]/50 to-transparent"></div>
        <svg className="absolute -top-[5%] -left-[5%] w-[110%] h-[55%]" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0,0 L100,0 L100,70 Q50,110 0,60 Z" fill="#E8F5E9" />
          <path d="M0,0 L100,0 L100,50 Q60,90 0,40 Z" fill="#C8E6C9" opacity="0.6" />
        </svg>
        <svg className="absolute -bottom-[5%] -left-[5%] w-[110%] h-[40%]" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0,100 L100,100 L100,40 Q50,0 0,50 Z" fill="#F1F8E9" opacity="0.8" />
        </svg>
        <div className="absolute top-[30%] -bottom-[5%] -left-[5%] w-[110%] opacity-15">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaf" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                <path d="M25,50 C25,25 50,25 50,25 C50,50 25,50 25,50 Z M75,100 C75,75 100,75 100,75 C100,100 75,100 75,100 Z" fill="#2E7D32" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaf)" />
          </svg>
        </div>
      </div>

      {/* Landscape Layout (Fallback for Desktop) */}
      <div className="hidden landscape:flex flex-1 w-full max-w-[1920px] mx-auto items-center justify-evenly p-8 relative z-10 gap-8">
        {/* 視覺區 (Landscape) */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-1/2 relative z-10 cursor-pointer" onClick={handleTitleClick}>
          <img src={mascotImg} alt="Mascot" draggable={false} className="w-auto h-[48vh] object-contain mix-blend-multiply drop-shadow-2xl mb-[-30px] relative z-10 pointer-events-none" />
          <div className="bg-[#2E7D32] text-white px-6 xl:px-12 py-6 rounded-[3rem] shadow-2xl relative z-20 border-8 border-white/50 backdrop-blur-sm w-full flex items-center justify-center">
            <h1 className="text-[32px] lg:text-[42px] xl:text-[54px] font-black tracking-wide text-center leading-snug drop-shadow-md m-0 whitespace-nowrap w-full flex justify-between items-center">
              <span>數位好鄰居</span>
              <span className="text-yellow-300 mx-2 text-[1.2em] align-middle">X</span>
              <span>高齡數位互動體驗</span>
            </h1>
          </div>
        </div>

        {/* 互動區 (Landscape) */}
        <div className="flex flex-col gap-8 flex-1 w-1/2 items-center justify-center max-w-2xl mx-auto min-h-0 relative z-10">
          <div className="bg-white/95 rounded-[2.5rem] border-4 border-[#2E7D32]/30 p-8 shadow-xl w-full flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-3xl xl:text-4xl font-black text-[#1B5E20]">歡迎體驗高齡數位好生活！</h2>
              <p className="text-xl font-bold text-gray-600 mt-2">樂齡數位共創推動計畫，完成體驗輕鬆領取活動好禮</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="bg-[#E8F5E9] border-2 border-[#2E7D32]/30 rounded-2xl p-5 text-center flex flex-col items-center justify-center shadow-sm">
                <span className="text-5xl mb-2">📝</span>
                <span className="text-2xl font-black text-[#1B5E20]">1. 資格確認</span>
                <span className="text-base font-bold text-gray-600 mt-1">個資同意與登記</span>
              </div>
              <div className="bg-[#E8F5E9] border-2 border-[#2E7D32]/30 rounded-2xl p-5 text-center flex flex-col items-center justify-center shadow-sm">
                <span className="text-5xl mb-2">🎁</span>
                <span className="text-2xl font-black text-[#1B5E20]">2. 點餐與問卷</span>
                <span className="text-base font-bold text-gray-600 mt-1">趣味互動體驗</span>
              </div>
              <div className="bg-[#E8F5E9] border-2 border-[#2E7D32]/30 rounded-2xl p-5 text-center flex flex-col items-center justify-center shadow-sm">
                <span className="text-5xl mb-2">🧾</span>
                <span className="text-2xl font-black text-[#1B5E20]">3. 領取收據</span>
                <span className="text-base font-bold text-gray-600 mt-1">自動出單兌換</span>
              </div>
            </div>
          </div>

          <button 
            onClick={onNext} 
            className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-4xl xl:text-5xl font-black py-8 rounded-[2rem] shadow-2xl shadow-green-900/30 active:scale-95 transition-all select-none tracking-widest flex items-center justify-center gap-4"
          >
            <span>👉 點此開始體驗 👈</span>
          </button>
        </div>
      </div>

      {/* Portrait 專用嚴格比例佈局 (1080x1920) */}
      <div className="landscape:hidden flex flex-col w-full h-full relative z-10 px-6 py-8 justify-between items-center max-w-[960px] mx-auto">
        
        {/* ① Hero Banner (28%) */}
        <div className="h-[28%] w-full flex items-center justify-center cursor-pointer" onClick={handleTitleClick}>
           <img src={mascotImg} alt="Mascot" draggable={false} className="w-full h-full object-contain rounded-3xl mix-blend-multiply drop-shadow-xl pointer-events-none" />
        </div>

        {/* ② Title Area (11%) */}
        <div className="h-[11%] w-full flex items-center justify-center cursor-pointer" onClick={handleTitleClick}>
          <div className="bg-[#2E7D32] text-white px-4 sm:px-6 py-4 rounded-3xl shadow-2xl border-4 border-white/50 backdrop-blur-sm w-full overflow-hidden flex items-center justify-center h-full">
            <h1 className="text-[5.5vw] sm:text-[34px] md:text-[44px] lg:text-[52px] font-black tracking-wide text-center leading-snug drop-shadow-md m-0 whitespace-nowrap w-full flex justify-between items-center">
              <span>數位好鄰居</span>
              <span className="text-yellow-300 mx-1 text-[1.2em] align-middle">X</span>
              <span>高齡數位互動體驗</span>
            </h1>
          </div>
        </div>

        {/* ③ Feature & Welcome Guide Card (40%) */}
        <div className="h-[40%] w-full py-2 flex flex-col justify-center">
          <div className="bg-white/95 w-full mx-auto h-full p-6 sm:p-8 rounded-[2.5rem] border-4 border-[#2E7D32]/30 text-center shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#1B5E20] mb-2">歡迎體驗高齡數位好生活！</h2>
              <p className="text-lg sm:text-2xl font-bold text-gray-600">樂齡數位共創推動計畫，完成體驗輕鬆領取好禮</p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 my-auto">
              <div className="bg-[#E8F5E9] border-2 border-[#2E7D32]/40 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-sm">
                <span className="text-4xl sm:text-6xl mb-2">📝</span>
                <span className="text-xl sm:text-2xl font-black text-[#1B5E20]">1. 資格確認</span>
                <span className="text-sm sm:text-lg font-bold text-gray-600 mt-1">個資同意與登記</span>
              </div>
              <div className="bg-[#E8F5E9] border-2 border-[#2E7D32]/40 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-sm">
                <span className="text-4xl sm:text-6xl mb-2">🎁</span>
                <span className="text-xl sm:text-2xl font-black text-[#1B5E20]">2. 點餐與問卷</span>
                <span className="text-sm sm:text-lg font-bold text-gray-600 mt-1">趣味互動體驗</span>
              </div>
              <div className="bg-[#E8F5E9] border-2 border-[#2E7D32]/40 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-sm">
                <span className="text-4xl sm:text-6xl mb-2">🧾</span>
                <span className="text-xl sm:text-2xl font-black text-[#1B5E20]">3. 領取收據</span>
                <span className="text-sm sm:text-lg font-bold text-gray-600 mt-1">自動出單兌換</span>
              </div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl py-3 px-4 text-amber-800 text-base sm:text-xl font-bold">
              ✨ 點擊下方綠色按鈕即可直接開始體驗 ✨
            </div>
          </div>
        </div>

        {/* ④ Action Start Button (15%) */}
        <div className="h-[15%] w-full pt-2 flex items-center justify-center">
          <button 
            onClick={onNext} 
            className="w-full h-full max-h-[100px] bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-3xl sm:text-5xl font-black rounded-[2rem] shadow-2xl shadow-green-900/30 active:scale-95 transition-all select-none tracking-widest flex items-center justify-center gap-3 animate-pulse"
          >
            <span>👉 點此開始體驗 👈</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function StepConsent({ agreed, onToggle, onBack, onNext }: { agreed: boolean, onToggle: () => void, onBack: () => void, onNext: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className="bg-[#2E7D32] p-6 sm:p-8 text-white flex flex-col items-center gap-2 shrink-0">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center">個人資料提供同意書</h1>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
          <div className="w-[9%] h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-4 bg-gray-50 overflow-hidden max-w-5xl w-full mx-auto">
        <div className="flex-1 min-h-0 bg-white rounded-2xl border-4 border-[#2E7D32]/30 p-5 sm:p-8 overflow-y-auto shadow-sm text-gray-800 space-y-4">
          <div className="text-center border-b-2 border-gray-200 pb-4">
            <p className="text-lg sm:text-xl font-bold text-[#2E7D32]">數位發展部 數位產業署</p>
            <h2 className="text-xl sm:text-3xl font-black text-gray-900 mt-1">蒐集個人資料告知事項暨個人資料提供同意書</h2>
          </div>

          <div className="text-base sm:text-xl leading-relaxed font-medium space-y-3">
            <p>
              數位發展部 數位產業署委託計畫執行單位-台北市電腦商業同業公會辦理「樂齡數位共創推動計畫－樂齡數位好夥伴推動計畫」(以下簡稱本計畫)，因應個人資料保護法及相關個人資料保護規定，在向您蒐集個人資料之前，依法向您告知下列事項，表示您已閱讀、瞭解並同意接受本同意書之所有內容：
            </p>
            <p>
              <strong className="text-[#1B5E20]">一、蒐集目的及類別：</strong>為辦理本計畫數位體驗活動，確認參與者身分、避免重複參與體驗及領取體驗完成禮，爰蒐集您的手機號碼及年齡資料，僅供本次活動參與紀錄及禮品領取資格核對使用。
            </p>
            <p>
              <strong className="text-[#1B5E20]">二、個人資料利用之期間、地區、對象及方式：</strong><br />
              您的個人資料，除涉及國際業務或活動外，將提供本機關(構)於中華民國領域，於上述蒐集目的之必要合理範圍內加以利用至前述蒐集目的消失為止。
            </p>
            <p>
              <strong className="text-[#1B5E20]">三、當事人權利行使：</strong><br />
              依據個人資料保護法第3條，您可向計畫執行單位請求查詢或閱覽、製給複製本、補充或更正、停止蒐集/處理/利用或刪除您的個人資料。
            </p>
            <p>
              <strong className="text-[#1B5E20]">四、不提供個人資料之權益影響：</strong><br />
              如您不提供或未提供正確之個人資料，或要求停止蒐集/處理/利用/刪除個人資料、服務訊息的取消訂閱，本機關(構)將無法為您提供蒐集目的之相關服務。
            </p>
            <p>
              <strong className="text-[#1B5E20]">五、</strong>各項通知服務、相關訊息之停止寄送，可透過訊息內容提供之取消訂閱連結通知。您可於上班時間聯繫計畫執行單位活動承辦人 張家蓁（02-2570-2300 # 9201）。就違反本個資聲明事項之行為，請與活動承辦人反映。
            </p>
            <div className="bg-[#E8F5E9]/70 border-2 border-[#2E7D32]/30 rounded-xl p-4 mt-2 space-y-2">
              <p className="font-black text-[#1B5E20]">個人資料同意提供：</p>
              <p>一、本人確已閱讀並瞭解上述告知事項，並勾選「我同意」授權貴機關(構)於所列目的之必要合理範圍內，蒐集、處理及利用本人之個人資料。</p>
              <p>二、本人瞭解此同意書符合個人資料保護法及相關法規之要求，並同意提供予貴機關(構)留存及日後查證使用。</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className={`shrink-0 w-full p-4 sm:p-5 rounded-2xl border-4 flex items-center gap-4 text-left transition-all active:scale-[0.99] ${
            agreed
              ? 'bg-[#E8F5E9] border-[#2E7D32] text-[#1B5E20] shadow-md'
              : 'bg-white border-gray-300 text-gray-800 hover:border-[#2E7D32]/60'
          }`}
        >
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-4 flex items-center justify-center shrink-0 transition-colors ${
            agreed ? 'bg-[#2E7D32] border-[#2E7D32] text-white' : 'bg-white border-gray-400'
          }`}>
            {agreed && <Check className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3.5]" />}
          </div>
          <span className="text-xl sm:text-2xl font-black leading-snug">
            我同意：本人已閱讀並瞭解上述個人資料告知事項暨同意書內容
          </span>
        </button>
      </main>

      <footer className="p-4 sm:p-6 bg-gray-50 flex gap-4 sm:gap-6 shrink-0 border-t-2 border-gray-200/50">
        <button
          onClick={onBack}
          className="flex-1 bg-white border-4 border-gray-400 py-5 sm:py-7 rounded-2xl text-2xl sm:text-3xl font-black text-gray-600 active:bg-gray-200 transition-transform select-none"
        >
          返回首頁
        </button>
        <button
          disabled={!agreed}
          onClick={onNext}
          className="flex-[2] bg-[#2E7D32] py-5 sm:py-7 rounded-2xl text-2xl sm:text-4xl font-black text-white shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none disabled:opacity-50 disabled:grayscale disabled:active:scale-100"
        >
          同意並繼續
        </button>
      </footer>
    </div>
  );
}

function StepPhone({ phone, onChange, onBack, onNext }: { phone: string, onChange: (val: string) => void, onBack: () => void, onNext: () => void }) {
  const [errorMsg, setErrorMsg] = useState('');

  const handleKey = (key: string) => {
    setErrorMsg('');
    if (key === 'clear') {
      onChange('');
    } else if (key === 'back') {
      onChange(phone.slice(0, -1));
    } else if (phone.length < 10) {
      onChange(phone + key);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKey(e.key);
      } else if (e.key === 'Backspace') {
        handleKey('back');
      } else if (e.key === 'Enter' && phone.length === 10) {
        validateAndProceed();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const validateAndProceed = () => {
    if (!/^09\d{8}$/.test(phone)) {
      setErrorMsg('請輸入正確的 10 碼手機號碼（09 開頭）');
      return;
    }
    try {
      const records = JSON.parse(localStorage.getItem('kiosk_records') || '[]');
      const exists = records.some((r: { phone?: string }) => r.phone === phone);
      if (exists) {
        setErrorMsg('此手機號碼已參加過本活動，為避免重複領取，無法重複使用');
        return;
      }
    } catch (e) {}
    onNext();
  };

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className="bg-[#2E7D32] p-6 sm:p-8 text-white flex flex-col items-center gap-2 shrink-0">
        <div className="flex items-center gap-3">
          <Phone className="w-8 h-8 sm:w-10 sm:h-10" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center">請輸入您的手機號碼</h1>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
          <div className="w-[18%] h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-4 sm:p-8 flex flex-col landscape:flex-row gap-6 sm:gap-10 items-center justify-center overflow-y-auto max-w-5xl w-full mx-auto">
        <div className="w-full landscape:w-1/2 flex flex-col items-center justify-center gap-4">
          <p className="text-xl sm:text-2xl font-bold text-gray-600 text-center">
            僅用於活動參與紀錄與避免重複領取好禮
          </p>
          <div className={`w-full border-4 rounded-2xl py-5 px-6 text-center bg-gray-50 transition-colors ${errorMsg ? 'border-red-500 bg-red-50' : 'border-[#2E7D32]'}`}>
            <span className={`text-4xl sm:text-5xl font-black font-mono tracking-[0.15em] ${phone ? 'text-gray-900' : 'text-gray-300'}`}>
              {phone || '09...'}
            </span>
          </div>
          <div className="min-h-[3.5rem] flex items-center justify-center text-center">
            {errorMsg ? (
              <p className="text-red-600 text-lg sm:text-xl font-black bg-red-50 border-2 border-red-200 px-4 py-2 rounded-xl">
                ⚠️ {errorMsg}
              </p>
            ) : (
              <p className="text-gray-500 text-base sm:text-lg font-bold">
                請使用右側／下方數字鍵盤輸入 10 碼手機號碼（目前已輸入 {phone.length} / 10 碼）
              </p>
            )}
          </div>
        </div>

        <div className="w-full max-w-md landscape:w-1/2 grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
            <button
              key={num}
              type="button"
              onClick={() => handleKey(num)}
              className="h-16 sm:h-20 bg-white border-4 border-gray-200 rounded-2xl text-3xl sm:text-4xl font-black text-gray-800 shadow-sm hover:border-[#2E7D32] hover:bg-[#E8F5E9] active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleKey('clear')}
            className="h-16 sm:h-20 bg-red-50 border-4 border-red-200 rounded-2xl text-xl sm:text-2xl font-black text-red-600 shadow-sm active:scale-95 transition-all"
          >
            清除
          </button>
          <button
            type="button"
            onClick={() => handleKey('0')}
            className="h-16 sm:h-20 bg-white border-4 border-gray-200 rounded-2xl text-3xl sm:text-4xl font-black text-gray-800 shadow-sm hover:border-[#2E7D32] hover:bg-[#E8F5E9] active:scale-95 transition-all"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => handleKey('back')}
            aria-label="退格"
            className="h-16 sm:h-20 bg-gray-100 border-4 border-gray-300 rounded-2xl text-gray-700 flex items-center justify-center shadow-sm active:scale-95 transition-all"
          >
            <Delete className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
        </div>
      </main>

      <footer className="p-4 sm:p-6 bg-gray-50 flex gap-4 sm:gap-6 shrink-0 border-t-2 border-gray-200/50">
        <button
          onClick={onBack}
          className="flex-1 bg-white border-4 border-gray-400 py-5 sm:py-7 rounded-2xl text-2xl sm:text-3xl font-black text-gray-600 active:bg-gray-200 transition-transform select-none"
        >
          上一步
        </button>
        <button
          disabled={phone.length < 10}
          onClick={validateAndProceed}
          className="flex-[2] bg-[#2E7D32] py-5 sm:py-7 rounded-2xl text-2xl sm:text-4xl font-black text-white shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none disabled:opacity-50 disabled:grayscale disabled:active:scale-100"
        >
          下一步
        </button>
      </footer>
    </div>
  );
}

function StepAgeCheck({ value, onChange, onBack, onNext }: { value: string, onChange: (val: string) => void, onBack: () => void, onNext: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className="bg-[#2E7D32] p-6 sm:p-8 text-white flex flex-col items-center gap-2 shrink-0">
        <div className="flex items-center gap-3">
          <UserCheck className="w-8 h-8 sm:w-10 sm:h-10" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center">資格確認：是否年滿 55 歲</h1>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
          <div className="w-[27%] h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-6 sm:p-8 flex flex-col items-center justify-center gap-6 sm:gap-10 bg-gray-50 overflow-y-auto">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border-4 border-gray-200 shadow-sm text-center max-w-3xl w-full">
          <p className="text-[#2E7D32] font-bold text-xl sm:text-2xl mb-3">樂齡數位共創推動計畫</p>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 leading-snug">
            請問您是否年滿 55 歲（含）以上？
          </h2>
          <p className="text-lg sm:text-2xl font-bold text-gray-500 mt-4">
            請點選下方符合您的選項，完成後即可開始點餐體驗
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-3xl w-full">
          <button
            type="button"
            onClick={() => onChange('是')}
            className={`min-h-[120px] sm:min-h-[160px] p-6 sm:p-8 rounded-3xl border-4 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${
              value === '是'
                ? 'border-[#2E7D32] bg-[#E8F5E9] text-[#1B5E20] shadow-lg'
                : 'border-gray-300 bg-white text-gray-800 shadow-sm hover:border-[#2E7D32]/50'
            }`}
          >
            <span className="text-3xl sm:text-5xl font-black">是</span>
            <span className="text-xl sm:text-2xl font-bold opacity-85">已年滿 55 歲（含）以上</span>
          </button>

          <button
            type="button"
            onClick={() => onChange('否')}
            className={`min-h-[120px] sm:min-h-[160px] p-6 sm:p-8 rounded-3xl border-4 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${
              value === '否'
                ? 'border-[#2E7D32] bg-[#E8F5E9] text-[#1B5E20] shadow-lg'
                : 'border-gray-300 bg-white text-gray-800 shadow-sm hover:border-[#2E7D32]/50'
            }`}
          >
            <span className="text-3xl sm:text-5xl font-black">否</span>
            <span className="text-xl sm:text-2xl font-bold opacity-85">未滿 55 歲</span>
          </button>
        </div>
      </main>

      <footer className="p-4 sm:p-6 bg-gray-50 flex gap-4 sm:gap-6 shrink-0 border-t-2 border-gray-200/50">
        <button
          onClick={onBack}
          className="flex-1 bg-white border-4 border-gray-400 py-5 sm:py-7 rounded-2xl text-2xl sm:text-3xl font-black text-gray-600 active:bg-gray-200 transition-transform select-none"
        >
          上一步
        </button>
        <button
          disabled={!value}
          onClick={onNext}
          className="flex-[2] bg-[#2E7D32] py-5 sm:py-7 rounded-2xl text-2xl sm:text-4xl font-black text-white shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none disabled:opacity-50 disabled:grayscale disabled:active:scale-100"
        >
          下一步，開始體驗
        </button>
      </footer>
    </div>
  );
}

function StepSelectItem({ onNext }: { onNext: () => void }) {
  const [quantity, setQuantity] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const handleItemClick = () => {
    if (quantity < 1) {
      setQuantity(1);
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className=" bg-[#2E7D32]  p-8 text-white flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold text-center">請選擇您的餐點</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[36%] h-full bg-white"></div>
        </div>
      </header>
      
      <AnimatePresence>
        {showAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-32 left-1/2 -translate-x-1/2 z-50 bg-[#2E7D32] text-white px-8 py-4 rounded-full text-2xl font-bold shadow-xl"
          >
            只能選擇一項
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 min-h-0 p-4 sm:p-8 flex flex-col landscape:flex-row gap-4 sm:gap-8 overflow-y-auto items-center">
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 shrink">
          <div className="text-center mb-4 sm:mb-6 animate-pulse">
            <span className="bg-[#E8F5E9] text-[#2E7D32] px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xl sm:text-2xl font-bold border-4 border-[#2E7D32] inline-flex items-center gap-2 shadow-sm font-black tracking-wider shadow-green-900/20">
              👇 請點選餐點圖片 👇
            </span>
          </div>
          <div 
            onClick={handleItemClick}
            className={`relative w-40 h-40 sm:w-80 sm:h-80 lg:w-96 lg:h-96 landscape:w-[40vh] landscape:h-[40vh] shrink-0 bg-white rounded-3xl flex items-center justify-center border-4 ${quantity > 0 ? 'border-[#2E7D32] bg-[#E8F5E9]' : 'border-gray-300'} p-2 sm:p-4 overflow-hidden shadow-sm cursor-pointer transition-all active:scale-95`}
          >
            <img 
               src={imeiLogoImg} 
               alt="活動贈品" 
               referrerPolicy="no-referrer"
               className={`w-full h-full object-contain scale-[1.3] transition-transform ${quantity > 0 ? '' : 'grayscale opacity-80'}`}
            />
            {quantity > 0 && (
              <div className="absolute top-4 right-4 bg-[#2E7D32] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg">
                {quantity}
              </div>
            )}
          </div>
          <div className="mt-4 sm:mt-8 text-center space-y-1 sm:space-y-4">
            <p className="text-xl sm:text-3xl font-bold text-[#2E7D32]">單價: NT$ 0</p>
          </div>
        </div>
        <div className="grid grid-cols-2 landscape:grid-cols-1 gap-4 sm:gap-6 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 shrink-0 min-w-[200px]">
          <div className="flex flex-col items-center">
            <span className="text-sm sm:text-lg text-gray-500 font-bold uppercase tracking-wider">選擇數量</span>
            <span className="text-4xl sm:text-6xl font-black text-gray-900">{quantity}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm sm:text-lg text-gray-500 font-bold uppercase tracking-wider">合計金額</span>
            <span className="text-4xl sm:text-6xl font-black text-[#2E7D32]">$0</span>
          </div>
        </div>
      </main>
      <footer className="p-4 sm:p-8 bg-gray-50 flex gap-6 shrink-0 border-t-2 border-gray-200/50">
        <button 
          disabled={quantity === 0}
          onClick={onNext} 
          className="w-full  bg-[#2E7D32]  py-6 sm:py-10 rounded-2xl text-3xl sm:text-5xl font-black text-white shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none disabled:opacity-50 disabled:grayscale disabled:active:scale-100"
        >
          確認選擇
        </button>
      </footer>
    </div>
  );
}

function StepConfirmOrder({ onCancel, onNext }: { onCancel: () => void, onNext: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className=" bg-[#2E7D32]  p-8 text-white flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold text-center">確認您的訂單</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[45%] h-full bg-white"></div>
        </div>
      </header>
      
      <main className="flex-1 min-h-0 p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 overflow-y-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-4 border-[#2E7D32] shrink-0">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#2E7D32] mb-6 sm:mb-8 border-b-4 border-gray-100 pb-4 sm:pb-6 uppercase tracking-wider">訂單明細</h3>

          <div className="flex justify-between items-center mb-8 sm:mb-10 text-2xl sm:text-4xl">
            <span className="font-bold text-gray-900 leading-snug">活動贈品</span>
            <span className="font-bold text-gray-500">x 1</span>
          </div>
          
          <div className="border-t-4 border-dashed border-gray-300 mt-8 sm:mt-12 pt-8 sm:pt-10 flex justify-between items-center flex-wrap gap-4">
            <span className="text-3xl sm:text-5xl font-black text-gray-800">總計金額</span>
            <span className="text-5xl sm:text-7xl font-black text-[#2E7D32]">NT$ 0</span>
          </div>
        </div>
      </main>

      <footer className="p-4 sm:p-8 bg-gray-50 flex gap-4 sm:gap-6 shrink-0 border-t-2 border-gray-200/50">
        <button 
          onClick={onCancel} 
          className="flex-1 bg-white border-4 border-gray-400 py-6 sm:py-10 rounded-2xl text-2xl sm:text-4xl font-black text-gray-600 active:bg-gray-200 transition-transform select-none"
        >
          取消
        </button>
        <button 
          onClick={onNext} 
          className="flex-[2]  bg-[#2E7D32]  py-6 sm:py-10 rounded-2xl text-3xl sm:text-5xl font-black text-white shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none"
        >
          確認結帳
        </button>
      </footer>
    </div>
  );
}

function StepPaymentMethod({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className=" bg-[#2E7D32]  p-8 text-white flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold text-center">選擇付款方式</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[54%] h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-6 sm:p-8 flex flex-col gap-4 sm:gap-8 overflow-y-auto">
        <div className="bg-[#E8F5E9] border-4 border-[#2E7D32] rounded-2xl flex flex-col items-center justify-center py-4 sm:py-6 mb-2 sm:mb-4 shrink-0">
          <span className="text-lg sm:text-xl font-bold tracking-widest text-[#2E7D32] opacity-80 uppercase">結帳總額</span>
          <span className="text-4xl sm:text-6xl font-black text-gray-900 mt-1 sm:mt-2">NT$ 0</span>
        </div>

        <div className="flex-1 flex flex-col landscape:flex-row gap-4 sm:gap-6 shrink-0 pb-4 min-h-[160px]">
          <button 
            onClick={onNext} 
            className="flex-1 flex flex-col items-center justify-center bg-white border-[6px] border-[#0091D5] rounded-[24px] sm:rounded-[32px] shadow-lg active:scale-95 transition-transform select-none gap-4 sm:gap-6 shrink py-6 sm:py-8"
          >
            <CreditCard className="text-[#0091D5] w-16 h-16 sm:w-[100px] sm:h-[100px] landscape:w-16 landscape:h-16" />
            <span className="text-3xl sm:text-5xl font-black text-gray-900 landscape:text-3xl">悠遊卡 / 一卡通</span>
          </button>
          
          <button 
            onClick={onNext} 
            className="flex-1 flex flex-col items-center justify-center bg-white border-[6px] border-orange-500 rounded-[24px] sm:rounded-[32px] shadow-lg active:scale-95 transition-transform select-none gap-4 sm:gap-6 shrink py-6 sm:py-8"
          >
            <Banknote className="text-orange-500 w-16 h-16 sm:w-[100px] sm:h-[100px] landscape:w-16 landscape:h-16" />
            <span className="text-3xl sm:text-5xl font-black text-gray-900 landscape:text-3xl">現金支付</span>
          </button>
        </div>
      </main>
    </div>
  );
}

function StepPaymentSuccess({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className=" bg-[#2E7D32]  p-8 text-white flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold text-center">交易完成</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[63%] h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-6 sm:p-8 flex flex-col items-center justify-center overflow-y-auto">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-32 h-32 sm:w-48 sm:h-48 landscape:w-24 landscape:h-24 shrink-0 bg-[#E8F5E9] border-4 border-[#2E7D32] rounded-3xl flex items-center justify-center mb-8 sm:mb-12 landscape:mb-4 shadow-lg"
        >
          <CheckCircle2 className="text-[#2E7D32] w-16 h-16 sm:w-[100px] sm:h-[100px] landscape:w-12 landscape:h-12" />
        </motion.div>
        
        <h2 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight mb-6 sm:mb-8 landscape:mb-4 shrink-0">付款成功！</h2>
        <p className="text-2xl sm:text-3xl text-gray-600 font-bold leading-relaxed px-4 sm:px-8 text-center shrink-0">
          感謝您的參與，<br className="landscape:hidden"/>請協助我們完成一份簡單的問卷。
        </p>
      </main>

      <footer className="p-4 sm:p-8 bg-gray-50 flex gap-6 shrink-0 border-t-2 border-gray-200/50">
        <button 
          onClick={onNext} 
          className="w-full  bg-[#2E7D32]  text-white text-3xl sm:text-5xl font-black py-6 sm:py-10 landscape:py-6 rounded-2xl shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none"
        >
          開始填寫問卷
        </button>
      </footer>
    </div>
  );
}

function StepSurvey1({ onNext, value, update }: { onNext: () => void, value: string, update: (val: string) => void }) {
  const options = ['A. 依照對方指示', 'B. 掛掉電話，撥打165電話', 'C. 提供個資給對方', 'D. 匯款給對方'];
  
  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className=" bg-[#2E7D32]  p-8 text-white flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold text-center">互動數位體驗</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[72%] h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-4 sm:p-8 flex flex-col landscape:flex-row gap-4 sm:gap-8 bg-gray-50 overflow-y-auto landscape:items-center">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border-4 border-gray-200 shadow-sm shrink-0 landscape:flex-1">
          <p className="text-[#2E7D32] font-bold text-xl mb-2 items-center flex gap-2">
            內容式防詐小問題
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-snug">
            接到陌生來電，對方要你操作ATM，下列哪一個是正確作法？
          </h2>
        </div>
        
        <div className="flex-1 flex flex-col gap-3 sm:gap-4 sm:gap-y-6 pb-4 sm:pb-8 shrink-0 min-h-[300px] landscape:min-h-0 landscape:pb-0 w-full">
          {options.map(opt => (
            <button 
              key={opt} 
              onClick={() => update(opt)}
              className={`flex-1 w-full min-h-[60px] text-xl sm:text-3xl lg:text-4xl landscape:text-2xl font-black rounded-2xl border-4 transition-colors select-none text-left pl-6 sm:pl-8 ${
                value === opt 
                  ? 'border-[#2E7D32] bg-[#E8F5E9] text-[#2E7D32]' 
                  : 'border-gray-300 bg-white text-gray-700 shadow-sm active:bg-gray-100'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </main>

      <footer className="p-4 sm:p-8 bg-gray-50 flex gap-6 shrink-0 border-t-2 border-gray-200/50">
        <button 
          disabled={!value} 
          onClick={onNext} 
          className="w-full disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed  bg-[#2E7D32]  text-white text-3xl sm:text-5xl font-black py-4 sm:py-10 rounded-2xl shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none"
        >
          下一題
        </button>
      </footer>
    </div>
  );
}

function StepSurvey2({ onNext, value, update }: { onNext: () => void, value: string, update: (val: string) => void }) {
  const options = ['經常參加', '偶爾參加', '很少參加', '從未參加'];
  
  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className=" bg-[#2E7D32]  p-8 text-white flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold text-center">問卷 2 / 3</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[81%] h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-4 sm:p-8 flex flex-col landscape:flex-row gap-4 sm:gap-8 bg-gray-50 overflow-y-auto landscape:items-center">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border-4 border-gray-200 shadow-sm shrink-0 landscape:flex-1">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 leading-snug">
            過去一年內，您有參加過像今天這樣結合數位科技的活動體驗嗎？
          </h2>
        </div>
        
        <div className="flex-1 flex flex-col gap-3 sm:gap-4 sm:gap-y-6 pb-4 sm:pb-8 shrink-0 min-h-[300px] landscape:min-h-0 landscape:pb-0 w-full">
          {options.map(opt => (
            <button 
              key={opt} 
              onClick={() => update(opt)}
              className={`flex-1 w-full min-h-[60px] text-2xl sm:text-4xl lg:text-5xl landscape:text-3xl font-black rounded-2xl border-4 transition-colors select-none ${
                value === opt 
                  ? 'border-[#2E7D32] bg-[#E8F5E9] text-[#2E7D32]' 
                  : 'border-gray-300 bg-white text-gray-700 shadow-sm active:bg-gray-100'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </main>

      <footer className="p-4 sm:p-8 bg-gray-50 flex gap-6 shrink-0 border-t-2 border-gray-200/50">
        <button 
          disabled={!value} 
          onClick={onNext} 
          className="w-full disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed  bg-[#2E7D32]  text-white text-3xl sm:text-5xl font-black py-4 sm:py-10 rounded-2xl shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none"
        >
          下一題
        </button>
      </footer>
    </div>
  );
}

function StepSurvey3({ onNext, valueObj, updateObj }: { onNext: () => void, valueObj: { q3?: string, text?: string }, updateObj: (key: string, val: string) => void }) {
  const options = ['流程順暢', '介面清楚', '需要協助', '其他建議'];

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className=" bg-[#2E7D32]  p-8 text-white flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold text-center">問卷 3 / 3</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[90%] h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-4 sm:p-8 flex flex-col landscape:flex-row gap-4 sm:gap-6 bg-gray-50 overflow-y-auto landscape:items-center">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border-4 border-gray-200 shadow-sm shrink-0 landscape:flex-[0.5]">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 leading-snug">
            今天活動的整體感受如何？
          </h2>
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 min-h-[250px] landscape:min-h-[200px] w-full shrink-0">
          {options.map(opt => (
            <button 
              key={opt} 
              onClick={() => updateObj('q3', opt)}
              className={`w-full h-full min-h-[80px] text-xl sm:text-3xl lg:text-5xl landscape:text-3xl font-black rounded-2xl border-4 transition-colors select-none ${
                valueObj.q3 === opt 
                  ? 'border-[#2E7D32] bg-[#E8F5E9] text-[#2E7D32]' 
                  : 'border-gray-300 bg-white text-gray-700 shadow-sm active:bg-gray-100'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </main>

      <footer className="p-4 sm:p-8 bg-gray-50 flex gap-6 shrink-0 border-t-2 border-gray-200/50">
        <button 
          disabled={!valueObj.q3} 
          onClick={onNext} 
          className="w-full disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed  bg-[#2E7D32]  text-white text-3xl sm:text-5xl font-black py-4 sm:py-10 rounded-2xl shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none"
        >
          送出問卷
        </button>
      </footer>
    </div>
  );
}

function StepReceipt({ onDone, survey }: { onDone: () => void, survey?: any }) {
  const [serial] = useState(() => (Math.floor(Math.random() * 9000) + 1000).toString());
  
  const hasRecorded = useRef(false);
  useEffect(() => {
    if (survey && !hasRecorded.current) {
      hasRecorded.current = true;
      try {
        const records = JSON.parse(localStorage.getItem('kiosk_records') || '[]');
        records.push({
          timestamp: new Date().toISOString(),
          ...survey
        });
        localStorage.setItem('kiosk_records', JSON.stringify(records));
      } catch (e) {
        console.error(e);
      }
    }
  }, [survey]);

  useEffect(() => {
    // Automatically trigger print shortly after rendering
    let printTimeout: NodeJS.Timeout;
    let doneTimeout: NodeJS.Timeout;

    printTimeout = setTimeout(() => {
      window.print();
      // After print dialog closes, start the 8-second countdown to return to home
      doneTimeout = setTimeout(() => {
        onDone();
      }, 8000); // 8 seconds after print
    }, 1000); // Wait 1 second before showing print dialog

    return () => {
      clearTimeout(printTimeout);
      clearTimeout(doneTimeout);
    };
  }, [onDone]);

  return (
    <div className="flex-1 flex flex-col bg-gray-100 min-h-0 relative print:static print:bg-white print:block">
      <header className=" bg-[#2E7D32]  p-8 text-white flex flex-col items-center gap-2 print:hidden">
        <h1 className="text-4xl font-extrabold text-center">領取收據</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-full h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-4 sm:p-8 flex flex-col landscape:flex-row items-center justify-center relative bg-gray-100 overflow-y-auto print:static print:p-0 print:bg-white print:block print:overflow-visible">
         <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 landscape:mb-0 landscape:mr-8 shrink-0 print:hidden">
           <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
           >
             <Printer className="text-[#2E7D32] mb-4 w-12 h-12 sm:w-16 sm:h-16 landscape:w-12 landscape:h-12" />
           </motion.div>
           <h2 className="text-2xl sm:text-4xl landscape:text-2xl font-extrabold text-gray-800">資料處理完成</h2>
         </div>

         <motion.div 
           id="receipt-printable"
           initial={{ y: -80, opacity: 0 }} 
           animate={{ y: 0, opacity: 1 }} 
           transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
           className="w-full max-w-[420px] bg-white p-6 sm:p-8 landscape:p-6 shadow-xl rounded-sm relative border-t-8 border-gray-400 shrink-0 print:border-none print:shadow-none print:p-0 print:m-0 print:w-full print:max-w-none print:static"
         >
            <div className="absolute top-0 left-0 w-full border-t-8 border-dashed border-gray-300 -mt-2 print:hidden"></div>
            
            <div className="text-center mt-2 sm:mt-4 landscape:mt-2 print:mt-0 print:text-black">
               <h3 className="text-3xl sm:text-5xl landscape:text-3xl font-black text-gray-900 tracking-widest border-b-4 border-gray-100 pb-6 sm:pb-8 mb-6 sm:mb-8 landscape:pb-4 landscape:mb-4 print:border-b-2 print:pb-2 print:mb-2 print:text-2xl print:tracking-normal print:border-black">取餐收據</h3>
               
               <div className="text-left py-2 sm:py-4 print:py-1">
                  <p className="text-lg sm:text-2xl text-gray-500 font-extrabold mb-2 sm:mb-4 uppercase tracking-wider print:text-sm print:mb-1 print:text-black print:tracking-normal">點餐內容</p>
                  <div className="flex justify-between items-center text-2xl sm:text-4xl font-black text-gray-900 print:text-lg">
                     <span>活動贈品</span>
                     <span>x 1</span>
                  </div>
               </div>
               
               <div className="text-left pt-6 border-t-4 border-dashed border-gray-200 mt-6 print:mt-2 print:pt-2 print:border-t-2 print:border-black">
                  <p className="text-lg sm:text-2xl text-gray-500 font-extrabold mb-2 sm:mb-4 uppercase tracking-wider print:text-sm print:mb-1 print:text-black print:tracking-normal">總計金額</p>
                  <p className="text-4xl sm:text-5xl font-black text-[#2E7D32] print:text-xl print:text-black">NT$ 0</p>
               </div>

               <div className="bg-[#E8F5E9] border-4 border-[#2E7D32] rounded-2xl p-6 sm:p-8 mt-8 sm:mt-10 mb-4 sm:mb-6 print:border-2 print:border-black print:p-2 print:mt-4 print:mb-2 print:bg-transparent print:rounded-none">
                  <p className="text-xl sm:text-2xl font-extrabold text-[#2E7D32] mb-2 sm:mb-4 uppercase tracking-wider print:text-sm print:text-black print:mb-1 print:tracking-normal">憑此編號取餐</p>
                  <p className="text-5xl sm:text-6xl leading-none font-black text-gray-900 tracking-wider font-mono print:text-3xl print:tracking-normal">{serial}</p>
               </div>

               <p className="text-lg sm:text-xl text-gray-400 font-extrabold pt-4 border-t-4 border-dashed border-gray-200 print:text-xs print:text-black print:border-black print:border-t-2 print:pt-1 print:pb-0 print:mb-0">
                  {new Date().toLocaleString('zh-TW', { hour12: false })}
               </p>
            </div>
         </motion.div>
         
         <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.5 }}
           className="mt-8 sm:mt-12 text-2xl sm:text-3xl font-extrabold text-gray-500 text-center leading-relaxed shrink-0 pb-4 print:hidden"
         >
            請拿取下方印出的收據<br/>
            <span className="text-xl sm:text-2xl mt-2 inline-block opacity-80">(畫面將在 8 秒後自動返回)</span>
         </motion.p>
      </main>
    </div>
  );
}

function StepAdmin({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [records, setRecords] = useState<any[]>([]);
  const [auth, setAuth] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('kiosk_records');
    if (raw) {
      try {
        setRecords(JSON.parse(raw));
      } catch (e) {}
    }
  }, []);

  if (!auth) {
    return (
      <div className="flex-1 bg-white flex flex-col items-center justify-center relative p-8 print:hidden">
        <button onClick={onClose} className="absolute top-8 right-8 bg-gray-200 p-4 px-6 rounded-xl text-2xl font-bold shadow-sm active:scale-95">返回</button>
        <h2 className="text-4xl font-extrabold text-[#1B5E20] mb-8">管理員登入</h2>
        <input 
          type="password" 
          placeholder="請輸入密碼 (預設1234)"
          className="border-4 border-gray-300 rounded-xl p-4 text-2xl mb-6 w-full max-w-sm text-center focus:border-[#2E7D32] focus:ring-4 outline-none"
          value={password}
          onChange={e => { setPassword(e.target.value); setErrorMsg(''); }}
        />
        {errorMsg && <p className="text-red-500 font-bold mb-4">{errorMsg}</p>}
        <button 
          onClick={() => { if(password === '1234') setAuth(true); else setErrorMsg('密碼錯誤'); }}
          className="bg-[#2E7D32] text-white text-2xl font-bold py-4 px-12 rounded-xl shadow-lg active:scale-95"
        >
          登入
        </button>
      </div>
    );
  }

  const totalCount = records.length;
  const over55Count = records.filter(r => r.ageOver55 === '是').length;
  const under55Count = records.filter(r => r.ageOver55 === '否').length;
  const over55Pct = totalCount > 0 ? Math.round((over55Count / totalCount) * 100) : 0;
  const under55Pct = totalCount > 0 ? Math.round((under55Count / totalCount) * 100) : 0;

  return (
    <div className="flex-1 bg-gray-100 flex flex-col min-h-0 relative print:hidden">
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 sm:p-8 flex justify-between items-center shrink-0 shadow-md">
        <h2 className="text-3xl font-bold">問卷統計報表</h2>
        <div className="flex">
          {showConfirmClear ? (
            <div className="flex items-center gap-2 mr-4 bg-gray-800 p-2 rounded-xl border border-gray-700">
              <span className="text-white font-bold px-2">確定刪除？</span>
              <button 
                onClick={() => {
                  localStorage.removeItem('kiosk_records');
                  setRecords([]);
                  setShowConfirmClear(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm active:scale-95"
              >
                是
              </button>
              <button 
                onClick={() => setShowConfirmClear(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm active:scale-95"
              >
                否
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowConfirmClear(true)}
              className="bg-gray-500 hover:bg-gray-600 text-white active:scale-95 transition-all p-3 px-8 rounded-xl font-bold text-xl shadow-sm mr-4"
            >
              清除紀錄
            </button>
          )}
          <button 
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
                + "填寫時間,聯絡電話,是否年滿55歲,個資同意,Q1: 接到陌生來電，對方要你操作ATM，下列哪一個是正確作法？,Q2: 過去一年內，您有參加過像今天這樣結合數位科技的活動體驗嗎？,Q3: 今天活動的整體感受如何？\n"
                + records.map(r => `"${new Date(r.timestamp).toLocaleString()}","${r.phone ? '\t' + r.phone : ''}","${r.ageOver55 || ''}","${r.consent ? '已同意' : ''}","${r.q1||''}","${r.q2||''}","${r.q3||''}"`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "survey_report.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all p-3 px-8 rounded-xl font-bold text-xl shadow-sm mr-4"
          >
            匯出 CSV
          </button>
          <button onClick={onClose} className="bg-red-500 hover:bg-red-600 active:scale-95 transition-all p-3 px-8 rounded-xl font-bold text-xl shadow-sm">
            關閉
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm">
            <p className="text-base font-bold text-gray-500">總參與人次</p>
            <p className="text-4xl font-black text-gray-900 mt-1 tabular-nums">{totalCount} <span className="text-lg font-bold text-gray-500">人</span></p>
          </div>
          <div className="bg-white rounded-2xl p-5 border-2 border-[#2E7D32]/30 shadow-sm">
            <p className="text-base font-bold text-[#2E7D32]">年滿 55 歲（是）</p>
            <p className="text-4xl font-black text-[#1B5E20] mt-1 tabular-nums">{over55Count} <span className="text-lg font-bold text-gray-500">人 ({over55Pct}%)</span></p>
          </div>
          <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm">
            <p className="text-base font-bold text-gray-500">未滿 55 歲（否）</p>
            <p className="text-4xl font-black text-gray-700 mt-1 tabular-nums">{under55Count} <span className="text-lg font-bold text-gray-500">人 ({under55Pct}%)</span></p>
          </div>
        </div>

        {records.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50 bg-white rounded-2xl border-2 border-gray-200">
            <CheckCircle2 size={80} className="mb-4 text-gray-400" />
            <p className="text-2xl text-gray-500 font-bold">目前無問卷資料</p>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border-2 border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[1000px]">
                <thead className="bg-gray-100 text-lg font-bold text-gray-700 border-b-2 border-gray-200">
                  <tr>
                    <th className="p-4 sm:p-5 whitespace-nowrap">填寫時間</th>
                    <th className="p-4 sm:p-5 whitespace-nowrap">聯絡電話</th>
                    <th className="p-4 sm:p-5 whitespace-nowrap">是否年滿55歲</th>
                    <th className="p-4 sm:p-5 whitespace-nowrap">個資同意</th>
                    <th className="p-4 sm:p-5">Q1: 接到陌生來電，對方要你操作ATM，下列哪一個是正確作法？</th>
                    <th className="p-4 sm:p-5">Q2: 過去一年內，您有參加過像今天這樣結合數位科技的活動體驗嗎？</th>
                    <th className="p-4 sm:p-5">Q3: 今天活動的整體感受如何？</th>
                  </tr>
                </thead>
                <tbody className="text-lg divide-y divide-gray-100">
                  {records.map((r, i) => {
                    return (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 sm:p-5 whitespace-nowrap text-gray-500 font-medium tabular-nums">
                          {new Date(r.timestamp).toLocaleString()}
                        </td>
                        <td className="p-4 sm:p-5 whitespace-nowrap font-bold text-gray-900 font-mono tabular-nums">{r.phone || '-'}</td>
                        <td className="p-4 sm:p-5 whitespace-nowrap font-bold text-gray-800">{r.ageOver55 || '-'}</td>
                        <td className="p-4 sm:p-5 whitespace-nowrap font-bold text-[#2E7D32]">{r.consent ? '已同意' : '-'}</td>
                        <td className="p-4 sm:p-5 font-bold text-gray-800">{r.q1 || '-'}</td>
                        <td className="p-4 sm:p-5 font-bold text-gray-800">{r.q2 || '-'}</td>
                        <td className="p-4 sm:p-5 font-bold text-gray-800">{r.q3 || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Kiosk() {
  const [step, setStep] = useState<StepType>(1);
  const [survey, setSurvey] = useState<SurveyState>({});

  const reset = () => {
    setSurvey({});
    setStep(1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F2' || (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        setStep(99);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1: return <StepWelcome onNext={() => setStep(2)} onAdmin={() => setStep(99)} />;
      case 2: return <StepConsent agreed={!!survey.consent} onToggle={() => setSurvey(s => ({ ...s, consent: !s.consent }))} onBack={reset} onNext={() => setStep(3)} />;
      case 3: return <StepPhone phone={survey.phone || ''} onChange={(val) => setSurvey(s => ({ ...s, phone: val }))} onBack={() => setStep(2)} onNext={() => setStep(4)} />;
      case 4: return <StepAgeCheck value={survey.ageOver55 || ''} onChange={(val) => setSurvey(s => ({ ...s, ageOver55: val }))} onBack={() => setStep(3)} onNext={() => setStep(5)} />;
      case 5: return <StepSelectItem onNext={() => setStep(6)} />;
      case 6: return <StepConfirmOrder onCancel={reset} onNext={() => setStep(7)} />;
      case 7: return <StepPaymentMethod onNext={() => setStep(8)} />;
      case 8: return <StepPaymentSuccess onNext={() => setStep(9)} />;
      case 9: return <StepSurvey1 onNext={() => setStep(10)} value={survey.q1 || ''} update={(val) => setSurvey(s => ({ ...s, q1: val }))} />;
      case 10: return <StepSurvey2 onNext={() => setStep(11)} value={survey.q2 || ''} update={(val) => setSurvey(s => ({ ...s, q2: val }))} />;
      case 11: return <StepSurvey3 onNext={() => setStep(12)} valueObj={survey} updateObj={(k, val) => setSurvey(s => ({ ...s, [k]: val }))} />;
      case 12: return <StepReceipt onDone={reset} survey={survey} />;
      case 99: return <StepAdmin onClose={reset} />;
      default: return null;
    }
  };

  return (
    <div className="w-full h-[100dvh] sm:h-full max-w-[1920px] max-h-[1080px] bg-white shadow-2xl sm:rounded-3xl flex flex-col border-0 sm:border-[8px] lg:border-[16px] xl:border-[24px] sm:border-[#2E7D32] relative mx-auto overflow-hidden print:border-none print:shadow-none print:rounded-none print:w-full print:h-auto print:max-w-none print:max-h-none print:static print:block print:overflow-visible print:bg-white">
       <AnimatePresence mode="wait">
          <motion.div
             key={step}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             transition={{ duration: 0.2 }}
             className="flex-1 flex flex-col w-full h-full min-h-0 overflow-hidden print:w-full print:h-auto print:static print:block print:overflow-visible"
          >
             {renderStep()}
          </motion.div>
       </AnimatePresence>
    </div>
  );
}
