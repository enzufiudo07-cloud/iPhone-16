import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';

const PhoneApp: React.FC = () => {
  const { closeApp } = useOS();
  const [number, setNumber] = useState('');
  const [scaryMode, setScaryMode] = useState(false);

  const handlePress = (digit: string) => {
    if (number.length < 15) {
      setNumber(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (number === '666') {
      triggerEasterEgg();
    } else {
      // Normal simulation just clears
      setTimeout(() => setNumber(''), 500);
    }
  };

  const triggerEasterEgg = () => {
    setScaryMode(true);
    // Play scary effect visually
    setTimeout(() => {
      // Close app after message
      closeApp();
    }, 4000);
  };

  if (scaryMode) {
    return (
      <div className="h-full w-full bg-black flex items-center justify-center p-6 text-center animate-pulse z-50">
        <h1 className="text-3xl font-bold text-red-600 tracking-widest leading-relaxed">
          VOCÊ ESTÁ JOGANDO DE MADRUGADA?<br/><br/>
          TCHAU TCHAU TCHAU<br/>VOCÊ...
        </h1>
      </div>
    );
  }

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  return (
    <div className="h-full flex flex-col bg-white text-black">
      {/* Header */}
      <div className="pt-12 px-4 pb-2 bg-transparent">
        <button 
          onClick={closeApp} 
          className="text-blue-500 font-medium flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Início
        </button>
      </div>

      {/* Display */}
      <div className="flex-1 flex flex-col items-center justify-end pb-8">
        <div className="text-4xl font-light mb-2 h-12 tracking-wide truncate px-4 w-full text-center">
          {number}
        </div>
        {number && (
           <button onClick={handleBackspace} className="text-gray-400 text-sm mb-4">
             Apagar
           </button>
        )}
      </div>

      {/* Keypad */}
      <div className="px-8 pb-12">
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 mb-6">
          {keys.map(k => (
            <button
              key={k}
              onClick={() => handlePress(k)}
              className="w-[72px] h-[72px] rounded-full bg-gray-100 active:bg-gray-300 transition-colors flex flex-col items-center justify-center"
            >
              <span className="text-3xl font-medium text-gray-800">{k}</span>
              {k === '1' && <span className="text-[9px] text-transparent">_</span>}
              {k === '2' && <span className="text-[9px] font-bold text-gray-400 tracking-widest">ABC</span>}
              {k === '3' && <span className="text-[9px] font-bold text-gray-400 tracking-widest">DEF</span>}
              {k === '4' && <span className="text-[9px] font-bold text-gray-400 tracking-widest">GHI</span>}
              {k === '5' && <span className="text-[9px] font-bold text-gray-400 tracking-widest">JKL</span>}
              {k === '6' && <span className="text-[9px] font-bold text-gray-400 tracking-widest">MNO</span>}
              {k === '7' && <span className="text-[9px] font-bold text-gray-400 tracking-widest">PQRS</span>}
              {k === '8' && <span className="text-[9px] font-bold text-gray-400 tracking-widest">TUV</span>}
              {k === '9' && <span className="text-[9px] font-bold text-gray-400 tracking-widest">WXYZ</span>}
            </button>
          ))}
        </div>

        {/* Call Button */}
        <div className="flex justify-center">
          <button 
            onClick={handleCall}
            className="w-[72px] h-[72px] rounded-full bg-green-500 active:bg-green-600 transition-colors flex items-center justify-center shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.8-6.62-6.63l1.97-1.57c.26-.29.35-.69.24-1.05a17.93 17.93 0 01-.56-3.53c0-.54-.45-.99-.99-.99H4.19C3.65 3.25 3 3.25 3 4.19c0 9.27 7.56 16.82 16.83 16.82.93 0 .94-.65.94-1.19v-3.44c0-.54-.45-.99-.99-.99z"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Tab Bar Sim */}
      <div className="h-20 bg-gray-50 border-t border-gray-200 flex justify-around items-start pt-3 text-gray-400 text-[10px] font-medium">
         <div className="flex flex-col items-center gap-1">
             <div className="w-6 h-6 rounded-full bg-gray-300"></div>
             Favoritos
         </div>
         <div className="flex flex-col items-center gap-1">
             <div className="w-6 h-6 rounded-full bg-gray-300"></div>
             Recentes
         </div>
         <div className="flex flex-col items-center gap-1">
             <div className="w-6 h-6 rounded-full bg-gray-300"></div>
             Contatos
         </div>
         <div className="flex flex-col items-center gap-1 text-blue-500">
             <div className="w-6 h-6 rounded-full bg-blue-500"></div>
             Teclado
         </div>
         <div className="flex flex-col items-center gap-1">
             <div className="w-6 h-6 rounded-full bg-gray-300"></div>
             Correio
         </div>
      </div>
    </div>
  );
};

export default PhoneApp;