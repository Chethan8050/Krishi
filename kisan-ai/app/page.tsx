'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push('/login'), 3000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <>
      <style>{`
        .circuit-pattern {
          background-color: #1b5e20;
          background-image: radial-gradient(#2e7d32 1px, transparent 1px), linear-gradient(45deg, transparent 49%, #2e7d32 50%, transparent 51%);
          background-size: 40px 40px, 60px 60px;
          background-position: 0 0, 30px 30px;
        }
        .loading-glow { box-shadow: 0 0 15px rgba(165,214,167,0.4); }
        @keyframes loadBar { from { width: 0% } to { width: 100% } }
        .load-anim { animation: loadBar 3s linear forwards; }
      `}</style>
      <main className="relative h-screen w-full flex flex-col items-center justify-between py-8 px-4 circuit-pattern overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] pointer-events-none" />
        <div className="flex-1" />
        <section className="flex flex-col items-center justify-center space-y-6 z-10">
          <div className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            <span className="material-symbols-outlined text-[80px] text-[#1b5e20]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
          </div>
          <div className="text-center">
            <h1 className="text-[32px] font-extrabold leading-[40px] text-white mb-1 tracking-tight">KisanAI</h1>
            <p className="text-[12px] font-medium italic text-[#a2d3a4] tracking-wide">Your Smart Crop Doctor</p>
          </div>
        </section>
        <div className="flex-1" />
        <section className="w-full max-w-[280px] flex flex-col items-center space-y-4 z-10 mb-8">
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#a2d3a4] loading-glow rounded-full load-anim" />
          </div>
          <p className="text-[10px] font-medium text-white/90 uppercase tracking-[0.1em] opacity-80">
            Powered by AI • Free for every farmer
          </p>
        </section>
      </main>
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.4)]" />
    </>
  );
}
