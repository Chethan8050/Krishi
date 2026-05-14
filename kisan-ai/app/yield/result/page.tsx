'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { createT } from '../../../lib/i18n';

export default function YieldResultPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { recentYieldResult, yieldInputs, language, theme, toggleTheme } = useAppStore();
  const t = createT(language);

  useEffect(() => {
    setMounted(true);
    if (!recentYieldResult) {
      router.push('/yield');
    }
  }, [recentYieldResult, router]);

  if (!mounted || !recentYieldResult) return null;

  const estimate = recentYieldResult?.estimatedYieldPerAcre || 0;
  const total = recentYieldResult?.totalYield || 0;
  const grade = recentYieldResult?.grade || '-';

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
          <h1 className="text-xl font-black tracking-tight text-[var(--color-primary)] font-[var(--font-outfit)]">{t('yield.resultTitle')}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          >
            <span className="material-symbols-outlined text-[20px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </header>

      <main className="flex-grow px-6 py-8 space-y-8 pb-40 max-w-2xl mx-auto w-full">
        {/* Result Hero Card - High Fidelity */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-[#065f46] to-[#047857] p-10 text-white shadow-2xl shadow-emerald-900/30"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined !text-[120px]">agriculture</span>
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                 <span className="material-symbols-outlined text-emerald-300 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>potted_plant</span>
              </div>
              <span className="font-black text-xs uppercase tracking-[0.25em] text-emerald-100">{t('yield.estYield')}</span>
            </div>

            <div className="flex flex-col items-start gap-1">
              <div className="flex items-baseline gap-3">
                <span className="font-black text-8xl leading-none font-[var(--font-outfit)] tracking-tighter">{estimate}</span>
                <span className="font-black text-xl text-emerald-200 uppercase tracking-widest">Q/Acre</span>
              </div>
              <p className="text-emerald-100/60 font-medium text-sm ml-1">Predicted yield based on Mandya region benchmarks.</p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10">
              <div className="space-y-1">
                <p className="font-black text-[10px] uppercase tracking-[0.2em] text-emerald-200/50">{t('history.total')}</p>
                <p className="font-black text-lg tracking-tight">{total} <span className="text-[10px] font-bold">QUINTALS</span></p>
              </div>
              <div className="space-y-1">
                <p className="font-black text-[10px] uppercase tracking-[0.2em] text-emerald-200/50">GRADE</p>
                <div className="flex items-center gap-2">
                   <p className="font-black text-lg tracking-tight">{grade}</p>
                   <span className="w-2 h-2 bg-emerald-300 rounded-full"></span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-black text-[10px] uppercase tracking-[0.2em] text-emerald-200/50">{t('yield.season')}</p>
                <p className="font-black text-lg tracking-tight uppercase">{yieldInputs.season}</p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 2, ease: "easeInOut" }}
               className="h-full bg-emerald-400 shadow-[0_0_10px_#34d399]"
             />
          </div>
        </motion.section>

        {/* Comparison Section - Modern Visuals */}
        <section className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] border border-slate-100 dark:border-slate-800 rounded-[40px] p-8 shadow-premium">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-black text-lg text-slate-800 dark:text-slate-200 tracking-tight">{t('yield.regionalComp')}</h3>
            <div className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
               <span className="text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                 {recentYieldResult?.comparisonToAverage || '+12%'} {t('yield.aboveAvg')}
               </span>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                <span>{t('yield.yourEst')}</span>
                <span className="text-emerald-600 dark:text-emerald-400">{estimate} Q/A</span>
              </div>
              <div className="h-4 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between font-black text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                <span>{t('yield.districtAvg')} ({yieldInputs.district})</span>
                <span className="text-slate-600 dark:text-slate-400">22.0 Q/A</span>
              </div>
              <div className="h-4 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '77%' }}
                  className="h-full bg-slate-200 dark:bg-slate-700 rounded-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Inputs Summary - Refined Cards */}
        <section className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-variant)] border border-slate-100 dark:border-slate-800 rounded-[40px] overflow-hidden shadow-premium">
          <div className="px-8 py-4 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
            <span className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{t('yield.inputParams')}</span>
            <Link href="/yield" className="text-[var(--color-primary)] font-black text-[10px] uppercase tracking-widest hover:underline">RE-CALCULATE</Link>
          </div>
          <div className="p-8 grid grid-cols-2 gap-8">
            {[
              { icon: 'water_drop', label: t('yield.rainfall'), val: `${yieldInputs.rainfall} mm`, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
              { icon: 'compost', label: t('yield.soilType'), val: yieldInputs.soilType, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
              { icon: 'straighten', label: t('yield.farmArea'), val: `${yieldInputs.area} Acres`, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
              { icon: 'category', label: t('yield.selectCrop'), val: yieldInputs.crop, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' },
            ].map(i => (
              <div key={i.label} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${i.color} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-xl">{i.icon}</span>
                </div>
                <div>
                  <p className="font-black text-[10px] text-slate-300 dark:text-slate-600 uppercase tracking-widest">{i.label}</p>
                  <p className="font-black text-slate-800 dark:text-slate-200 tracking-tight">{i.val}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Insight Card - Premium Chat Bubble style */}
        <section className="bg-emerald-50 dark:bg-emerald-900/10 rounded-[40px] p-10 border border-emerald-100/50 dark:border-emerald-800/50 relative shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
             <span className="material-symbols-outlined text-emerald-900 dark:text-emerald-100 !text-[100px]">auto_awesome</span>
          </div>
          <div className="flex gap-6 relative z-10">
             <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-[24px] flex items-center justify-center shadow-sm shrink-0">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-3xl">psychology</span>
             </div>
             <div className="space-y-3">
                <h4 className="font-black text-[10px] text-emerald-800 dark:text-emerald-200 uppercase tracking-[0.2em]">{t('yield.aiInsights')}</h4>
                <p className="text-emerald-900/80 dark:text-emerald-100/80 font-medium text-lg leading-relaxed italic">
                  "{recentYieldResult?.insights || 'Your crop health and soil metrics indicate an exceptionally strong harvest season ahead.'}"
                </p>
             </div>
          </div>
        </section>

        {/* Actions - High Impact */}
        <div className="flex flex-col gap-4 pt-6">
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[var(--color-primary)] text-white py-6 rounded-[32px] font-black text-xl flex items-center justify-center gap-4 shadow-2xl shadow-emerald-900/30 transition-all"
          >
            <span className="material-symbols-outlined">volume_up</span>
            {t('result.hearDiag')}
          </motion.button>
          
          <Link href="/yield" className="w-full py-4 text-center text-slate-400 dark:text-slate-600 font-black text-xs uppercase tracking-[0.2em] hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
            {t('yield.tryDifferent')}
          </Link>
        </div>
      </main>
    </div>
  );
}
