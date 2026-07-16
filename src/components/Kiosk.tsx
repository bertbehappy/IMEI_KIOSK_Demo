import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, CreditCard, Banknote, Printer, Mic } from 'lucide-react';
import { StepType, SurveyState } from '../types';
import mascotImg from '../assets/images/digital_neighbor_mascot_1783999306408.jpg';
import imeiLogoImg from '../assets/images/imei_logo_1779678454395.png';

function StepWelcome({ onNext, onAdmin, survey, updateSurvey }: { onNext: () => void, onAdmin: () => void, survey: SurveyState, updateSurvey: (phone: string) => void }) {
  const [clicks, setClicks] = useState(0);
  const [phone, setPhone] = useState(survey?.phone || '');
  const [error, setError] = useState('');
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);

  const handleTitleClick = () => {
    if (clicks + 1 >= 5) {
      onAdmin();
      setClicks(0);
    } else {
      setClicks(c => c + 1);
    }
  };

  const handleKeyPress = (key: string) => {
    setError('');
    setShowDuplicateAlert(false);
    if (key === 'clear') {
      setPhone('');
    } else if (key === 'back') {
      setPhone(p => p.slice(0, -1));
    } else {
      if (phone.length < 10) {
        setPhone(p => p + key);
      }
    }
  };

  const handleNext = () => {
    if (phone.length !== 10 || !phone.startsWith('09')) {
      setError('請輸入完整且正確的台灣手機號碼 (09開頭，共10碼)');
      return;
    }

    try {
      const records = JSON.parse(localStorage.getItem('kiosk_records') || '[]');
      const hasTaken = records.some((r: any) => r.phone === phone);
      if (hasTaken) {
        setShowDuplicateAlert(true);
        return;
      }
    } catch (e) {
      console.error(e);
    }

    updateSurvey(phone);
    onNext();
  };

  return (
    <div className="flex-1 flex flex-col landscape:flex-row text-center overflow-hidden relative h-full gap-0 landscape:gap-8 max-w-[1920px] mx-auto items-center w-full justify-between landscape:justify-evenly portrait:p-0 p-4 sm:p-6 lg:p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 hidden portrait:block">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaf" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M15,30 C15,15 30,15 30,15 C30,30 15,30 15,30 Z M45,60 C45,45 60,45 60,45 C60,60 45,60 45,60 Z" fill="#2E7D32" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaf)" />
        </svg>
      </div>
      
      {/* 彈跳框阻擋 */}
      <AnimatePresence>
        {showDuplicateAlert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] p-8 sm:p-12 max-w-lg w-full text-center shadow-2xl border-4 border-red-500 flex flex-col items-center"
            >
              <div className="bg-red-100 text-red-600 rounded-full p-4 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4">無法參加</h2>
              <p className="text-xl sm:text-2xl text-gray-600 font-bold mb-8">
                此手機號碼 <span className="text-red-500">{phone}</span><br/>已經參加過活動囉！
              </p>
              <button 
                onClick={() => {
                  setShowDuplicateAlert(false);
                  setPhone('');
                }}
                className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 text-2xl font-black py-4 rounded-xl active:scale-95 transition-transform"
              >
                返回重填
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 視覺區 (導覽機風格大圖) */}
      <div className="flex-shrink-0 flex flex-col items-center justify-end w-full landscape:w-1/2 portrait:h-[25%] portrait:min-h-[25vh] bg-gradient-to-b from-[#A5D6A7]/30 to-transparent relative z-10" onClick={handleTitleClick}>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden portrait:block hidden">
          <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,0 L100,0 L100,80 Q50,100 0,80 Z" fill="#E8F5E9" />
          </svg>
        </div>
        <div className="relative flex flex-col items-center w-full justify-end pb-4 sm:pb-6 portrait:pb-[2vh]">
          <img src={mascotImg} alt="Mascot" className="w-auto h-24 sm:h-32 landscape:h-[40vh] portrait:h-[12vh] object-contain mix-blend-multiply drop-shadow-2xl portrait:mb-[-1rem] landscape:mb-[-40px] relative z-10" />
          <div className="bg-[#2E7D32] text-white px-4 py-3 sm:px-8 sm:py-4 lg:px-12 lg:py-6 rounded-[2rem] sm:rounded-[3rem] portrait:rounded-3xl shadow-2xl relative z-20 border-4 sm:border-8 border-white/50 backdrop-blur-sm w-[95%] sm:w-auto portrait:w-[90vw] portrait:max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-widest text-center leading-snug drop-shadow-md m-0 portrait:text-3xl portrait:sm:text-4xl portrait:leading-tight">
              數位好鄰居 <span className="text-yellow-300 mx-1 sm:mx-2 text-3xl sm:text-4xl lg:text-6xl portrait:text-4xl portrait:sm:text-5xl align-middle">X</span><br className="landscape:hidden" /> 高齡數位互動體驗
            </h1>
          </div>
        </div>
        
        {/* Privacy (Landscape) */}
        <div className="mt-4 lg:mt-8 bg-white/80 p-4 lg:p-5 rounded-2xl border-2 border-[#2E7D32]/20 text-left shadow-sm w-[95%] max-w-2xl shrink-0 z-10 hidden landscape:block">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-[#1B5E20] mb-1 sm:mb-2">【個人資料蒐集與同意】</h2>
          <div className="text-sm sm:text-base lg:text-lg text-gray-800 leading-snug space-y-1 lg:space-y-2 font-bold">
            <p>歡迎使用本設備。本公司為提供您數位好鄰居X高齡數位互動體驗之服務，需請您輸入手機號碼。</p>
            <p><span className="text-[#2E7D32]">蒐集目的：</span> 僅用於發送簡訊通知與本服務相關之驗證。</p>
            <p><span className="text-[#2E7D32]">個資安全：</span> 我們將嚴格保密，未經您的同意，絕不將您的個資提供給第三方或用於行銷。</p>
            <p className="text-orange-700 bg-orange-50 p-2 lg:p-3 rounded-lg border border-orange-200 mt-2 lg:mt-4 text-xs sm:text-sm lg:text-base">
              💡 點擊「下一步/確認」即表示您已閱讀並同意本公司的［隱私權政策與個資蒐集聲明］。
            </p>
          </div>
        </div>
      </div>


      {/* 互動區 */}
      <div className="flex flex-col gap-3 sm:gap-6 landscape:gap-8 flex-1 w-full portrait:w-[90%] landscape:w-1/2 items-center justify-center max-w-3xl portrait:max-w-2xl mx-auto min-h-0 pb-4 portrait:pb-[4vh] relative z-10">
        {/* Privacy (Portrait) */}
        <div className="bg-white/80 p-4 sm:p-6 portrait:sm:p-8 rounded-2xl border-2 border-[#2E7D32]/20 text-left shadow-sm w-full shrink-0 landscape:hidden mt-2 sm:mt-4">
          <h2 className="text-xl sm:text-2xl portrait:text-2xl portrait:sm:text-3xl font-black text-[#1B5E20] mb-2 sm:mb-4">【個人資料蒐集與同意】</h2>
          <div className="text-base sm:text-lg portrait:text-lg portrait:sm:text-xl text-gray-800 leading-relaxed space-y-2 sm:space-y-3 font-bold">
            <p>歡迎使用本設備。本公司為提供您數位好鄰居X高齡數位互動體驗之服務，需請您輸入手機號碼。</p>
            <p><span className="text-[#2E7D32]">蒐集目的：</span> 僅用於發送簡訊通知與本服務相關之驗證。</p>
            <p><span className="text-[#2E7D32]">個資安全：</span> 我們將嚴格保密，未經您的同意，絕不將您的個資提供給第三方或用於行銷。</p>
            <p className="text-orange-700 bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-200 mt-3 sm:mt-4 text-sm sm:text-base portrait:text-base portrait:sm:text-lg">
              💡 點擊「下一步/確認」即表示您已閱讀並同意本公司的［隱私權政策與個資蒐集聲明］。
            </p>
          </div>
        </div>

        {/* Numpad */}
        <div className="flex flex-col items-center w-full shrink-0 flex-1 justify-center min-h-0">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl portrait:text-3xl portrait:sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-6">請輸入您的手機號碼</h3>
          
          <div className="w-full bg-white border-4 border-[#2E7D32] rounded-2xl h-16 sm:h-20 md:h-24 lg:h-24 portrait:h-16 portrait:sm:h-24 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-6xl portrait:text-4xl portrait:sm:text-6xl font-black tracking-widest text-gray-900 mb-2 sm:mb-4 relative shadow-inner shrink-0">
            {phone || <span className="text-gray-300">09...</span>}
          </div>
          
          <div className="h-8 sm:h-10 mb-2 sm:mb-4 shrink-0 flex items-center">
            {error && <p className="text-red-500 font-bold text-lg sm:text-xl lg:text-2xl portrait:text-xl m-0">{error}</p>}
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full flex-1 min-h-0">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button 
                key={num} 
                onClick={() => handleKeyPress(num.toString())}
                className="bg-white border-b-4 border-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-5xl portrait:text-4xl portrait:sm:text-5xl font-black rounded-xl sm:rounded-2xl active:scale-95 active:border-b-0 active:translate-y-1 transition-all shadow-sm w-full py-3 sm:py-4 lg:py-6 flex items-center justify-center min-h-[3rem] portrait:min-h-[4rem]"
              >
                {num}
              </button>
            ))}
            <button 
              onClick={() => handleKeyPress('clear')}
              className="bg-red-50 text-red-600 border-b-4 border-red-200 text-xl sm:text-2xl md:text-3xl lg:text-3xl portrait:text-2xl portrait:sm:text-3xl font-black rounded-xl sm:rounded-2xl active:scale-95 active:border-b-0 active:translate-y-1 transition-all shadow-sm w-full py-3 sm:py-4 lg:py-6 flex items-center justify-center min-h-[3rem] portrait:min-h-[4rem]"
            >
              清除
            </button>
            <button 
              onClick={() => handleKeyPress('0')}
              className="bg-white border-b-4 border-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-5xl portrait:text-4xl portrait:sm:text-5xl font-black rounded-xl sm:rounded-2xl active:scale-95 active:border-b-0 active:translate-y-1 transition-all shadow-sm w-full py-3 sm:py-4 lg:py-6 flex items-center justify-center min-h-[3rem] portrait:min-h-[4rem]"
            >
              0
            </button>
            <button 
              onClick={() => handleKeyPress('back')}
              className="bg-gray-100 text-gray-600 border-b-4 border-gray-300 rounded-xl sm:rounded-2xl active:scale-95 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center shadow-sm w-full py-3 sm:py-4 lg:py-6 min-h-[3rem] portrait:min-h-[4rem]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-delete w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 portrait:w-10 portrait:h-10"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><line x1="18" x2="12" y1="9" y2="15"/><line x1="12" x2="18" y1="9" y2="15"/></svg>
            </button>
          </div>

          <button 
            onClick={handleNext} 
            className="mt-4 sm:mt-6 md:mt-8 w-full bg-[#2E7D32] text-white text-3xl sm:text-4xl lg:text-4xl portrait:text-3xl portrait:sm:text-4xl font-black py-5 sm:py-6 lg:py-8 rounded-2xl shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none tracking-widest shrink-0"
          >
            下一步 / 確認
          </button>
        </div>
      </div>
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
          <div className="w-[22%] h-full bg-white"></div>
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

