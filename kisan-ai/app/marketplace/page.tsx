'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { createT } from '../../lib/i18n';

const products = [
  {
    id: 1,
    name: { en: 'Organic Fertilizers', kn: 'ಸಾವಯವ ಗೊಬ್ಬರಗಳು', hi: 'जैविक उर्वरक' },
    price: '₹450/bag',
    seller: 'Green Agri Co.',
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    name: { en: 'High Yield Seeds', kn: 'ಹೆಚ್ಚಿನ ಇಳುವರಿ ಬೀಜಗಳು', hi: 'उच्च उपज वाले बीज' },
    price: '₹1200/kg',
    seller: 'Mandya Seeds',
    rating: 4.5,
    img: 'https://images.unsplash.com/photo-1505230408221-356620980144?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    name: { en: 'Drip Irrigation Kit', kn: 'ಹನಿ ನೀರಾವರಿ ಕಿಟ್', hi: 'ड्रिप सिंचाई kit' },
    price: '₹5500',
    seller: 'Agro Tools',
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=400'
  }
];

export default function Marketplace() {
  const router = useRouter();
  const { language, theme, toggleTheme } = useAppStore();
  const t = createT(language);
  const [mounted, setMounted] = useState(false);
  const [marketData, setMarketData] = useState<any>(null);

  useEffect(() => { 
    setMounted(true); 
    fetch('/api/market?commodity=Tomato&district=Mandya')
      .then(res => res.json())
      .then(data => setMarketData(data));
  }, []);

  if (!mounted) return null;

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
          <h1 className="text-xl font-black tracking-tight text-[var(--color-primary)] font-[var(--font-outfit)]">{t('marketplace.title')}</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          >
            <span className="material-symbols-outlined text-[20px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 space-y-10 pb-40 max-w-4xl mx-auto w-full">
        {/* Modern Banner - Glassmorphism & High Contrast */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#065f46] to-[#047857] rounded-[48px] p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center overflow-hidden relative shadow-2xl shadow-emerald-900/30"
        >
          <div className="z-10 text-center md:text-left space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/10">
               New Season Sale
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight font-[var(--font-outfit)] max-w-xl">
              Direct from <br className="hidden md:block" /> Farm to Table
            </h2>
            <p className="text-emerald-50/80 font-medium text-lg leading-relaxed max-w-sm md:max-w-md">
              The modern bridge between farmers and premium marketplaces.
            </p>
            <div className="pt-2">
              <button className="bg-white text-emerald-900 px-12 py-4.5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
                Get Started
              </button>
            </div>
          </div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block"
          >
            <span className="material-symbols-outlined text-white/10 text-[200px]">local_shipping</span>
          </motion.div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </motion.section>

        {/* Action Category Cards */}
        <section className="grid grid-cols-2 gap-6">
          <motion.button 
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] border-2 border-slate-50 dark:border-slate-800 rounded-[40px] p-8 flex flex-col items-center gap-4 transition-all shadow-premium"
          >
            <div className="w-16 h-16 rounded-[24px] bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-3xl">shopping_bag</span>
            </div>
            <span className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest text-xs">{t('marketplace.buy')}</span>
          </motion.button>
          <motion.button 
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] border-2 border-slate-50 dark:border-slate-800 rounded-[40px] p-8 flex flex-col items-center gap-4 transition-all shadow-premium"
          >
            <div className="w-16 h-16 rounded-[24px] bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-3xl">sell</span>
            </div>
            <span className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest text-xs">{t('marketplace.sell')}</span>
          </motion.button>
        </section>

        {/* Real-time Mandi Prices - Premium Card */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Market Intelligence</h3>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live: Mandya Mandi
            </div>
          </div>
          {marketData ? (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] border border-slate-100 dark:border-slate-800 rounded-[40px] p-8 shadow-premium-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden group"
            >
              <div className="z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-[32px] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                   <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-4xl">inventory_2</span>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-1">{marketData.commodity}</p>
                  <p className="text-4xl font-black text-slate-800 dark:text-slate-100 font-[var(--font-outfit)]">₹{marketData.prices.modal} <span className="text-sm font-medium text-slate-300 dark:text-slate-600">/ {marketData.prices.unit}</span></p>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-2">
                    Market Range: <span className="text-slate-600 dark:text-slate-400">₹{marketData.prices.min} - ₹{marketData.prices.max}</span>
                  </p>
                </div>
              </div>
              <div className="z-10 mt-8 md:mt-0 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-3 rounded-full border border-emerald-100/50 dark:border-emerald-800/50">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <span className="material-symbols-outlined font-black">trending_up</span>
                  <span className="text-lg font-black">+4.2%</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
            </motion.div>
          ) : (
            <div className="h-32 bg-slate-50 dark:bg-slate-800 animate-pulse rounded-[40px]"></div>
          )}
        </section>

        {/* Featured Products - High Fidelity Gallery */}
        <section className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{t('marketplace.featured')}</h3>
            <button className="text-[var(--color-primary)] font-black text-[10px] uppercase tracking-widest hover:underline">{t('dash.viewAll')}</button>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide -mx-6 px-6">
            {products.map((product, idx) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="min-w-[280px] bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] border border-slate-50 dark:border-slate-800 rounded-[40px] overflow-hidden flex flex-col shadow-premium group hover:border-emerald-200 dark:hover:border-emerald-800 transition-all"
              >
                <div className="h-44 w-full relative overflow-hidden">
                   <img src={product.img} alt={product.name.en} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-4 right-4 w-10 h-10 glass rounded-2xl flex items-center justify-center text-white/80">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                   </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="font-black text-lg text-slate-800 dark:text-slate-200 tracking-tight leading-tight">{product.name[language] || product.name.en}</p>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">{product.seller}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-50 dark:border-slate-800">
                    <span className="font-black text-xl text-emerald-600 dark:text-emerald-400">{product.price}</span>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-full text-amber-600 dark:text-amber-400">
                      <span className="text-xs font-black">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
