import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, CreditCard, Banknote, Printer } from 'lucide-react';
import { StepType, SurveyState } from '../types';
import elderlyCoupleImg from '../assets/images/elderly_couple_1779678308499.png';
import imeiLogoImg from '../assets/images/imei_logo_1779678454395.png';

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6 sm:p-8 text-center bg-[#FFF8E7] overflow-y-auto min-h-0 relative">
      <div className="flex flex-col items-center mt-12 sm:mt-16 shrink-0 w-full z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1B5E20] leading-snug tracking-widest mb-4">
          歡迎使用
        </h1>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1B5E20] leading-snug tracking-widest mb-12 sm:mb-16 whitespace-nowrap">
          高齡友善點餐體驗
        </h2>
        
        <button 
          onClick={onNext} 
          className="bg-[#2E7D32] text-white text-3xl sm:text-4xl font-black py-4 sm:py-6 px-12 sm:px-16 rounded-full shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none tracking-widest"
        >
          點我開始
        </button>
      </div>

      <div className="mt-8 shrink-0 w-full max-w-[400px] flex justify-center items-end relative z-0">
        <img 
          src={elderlyCoupleImg} 
          alt="Happy elderly couple" 
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain mix-blend-darken"
        />
      </div>
    </div>
  );
}

function StepSelectItem({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className="bg-[#2E7D32] p-8 text-white flex flex-col items-center gap-2">
        <div className="text-xl font-bold tracking-widest opacity-80 uppercase">Step 02 / 09</div>
        <h1 className="text-4xl font-extrabold text-center">請選擇您的餐點</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[22%] h-full bg-white"></div>
        </div>
      </header>
      <main className="flex-1 min-h-0 p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 overflow-y-auto">
        <div className="flex-1 flex flex-col items-center justify-center min-h-[260px] shrink-0">
          <div className="w-48 h-48 sm:w-64 sm:h-64 shrink-0 bg-white rounded-3xl flex items-center justify-center border-4 border-[#2E7D32] p-4 sm:p-8 overflow-hidden shadow-sm">
            <img 
               src={imeiLogoImg} 
               alt="義美贊助食品" 
               referrerPolicy="no-referrer"
               className="w-full h-full object-contain"
            />
          </div>
          <div className="mt-6 sm:mt-8 text-center space-y-2 sm:space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900">義美贊助食品</h2>
            <p className="text-2xl sm:text-3xl font-bold text-[#2E7D32]">單價: NT$ 0</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 shrink-0">
          <div className="flex flex-col items-center">
            <span className="text-sm sm:text-lg text-gray-500 font-bold uppercase tracking-wider">選擇數量</span>
            <span className="text-5xl sm:text-6xl font-black text-gray-900">1</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm sm:text-lg text-gray-500 font-bold uppercase tracking-wider">合計金額</span>
            <span className="text-5xl sm:text-6xl font-black text-[#2E7D32]">$0</span>
          </div>
        </div>
      </main>
      <footer className="p-4 sm:p-8 bg-gray-50 flex gap-6 shrink-0 border-t-2 border-gray-200/50">
        <button 
          onClick={onNext} 
          className="w-full bg-[#2E7D32] py-6 sm:py-10 rounded-2xl text-3xl sm:text-5xl font-black text-white shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none"
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
      <header className="bg-[#2E7D32] p-8 text-white flex flex-col items-center gap-2">
        <div className="text-xl font-bold tracking-widest opacity-80 uppercase">Step 03 / 09</div>
        <h1 className="text-4xl font-extrabold text-center">確認您的訂單</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[33%] h-full bg-white"></div>
        </div>
      </header>
      
      <main className="flex-1 min-h-0 p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 overflow-y-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-4 border-[#2E7D32] shrink-0">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#2E7D32] mb-6 sm:mb-8 border-b-4 border-gray-100 pb-4 sm:pb-6 uppercase tracking-wider">購物車明細</h3>
          
          <div className="flex justify-between items-center mb-8 sm:mb-10 text-2xl sm:text-4xl">
            <span className="font-bold text-gray-900 leading-snug">義美贊助食品</span>
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
          className="flex-[2] bg-[#2E7D32] py-6 sm:py-10 rounded-2xl text-3xl sm:text-5xl font-black text-white shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none"
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
      <header className="bg-[#2E7D32] p-8 text-white flex flex-col items-center gap-2">
        <div className="text-xl font-bold tracking-widest opacity-80 uppercase">Step 04 / 09</div>
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

        <div className="flex-1 flex flex-col gap-4 sm:gap-6 shrink-0 pb-4">
          <button 
            onClick={onNext} 
            className="flex-1 min-h-[160px] flex flex-col items-center justify-center bg-white border-[6px] border-[#0091D5] rounded-[24px] sm:rounded-[32px] shadow-lg active:scale-95 transition-transform select-none gap-4 sm:gap-6 shrink-0 py-6 sm:py-0"
          >
            <CreditCard className="text-[#0091D5] w-16 h-16 sm:w-[100px] sm:h-[100px]" />
            <span className="text-3xl sm:text-5xl font-black text-gray-900">悠遊卡 / 一卡通</span>
          </button>
          
          <button 
            onClick={onNext} 
            className="flex-1 min-h-[160px] flex flex-col items-center justify-center bg-white border-[6px] border-orange-500 rounded-[24px] sm:rounded-[32px] shadow-lg active:scale-95 transition-transform select-none gap-4 sm:gap-6 shrink-0 py-6 sm:py-0"
          >
            <Banknote className="text-orange-500 w-16 h-16 sm:w-[100px] sm:h-[100px]" />
            <span className="text-3xl sm:text-5xl font-black text-gray-900">現金支付</span>
          </button>
        </div>
      </main>
    </div>
  );
}

