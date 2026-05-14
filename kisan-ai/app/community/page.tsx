'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import MapComponent from '../../components/MapComponent';
import { useAppStore } from '../store/useAppStore';
import { createT } from '../../lib/i18n';

export default function CommunityMapPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { language } = useAppStore();
  const t = createT(language);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] min-h-screen flex flex-col font-[var(--font-inter)]">
      {/* Premium Header - Glassmorphism */}
      <header className="sticky top-0 w-full z-50 glass px-6 py-5 flex justify-between items-center border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-black tracking-tight text-[#065f46] font-[var(--font-outfit)] uppercase tracking-[0.05em]">{t('dash.diseaseMap')}</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400">
          <span className="material-symbols-outlined">satellite_alt</span>
        </button>
      </header>

      {/* Main Map Viewport */}
      <main className="flex-grow relative flex flex-col">
        {/* Map Canvas - Expanded Height */}
        <div className="h-[450px] w-full relative overflow-hidden shadow-inner bg-slate-100">
          <MapComponent 
            center={{ lat: 12.52, lng: 76.90 }} 
            zoom={10} 
            markers={[
              { lat: 12.5222, lng: 76.8958, title: 'Mandya', count: 24 },
              { lat: 12.2958, lng: 76.6394, title: 'Mysuru', count: 18 },
              { lat: 13.3392, lng: 77.1140, title: 'Tumkur', count: 11 },
            ]}
          />
          
          {/* Floating Status Bar - Premium Design */}
          <div className="absolute top-6 left-6 right-6">
             <div className="glass px-6 py-3 rounded-full border border-white/20 shadow-premium-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                   <p className="text-[10px] font-black text-[#065f46] uppercase tracking-[0.2em]">Real-time Outbreak Intel</p>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Karnataka Region</p>
             </div>
          </div>

          {/* Legend Overlay - Modern Glass */}
          <div className="absolute bottom-16 left-6 glass-dark p-6 rounded-[32px] border border-white/10 space-y-4 shadow-2xl backdrop-blur-xl">
            <h4 className="font-black text-[10px] text-white/50 uppercase tracking-[0.2em] px-1">{t('community.risk')}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.5)]"></div>
                <span className="text-xs font-black text-white uppercase tracking-widest">{t('community.high')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.5)]"></div>
                <span className="text-xs font-black text-white/80 uppercase tracking-widest">{t('community.moderate')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
                <span className="text-xs font-black text-white/60 uppercase tracking-widest">{t('community.safe')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Detail Panel - Pull Up Experience */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-t-[48px] -mt-12 relative z-10 px-8 pt-8 pb-40 border-t border-slate-100 shadow-premium-up max-w-4xl mx-auto w-full"
        >
          <div className="w-16 h-1.5 bg-slate-100 rounded-full mx-auto mb-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{t('community.selection')}</p>
              <h2 className="text-4xl font-black text-slate-800 font-[var(--font-outfit)] tracking-tight">Mandya District</h2>
            </div>
            <div className="bg-red-50 text-red-600 px-8 py-3 rounded-[24px] font-black text-2xl shadow-sm border border-red-100/50 flex items-center gap-2">
              24 <span className="text-xs font-bold uppercase tracking-widest opacity-60">{t('community.reports')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Top Threat Card - High Fidelity */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[40px] relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                   <span className="material-symbols-outlined text-emerald-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>coronavirus</span>
                </div>
                <p className="font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">{t('community.topThreat')}</p>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-end">
                  <p className="text-xl font-black text-slate-800 tracking-tight">Tomato Early Blight</p>
                  <p className="text-2xl font-black text-emerald-600">67%</p>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "67%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full shadow-lg"
                  ></motion.div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl -mr-16 -mt-16"></div>
            </div>

            {/* Warning Insight Card */}
            <div className="bg-amber-50 border border-amber-100/50 p-8 rounded-[40px] flex flex-col gap-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-[20px] flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <span className="material-symbols-outlined text-white font-black">warning</span>
                </div>
                <p className="text-amber-800 font-black text-[10px] uppercase tracking-[0.2em]">Regional Warning</p>
              </div>
              <p className="text-amber-900/70 font-medium text-sm leading-relaxed">
                <strong>{t('community.warning')}:</strong> Disease clusters detected in neighboring Mysuru moving North-East. Apply preventive measures this week.
              </p>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#065f46] text-white py-6 rounded-[32px] font-black text-xl flex items-center justify-center gap-4 shadow-2xl shadow-emerald-900/30 transition-all border-b-4 border-[#044d38]"
          >
            <span className="material-symbols-outlined text-2xl">shield_with_house</span>
            {t('community.protectBtn')}
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
