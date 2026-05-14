'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { createT } from '../../lib/i18n';

export default function YieldPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { yieldInputs, setYieldInputs, setRecentYieldResult, language } = useAppStore();
  const t = createT(language);
  
  const [crop, setCrop] = useState(yieldInputs.crop);
  const [district, setDistrict] = useState(yieldInputs.district);
  const [soilType, setSoilType] = useState(yieldInputs.soilType);
  const [season, setSeason] = useState(yieldInputs.season);
  const [rainfall, setRainfall] = useState(yieldInputs.rainfall);
  const [area, setArea] = useState(yieldInputs.area);
  const [isLoading, setIsLoading] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Initialize state from store after mount
    setCrop(yieldInputs.crop);
    setDistrict(yieldInputs.district);
    setSoilType(yieldInputs.soilType);
    setSeason(yieldInputs.season);
    setRainfall(yieldInputs.rainfall);
    setArea(yieldInputs.area);
  }, [yieldInputs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Save to store
    const inputs = { crop, district, soilType, season, rainfall, area };
    setYieldInputs(inputs);

    try {
      const res = await fetch('/api/yield', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });
      const data = await res.json();
      setRecentYieldResult(data);
      router.push('/yield/result');
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] min-h-screen flex flex-col font-[var(--font-inter)]">
      {/* Premium Header */}
      <header className="sticky top-0 w-full z-50 glass px-6 py-5 flex justify-between items-center border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-black tracking-tight text-[#065f46] font-[var(--font-outfit)]">{t('yield.title')}</h1>
        </div>
      </header>

      <main className="flex-grow px-6 py-8 space-y-8 pb-40 max-w-2xl mx-auto w-full">
        <div className="space-y-2">
           <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">Predict Your Harvest</h2>
           <p className="text-slate-400 font-medium text-sm">Fill in your farm details for AI-powered yield estimation.</p>
        </div>

        {/* Form Card - Premium Glassmorphism */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 rounded-[40px] p-8 shadow-premium"
        >
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Crop Selector - Custom Design */}
            <div className="space-y-3">
              <label className="font-black text-xs text-slate-400 uppercase tracking-[0.2em] block px-1">{t('yield.selectCrop')}</label>
              <div className="relative group">
                <select 
                  value={crop} 
                  onChange={e => setCrop(e.target.value)} 
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-3xl px-6 py-4.5 appearance-none focus:border-emerald-400 focus:bg-white outline-none text-[16px] font-bold text-slate-800 transition-all cursor-pointer"
                >
                  {['Tomato', 'Wheat', 'Rice', 'Maize'].map(c => <option key={c}>{c}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-emerald-500 transition-colors">unfold_more</span>
              </div>
            </div>

            {/* District & Soil - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="font-black text-xs text-slate-400 uppercase tracking-[0.2em] block px-1">{t('yield.district')}</label>
                <div className="relative group">
                  <select 
                    value={district} 
                    onChange={e => setDistrict(e.target.value)} 
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-3xl px-6 py-4.5 appearance-none focus:border-emerald-400 focus:bg-white outline-none text-[16px] font-bold text-slate-800 transition-all cursor-pointer"
                  >
                    {['Mandya', 'Mysore', 'Hassan'].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none transition-colors">expand_more</span>
                </div>
              </div>
              <div className="space-y-3">
                <label className="font-black text-xs text-slate-400 uppercase tracking-[0.2em] block px-1">{t('yield.soilType')}</label>
                <div className="relative group">
                  <select 
                    value={soilType} 
                    onChange={e => setSoilType(e.target.value)} 
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-3xl px-6 py-4.5 appearance-none focus:border-emerald-400 focus:bg-white outline-none text-[16px] font-bold text-slate-800 transition-all cursor-pointer"
                  >
                    {['Black Soil', 'Red Soil', 'Alluvial Soil'].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none transition-colors">expand_more</span>
                </div>
              </div>
            </div>

            {/* Season - Segmented Pills */}
            <div className="space-y-4">
              <label className="font-black text-xs text-slate-400 uppercase tracking-[0.2em] block px-1">{t('yield.season')}</label>
              <div className="flex p-1.5 bg-slate-50 rounded-3xl gap-1">
                {['Kharif', 'Rabi', 'Zaid'].map(s => (
                  <button 
                    key={s} 
                    type="button" 
                    onClick={() => setSeason(s)}
                    className={`flex-1 py-3 rounded-[22px] font-black text-xs uppercase tracking-widest transition-all ${
                      season === s 
                        ? 'bg-white text-emerald-600 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Rainfall Slider - Premium Style */}
            <div className="space-y-6">
              <div className="flex justify-between items-center px-1">
                <label className="font-black text-xs text-slate-400 uppercase tracking-[0.2em]">{t('yield.rainfall')}</label>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                   <span className="font-black text-lg text-blue-600">{rainfall} <span className="text-[10px] text-slate-400">MM</span></span>
                </div>
              </div>
              <div className="relative pt-2">
                <input 
                  type="range" 
                  min="0" 
                  max="2000" 
                  value={rainfall} 
                  onChange={e => setRainfall(+e.target.value)}
                  className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-500" 
                />
                <div className="flex justify-between mt-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  <span>Dry</span>
                  <span>Moderate</span>
                  <span>Heavy</span>
                </div>
              </div>
            </div>

            {/* Farm Area - Premium Stepper */}
            <div className="space-y-4">
              <label className="font-black text-xs text-slate-400 uppercase tracking-[0.2em] block px-1">{t('yield.farmArea')}</label>
              <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-3xl p-2 shadow-inner">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  type="button" 
                  onClick={() => setArea(Math.max(0.5, +(area - 0.5).toFixed(1)))}
                  className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined font-black">remove</span>
                </motion.button>
                <div className="flex flex-col items-center">
                   <span className="font-black text-3xl text-slate-800">{area}</span>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Acres</span>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  type="button" 
                  onClick={() => setArea(+(area + 0.5).toFixed(1))}
                  className="w-14 h-14 flex items-center justify-center bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-900/20 active:bg-emerald-700 transition-all"
                >
                  <span className="material-symbols-outlined font-black">add</span>
                </motion.button>
              </div>
            </div>

            {/* Buttons - High Impact */}
            <div className="pt-6 space-y-4">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isLoading} 
                className="w-full py-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-[32px] font-black text-xl flex items-center justify-center gap-4 shadow-xl shadow-emerald-900/20 transition-all disabled:opacity-70"
              >
                {isLoading ? t('yield.calculating') : t('yield.predict')} 
                <span className={`material-symbols-outlined text-2xl ${isLoading ? 'animate-spin' : ''}`}>
                  {isLoading ? 'sync' : 'analytics'}
                </span>
              </motion.button>
              
              <button 
                type="reset" 
                onClick={() => {
                  setCrop('Tomato'); setDistrict('Mandya'); setSoilType('Black Soil'); setSeason('Kharif'); setRainfall(400); setArea(1.0);
                }} 
                className="w-full py-4 text-slate-400 font-black text-xs uppercase tracking-[0.2em] hover:text-slate-600 transition-colors"
              >
                {t('yield.resetForm')}
              </button>
            </div>
          </form>
        </motion.section>

        {/* Info Card - Elegant Warning */}
        <div className="bg-amber-50 rounded-[32px] p-8 border border-amber-100/50 flex gap-6 shadow-sm">
           <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
              <span className="material-symbols-outlined text-amber-600 text-3xl">psychology</span>
           </div>
           <div className="space-y-2">
              <h3 className="font-black text-sm text-amber-800 uppercase tracking-widest">{t('yield.howItWorks')}</h3>
              <p className="text-sm font-medium text-amber-700/70 leading-relaxed">
                Our AI engine analyzes 10 years of meteorological data, soil health logs, and Mandya region growth cycles to provide a high-precision estimation.
              </p>
           </div>
        </div>
      </main>
    </div>
  );
}