function StepPaymentSuccess({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className="bg-[#2E7D32] p-8 text-white flex flex-col items-center gap-2">
        <div className="text-xl font-bold tracking-widest opacity-80 uppercase">Step 05 / 09</div>
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
          className="w-32 h-32 sm:w-48 sm:h-48 shrink-0 bg-[#E8F5E9] border-4 border-[#2E7D32] rounded-3xl flex items-center justify-center mb-8 sm:mb-12 shadow-lg"
        >
          <CheckCircle2 className="text-[#2E7D32] w-16 h-16 sm:w-[100px] sm:h-[100px]" />
        </motion.div>
        
        <h2 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight mb-6 sm:mb-8 shrink-0">付款成功！</h2>
        <p className="text-2xl sm:text-3xl text-gray-600 font-bold leading-relaxed px-4 sm:px-8 text-center shrink-0">
          感謝您的參與，<br/>請協助我們完成一份簡單的問卷。
        </p>
      </main>

      <footer className="p-4 sm:p-8 bg-gray-50 flex gap-6 shrink-0 border-t-2 border-gray-200/50">
        <button 
          onClick={onNext} 
          className="w-full bg-[#2E7D32] text-white text-3xl sm:text-5xl font-black py-8 sm:py-10 rounded-2xl shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none"
        >
          開始填寫問卷
        </button>
      </footer>
    </div>
  );
}

