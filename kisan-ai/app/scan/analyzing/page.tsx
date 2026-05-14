'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { createT } from '../../../lib/i18n';

export default function AnalyzingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { setRecentScanResult, selectedImage, language } = useAppStore();
  const t = createT(language);
  const [currentStep, setCurrentStep] = useState(2); // 0=uploaded, 1=preprocess, 2=running, 3=generating

  useEffect(() => {
    setMounted(true);
    let isMounted = true;
    
    const analyze = async () => {
      if (!selectedImage) {
        router.push('/scan');
        return;
      }

      setRecentScanResult(null);

      try {
        const formData = new FormData();
        formData.append('image', selectedImage);

        const res = await fetch('/api/scan', { 
          method: 'POST',
          body: formData
        });
        
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Prediction failed');
        }

        const data = await res.json();
        
        if (!isMounted) return;
        
        setCurrentStep(3);
        setRecentScanResult(data);
        
        setTimeout(() => {
          if (data.status === 'healthy') {
            router.push('/scan/result/healthy');
          } else {
            router.push('/scan/result/disease');
          }
        }, 1200);
      } catch (err: any) {
        console.error('[Scan Error]:', err);
        alert(`Scan failed: ${err.message}`);
        router.push('/scan');
      }
    };
    
    analyze();
    return () => { isMounted = false; };
  }, [router, setRecentScanResult, selectedImage]);

  const steps = [
    { label: t('analyzing.step1'), done: currentStep >= 0 },
    { label: t('analyzing.step2'), done: currentStep >= 1 },
    { label: t('analyzing.step3'), active: currentStep === 2, done: currentStep > 2 },
    { label: t('analyzing.step4'), active: currentStep === 3, pending: currentStep < 3 },
  ];

  if (!mounted) return null;

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col text-[#0f172a] font-[var(--font-inter)]">
      <header className="sticky top-0 w-full z-50 glass px-4 py-4 flex justify-between items-center border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-slate-300">arrow_back</span>
          <h1 className="text-xl font-black tracking-tight text-[#065f46] font-[var(--font-outfit)]">{t('analyzing.title')}</h1>
        </div>
        <span className="material-symbols-outlined text-[#065f46] animate-pulse">cloud_upload</span>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 max-w-2xl mx-auto w-full">
        {/* Modern Progress Indicator */}
        <div className="relative mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-56 h-56 rounded-full border-[6px] border-emerald-100 border-t-emerald-600 shadow-xl"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-emerald-50 rounded-[30px] flex items-center justify-center shadow-lg"
            >
              <span className="material-symbols-outlined text-[#065f46] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            </motion.div>
            <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">AI Core Active</p>
          </div>
        </div>

        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl font-black tracking-tight font-[var(--font-outfit)]">{t('analyzing.heading')}</h2>
          <p className="text-slate-500 font-medium">{t('analyzing.scanning')}</p>
        </div>

        <div className="w-full space-y-3 mb-10">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex items-center gap-4 p-5 rounded-[24px] border-2 transition-all duration-500 ${
                step.active 
                  ? 'bg-emerald-50 border-emerald-500/30 shadow-premium scale-[1.02]' 
                  : step.done 
                    ? 'bg-white border-slate-100 opacity-100' 
                    : 'bg-white/50 border-slate-100/50 opacity-40'
              }`}
            >
              <div className="flex-shrink-0">
                {step.done ? (
                  <span className="material-symbols-outlined text-emerald-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                ) : step.active ? (
                  <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="material-symbols-outlined text-slate-300 text-2xl">radio_button_unchecked</span>
                )}
              </div>
              <span className={`font-bold text-sm ${step.active ? 'text-emerald-900' : step.done ? 'text-slate-700' : 'text-slate-400'}`}>
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Visual Scan Effect */}
        <div className="w-full relative rounded-[32px] overflow-hidden border-4 border-white shadow-premium-lg aspect-[16/10] bg-slate-200">
           {selectedImage ? (
              <img src={URL.createObjectURL(selectedImage)} alt="Scan Preview" className="w-full h-full object-cover grayscale-[30%]" />
           ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100">
                <span className="material-symbols-outlined text-slate-300 text-6xl">image</span>
              </div>
           )}
           <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)] z-10"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />
        </div>
      </main>

      <footer className="p-8 text-center">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest italic">{t('analyzing.footer')}</p>
      </footer>
    </div>
  );
}
