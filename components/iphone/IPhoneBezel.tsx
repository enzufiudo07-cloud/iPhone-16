import React from 'react';
import StatusBar from './StatusBar';
import DynamicIsland from './DynamicIsland';
import { useOS } from '../../context/OSContext';

interface IPhoneBezelProps {
  children: React.ReactNode;
}

const IPhoneBezel: React.FC<IPhoneBezelProps> = ({ children }) => {
  const { notifications, closeApp, currentApp } = useOS();

  return (
    <div className="relative w-[360px] h-[780px] bg-gray-900 rounded-[55px] shadow-[0_0_0_12px_#3d3d3d,0_0_0_16px_#1a1a1a,0_20px_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden border-[6px] border-[#3a3a3a] ring-1 ring-white/10">
      
      {/* Screen Content Area */}
      <div className="relative w-full h-full bg-black overflow-hidden rounded-[46px]">
        <StatusBar />
        <DynamicIsland />
        
        {/* Main OS Content */}
        {children}

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[140px] h-[5px] bg-white rounded-full z-50 cursor-pointer hover:bg-gray-200 transition-colors"
             onClick={closeApp}>
        </div>

        {/* Notification Toast (Simulated) */}
        <div className="absolute top-14 left-0 w-full px-3 flex flex-col gap-3 pointer-events-none z-[70]">
           {notifications.slice(0, 3).map((notif, index) => (
             <div 
               key={notif.id} 
               className="bg-white/90 dark:bg-black/70 backdrop-blur-2xl border border-white/20 p-3.5 rounded-[22px] shadow-2xl shadow-black/20 text-black dark:text-white animate-slide-down-fade flex items-start gap-3 pointer-events-auto transform transition-all duration-300"
               style={{
                 transitionDelay: `${index * 100}ms`
               }}
             >
                 <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm overflow-hidden bg-white">
                    {/* App Icon mini */}
                    {notif.app === 'Gemini' ? (
                       <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/></svg>
                       </div>
                    ) : (
                       <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                          {notif.app.slice(0,1)}
                       </div>
                    )}
                 </div>
                 <div className="overflow-hidden flex-1 pt-0.5">
                     <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="font-bold text-[13px] tracking-tight">{notif.title}</h4>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Agora</span>
                     </div>
                     <p className="text-[13px] text-gray-600 dark:text-gray-200 truncate leading-snug">{notif.message}</p>
                 </div>
             </div>
           ))}
        </div>
      </div>
      
      {/* Physical Buttons (Visual only) */}
      <div className="absolute top-28 -left-[18px] w-[6px] h-[26px] bg-[#2a2a2a] rounded-l-md shadow-inner"></div> {/* Action Button */}
      <div className="absolute top-44 -left-[18px] w-[6px] h-[50px] bg-[#2a2a2a] rounded-l-md shadow-inner"></div> {/* Volume Up */}
      <div className="absolute top-60 -left-[18px] w-[6px] h-[50px] bg-[#2a2a2a] rounded-l-md shadow-inner"></div> {/* Volume Down */}
      <div className="absolute top-48 -right-[18px] w-[6px] h-[80px] bg-[#2a2a2a] rounded-r-md shadow-inner"></div> {/* Power */}
    </div>
  );
};

export default IPhoneBezel;