function StepSurvey1({ onNext, value, update }: { onNext: () => void, value: string, update: (val: string) => void }) {
  const options = ['很好', '還不錯', '普通', '不太好', '很不好'];
  
  return (
    <div className="flex-1 flex flex-col bg-white min-h-0 relative">
      <header className="bg-[#2E7D32] p-8 text-white flex flex-col items-center gap-2">
        <div className="text-xl font-bold tracking-widest opacity-80 uppercase">Step 06 / 09</div>
        <h1 className="text-4xl font-extrabold text-center">問卷 1 / 3</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[66%] h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-4 sm:p-8 flex flex-col gap-4 sm:gap-8 bg-gray-50 overflow-y-auto">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border-4 border-gray-200 shadow-sm shrink-0">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 leading-snug">
            您覺得今天的科技體驗整體感受如何？
          </h2>
        </div>
        
        <div className="flex-1 flex flex-col gap-3 sm:gap-4 sm:gap-y-6 pb-4 sm:pb-8 shrink-0 min-h-[300px]">
          {options.map(opt => (
            <button 
              key={opt} 
              onClick={() => update(opt)}
              className={`flex-1 w-full min-h-[60px] text-2xl sm:text-4xl lg:text-5xl font-black rounded-2xl border-4 transition-colors select-none ${
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
          className="w-full disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed bg-[#2E7D32] text-white text-3xl sm:text-5xl font-black py-4 sm:py-10 rounded-2xl shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none"
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
      <header className="bg-[#2E7D32] p-8 text-white flex flex-col items-center gap-2">
        <div className="text-xl font-bold tracking-widest opacity-80 uppercase">Step 07 / 09</div>
        <h1 className="text-4xl font-extrabold text-center">問卷 2 / 3</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[77%] h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-4 sm:p-8 flex flex-col gap-4 sm:gap-8 bg-gray-50 overflow-y-auto">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border-4 border-gray-200 shadow-sm shrink-0">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 leading-snug">
            過去一年內，您有參加過像今天這樣結合數位科技的活動體驗嗎？
          </h2>
        </div>
        
        <div className="flex-1 flex flex-col gap-3 sm:gap-4 sm:gap-y-6 pb-4 sm:pb-8 shrink-0 min-h-[300px]">
          {options.map(opt => (
            <button 
              key={opt} 
              onClick={() => update(opt)}
              className={`flex-1 w-full min-h-[60px] text-2xl sm:text-4xl lg:text-5xl font-black rounded-2xl border-4 transition-colors select-none ${
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
          className="w-full disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed bg-[#2E7D32] text-white text-3xl sm:text-5xl font-black py-4 sm:py-10 rounded-2xl shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none"
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
      <header className="bg-[#2E7D32] p-8 text-white flex flex-col items-center gap-2">
        <div className="text-xl font-bold tracking-widest opacity-80 uppercase">Step 08 / 09</div>
        <h1 className="text-4xl font-extrabold text-center">問卷 3 / 3</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-[88%] h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-4 sm:p-8 flex flex-col gap-4 sm:gap-6 bg-gray-50 overflow-y-auto">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border-4 border-gray-200 shadow-sm shrink-0">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 leading-snug">
            今天活動的整體感受如何？
          </h2>
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 min-h-0">
          {options.map(opt => (
            <button 
              key={opt} 
              onClick={() => updateObj('q3', opt)}
              className={`w-full h-full min-h-0 text-xl sm:text-3xl lg:text-5xl font-black rounded-2xl border-4 transition-colors select-none ${
                valueObj.q3 === opt 
                  ? 'border-[#2E7D32] bg-[#E8F5E9] text-[#2E7D32]' 
                  : 'border-gray-300 bg-white text-gray-700 shadow-sm active:bg-gray-100'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex-[0.5] sm:flex-[0.8] min-h-[120px] lg:min-h-[220px] mt-4 flex shrink-0">
          <textarea 
            placeholder="如果有其他想說的話...(選填)"
            value={valueObj.text || ''}
            onChange={(e) => updateObj('text', e.target.value)}
            className="flex-1 w-full h-full p-4 sm:p-6 lg:p-8 border-4 border-gray-300 bg-white rounded-2xl text-xl sm:text-3xl lg:text-4xl focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/20 focus:outline-none transition-all shadow-sm resize-none"
          />
        </div>
      </main>

      <footer className="p-4 sm:p-8 bg-gray-50 flex gap-6 shrink-0 border-t-2 border-gray-200/50">
        <button 
          disabled={!valueObj.q3} 
          onClick={onNext} 
          className="w-full disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed bg-[#2E7D32] text-white text-3xl sm:text-5xl font-black py-4 sm:py-10 rounded-2xl shadow-lg shadow-green-900/20 active:scale-95 transition-transform select-none"
        >
          送出問卷
        </button>
      </footer>
    </div>
  );
}

function StepReceipt({ onDone }: { onDone: () => void }) {
  const [serial] = useState(() => 'A' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0'));
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex-1 flex flex-col bg-gray-100 min-h-0 relative">
      <header className="bg-[#2E7D32] p-8 text-white flex flex-col items-center gap-2">
        <div className="text-xl font-bold tracking-widest opacity-80 uppercase">Step 09 / 09</div>
        <h1 className="text-4xl font-extrabold text-center">領取收據</h1>
        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <div className="w-full h-full bg-white"></div>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-4 sm:p-8 flex flex-col items-center justify-center relative bg-gray-100 overflow-y-auto">
         <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 shrink-0">
           <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
           >
             <Printer className="text-[#2E7D32] mb-4 w-12 h-12 sm:w-16 sm:h-16" />
           </motion.div>
           <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-800">資料處理完成</h2>
         </div>

         <motion.div 
           initial={{ y: -80, opacity: 0 }} 
           animate={{ y: 0, opacity: 1 }} 
           transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
           className="w-full max-w-[420px] bg-white p-6 sm:p-8 shadow-xl rounded-sm relative border-t-8 border-gray-400 shrink-0"
         >
            <div className="absolute top-0 left-0 w-full border-t-8 border-dashed border-gray-300 -mt-2"></div>
            
            <div className="text-center mt-2 sm:mt-4">
               <h3 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-widest border-b-4 border-gray-100 pb-6 sm:pb-8 mb-6 sm:mb-8">取餐收據</h3>
               
               <div className="text-left py-2 sm:py-4">
                  <p className="text-lg sm:text-2xl text-gray-500 font-extrabold mb-2 sm:mb-4 uppercase tracking-wider">點餐內容</p>
                  <div className="flex justify-between items-center text-2xl sm:text-4xl font-black text-gray-900">
                     <span>義美贊助食品</span>
                     <span>x 1</span>
                  </div>
               </div>
               
               <div className="text-left pt-6 border-t-4 border-dashed border-gray-200 mt-6">
                  <p className="text-lg sm:text-2xl text-gray-500 font-extrabold mb-2 sm:mb-4 uppercase tracking-wider">總計金額</p>
                  <p className="text-4xl sm:text-5xl font-black text-[#2E7D32]">NT$ 0</p>
               </div>

               <div className="bg-[#E8F5E9] border-4 border-[#2E7D32] rounded-2xl p-6 sm:p-8 mt-8 sm:mt-10 mb-4 sm:mb-6">
                  <p className="text-xl sm:text-2xl font-extrabold text-[#2E7D32] mb-2 sm:mb-4 uppercase tracking-wider">憑此編號取餐</p>
                  <p className="text-5xl sm:text-6xl leading-none font-black text-gray-900 tracking-wider font-mono">{serial}</p>
               </div>

               <p className="text-lg sm:text-xl text-gray-400 font-extrabold pt-4 border-t-4 border-dashed border-gray-200">
                  {new Date().toLocaleString('zh-TW', { hour12: false })}
               </p>
            </div>
         </motion.div>
         
         <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.5 }}
           className="mt-8 sm:mt-12 text-2xl sm:text-3xl font-extrabold text-gray-500 text-center leading-relaxed shrink-0 pb-4"
         >
            請拿取下方印出的收據<br/>
            <span className="text-xl sm:text-2xl mt-2 inline-block opacity-80">(畫面將在 8 秒後自動返回)</span>
         </motion.p>
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
      case 1: return <StepWelcome onNext={() => setStep(2)} />;
      case 2: return <StepSelectItem onNext={() => setStep(3)} />;
      case 3: return <StepConfirmOrder onCancel={() => setStep(1)} onNext={() => setStep(4)} />;
      case 4: return <StepPaymentMethod onNext={() => setStep(5)} />;
      case 5: return <StepPaymentSuccess onNext={() => setStep(6)} />;
      case 6: return <StepSurvey1 onNext={() => setStep(7)} value={survey.q1 || ''} update={(val) => setSurvey(s => ({ ...s, q1: val }))} />;
      case 7: return <StepSurvey2 onNext={() => setStep(8)} value={survey.q2 || ''} update={(val) => setSurvey(s => ({ ...s, q2: val }))} />;
      case 8: return <StepSurvey3 onNext={() => setStep(9)} valueObj={survey} updateObj={(k, val) => setSurvey(s => ({ ...s, [k]: val }))} />;
      case 9: return <StepReceipt onDone={reset} />;
      default: return null;
    }
  };

  return (
    <div className="w-full h-[100dvh] sm:h-full max-w-[1920px] max-h-[1080px] bg-white shadow-2xl sm:rounded-3xl flex flex-col border-0 sm:border-[8px] lg:border-[16px] xl:border-[24px] sm:border-[#2E7D32] relative mx-auto overflow-hidden">
       <AnimatePresence mode="wait">
          <motion.div
             key={step}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             transition={{ duration: 0.2 }}
             className="flex-1 flex flex-col w-full h-full min-h-0 overflow-hidden"
          >
             {renderStep()}
          </motion.div>
       </AnimatePresence>
    </div>
  );
}
