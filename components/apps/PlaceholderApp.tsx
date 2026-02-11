import React from 'react';
import { useOS } from '../../context/OSContext';

interface PlaceholderAppProps {
  appName: string;
  bgColor: string;
  icon?: React.ReactNode;
}

const PlaceholderApp: React.FC<PlaceholderAppProps> = ({ appName, bgColor, icon }) => {
  const { closeApp } = useOS();

  return (
    <div className={`flex flex-col h-full ${bgColor} text-gray-900 pt-12`}>
      <div className="px-5 pb-2 border-b border-black/5 flex items-center justify-between">
        <button 
          onClick={closeApp}
          className="flex items-center gap-1 text-blue-500 active:opacity-50 transition-opacity font-semibold"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
           </svg>
           Início
        </button>
        <span className="font-bold text-lg">{appName}</span>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center">
              {icon ? icon : <span className="text-4xl font-bold text-gray-400">{appName.charAt(0)}</span>}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Bem-vindo ao {appName}</h2>
          <p className="text-gray-500 max-w-[250px]">
              Este é um aplicativo de demonstração para o simulador do iPhone 16.
          </p>
          <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full font-semibold shadow-lg active:scale-95 transition-transform">
              Continuar
          </button>
      </div>
    </div>
  );
};

export default PlaceholderApp;