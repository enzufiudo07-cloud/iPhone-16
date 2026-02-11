import React from 'react';
import { useOS } from '../../context/OSContext';

const StoreApp: React.FC = () => {
  const { closeApp, credits, spendCredits, installApp, installedAppIds, addNotification } = useOS();

  const storeItems = [
    {
      id: 'GAME_FLAPPY',
      name: 'Flappy Bird',
      price: 0,
      description: 'O clássico viciante.',
      iconColor: 'bg-yellow-400'
    },
    {
      id: 'GAME_CYBER',
      name: 'Cyber Racing',
      price: 100,
      description: 'Corridas futuristas em alta velocidade.',
      iconColor: 'bg-purple-600'
    },
    {
      id: 'APP_PRO_CAM',
      name: 'Pro Camera',
      price: 50,
      description: 'Filtros profissionais para fotos.',
      iconColor: 'bg-black'
    },
    {
      id: 'GAME_SPACE',
      name: 'Space Miner',
      price: 75,
      description: 'Explore o cosmos e fique rico.',
      iconColor: 'bg-indigo-500'
    }
  ];

  const handlePurchase = (item: typeof storeItems[0]) => {
    if (installedAppIds.includes(item.id)) return;

    if (item.price === 0) {
      installApp(item.id);
      addNotification('App Store', `${item.name} instalado com sucesso!`, 'Store');
    } else {
      if (spendCredits(item.price)) {
        installApp(item.id);
        addNotification('App Store', `Compra realizada: ${item.name}`, 'Store');
      } else {
        addNotification('Erro', 'Créditos insuficientes.', 'Store');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-black pt-12">
        <div className="px-5 pb-4 border-b flex items-center justify-between">
            <button onClick={closeApp} className="text-blue-500 font-medium">Início</button>
            <h1 className="text-xl font-bold">App Store</h1>
            <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
               <span className="text-xs font-bold text-gray-500">Créditos:</span>
               <span className="text-sm font-bold text-blue-600">{credits}</span>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Featured Banner */}
            <div className="w-full h-40 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-end">
                <span className="text-xs font-bold opacity-70 uppercase">Destaque</span>
                <h2 className="text-2xl font-bold">Jogos Incríveis</h2>
                <p className="text-sm opacity-90">Use seus créditos agora.</p>
            </div>

            <h3 className="text-lg font-bold">Populares</h3>
            <div className="space-y-4">
                {storeItems.map(item => {
                   const isInstalled = installedAppIds.includes(item.id);
                   return (
                     <div key={item.id} className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl ${item.iconColor} shadow-sm`}></div>
                        <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <button 
                          onClick={() => handlePurchase(item)}
                          disabled={isInstalled}
                          className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all ${
                             isInstalled 
                               ? 'bg-gray-200 text-gray-500' 
                               : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          {isInstalled ? 'ABRIR' : (item.price === 0 ? 'OBTER' : `${item.price} C`)}
                        </button>
                     </div>
                   );
                })}
            </div>
        </div>
    </div>
  );
};

export default StoreApp;