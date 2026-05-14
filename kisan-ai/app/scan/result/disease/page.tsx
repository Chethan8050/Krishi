'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../../store/useAppStore';
import { useEffect, useState } from 'react';
import { createT } from '../../../../lib/i18n';

export default function ResultDiseasePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { recentScanResult, selectedImage, language } = useAppStore();
  const t = createT(language);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    setMounted(true);
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

  const speakResult = () => {
    if (!recentScanResult) return;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `${recentScanResult.crop}. ${recentScanResult.disease} ${t('result.detected')}. ${t('result.severity')}: ${recentScanResult.severity}. ${t('result.treatment')}: ${recentScanResult.treatment.join('. ')}`;
    utterance.lang = language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  if (!mounted || !recentScanResult) return (
    <div className="bg-[#f9f9f9] min-h-screen flex items-center justify-center">
      <span className="material-symbols-outlined text-[#00450d] text-[48px] animate-spin">sync</span>
    </div>
  );

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen pb-32">
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-white border-b border-[#c0c9bb] shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="material-symbols-outlined text-[#00450d] hover:bg-[#f3f3f4] p-1 rounded-full transition-colors">arrow_back</button>
          <h1 className="font-bold text-[24px] text-[#00450d]">{t('result.title')}</h1>
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
        <section className="p-4 rounded-xl border border-[#ba1a1a] bg-[#ffdad6]/30 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-[20px] text-[#93000a]">{recentScanResult.disease} {t('result.detected')}</h2>
              <p className="text-[16px] italic text-[#41493e]">{t('result.actionReq')}</p>
            </div>
            <span className="bg-[#823f00] text-[#ffb481] px-3 py-1 rounded-full font-bold text-[12px]">
              {Math.round(recentScanResult.confidence * 100)}% {t('result.match')}
            </span>
          </div>
        </section>

        {/* Severity */}
        <section className="p-4 rounded-xl border border-[#c0c9bb] bg-white space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-[16px] text-[#41493e]">{t('result.severity')}</span>
            <span className="font-bold text-[14px] text-[#5f2c00]">{recentScanResult.severity}</span>
          </div>
          <div className="w-full bg-[#e2e2e2] rounded-full h-3 overflow-hidden">
            <div className="bg-[#5f2c00] h-full rounded-full transition-all duration-1000" style={{ width: recentScanResult.severity === 'High' ? '90%' : '55%' }} />
          </div>
        </section>

        {/* Treatment */}
        <section className="space-y-4">
          <h3 className="font-bold text-[20px] text-[#00450d]">{t('result.treatment')}</h3>
          <div className="grid grid-cols-1 gap-3">
            {recentScanResult.treatment.map((step: string, i: number) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-[#c0c9bb] items-start shadow-sm hover:border-[#1b5e20] transition-colors">
                <div className="bg-[#1b5e20] text-white h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-[20px]">
                    {['content_cut', 'water_drop', 'eco', 'layers'][i % 4]}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-[14px] text-[#00450d]">{t('result.step')} {i + 1}</p>
                  <p className="text-[16px] text-[#41493e] leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Buttons */}
        <section className="space-y-3 pt-4">
          <button onClick={speakResult} className="w-full bg-[#1b5e20] text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-lg">
            <span className="material-symbols-outlined">volume_up</span> {t('result.hearDiag')}
          </button>
          <button className="w-full border-2 border-[#00450d] text-[#00450d] py-5 rounded-full font-bold flex items-center justify-center gap-3 active:opacity-80 transition-opacity">
            <span className="material-symbols-outlined">ios_share</span> {t('result.share')}
          </button>
        </section>
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 flex justify-around items-center px-1 py-3 bg-white border-t border-[#c0c9bb] shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
        {[
          { icon: 'home', label: t('nav.home'), href: '/dashboard' },
          { icon: 'document_scanner', label: t('nav.scan'), href: '/scan', active: true },
          { icon: 'bar_chart', label: t('nav.yield'), href: '/yield' },
          { icon: 'more_horiz', label: t('nav.more'), href: '/community' },
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
