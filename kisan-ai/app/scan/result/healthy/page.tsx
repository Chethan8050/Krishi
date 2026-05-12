'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../../store/useAppStore';
import { useEffect, useState } from 'react';

export default function ResultHealthyPage() {
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
      <nav className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#f9f9f9] border-b border-[#c0c9bb]">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="material-symbols-outlined text-[#00450d] hover:bg-[#f3f3f4] p-2 rounded-full transition-colors active:opacity-80">arrow_back</button>
          <h1 className="font-bold text-[24px] text-[#00450d]">Analysis Result</h1>
        </div>
        <button className="material-symbols-outlined text-[#00450d] hover:bg-[#f3f3f4] p-2 rounded-full transition-colors">share</button>
      </nav>

      <main className="px-4 mt-6 space-y-6 max-w-2xl mx-auto">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#c0c9bb] bg-[#eeeeee]">
          <img className="w-full h-full object-cover"
            src={imageUrl || "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=800"}
            alt="Scanned crop" />
          <div className="absolute top-4 left-4">
            <span className="bg-[#00450d] text-white px-4 py-1 rounded-full font-bold text-[14px] shadow-sm">{recentScanResult.crop}</span>
          </div>
        </div>

        {/* Healthy Result */}
        <div className="bg-[#E8F5E9] border border-[#C8E6C9] p-6 rounded-xl flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-[#00450d] rounded-full flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <div>
            <h2 className="font-bold text-[24px] text-[#00450d]">Plant is Healthy! 🎉</h2>
            <p className="text-[16px] text-[#41493e]">{recentScanResult.message}</p>
          </div>
          <span className="bg-[#bdefbe] text-[#426e47] px-6 py-1 rounded-full font-bold text-[14px]">
            {Math.round(recentScanResult.confidence * 100)}% Confident
          </span>
        </div>

        {/* Care Tips */}
        <div className="bg-white border border-[#c0c9bb] p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00450d]">potted_plant</span>
            <h3 className="font-semibold text-[20px] text-[#00450d]">Care Tips</h3>
          </div>
          <ul className="space-y-4">
            {recentScanResult.tips.map((tip: string) => (
              <li key={tip} className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#00450d] mt-1 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                <p className="text-[16px] text-[#41493e]">{tip}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Audio */}
        <div className="space-y-4">
          <button className="w-full bg-[#00450d] text-white rounded-full py-6 flex items-center justify-center gap-4 active:scale-[0.98] transition-transform shadow-md">
            <span className="material-symbols-outlined">volume_up</span>
            <span className="font-bold text-[16px]">Hear Care Tips in Local Language</span>
          </button>
        </div>

        <button onClick={() => router.push('/scan')} className="w-full border-2 border-[#00450d] text-[#00450d] rounded-full py-6 flex items-center justify-center gap-4 hover:bg-[#f3f3f4] transition-colors active:opacity-80">
          <span className="material-symbols-outlined">document_scanner</span>
          <span className="font-bold text-[16px]">Scan Another Crop</span>
        </button>
      </main>

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
