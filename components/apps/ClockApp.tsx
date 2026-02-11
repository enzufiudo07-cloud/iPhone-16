import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';

const ClockApp: React.FC = () => {
  const { closeApp } = useOS();
  const [mode, setMode] = useState<'clock' | 'stopwatch'>('stopwatch'); // Default to stopwatch as requested
  const [time, setTime] = useState(new Date());
  
  // Stopwatch states
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Clock updater
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Stopwatch logic
    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const toggleStopwatch = () => setIsRunning(!isRunning);
  const resetStopwatch = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatStopwatch = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col bg-black text-white">
        {/* Header (Hidden mostly in full screen apps but keeping consistent structure) */}
        <div className="pt-12 px-5 pb-2 flex justify-between items-center">
            <button 
            onClick={closeApp} 
            className="flex items-center gap-1 text-orange-400 font-medium"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Início
            </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
            {mode === 'stopwatch' ? (
                <div className="flex flex-col items-center w-full">
                    <div className="text-7xl font-light tabular-nums tracking-wider mb-24">
                        {formatStopwatch(elapsedTime)}
                    </div>
                    
                    <div className="flex w-full justify-between px-8">
                        <button 
                            onClick={resetStopwatch}
                            className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center border-2 border-black active:bg-gray-700 transition-colors"
                        >
                            <span className="text-gray-200 font-medium">Zerar</span>
                        </button>
                        <button 
                            onClick={toggleStopwatch}
                            className={`w-20 h-20 rounded-full flex items-center justify-center border-2 border-black transition-colors ${isRunning ? 'bg-red-900/50 text-red-500' : 'bg-green-900/50 text-green-400'}`}
                        >
                            <span className="font-medium">{isRunning ? 'Parar' : 'Iniciar'}</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                     <span className="text-gray-400 text-lg uppercase tracking-widest mb-2">Horário Local</span>
                     <span className="text-6xl font-bold">{time.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
                     <span className="text-xl text-gray-500 mt-2">{time.toLocaleDateString('pt-BR', {weekday: 'long', day: 'numeric', month: 'long'})}</span>
                </div>
            )}
        </div>

        {/* Bottom Tabs */}
        <div className="h-20 bg-gray-900/50 backdrop-blur-md border-t border-gray-800 flex justify-around items-start pt-3">
             <button onClick={() => setMode('clock')} className={`flex flex-col items-center gap-1 ${mode === 'clock' ? 'text-orange-400' : 'text-gray-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[10px]">Relógio</span>
             </button>
             <button onClick={() => setMode('stopwatch')} className={`flex flex-col items-center gap-1 ${mode === 'stopwatch' ? 'text-orange-400' : 'text-gray-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[10px]">Cronômetro</span>
             </button>
        </div>
    </div>
  );
};

export default ClockApp;