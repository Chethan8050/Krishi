'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { supabase } from '../lib/supabase';

export default function Settings() {
  const router = useRouter();
  const { language, theme, toggleTheme, user, logout } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
    router.push('/login');
  };

  if (!mounted) return null;

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      settings: { title: 'Settings', profile: 'Profile', notifications: 'Notifications', help: 'Help & Support', about: 'About', logout: 'Log Out' },
      hi: { settings: { title: 'सेटिंग्स', profile: 'प्रोफ़ाइल', notifications: 'सूचनाएं', help: 'सहायता', about: 'के बारे में', logout: 'लॉग आउट' } },
      kn: { settings: { title: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು', profile: 'ಪ್ರೊಫೈಲ್', notifications: 'ಅಧಿಸೂಚನೆಗಳು', help: 'ಸಹಾಯ', about: 'ಬಗ್ಗೆ', logout: 'ಲಾಗ್ ಔಟ್' } },
    };
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

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

  const hackathonFeatures = [
    { icon: 'insights', label: 'Impact Dashboard', href: '/impact', color: 'bg-green-50 text-green-600', badge: 'LIVE' },
    { icon: 'compare', label: 'Competitor Analysis', href: '/compare', color: 'bg-blue-50 text-blue-600', badge: 'NEW' },
    { icon: 'handshake', label: 'Partner Program', href: '/partners', color: 'bg-purple-50 text-purple-600', badge: 'B2B' },
    { icon: 'park', label: 'Sustainability', href: '/sustainability', color: 'bg-emerald-50 text-emerald-600', badge: 'SDG' },
    { icon: 'wifi_off', label: 'Offline Mode Demo', href: '/offline-demo', color: 'bg-amber-50 text-amber-600', badge: 'DEMO' },
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
             <span className="text-3xl font-black font-[var(--font-outfit)]">
               {user?.fullName?.charAt(0).toUpperCase() || user?.phone?.slice(-2) || 'U'}
             </span>
          </div>
          <div className="flex-1">
            <h2 className="font-black text-xl text-slate-800 dark:text-slate-200 tracking-tight">
              {user?.fullName || 'Farmer'}
            </h2>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
              {user?.phone || '+91 ••••• •••••'}
            </p>
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

        {/* Hackathon Features - These win competitions! */}
        <section className="space-y-3">
          <h3 className="font-black text-xs uppercase tracking-[0.25em] text-slate-400 px-2">🏆 Hackathon Features</h3>
          {hackathonFeatures.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Link 
                href={item.href}
                className="flex items-center gap-5 p-5 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-[24px] hover:border-emerald-300 dark:hover:border-emerald-600 transition-all shadow-sm active:scale-[0.98]"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200 flex-1">{item.label}</span>
                <span className="text-xs font-black px-2 py-1 bg-slate-800 text-white rounded-full">{item.badge}</span>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 py-5 rounded-[24px] font-black tracking-tight flex items-center justify-center gap-3 active:scale-95 transition-all border border-red-100/50 dark:border-red-900/50 shadow-sm"
        >
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
