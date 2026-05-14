'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { createT } from '../../lib/i18n';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { language, theme, toggleTheme } = useAppStore();
  const t = createT(language);

  const [weatherTemp, setWeatherTemp] = useState<number | null>(null);
  const [weatherIcon, setWeatherIcon] = useState('partly_cloudy_day');

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    fetch('/api/weather?lat=12.52&lon=76.90&location=Mandya,+Karnataka')
      .then(res => res.json())
      .then(data => {
        if (data.today) {
          setWeatherTemp(data.today.temp);
          if (data.today.rainfall > 10) setWeatherIcon('rainy');
          else if (data.today.rainfall > 2) setWeatherIcon('grain');
          else if (data.today.temp > 35) setWeatherIcon('sunny');
          else setWeatherIcon('partly_cloudy_day');
        }
      })
      .catch(() => {});
  }, []);

  const getGreeting = () => {
    if (!mounted) return 'Hello, Farmer 👋';
    const hour = new Date().getHours();
    if (language === 'kn') return hour < 12 ? 'ಶುಭೋದಯ 👋' : hour < 17 ? 'ಶುಭ ಮಧ್ಯಾಹ್ನ 👋' : 'ಶುಭ ಸಂಜೆ 👋';
    if (language === 'hi') return hour < 12 ? 'सुप्रभात 👋' : hour < 17 ? 'शुभ दोपहर 👋' : 'शुभ संध्या 👋';
    return hour < 12 ? 'Good Morning 👋' : hour < 17 ? 'Good Afternoon 👋' : 'Good Evening 👋';
  };

  const getDateStr = () => {
    if (!mounted) return '';
    return new Date().toLocaleDateString(language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN', { 
      month: 'long', day: 'numeric' 
    });
  };

  const quickActions = [
    { icon: 'document_scanner', label: t('dash.scanCrop'), href: '/scan', color: 'bg-emerald-500' },
    { icon: 'menu_book', label: t('nav.library'), href: '/library', color: 'bg-amber-500' },
    { icon: 'chat', label: t('nav.chat'), href: '/chat', color: 'bg-blue-500' },
    { icon: 'bar_chart', label: t('dash.yieldPredict'), href: '/yield', color: 'bg-purple-500' },
  ];

  if (!mounted) return null;

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] min-h-screen flex flex-col font-[var(--font-inter)]">
      {/* Premium Header */}
      <header className="sticky top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <span className="material-symbols-outlined text-white text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
          </div>
          <h1 className="text-xl font-black tracking-tight text-[var(--color-primary)] font-[var(--font-outfit)]">KisanAI</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          >
            <span className="material-symbols-outlined text-[22px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <Link href="/language" className="glass px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-white dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{language.toUpperCase()}</span>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">translate</span>
          </Link>
          <Link href="/alerts" className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 space-y-10 pb-32 w-full">
        {/* Greeting Card — Glassmorphism & Gradient */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#065f46] to-[#047857] rounded-[48px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/30"
        >
          <div className="z-10 relative space-y-6">
            <div className="space-y-1">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight font-[var(--font-outfit)]">{getGreeting()}</h2>
              <div className="flex items-center gap-2 text-emerald-100/80 font-bold text-sm">
                <span className="material-symbols-outlined text-sm">location_on</span>
                Mandya, Karnataka • {getDateStr()}
              </div>
            </div>
            
            {/* Quick Weather Inline */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-[32px] px-6 py-4 border border-white/10 w-fit">
               <span className="material-symbols-outlined text-emerald-200 text-3xl">{weatherIcon}</span>
               <div className="flex flex-col">
                  <span className="text-2xl font-black leading-none">{weatherTemp || '--'}°</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200/60">Cloudy</span>
               </div>
            </div>

            <div className="flex items-center gap-3 bg-[#10b981]/20 p-4 rounded-[24px] border border-white/10 backdrop-blur-sm">
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-emerald-900 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              </div>
              <p className="text-xs font-bold text-emerald-50 leading-tight">High heat alert: Water your crops in early morning.</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </motion.section>

        {/* Quick Actions Grid */}
        <section className="space-y-6">
          <h3 className="font-black text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 px-2">Quick Actions</h3>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {quickActions.map((action, idx) => (
              <motion.div key={idx} variants={item}>
                <Link 
                  href={action.href}
                  className="flex flex-col items-center gap-6 p-8 bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] border border-slate-50 dark:border-slate-800 rounded-[40px] shadow-premium card-interactive group"
                >
                  <div className={`w-16 h-16 rounded-[24px] ${action.color} text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <span className="material-symbols-outlined text-3xl">{action.icon}</span>
                  </div>
                  <span className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest text-xs">{action.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
        {/* Recent Scans Carousel */}
        <section className="space-y-6">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{t('dash.recentScans')}</h3>
            <Link href="/history" className="text-[var(--color-primary)] font-bold text-sm flex items-center gap-1 group">
              {t('dash.viewAll')}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-5 pb-4 px-1 scrollbar-hide">
            {[
              { name: 'Tomato Leaf', status: t('history.healthy'), statusClass: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400', img: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&q=80' },
              { name: 'Potato Tuber', status: 'Blight Detected', statusClass: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400', img: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?w=400&q=80' },
              { name: 'Maize', status: t('history.healthy'), statusClass: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400', img: 'https://images.unsplash.com/photo-1551727041-5b347d65b633?w=400&q=80' },
            ].map(scan => (
              <motion.div 
                key={scan.name}
                whileHover={{ y: -5 }}
                className="min-w-[200px] bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] rounded-[32px] overflow-hidden border border-slate-50 dark:border-slate-800 shadow-premium card-interactive"
              >
                <div className="h-32 relative">
                  <img src={scan.img} alt={scan.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <span className={`${scan.statusClass} text-[10px] px-3 py-1 rounded-full font-black backdrop-blur-md shadow-sm uppercase tracking-widest`}>
                      {scan.status}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-black text-slate-800 dark:text-slate-200 tracking-tight">{scan.name}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mt-1">Scanned 2h ago</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Community & Market Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/community" className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] border border-slate-100 dark:border-slate-800 rounded-[28px] p-6 flex items-center justify-between shadow-premium card-interactive">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-3xl">hub</span>
              </div>
              <div>
                <h4 className="font-black text-slate-800 dark:text-slate-200 tracking-tight">{t('nav.community')}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t('dash.communityMap')}</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </Link>

          <Link href="/marketplace" className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] border border-slate-100 dark:border-slate-800 rounded-[28px] p-6 flex items-center justify-between shadow-premium card-interactive">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-3xl">shopping_bag</span>
              </div>
              <div>
                <h4 className="font-black text-slate-800 dark:text-slate-200 tracking-tight">{t('nav.marketplace')}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t('dash.farmMarket')}</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}
