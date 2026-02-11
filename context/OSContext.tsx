import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppID, Wallpaper, Notification } from '../types';
import { WALLPAPERS, INITIAL_NOTIFICATIONS } from '../constants';

interface OSContextType {
  userName: string;
  setUserName: (name: string) => void;
  wallpaper: Wallpaper;
  setWallpaper: (wp: Wallpaper) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  currentApp: AppID | null;
  openApp: (app: AppID) => void;
  closeApp: () => void;
  notifications: Notification[];
  addNotification: (title: string, message: string, app: string) => void;
  isBooted: boolean;
  setIsBooted: (booted: boolean) => void;
  // New features
  credits: number;
  addCredits: (amount: number) => void;
  spendCredits: (amount: number) => boolean;
  storageUsed: number; // in MB
  clearStorage: () => void;
  iconTint: string | null; // null = original, hex = tinted
  setIconTint: (color: string | null) => void;
  installedAppIds: string[];
  installApp: (id: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currentApp, setCurrentApp] = useState<AppID | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [isBooted, setIsBooted] = useState(false);
  
  // New State
  const [credits, setCredits] = useState(150); // Start with some credits
  const [storageUsed, setStorageUsed] = useState(12400); // 12.4 GB used
  const [iconTint, setIconTint] = useState<string | null>(null);
  const [installedAppIds, setInstalledAppIds] = useState<string[]>([]);

  const openApp = (app: AppID) => setCurrentApp(app);
  const closeApp = () => setCurrentApp(null);

  const playNotificationSound = () => {
    // Simple sleek notification sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play failed (user interaction needed first)', e));
  };

  const addNotification = (title: string, message: string, app: string) => {
    if (!notificationsEnabled) return;
    
    playNotificationSound();

    const newNotif = {
      id: Date.now().toString(),
      title,
      message,
      app,
      timestamp: Date.now(),
    };
    setNotifications((prev) => [newNotif, ...prev]);
    
    // Auto-dismiss after 6 seconds
    setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
    }, 6000);
  };

  const addCredits = (amount: number) => setCredits(prev => prev + amount);
  
  const spendCredits = (amount: number) => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      return true;
    }
    return false;
  };

  const clearStorage = () => {
    setNotifications([]);
    setStorageUsed(10500); // Reset to base OS size
    addNotification('Sistema', 'Armazenamento limpo e otimizado.', 'Settings');
  };

  const installApp = (id: string) => {
    if (!installedAppIds.includes(id)) {
      setInstalledAppIds(prev => [...prev, id]);
      setStorageUsed(prev => prev + 150); // Add fake size
    }
  };

  return (
    <OSContext.Provider
      value={{
        userName,
        setUserName,
        wallpaper,
        setWallpaper,
        notificationsEnabled,
        setNotificationsEnabled,
        currentApp,
        openApp,
        closeApp,
        notifications,
        addNotification,
        isBooted,
        setIsBooted,
        credits,
        addCredits,
        spendCredits,
        storageUsed,
        clearStorage,
        iconTint,
        setIconTint,
        installedAppIds,
        installApp
      }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) throw new Error('useOS must be used within OSProvider');
  return context;
};