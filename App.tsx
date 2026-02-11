import React from 'react';
import { OSProvider, useOS } from './context/OSContext';
import IPhoneBezel from './components/iphone/IPhoneBezel';
import BootScreen from './components/os/BootScreen';
import HomeScreen from './components/os/HomeScreen';
import SettingsApp from './components/apps/SettingsApp';
import GeminiApp from './components/apps/GeminiApp';
import PlaceholderApp from './components/apps/PlaceholderApp';
import PhoneApp from './components/apps/PhoneApp';
import ClockApp from './components/apps/ClockApp';
import StoreApp from './components/apps/StoreApp';
import SafariApp from './components/apps/SafariApp';
import { AppID } from './types';

const AppContent: React.FC = () => {
  const { isBooted, currentApp } = useOS();

  const renderContent = () => {
    if (!isBooted) {
      return <BootScreen />;
    }

    switch (currentApp) {
      case AppID.SETTINGS:
        return <SettingsApp />;
      case AppID.GEMINI:
        return <GeminiApp />;
      case AppID.PHONE:
        return <PhoneApp />;
      case AppID.CLOCK:
        return <ClockApp />;
      case AppID.STORE:
        return <StoreApp />;
      case AppID.SAFARI:
        return <SafariApp />;
      case AppID.PHOTOS:
        return <PlaceholderApp appName="Fotos" bgColor="bg-white" icon={
             <div className="w-12 h-12 relative">
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-orange-300 blur-sm"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-yellow-300 blur-sm"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-300 blur-sm"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-300 blur-sm"></div>
             </div>
        } />;
      case AppID.CAMERA:
        return <PlaceholderApp appName="Câmera" bgColor="bg-gray-100" icon={
             <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border-4 border-gray-600">
                <div className="w-4 h-4 rounded-full bg-blue-900/50"></div>
             </div>
        } />;
      case AppID.MAIL:
        return <PlaceholderApp appName="Mail" bgColor="bg-gray-50" icon={
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
             </svg>
        } />;
      case AppID.NOTES:
        return <PlaceholderApp appName="Notas" bgColor="bg-yellow-50" icon={
             <div className="text-4xl">📝</div>
        } />;
      case AppID.MAPS:
        return <PlaceholderApp appName="Mapas" bgColor="bg-gray-100" icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
           </svg>
        } />;
      default:
        // Default to Home Screen
        return <HomeScreen />;
    }
  };

  return (
    <IPhoneBezel>
      {renderContent()}
    </IPhoneBezel>
  );
};

const App: React.FC = () => {
  return (
    <OSProvider>
      <AppContent />
    </OSProvider>
  );
};

export default App;