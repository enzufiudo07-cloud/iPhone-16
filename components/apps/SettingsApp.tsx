import React from 'react';
import { useOS } from '../../context/OSContext';
import { WALLPAPERS } from '../../constants';

const SettingsApp: React.FC = () => {
  const { 
      wallpaper, setWallpaper, 
      notificationsEnabled, setNotificationsEnabled, 
      userName, closeApp,
      credits, addCredits,
      storageUsed, clearStorage
  } = useOS();

  return (
    <div className="flex flex-col h-full bg-[#f2f2f7] text-black pt-12">
      <div className="px-5 pb-4 bg-white/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200">
        <button 
          onClick={closeApp}
          className="flex items-center gap-1 text-blue-500 mb-2 active:opacity-50 transition-opacity"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
           </svg>
           <span className="text-base font-medium">Início</span>
        </button>
        <h1 className="text-3xl font-bold">Ajustes</h1>
        
        {/* Profile Card */}
        <div className="flex items-center gap-4 mt-6 bg-white p-4 rounded-2xl shadow-sm cursor-pointer active:scale-[0.99] transition-transform">
             <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gray-300 to-gray-400 flex items-center justify-center text-2xl font-bold text-white shadow-inner">
               {userName.charAt(0).toUpperCase()}
             </div>
             <div className="flex-1">
                <h2 className="font-semibold text-lg">{userName}</h2>
                <p className="text-xs text-gray-500">Apple ID, iCloud+, Mídia e Compras</p>
             </div>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
             </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-6 no-scrollbar pb-10 pt-4">
        
        {/* General Settings */}
        <section className="bg-white rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
           {/* Notifications */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-500 p-1.5 rounded-lg text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Notificações</span>
              </div>
              <button 
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${notificationsEnabled ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Storage */}
            <div className="p-4">
               <div className="flex items-center justify-between mb-2">
                   <div className="flex items-center gap-3">
                        <div className="bg-gray-500 p-1.5 rounded-lg text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium">Armazenamento</span>
                   </div>
                   <span className="text-xs text-gray-500">{(storageUsed / 1024).toFixed(1)} GB de 128 GB</span>
               </div>
               <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                   <div className="h-full bg-blue-500" style={{ width: `${(storageUsed / 128000) * 100}%` }}></div>
               </div>
               <button onClick={clearStorage} className="w-full py-2 text-blue-500 text-sm font-medium bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                   Limpar Cache e Lixo
               </button>
            </div>
        </section>

        {/* Credits Section */}
        <section className="bg-white rounded-xl overflow-hidden shadow-sm p-4">
             <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-400 p-1.5 rounded-lg text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                     <span className="text-sm font-medium block">Meus Créditos</span>
                     <span className="text-xs text-gray-500">Use na App Store e Personalização</span>
                </div>
                <span className="text-xl font-bold text-gray-800">{credits}</span>
             </div>
             <button onClick={() => addCredits(50)} className="w-full py-2 text-yellow-600 text-sm font-medium bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                 Ganhar +50 Créditos (Simulação)
             </button>
        </section>

        {/* Wallpaper Section */}
        <section>
          <h3 className="text-xs font-semibold text-gray-500 uppercase ml-3 mb-2">Mudar de Tela</h3>
          <div className="grid grid-cols-2 gap-3">
             {WALLPAPERS.map(wp => (
                <button
                  key={wp.id}
                  onClick={() => setWallpaper(wp)}
                  className={`relative aspect-[9/16] rounded-xl overflow-hidden shadow-sm border-2 transition-all ${wallpaper.id === wp.id ? 'border-blue-500 scale-95' : 'border-transparent hover:scale-[0.98]'}`}
                >
                   <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" />
                   <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-md p-2">
                      <p className="text-white text-xs font-medium text-center">{wp.name}</p>
                   </div>
                   {wallpaper.id === wp.id && (
                     <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                     </div>
                   )}
                </button>
             ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default SettingsApp;