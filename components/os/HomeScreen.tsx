import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { AppID } from '../../types';

// Wrapper for icons to apply tint overlay if active
const IconWrapper = ({ children, iconTint }: { children: React.ReactNode, iconTint: string | null }) => {
  if (iconTint) {
      // In tinted mode, we usually make the background black/dark and the icon the tint color
      return (
         <div className="w-full h-full bg-zinc-900 rounded-[14px] flex items-center justify-center relative overflow-hidden transition-all duration-500">
            <div style={{ color: iconTint }} className="[&>svg]:w-9 [&>svg]:h-9 [&>div>svg]:w-9 [&>div>svg]:h-9">
                {React.isValidElement(children) 
                  ? React.cloneElement(children as React.ReactElement, { className: 'w-8 h-8' })
                  : children}
            </div>
         </div>
      );
  }
  return <>{children}</>;
};

const HomeScreen: React.FC = () => {
  const { wallpaper, openApp, iconTint, setIconTint, credits, spendCredits, addNotification } = useOS();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomize, setShowCustomize] = useState(false);

  // Tint Logic
  const handleUnlockTint = (color: string) => {
      if (iconTint === color) {
          setIconTint(null); // Reset
          return;
      }
      if (credits >= 20) {
          if (spendCredits(20)) {
              setIconTint(color);
              addNotification('Personalização', 'Cor desbloqueada!', 'Home');
          }
      } else {
          addNotification('Erro', 'Créditos insuficientes (20C)', 'Home');
      }
  };

  const allApps = [
    {
      id: AppID.GEMINI,
      name: 'Google AI',
      icon: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[14px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/>
          </svg>
          <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-70 blur-[1px]"></div>
        </div>
      )
    },
    {
      id: AppID.STORE,
      name: 'App Store',
      icon: (
        <div className="w-full h-full bg-blue-600 rounded-[14px] flex items-center justify-center relative">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
             <path d="M10.875 18.75a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z" />
             <path fillRule="evenodd" d="M12 1.25a.75.75 0 01.75.75v1.442a8.236 8.236 0 013.822 1.583l1.02-.998a.75.75 0 011.06 1.06l-1.012.99a8.234 8.234 0 012.012 3.173h1.41a.75.75 0 010 1.5h-1.41a8.252 8.252 0 01-15.304 0H3.012a.75.75 0 010-1.5h1.41a8.234 8.234 0 012.012-3.173l-1.012-.99a.75.75 0 011.06-1.06l1.02.998A8.236 8.236 0 0111.25 3.442V2a.75.75 0 01.75-.75zM12 17.25a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" clipRule="evenodd" />
           </svg>
        </div>
      )
    },
    {
      id: AppID.SETTINGS,
      name: 'Ajustes',
      icon: (
        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-[14px] flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/90" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
             </svg>
        </div>
      )
    },
    {
      id: AppID.PHOTOS,
      name: 'Fotos',
      icon: (
        <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
           <div className="w-full h-full relative">
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-orange-300 blur-sm transform scale-125"></div>
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-yellow-300 blur-sm transform scale-125"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-300 blur-sm transform scale-125"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-300 blur-sm transform scale-125"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-1 h-8 bg-white rounded-full absolute rotate-0"></div>
                 <div className="w-1 h-8 bg-white rounded-full absolute rotate-45"></div>
                 <div className="w-1 h-8 bg-white rounded-full absolute rotate-90"></div>
                 <div className="w-1 h-8 bg-white rounded-full absolute -rotate-45"></div>
              </div>
           </div>
        </div>
      )
    },
    {
      id: AppID.CAMERA,
      name: 'Câmera',
      icon: (
        <div className="w-full h-full bg-[#E5E5E5] rounded-[14px] flex items-center justify-center overflow-hidden relative border border-gray-300">
           <div className="w-[42px] h-[42px] bg-gradient-to-br from-[#333] to-[#111] rounded-full flex items-center justify-center shadow-lg relative">
              <div className="w-[30px] h-[30px] bg-[#1a1a1a] rounded-full border-[1.5px] border-[#444] flex items-center justify-center shadow-inner relative">
                  <div className="w-[18px] h-[18px] bg-gradient-to-tr from-[#000] to-[#1a2a4a] rounded-full border border-[#222]"></div>
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-400/60 rounded-full blur-[0.5px]"></div>
              </div>
           </div>
           <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_2px_rgba(255,215,0,0.8)] z-10"></div>
        </div>
      )
    },
    {
      id: AppID.MAIL,
      name: 'Mail',
      icon: (
        <div className="w-full h-full bg-blue-500 rounded-[14px] flex items-center justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
           </svg>
        </div>
      )
    },
    {
      id: AppID.NOTES,
      name: 'Notas',
      icon: (
        <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 w-full h-3 bg-yellow-400/90"></div>
           <div className="flex flex-col gap-1.5 w-full px-3 pt-4">
              <div className="w-full h-1 bg-gray-200 rounded-full"></div>
              <div className="w-3/4 h-1 bg-gray-200 rounded-full"></div>
              <div className="w-1/2 h-1 bg-gray-200 rounded-full"></div>
           </div>
        </div>
      )
    },
     {
      id: AppID.MAPS,
      name: 'Mapas',
      icon: (
        <div className="w-full h-full bg-green-100 rounded-[14px] flex items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-8 h-8 bg-blue-400 rounded-bl-full z-10"></div>
           <div className="absolute bottom-0 left-0 w-8 h-8 bg-pink-400 rounded-tr-full z-0"></div>
           <div className="absolute w-1 h-full bg-yellow-400 transform rotate-45 border-l border-r border-orange-400"></div>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 absolute z-20 top-2 left-2" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
           </svg>
        </div>
      )
    },
    {
      id: AppID.CLOCK,
      name: 'Relógio',
      icon: (
        <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center relative overflow-hidden border border-gray-700">
           <div className="w-[52px] h-[52px] rounded-full bg-black border border-white relative flex items-center justify-center">
             <div className="absolute w-0.5 h-1.5 bg-gray-400 top-1"></div>
             <div className="absolute w-0.5 h-1.5 bg-gray-400 bottom-1"></div>
             <div className="absolute w-1.5 h-0.5 bg-gray-400 left-1"></div>
             <div className="absolute w-1.5 h-0.5 bg-gray-400 right-1"></div>
             <div className="absolute w-0.5 h-4 bg-white bottom-1/2 left-1/2 origin-bottom transform -translate-x-1/2 rotate-45"></div>
             <div className="absolute w-0.5 h-5 bg-orange-500 bottom-1/2 left-1/2 origin-bottom transform -translate-x-1/2 -rotate-12"></div>
             <div className="w-1.5 h-1.5 bg-orange-500 rounded-full z-10"></div>
           </div>
        </div>
      )
    },
    {
        id: AppID.PHONE,
        name: 'Telefone',
        icon: (
             <div className="w-full h-full bg-green-500 rounded-[14px] flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                 </svg>
            </div>
        )
    },
    {
        id: AppID.SAFARI,
        name: 'Safari',
        icon: (
            <div className="w-full h-full bg-blue-500 rounded-[14px] flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                 </svg>
            </div>
        )
    }
  ];

  const dockApps = allApps.filter(app => [AppID.PHONE, AppID.SAFARI].includes(app.id as AppID));
  const gridApps = allApps.filter(app => !dockApps.find(da => da.id === app.id));

  const filteredApps = searchQuery 
    ? allApps.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : gridApps;

  return (
    <div 
      className="w-full h-full pt-14 px-5 pb-5 flex flex-col justify-between transition-all duration-300 relative"
      style={{
        backgroundImage: `url(${wallpaper.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* App Grid */}
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 content-start h-full relative z-0">
        {filteredApps.map((app) => (
          <div key={app.id} className="flex flex-col items-center gap-1.5 group animate-slide-down-fade">
            <button 
              onClick={() => openApp(app.id as AppID)}
              className="w-[60px] h-[60px] shadow-sm rounded-[14px] transition-transform duration-200 active:scale-90"
            >
               <IconWrapper iconTint={iconTint}>{app.icon}</IconWrapper>
            </button>
            <span className={`text-[11px] font-medium leading-tight tracking-tight drop-shadow-md ${wallpaper.textColor} group-active:opacity-70`}>{app.name}</span>
          </div>
        ))}
      </div>

      {/* Edit Mode / Customize Overlay */}
      {showCustomize && (
          <div className="absolute inset-x-0 bottom-24 mx-4 p-4 bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10 z-20 animate-slide-down-fade">
              <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-bold text-sm">Personalizar Ícones</h3>
                  <button onClick={() => setShowCustomize(false)} className="bg-gray-700/50 rounded-full p-1 text-white"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
              </div>
              <div className="flex justify-between gap-2 mb-2">
                 <button onClick={() => handleUnlockTint('#ef4444')} className="w-8 h-8 rounded-full bg-red-500 border-2 border-transparent hover:scale-110 transition-transform"></button>
                 <button onClick={() => handleUnlockTint('#f59e0b')} className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-transparent hover:scale-110 transition-transform"></button>
                 <button onClick={() => handleUnlockTint('#10b981')} className="w-8 h-8 rounded-full bg-green-500 border-2 border-transparent hover:scale-110 transition-transform"></button>
                 <button onClick={() => handleUnlockTint('#3b82f6')} className="w-8 h-8 rounded-full bg-blue-500 border-2 border-transparent hover:scale-110 transition-transform"></button>
                 <button onClick={() => handleUnlockTint('#8b5cf6')} className="w-8 h-8 rounded-full bg-purple-500 border-2 border-transparent hover:scale-110 transition-transform"></button>
                 <button onClick={() => setIconTint(null)} className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-black text-xs font-bold">X</button>
              </div>
              <p className="text-[10px] text-gray-300 text-center mt-1">Custo: 20 Créditos para desbloquear cor</p>
          </div>
      )}

      {/* Footer Area */}
      <div className="flex flex-col gap-5 items-center pb-2 relative z-10">
          
          {/* Functional Search Pill + Customize Toggle */}
          <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-sm transition-all focus-within:bg-white/40 focus-within:w-[180px] w-auto`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                      type="text" 
                      placeholder="Buscar"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none outline-none text-white text-xs font-medium placeholder-white/80 w-full min-w-[50px]"
                  />
              </div>
              <button onClick={() => setShowCustomize(!showCustomize)} className="bg-white/20 backdrop-blur-md p-1.5 rounded-full border border-white/20 text-white active:bg-white/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
              </button>
          </div>

          {/* Dock */}
          <div className="w-full bg-white/20 backdrop-blur-2xl rounded-[28px] p-3 flex justify-around items-center">
              {dockApps.map(app => (
                 <button key={app.id} onClick={() => openApp(app.id as AppID)} className="w-[55px] h-[55px] shadow-lg active:brightness-90 transition-all rounded-[14px] overflow-hidden">
                     <IconWrapper iconTint={iconTint}>{app.icon}</IconWrapper>
                 </button>
              ))}
               {/* Messages Placeholder */}
               <button onClick={() => {}} className="w-[55px] h-[55px] rounded-[14px] flex items-center justify-center shadow-lg active:brightness-90 transition-all overflow-hidden">
                 <IconWrapper iconTint={iconTint}>
                     <div className="w-full h-full bg-green-400 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                     </div>
                 </IconWrapper>
              </button>
               {/* Music Placeholder */}
               <button onClick={() => {}} className="w-[55px] h-[55px] rounded-[14px] flex items-center justify-center shadow-lg active:brightness-90 transition-all overflow-hidden">
                 <IconWrapper iconTint={iconTint}>
                     <div className="w-full h-full bg-red-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                     </div>
                 </IconWrapper>
              </button>
          </div>
      </div>
    </div>
  );
};

export default HomeScreen;