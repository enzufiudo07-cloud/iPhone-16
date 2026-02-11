import React, { useState, useRef, useEffect } from 'react';
import { streamGeminiResponse } from '../../services/geminiService';
import { ChatMessage, GeminiModelType } from '../../types';
import { GenerateContentResponse } from "@google/genai";
import { useOS } from '../../context/OSContext';

const GeminiApp: React.FC = () => {
  const { closeApp } = useOS();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'Olá! Eu sou o Gemini. Como posso ajudar você hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelType, setModelType] = useState<GeminiModelType>(GeminiModelType.SMART);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Inject System Time Context seamlessly into the conversation history logic
      // We don't show this message to the user UI, but we send it to the model implicitly via history
      const now = new Date();
      const timeContext = `[System Note: The current real-world time is ${now.toLocaleString('pt-BR')}. Use this for time-related queries.]`;

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      // Add context to the latest prompt
      const promptWithContext = `${timeContext}\n\n${userMsg.text}`;
      
      const stream = await streamGeminiResponse(promptWithContext, modelType, history);
      
      let fullText = '';
      const botMsgId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '', isThinking: modelType === GeminiModelType.THINKING }]);

      for await (const chunk of stream) {
        const content = chunk as GenerateContentResponse;
        const textPart = content.text;
        if (textPart) {
           fullText += textPart;
           setMessages(prev => prev.map(m => 
             m.id === botMsgId ? { ...m, text: fullText, isThinking: false } : m
           ));
        }
      }

    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        text: 'Desculpe, tive um problema ao processar sua solicitação.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-900 font-sans">
      {/* Header */}
      <div className="pt-12 pb-4 px-4 bg-gray-50 border-b flex justify-between items-center relative z-10 shadow-sm">
        <div className="flex items-center gap-2">
            <button 
                onClick={closeApp}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                title="Voltar para Início"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Google AI</h1>
        </div>
        
        <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-lg border border-gray-200">
           <button 
             onClick={() => setModelType(GeminiModelType.FAST)}
             className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${modelType === GeminiModelType.FAST ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
           >
             Fast
           </button>
           <button 
             onClick={() => setModelType(GeminiModelType.SMART)}
             className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${modelType === GeminiModelType.SMART ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
           >
             Chat
           </button>
           <button 
             onClick={() => setModelType(GeminiModelType.THINKING)}
             className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${modelType === GeminiModelType.THINKING ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
           >
             Think
           </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              {msg.isThinking && !msg.text ? (
                 <div className="flex items-center space-x-2 text-gray-400">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-xs font-medium">Pensando...</span>
                 </div>
              ) : (
                <div className="whitespace-pre-wrap">{msg.text}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={modelType === GeminiModelType.THINKING ? "Faça uma pergunta complexa..." : "Digite sua mensagem..."}
            className="flex-1 bg-transparent border-none focus:outline-none text-sm py-1 text-gray-800 placeholder-gray-400"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-2 rounded-full transition-colors ${isLoading || !input.trim() ? 'text-gray-400' : 'text-blue-600 bg-blue-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiApp;