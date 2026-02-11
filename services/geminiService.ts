import { GoogleGenAI, GenerateContentStreamResult } from "@google/genai";
import { GeminiModelType } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const streamGeminiResponse = async (
  prompt: string,
  modelType: GeminiModelType,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<GenerateContentStreamResult> => {
  
  let modelName = 'gemini-3-pro-preview';
  let thinkingConfig: any = undefined;

  switch (modelType) {
    case GeminiModelType.FAST:
      // Requirement: Use flash-lite for low latency
      modelName = 'gemini-flash-lite-latest';
      break;
    case GeminiModelType.SMART:
      // Requirement: Use pro for chat
      modelName = 'gemini-3-pro-preview';
      break;
    case GeminiModelType.THINKING:
      // Requirement: Use pro + thinking budget for complex queries
      modelName = 'gemini-3-pro-preview';
      thinkingConfig = { thinkingBudget: 32768 };
      break;
  }

  // Convert simple history format to API expected format if needed, 
  // currently we just use sendMessageStream with the prompt, 
  // but preserving history context via Chat session is better.
  // For simplicity in this demo, we will restart chat context or format it.
  
  // To keep it robust, let's use a fresh chat session populated with history for each request
  // or just simple generation if history is too complex for this snippet.
  // We will use chat.sendMessageStream for best results.

  const chat = ai.chats.create({
    model: modelName,
    history: history.map(h => ({
        role: h.role,
        parts: h.parts
    })),
    config: {
      thinkingConfig,
    }
  });

  return await chat.sendMessageStream({ message: prompt });
};
