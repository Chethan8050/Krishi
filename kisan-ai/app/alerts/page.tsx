'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../store/useAppStore';
import { createT } from '../../lib/i18n';

export default function Alerts() {
  const router = useRouter();
  const { language } = useAppStore();
  const t = createT(language);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-3 bg-[#1b5e20] text-white border-b border-[#c0c9bb]">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="material-symbols-outlined text-white">arrow_back</button>
          <h1 className="text-[20px] font-extrabold tracking-tight">{t('alerts.title')}</h1>
        </div>
        <button className="text-[12px] font-bold underline">{t('alerts.markRead')}</button>
      </header>

      <main className="flex-1 px-4 py-6 space-y-8 pb-32">
        {/* Weather Risk Card */}
        <section className="space-y-4">
          <h2 className="font-bold text-[14px] uppercase tracking-wider text-[#41493e]">{t('alerts.weatherTitle')}</h2>
          <div className="bg-[#bdefbe] border border-[#a2d3a4] rounded-2xl p-4 flex gap-4 cursor-pointer active:scale-[0.99] transition-transform" onClick={() => router.push('/alerts/weather')}>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[#1b5e20] text-[32px]">warning</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[16px] text-[#00450d]">High Humidity Alert</h3>
                <span className="text-[10px] bg-white/50 px-2 py-0.5 rounded-full font-bold">10:30 AM</span>
              </div>
              <p className="text-[14px] text-[#426e47] mt-1">Conditions are ideal for Fungal growth in Tomato crops. Consider preventative spraying.</p>
              <button className="text-[12px] font-bold mt-2 flex items-center gap-1 text-[#00450d]">
                {t('alerts.viewDetails')} <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Crop Health Alerts */}
        <section className="space-y-4">
          <h2 className="font-bold text-[14px] uppercase tracking-wider text-[#41493e]">{t('alerts.cropRiskTitle')}</h2>
          <div className="space-y-3">
            {[
              { id: 1, title: 'Potato Blight Outbreak', location: 'Nearby Area (2km)', severity: 'High', color: 'bg-[#ffdad6] text-[#93000a] border-[#ffdad6]' },
              { id: 2, title: 'Wheat Rust Warning', location: 'District Level', severity: 'Mod', color: 'bg-[#ffdcc6] text-[#723600] border-[#ffdcc6]' },
            ].map(alert => (
              <div key={alert.id} className={`${alert.color} border rounded-xl p-4 flex justify-between items-center active:scale-95 transition-transform`}>
                <div>
                  <h4 className="font-bold text-[15px]">{alert.title}</h4>
                  <p className="text-[12px] opacity-80">{alert.location}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-[12px]">{alert.severity}</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="space-y-4">
          <h2 className="font-bold text-[14px] uppercase tracking-wider text-[#41493e]">AI Farming Tips</h2>
          <div className="bg-white border border-[#c0c9bb] rounded-2xl p-4 flex gap-4">
            <span className="material-symbols-outlined text-[#1b5e20]">lightbulb</span>
            <p className="text-[14px] italic text-[#41493e]">
              "Ensure proper drainage in your potato fields this week to prevent root rot due to expected light showers."
            </p>
          </div>
        </section>
      </main>

          </div>
  );
}
