import React from 'react';

export enum AppID {
  HOME = 'HOME',
  SETTINGS = 'SETTINGS',
  GEMINI = 'GEMINI',
  PHOTOS = 'PHOTOS',
  CAMERA = 'CAMERA',
  MAIL = 'MAIL',
  NOTES = 'NOTES',
  MAPS = 'MAPS',
  SAFARI = 'SAFARI',
  PHONE = 'PHONE',
  CLOCK = 'CLOCK',
  STORE = 'STORE'
}

export interface Wallpaper {
  id: string;
  name: string;
  url: string;
  textColor: string;
}

export enum GeminiModelType {
  FAST = 'FAST',
  SMART = 'SMART',
  THINKING = 'THINKING',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  app: string;
  timestamp: number;
}

export interface AppItem {
  id: AppID | string;
  name: string;
  icon: React.ReactNode;
  isSystem: boolean;
  price?: number;
  installed: boolean;
  description?: string;
}