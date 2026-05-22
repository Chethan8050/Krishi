'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  time: string;
};

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Namaskara! I am Dr. Somanna. How can I help you with your crops today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (quickReply?: string) => {
    const textToSend = quickReply || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!quickReply) setInput('');
    setIsLoading(true);

    try {
      // Send history (only role and content)
      const messageHistory = messages.concat(userMessage).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messageHistory })
      });

      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.message || 'Sorry, I am having trouble connecting.',
          time: data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, an error occurred while connecting to my central brain.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] pt-16 pb-20 md:pb-0 bg-surface">
      {/* Chat Header */}
      <div className="h-16 border-b border-glass-stroke bg-surface-container/50 backdrop-blur-md flex items-center justify-between px-4 md:px-6 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="md:hidden p-2 -ml-2 text-on-surface-variant hover:text-primary rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="relative hidden sm:block">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-lg border border-glass-stroke">
              S
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border border-surface"></span>
          </div>
          <div>
            <h2 className="font-headline-md text-body-md text-on-surface flex items-center gap-2">
              Dr. Somanna
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-tertiary-container/20 text-tertiary font-label-md uppercase tracking-wider border border-tertiary/20">AI Expert</span>
            </h2>
            <p className="font-label-md text-label-md text-primary/80">Online now • KrishiDrishti</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant/50">
            <span className="material-symbols-outlined">call</span>
          </button>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant/50">
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-container-low/20 via-surface to-surface">
        <div className="flex justify-center">
          <span className="px-3 py-1 rounded-full bg-surface-variant/50 border border-glass-stroke font-label-md text-label-md text-text-muted backdrop-blur-sm">Today</span>
        </div>

        {messages.map((msg, idx) => (
          msg.role === 'assistant' ? (
            /* Message (Incoming) */
            <div key={idx} className="flex items-end gap-2 max-w-[85%] md:max-w-2xl">
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm shrink-0 hidden sm:flex border border-glass-stroke">
                S
              </div>
              <div className="flex flex-col gap-1 items-start">
                <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm glass-panel text-on-surface font-body-sm text-body-sm border-glass-stroke shadow-sm whitespace-pre-wrap">
                  {msg.content}
                </div>
                <span className="font-label-md text-label-md text-text-muted px-1">{msg.time}</span>
              </div>
            </div>
          ) : (
            /* Message (Outgoing) */
            <div key={idx} className="flex items-end gap-2 max-w-[85%] md:max-w-2xl ml-auto justify-end">
              <div className="flex flex-col gap-1 items-end">
                <div className="px-4 py-2.5 rounded-2xl rounded-br-sm bg-primary-container/20 text-on-surface font-body-sm text-body-sm border border-primary/30 shadow-sm relative overflow-hidden whitespace-pre-wrap">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
                  {msg.content}
                </div>
                <div className="flex items-center gap-1 px-1">
                  <span className="font-label-md text-label-md text-text-muted">{msg.time}</span>
                  <span className="material-symbols-outlined text-[14px] text-primary">done_all</span>
                </div>
              </div>
            </div>
          )
        ))}

        {isLoading && (
          <div className="flex items-end gap-2 max-w-[85%] md:max-w-2xl">
            <div className="flex flex-col gap-1 items-start">
              <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm glass-panel text-on-surface font-body-sm text-body-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-surface/90 backdrop-blur-xl border-t border-glass-stroke shrink-0">
        {/* Quick Replies */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          {['Early signs of Blight?', 'Recommended fungicides for Tomato?', 'How to improve soil moisture?'].map((reply) => (
            <button 
              key={reply} 
              onClick={() => handleSend(reply)}
              className="shrink-0 px-3 py-1.5 rounded-full bg-surface-variant/40 border border-glass-stroke hover:border-primary/50 hover:bg-surface-variant transition-colors font-label-md text-label-md text-on-surface whitespace-nowrap flex items-center gap-1 group"
            >
              <span className="material-symbols-outlined text-[14px] text-primary opacity-70 group-hover:opacity-100">eco</span>
              {reply}
            </button>
          ))}
        </div>
        
        {/* Input Field */}
        <div className="flex items-end gap-2">
          <button className="p-2.5 text-on-surface-variant hover:text-primary bg-surface-container rounded-full border border-glass-stroke transition-colors shrink-0">
            <span className="material-symbols-outlined">attach_file</span>
          </button>
          <div className="flex-1 relative glass-panel rounded-2xl glow-primary flex items-end border-glass-stroke">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none py-3 px-4 text-body-sm font-body-sm text-on-surface placeholder:text-text-muted focus:ring-0 resize-none max-h-32 overflow-y-auto min-h-[44px] outline-none" 
              placeholder="Type a message..." 
              rows={1}
            />
            <button className="p-2 m-1 text-on-surface-variant hover:text-primary transition-colors shrink-0">
              <span className="material-symbols-outlined">mood</span>
            </button>
          </div>
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-primary text-on-primary-fixed rounded-full hover:bg-primary-fixed-dim transition-colors shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center disabled:opacity-50 disabled:shadow-none"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
