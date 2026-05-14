'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { createT } from '../../lib/i18n';

export default function Settings() {
  const router = useRouter();
  const { language, theme, toggleTheme } = useAppStore();
  const t = createT(language);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const settingsItems = [
    { icon: 'person', label: t('settings.profile'), href: '/profile', color: 'bg-emerald-50 text-emerald-600' },
    { icon: 'notifications', label: t('settings.notifications'), href: '/notifications', color: 'bg-amber-50 text-amber-600' },
    { icon: 'language', label: 'Language / ಭಾಷೆ / भाषा', href: '/language', color: 'bg-indigo-50 text-indigo-600' },
    { 
      icon: theme === 'dark' ? 'dark_mode' : 'light_mode', 
      label: theme === 'dark' ? 'Dark Mode' : 'Light Mode', 
      isToggle: true, 
      color: theme === 'dark' ? 'bg-slate-800 text-amber-400' : 'bg-amber-50 text-amber-600' 
    },
    { icon: 'help', label: t('settings.help'), href: '/support', color: 'bg-blue-50 text-blue-600' },
    { icon: 'info', label: t('settings.about'), href: '/about', color: 'bg-slate-50 text-slate-600' },
  ];

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] min-h-screen flex flex-col font-[var(--font-inter)]">
      {/* Premium Header */}
      <header className="sticky top-0 w-full z-50 glass px-6 py-5 flex justify-between items-center border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-black tracking-tight text-[var(--color-primary)] font-[var(--font-outfit)]">{t('settings.title')}</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 space-y-8 pb-32 max-w-2xl mx-auto w-full">
        {/* Profile Card - Premium */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] border border-slate-100 dark:border-slate-800 rounded-[32px] p-6 flex items-center gap-5 shadow-premium"
        >
          <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/20">
             <span className="text-3xl font-black font-[var(--font-outfit)]">P</span>
          </div>
          <div className="flex-1">
            <h2 className="font-black text-xl text-slate-800 dark:text-slate-200 tracking-tight">Preetham S.M</h2>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">+91 98765 43210</p>
          </div>
          <button className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined">edit</span>
          </button>
        </motion.div>

        {/* Settings List */}
        <section className="space-y-3">
          {settingsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {item.isToggle ? (
                <button 
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-5 p-5 bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] border border-slate-50 dark:border-slate-800 rounded-[24px] hover:border-emerald-200 dark:hover:border-emerald-800 transition-all shadow-sm active:scale-[0.98]"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.color} dark:bg-opacity-20 flex items-center justify-center flex-shrink-0`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200 flex-1 text-left">{item.label}</span>
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
                    <motion.div 
                      animate={{ x: theme === 'dark' ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </div>
                </button>
              ) : (
                <Link 
                  href={item.href || '#'}
                  className="flex items-center gap-5 p-5 bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] border border-slate-50 dark:border-slate-800 rounded-[24px] hover:border-emerald-200 dark:hover:border-emerald-800 transition-all shadow-sm active:scale-[0.98]"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.color} dark:bg-opacity-20 flex items-center justify-center flex-shrink-0`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200 flex-1">{item.label}</span>
                  <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">chevron_right</span>
                </Link>
              )}
            </motion.div>
          ))}
        </section>

        {/* Logout Button */}
        <button className="w-full bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 py-5 rounded-[24px] font-black tracking-tight flex items-center justify-center gap-3 active:scale-95 transition-all border border-red-100/50 dark:border-red-900/50 shadow-sm">
          <span className="material-symbols-outlined">logout</span>
          {t('settings.logout')}
        </button>

        <div className="text-center space-y-1 py-4">
          <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em]">KisanAI v1.2.0 • Build 2026.05</p>
          <div className="flex justify-center gap-4 text-[10px] font-black text-emerald-600/40 uppercase tracking-widest">
             <span>Terms</span>
             <span>Privacy</span>
          </div>
        </div>
      </main>
    </div>
  );
}
