'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { createT } from '../../lib/i18n';

const initialMessages = [
  { id: 1, text: 'Hello! I am Dr. Somanna, your AI crop expert. How can I help you today?', sender: 'expert', time: '10:00 AM' },
];

export default function Chat() {
  const router = useRouter();
  const { language } = useAppStore();
  const t = createT(language);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    setMounted(true); 
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query) {
      setInputValue(query);
    }
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          })).concat({ role: 'user', content: inputValue })
        })
      });

      const data = await response.json();
      
      const expertMessage = {
        id: Date.now() + 1,
        text: data.message,
        sender: 'expert',
        time: data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, expertMessage]);
    } catch (error) {
      console.error('Chat failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] h-screen flex flex-col font-[var(--font-inter)]">
      {/* Premium Chat Header */}
      <header className="sticky top-0 w-full z-50 glass px-4 py-4 flex justify-between items-center border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-900/20">
                <span className="material-symbols-outlined text-white text-[28px]">support_agent</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight leading-tight font-[var(--font-outfit)]">Dr. Somanna</h1>
              <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                AI Agricultural Expert
              </p>
            </div>
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
          <span className="material-symbols-outlined">call</span>
        </button>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-32 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`relative max-w-[85%] group`}>
                <div className={`rounded-[24px] px-5 py-4 shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[#065f46] text-white rounded-tr-none' 
                    : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-premium'
                }`}>
                  <p className="text-[15px] leading-relaxed font-medium">{msg.text}</p>
                </div>
                <div className={`flex items-center gap-2 mt-1.5 px-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{msg.time}</p>
                  {msg.sender === 'user' && (
                    <span className="material-symbols-outlined text-[14px] text-emerald-500">done_all</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-slate-100 rounded-[20px] rounded-tl-none px-5 py-4 shadow-premium flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Thinking...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area - Redesigned */}
      <div className="fixed bottom-[88px] left-0 w-full px-4 z-40">
        <div className="max-w-3xl mx-auto glass p-3 rounded-[32px] shadow-premium-lg border border-white/50 flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined">attach_file</span>
          </button>
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder={t('chat.placeholder')}
              className="w-full bg-slate-50 border-none outline-none px-5 py-3 rounded-2xl text-[15px] font-medium text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
               <button className="material-symbols-outlined text-slate-400 hover:text-emerald-600 transition-colors">mic</button>
            </div>
          </div>

          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${
              inputValue.trim() && !isLoading 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                : 'bg-slate-100 text-slate-300'
            }`}
          >
            <span className="material-symbols-outlined text-[28px]">{isLoading ? 'hourglass_top' : 'send'}</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
