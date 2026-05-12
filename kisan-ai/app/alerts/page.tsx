'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';

export default function AlertsPage() {
  const router = useRouter();

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] font-body-md min-h-screen flex flex-col pb-24">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#f9f9f9] border-b border-[#c0c9bb]">
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="material-symbols-outlined text-[#41493e] hover:bg-[#f3f3f4] transition-colors p-1 rounded-full">arrow_back</button>
          <h1 className="font-bold text-[24px] text-[#00450d]">Alerts &amp; Tips</h1>
        </div>
        <button className="font-bold text-[14px] text-[#00450d] active:opacity-80 transition-opacity">Mark all read</button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-margin-mobile py-lg max-w-2xl mx-auto w-full">
        {/* Section Today */}
        <section className="mb-xl">
          <h2 className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant mb-md px-1">Today</h2>
          <div className="space-y-md">
            {/* Notification Card 1 */}
            <div className="bg-surface-container-lowest border-l-4 border-primary p-md rounded-xl shadow-sm flex gap-md hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="bg-primary-container text-on-primary-container w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">energy_savings_leaf</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-bold text-label-bold text-on-surface">Scan result ready</h3>
                  <span className="text-label-sm font-medium text-on-surface-variant opacity-70">10m ago</span>
                </div>
                <p className="text-body-md text-on-surface-variant leading-snug">Your wheat crop scan from 9:00 AM has been processed. Tap to see the health report.</p>
              </div>
              <div className="w-2.5 h-2.5 bg-primary rounded-full mt-2 shrink-0"></div>
            </div>

            {/* Notification Card 2 */}
            <div className="bg-surface-container-lowest border-l-4 border-tertiary p-md rounded-xl shadow-sm flex gap-md hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="bg-tertiary-container text-on-tertiary-container w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-bold text-label-bold text-on-surface">Disease Alert</h3>
                  <span className="text-label-sm font-medium text-on-surface-variant opacity-70">2h ago</span>
                </div>
                <p className="text-body-md text-on-surface-variant leading-snug">Yellow Rust detected in neighboring farms. We recommend checking your crops immediately.</p>
              </div>
              <div className="w-2.5 h-2.5 bg-tertiary rounded-full mt-2 shrink-0"></div>
            </div>
          </div>
        </section>

        {/* Section Yesterday */}
        <section>
          <h2 className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant mb-md px-1">Yesterday</h2>
          <div className="space-y-md">
            {/* Notification Card 3 */}
            <div className="bg-surface-container-low border-l-4 border-outline p-md rounded-xl flex gap-md opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              <div className="bg-surface-variant text-on-surface-variant w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">info</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-bold text-label-bold text-on-surface">Weekly Farming Tip</h3>
                  <span className="text-label-sm font-medium text-on-surface-variant opacity-70">Yesterday</span>
                </div>
                <p className="text-body-md text-on-surface-variant leading-snug">Optimizing irrigation schedules during the flowering stage can increase yield by 15%.</p>
              </div>
            </div>

            {/* Notification Card 4 */}
            <div className="bg-surface-container-low border-l-4 border-outline p-md rounded-xl flex gap-md opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              <div className="bg-surface-variant text-on-surface-variant w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">bar_chart</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-bold text-label-bold text-on-surface">Yield Report Ready</h3>
                  <span className="text-label-sm font-medium text-on-surface-variant opacity-70">Yesterday</span>
                </div>
                <p className="text-body-md text-on-surface-variant leading-snug">Your monthly yield summary for September is now available for download.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contextual Illustration (Bento Style) */}
        <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="bg-secondary-container rounded-2xl p-lg flex flex-col justify-end min-h-[180px] relative overflow-hidden shadow-sm">
            <img className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7NBzuy6nbJYGcBh6dum6l8p95e8O_jg4pSgrp9LMPoO-ucp0BwxvB1E8QL0hmG_7NVNCIbL3he5TzUj3kxkkybf1aRTv_ZMEcRK88NjW08NX72kXcVjAG5Z_aUlyRhVy79IjNaY6r8X97P4hiT0LH9fNnTbkZ3uAqGs_Wz3p0kkIrYhgO6tlelqDqH7jd5pkzKifr0CzXHIbHlWs3svMBuqgGWKd8wOWywqCxIQo0mAQEsKrYJiUD424GGFSK8ck9bZK5q6qgD3zu" alt="Farm field" />
            <h4 className="text-title-md text-on-secondary-container relative z-10">Smart Farm Insights</h4>
            <p className="text-label-sm text-on-secondary-container opacity-80 relative z-10">Real-time alerts help you make better decisions.</p>
          </div>
          <div className="bg-primary rounded-2xl p-lg flex items-center justify-between min-h-[180px] shadow-md relative overflow-hidden">
            <div className="flex flex-col relative z-10">
              <h4 className="text-title-md text-on-primary-container">AI Advisor</h4>
              <p className="text-label-sm text-on-primary-container opacity-80">Always watching your fields.</p>
              <button className="mt-lg bg-surface-container-lowest text-primary px-6 py-2 rounded-full font-bold w-fit active:scale-95 transition-transform shadow-sm">Ask Advice</button>
            </div>
            <span className="material-symbols-outlined text-[80px] text-on-primary-container opacity-20 absolute -right-4 -bottom-4">psychology</span>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