function StepConfirmOrder({ onCancel, onNext, phone }: { onCancel: () => void, onNext: () => void, phone?: string }) {
  const maskedPhone = phone && phone.length === 10 ? `${phone.slice(0, 4)}-***-${phone.slice(7)}` : '';

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className=" bg-[#2E7D32]  p-8 text-white flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold text-center">確認您的訂單</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[33%] h-full bg-white"></div>
        </div>
      </header>
      
      <main className="flex-1 min-h-0 p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 overflow-y-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-4 border-[#2E7D32] shrink-0">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#2E7D32] mb-6 sm:mb-8 border-b-4 border-gray-100 pb-4 sm:pb-6 uppercase tracking-wider">訂單明細</h3>
          
          {maskedPhone && (
            <div className="flex justify-between items-center mb-6 sm:mb-8 text-xl sm:text-3xl border-b-2 border-dashed border-gray-200 pb-4 sm:pb-6">
              <span className="font-bold text-gray-500">聯絡手機</span>
              <span className="font-black text-gray-900">{maskedPhone}</span>
            </div>
          )}

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
          <div className="w-[44%] h-full bg-white"></div>
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
          <div className="w-[55%] h-full bg-white"></div>
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
          <div className="w-[66%] h-full bg-white"></div>
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
          <div className="w-[77%] h-full bg-white"></div>
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
          <div className="w-[88%] h-full bg-white"></div>
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
  const [serial] = useState(() => 'A' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0'));
  
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
           className="w-full max-w-[420px] bg-white p-6 sm:p-8 landscape:p-6 shadow-xl rounded-sm relative border-t-8 border-gray-400 shrink-0 print:border-none print:shadow-none print:p-[2mm] print:m-0 print:w-full print:max-w-none print:static"
         >
            <div className="absolute top-0 left-0 w-full border-t-8 border-dashed border-gray-300 -mt-2 print:hidden"></div>
            
            <div className="text-center mt-2 sm:mt-4 landscape:mt-2 print:mt-0">
               <h3 className="text-3xl sm:text-5xl landscape:text-3xl font-black text-gray-900 tracking-widest border-b-4 border-gray-100 pb-6 sm:pb-8 mb-6 sm:mb-8 landscape:pb-4 landscape:mb-4 print:border-b-2 print:pb-4 print:mb-4">取餐收據</h3>
               
               <div className="text-left py-2 sm:py-4 print:py-0">
                  <p className="text-lg sm:text-2xl text-gray-500 font-extrabold mb-2 sm:mb-4 uppercase tracking-wider print:text-base print:mb-1 print:text-black">點餐內容</p>
                  <div className="flex justify-between items-center text-2xl sm:text-4xl font-black text-gray-900 print:text-2xl">
                     <span>活動贈品</span>
                     <span>x 1</span>
                  </div>
               </div>
               
               <div className="text-left pt-6 border-t-4 border-dashed border-gray-200 mt-6 print:mt-4 print:pt-4 print:border-black">
                  <p className="text-lg sm:text-2xl text-gray-500 font-extrabold mb-2 sm:mb-4 uppercase tracking-wider print:text-base print:mb-1 print:text-black">總計金額</p>
                  <p className="text-4xl sm:text-5xl font-black text-[#2E7D32] print:text-3xl print:text-black">NT$ 0</p>
               </div>

               <div className="bg-[#E8F5E9] border-4 border-[#2E7D32] rounded-2xl p-6 sm:p-8 mt-8 sm:mt-10 mb-4 sm:mb-6 print:border-2 print:border-black print:p-4 print:mt-6 print:mb-4 print:bg-transparent">
                  <p className="text-xl sm:text-2xl font-extrabold text-[#2E7D32] mb-2 sm:mb-4 uppercase tracking-wider print:text-base print:text-black print:mb-1">憑此編號取餐</p>
                  <p className="text-5xl sm:text-6xl leading-none font-black text-gray-900 tracking-wider font-mono print:text-4xl">{serial}</p>
               </div>

               <p className="text-lg sm:text-xl text-gray-400 font-extrabold pt-4 border-t-4 border-dashed border-gray-200 print:text-base print:text-black print:border-black">
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
            <button 
               onClick={() => window.print()}
               className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl shadow-sm text-2xl active:scale-95 transition-all"
            >
               🖨️ 點此列印收據
            </button>
            <br/>
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
                + "填寫時間,手機號碼,Q1: 接到陌生來電，對方要你操作ATM，下列哪一個是正確作法？,Q2: 過去一年內，您有參加過像今天這樣結合數位科技的活動體驗嗎？,Q3: 今天活動的整體感受如何？\n"
                + records.map(r => `"${new Date(r.timestamp).toLocaleString()}","${r.phone||''}","${r.q1||''}","${r.q2||''}","${r.q3||''}"`).join("\n");
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
      <main className="flex-1 overflow-auto p-4 sm:p-8">
        {records.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-50">
            <CheckCircle2 size={80} className="mb-4 text-gray-400" />
            <p className="text-2xl text-gray-500 font-bold">目前無問卷資料</p>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border-2 border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-gray-100 text-lg font-bold text-gray-700 border-b-2 border-gray-200">
                  <tr>
                    <th className="p-4 sm:p-6 whitespace-nowrap">填寫時間</th>
                    <th className="p-4 sm:p-6">聯絡手機</th>
                    <th className="p-4 sm:p-6">Q1: 接到陌生來電，對方要你操作ATM，下列哪一個是正確作法？</th>
                    <th className="p-4 sm:p-6">Q2: 過去一年內，您有參加過像今天這樣結合數位科技的活動體驗嗎？</th>
                    <th className="p-4 sm:p-6">Q3: 今天活動的整體感受如何？</th>
                  </tr>
                </thead>
                <tbody className="text-lg divide-y divide-gray-100">
                  {records.map((r, i) => {
                    const maskedPhone = r.phone && r.phone.length === 10 ? `${r.phone.slice(0, 4)}-***-${r.phone.slice(7)}` : (r.phone || '-');
                    return (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 sm:p-6 whitespace-nowrap text-gray-500 font-medium">
                          {new Date(r.timestamp).toLocaleString()}
                        </td>
                        <td className="p-4 sm:p-6 font-bold text-gray-800 whitespace-nowrap">{maskedPhone}</td>
                        <td className="p-4 sm:p-6 font-bold text-gray-800">{r.q1 || '-'}</td>
                        <td className="p-4 sm:p-6 font-bold text-gray-800">{r.q2 || '-'}</td>
                        <td className="p-4 sm:p-6 font-bold text-gray-800">{r.q3 || '-'}</td>
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

  const renderStep = () => {
    switch (step) {
      case 1: return <StepWelcome onNext={() => setStep(2)} onAdmin={() => setStep(10)} survey={survey} updateSurvey={(phone) => setSurvey(s => ({ ...s, phone }))} />;
      case 2: return <StepSelectItem onNext={() => setStep(3)} />;
      case 3: return <StepConfirmOrder onCancel={() => setStep(1)} onNext={() => setStep(4)} phone={survey.phone} />;
      case 4: return <StepPaymentMethod onNext={() => setStep(5)} />;
      case 5: return <StepPaymentSuccess onNext={() => setStep(6)} />;
      case 6: return <StepSurvey1 onNext={() => setStep(7)} value={survey.q1 || ''} update={(val) => setSurvey(s => ({ ...s, q1: val }))} />;
      case 7: return <StepSurvey2 onNext={() => setStep(8)} value={survey.q2 || ''} update={(val) => setSurvey(s => ({ ...s, q2: val }))} />;
      case 8: return <StepSurvey3 onNext={() => setStep(9)} valueObj={survey} updateObj={(k, val) => setSurvey(s => ({ ...s, [k]: val }))} />;
      case 9: return <StepReceipt onDone={reset} survey={survey} />;
      case 10: return <StepAdmin onClose={() => setStep(1)} />;
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
