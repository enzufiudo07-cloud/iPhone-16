import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

const BootScreen: React.FC = () => {
  const { setUserName, setIsBooted } = useOS();
  const [step, setStep] = useState<'input' | 'loading'>('input');
  const [name, setName] = useState('');
  const [progress, setProgress] = useState(0);

  const handleStart = () => {
    if (!name.trim()) return;
    setUserName(name);
    setStep('loading');
  };

  useEffect(() => {
    if (step === 'loading') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsBooted(true), 500); // Small delay after 100%
            return 100;
          }
          return prev + 2; // Speed of loading
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step, setIsBooted]);

  if (step === 'input') {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center p-8 text-white z-50">
        <div className="flex flex-col items-center mb-10">
            <h2 className="text-gray-500 text-sm tracking-widest uppercase mb-2">iPhone 16 Simulator</h2>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">Hello</h1>
        </div>
        
        <div className="w-full max-w-xs space-y-4">
            <label className="text-sm text-gray-400 block text-center">Digite seu nome para configurar</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-lg text-center focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Seu nome"
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            />
            <button 
              onClick={handleStart}
              disabled={!name.trim()}
              className={`w-full py-3 rounded-full font-semibold transition-all ${name.trim() ? 'bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
            >
              Iniciar
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center z-50">
      {/* Apple Logo Simulation */}
      <svg className="w-24 h-24 text-white mb-12" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
      </svg>
      
      {/* Loading Bar */}
      <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
         <div 
           className="h-full bg-white transition-all duration-100 ease-out" 
           style={{ width: `${progress}%` }}
         />
      </div>
      <p className="mt-4 text-gray-500 text-xs font-medium tracking-wide">LOADING IOS 17...</p>
    </div>
  );
};

export default BootScreen;