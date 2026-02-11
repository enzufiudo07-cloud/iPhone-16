import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { AppID } from '../../types';

const StatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { wallpaper, currentApp } = useOS();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // Logic: 
  // 1. If inside an app, usually status bar is specific (e.g., black text for light apps, white for dark apps).
  // 2. If on Home Screen, strictly follow the wallpaper text color setting.
  
  let dynamicTextColor = 'text-white';

  if (!currentApp) {
      // On Home Screen, use wallpaper setting
      dynamicTextColor = wallpaper.textColor; 
  } else {
      // App Specific Logic
      switch (currentApp) {
          case AppID.SETTINGS:
          case AppID.GEMINI:
          case AppID.PHONE:
          case AppID.PHOTOS:
          case AppID.MAIL:
          case AppID.SAFARI:
              dynamicTextColor = 'text-black';
              break;
          case AppID.CLOCK:
          case AppID.CAMERA:
              dynamicTextColor = 'text-white';
              break;
          default:
              dynamicTextColor = 'text-black';
      }
  }

  return (
    <div className={`absolute top-0 w-full px-6 pt-3 flex justify-between items-center text-sm font-semibold z-50 pointer-events-none transition-colors duration-300 ${dynamicTextColor}`}>
      <div className="w-1/3">
        <span>{formatTime(time)}</span>
      </div>
      <div className="w-1/3 flex justify-end gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415z" clipRule="evenodd" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.633 1.24l-1.957.652a3 3 0 01-1.486 0l-1.957-.652a1 1 0 01-.633-1.24A3.989 3.989 0 013 15a3.989 3.989 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
        </svg>
        <div className="flex items-center space-x-0.5">
           <div className="h-3 w-6 border-2 border-current rounded-sm relative opacity-80">
             <div className="h-full bg-current absolute left-0 top-0 w-[80%]"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;