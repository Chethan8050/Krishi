'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../../store/useAppStore';
import { useEffect, useState } from 'react';

export default function ResultDiseasePage() {
  const router = useRouter();
  const { recentScanResult, selectedImage } = useAppStore();
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (!recentScanResult) {
      router.push('/scan');
      return;
    }
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [recentScanResult, selectedImage, router]);

  if (!recentScanResult) return null;

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen pb-32">
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#f9f9f9] border-b border-[#c0c9bb]">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="material-symbols-outlined text-[#00450d] active:opacity-80 transition-opacity">arrow_back</button>
          <h1 className="font-bold text-[24px] text-[#00450d]">Analysis Result</h1>
        </div>
        <button className="material-symbols-outlined text-[#00450d]">share</button>
      </header>

      <main className="px-4 pt-6 space-y-6">
        {/* Image */}
        <section className="relative">
          <div className="rounded-xl overflow-hidden border border-[#c0c9bb] shadow-sm aspect-video w-full bg-[#e2e2e2]">
            <img className="w-full h-full object-cover"
              src={imageUrl || "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=800"}
              alt="Scanned crop" />
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 text-[#00450d] px-3 py-1 rounded-full font-bold text-[12px] shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">psychology</span> {recentScanResult.crop}
              </span>
            </div>
          </div>
        </section>

        {/* Disease Card */}
        <section className="p-4 rounded-xl border border-[#ba1a1a] bg-[#FFEBEE] space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold text-[20px] text-[#93000a]">{recentScanResult.disease} Detected</h2>
              <p className="text-[16px] italic text-[#41493e]">Action required immediately</p>
            </div>
            <span className="bg-[#823f00] text-[#ffb481] px-3 py-1 rounded-full font-bold text-[12px]">
              {Math.round(recentScanResult.confidence * 100)}% Match
            </span>
          </div>
        </section>

        {/* Severity */}
        <section className="p-4 rounded-xl border border-[#c0c9bb] bg-[#f9f9f9] space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[16px] text-[#41493e]">Severity Level</span>
            <span className="font-bold text-[14px] text-[#5f2c00]">{recentScanResult.severity}</span>
          </div>
          <div className="w-full bg-[#e2e2e2] rounded-full h-3 overflow-hidden">
            <div className="bg-[#5f2c00] h-full rounded-full transition-all duration-1000" style={{ width: recentScanResult.severity === 'High' ? '90%' : '55%' }} />
          </div>
        </section>

        {/* Treatment */}
        <section className="space-y-4">
          <h3 className="font-semibold text-[20px] text-[#00450d]">Treatment Plan</h3>
          <div className="grid grid-cols-1 gap-2">
            {recentScanResult.treatment.map((step: string, i: number) => (
              <div key={i} className="flex gap-4 p-4 bg-[#f3f3f4] rounded-xl border border-[#c0c9bb] items-start">
                <div className="bg-[#1b5e20] text-[#90d689] h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    {['content_cut', 'water_drop', 'eco', 'layers'][i % 4]}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-[14px]">Step {i + 1}</p>
                  <p className="text-[16px] text-[#41493e]">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Buttons */}
        <section className="space-y-2 pt-4">
          <button className="w-full bg-[#1b5e20] text-white py-4 rounded-full font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform">
            <span className="material-symbols-outlined">volume_up</span> Hear Diagnosis in Local Language
          </button>
          <button className="w-full border-2 border-[#00450d] text-[#00450d] py-4 rounded-full font-bold flex items-center justify-center gap-3 active:opacity-80 transition-opacity">
            <span className="material-symbols-outlined">ios_share</span> Share Result
          </button>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 flex justify-around items-center px-1 py-3 bg-[#f9f9f9] border-t border-[#c0c9bb]">
        {[
          { icon: 'home', label: 'Home', href: '/dashboard' },
          { icon: 'document_scanner', label: 'Scan', href: '/scan', active: true },
          { icon: 'bar_chart', label: 'Yield', href: '/yield' },
          { icon: 'more_horiz', label: 'More', href: '/about' },
        ].map(item => (
          <Link key={item.label} href={item.href} className={`flex flex-col items-center justify-center px-4 py-1 active:scale-95 transition-transform rounded-full ${item.active ? 'bg-[#bdefbe] text-[#426e47]' : 'text-[#41493e]'}`}>
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[12px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
