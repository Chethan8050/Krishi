'use client';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../../store/useAppStore';
import { useEffect, useState } from 'react';

export default function ResultDiseasePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { recentScanResult, selectedImage } = useAppStore();
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
    utterance.text = `${recentScanResult.crop}. ${recentScanResult.disease} detected. Severity: ${recentScanResult.severity}. Treatment: ${recentScanResult.treatment.join('. ')}`;
    window.speechSynthesis.speak(utterance);
  };

  if (!mounted || !recentScanResult) return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <span className="material-symbols-outlined text-primary text-[48px] animate-spin">sync</span>
    </div>
  );

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen pb-32">
      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto space-y-section-gap">
        {/* Diagnostic Overview Hero */}
        <section className="glass-panel rounded-2xl overflow-hidden relative flex flex-col md:flex-row gap-6 p-2">
          {/* Scanned Image */}
          <div 
            className="w-full md:w-1/3 h-48 md:h-auto rounded-xl bg-surface-container-high relative overflow-hidden flex-shrink-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('${imageUrl || "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=800"}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 flex gap-2">
              <span className="glass-panel px-3 py-1 rounded-full font-label-md text-label-md text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">my_location</span>
                Analyzed Target
              </span>
            </div>
          </div>
          
          {/* Core Metrics */}
          <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="font-headline-md text-[28px] md:text-headline-md text-on-surface mb-1">{recentScanResult.crop} {recentScanResult.disease}</h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">science</span>
                  Detected Issue
                </p>
              </div>
              {/* Severity Badge */}
              <div className="px-3 py-1.5 rounded-full border border-tertiary/30 bg-tertiary/10 text-tertiary font-label-md text-label-md flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
                {recentScanResult.severity} Severity
              </div>
            </div>
            
            <div className="h-px w-full bg-glass-stroke my-6"></div>
            
            {/* Confidence Score Row */}
            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16 rounded-full flex items-center justify-center metric-ring shadow-[0_0_15px_rgba(16,185,129,0.2)]" style={{ '--percentage': Math.round(recentScanResult.confidence * 100) } as any}>
                <div className="absolute inset-1 bg-surface-container rounded-full flex items-center justify-center">
                  <span className="font-headline-md text-headline-md text-primary">{Math.round(recentScanResult.confidence * 100)}<span className="text-[14px]">%</span></span>
                </div>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">AI Confidence</p>
                <p className="font-body-sm text-body-sm text-on-surface">High certainty match based on visible foliar lesions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contextual Action Bar */}
        <section className="flex flex-wrap items-center justify-between gap-4">
          <button onClick={speakResult} className="glass-panel flex items-center gap-3 px-5 py-3 rounded-full hover:bg-primary/10 hover:border-primary/30 transition-all group">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface font-medium">Hear Expert Advice</span>
            <div className="flex items-end gap-0.5 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <div className="w-1 bg-primary rounded-t-sm h-full animate-[bounce_1s_infinite]"></div>
              <div className="w-1 bg-primary rounded-t-sm h-1/2 animate-[bounce_1.2s_infinite]"></div>
              <div className="w-1 bg-primary rounded-t-sm h-3/4 animate-[bounce_0.8s_infinite]"></div>
            </div>
          </button>
          <div className="flex items-center gap-3">
            <div className="glass-panel flex p-1 rounded-full">
              <button className="px-4 py-1.5 rounded-full bg-primary/20 text-primary font-label-md text-label-md shadow-[0_0_10px_rgba(78,222,163,0.1)] transition-colors">EN</button>
              <button className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">HI</button>
              <button className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">KN</button>
            </div>
            <button aria-label="Share Result" className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>
        </section>

        {/* Bento Grid: Treatment Protocols */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Chemical / Standard Protocol */}
          <div className="glass-panel rounded-2xl p-card-padding flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-tertiary/10 border border-tertiary/20 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined">healing</span>
              </div>
              <div>
                <h2 className="font-body-lg text-body-lg text-on-surface font-medium">Standard Protocol</h2>
                <p className="font-label-md text-label-md text-on-surface-variant">Recommended targeted actions</p>
              </div>
            </div>
            <ul className="space-y-4 flex-1">
              {recentScanResult.treatment.map((step: string, index: number) => {
                const icons = ['content_cut', 'sprinkler', 'water_drop', 'air'];
                return (
                  <li key={index} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">{icons[index % icons.length]}</span>
                    <div>
                      <p className="font-body-sm text-body-sm text-on-surface">Step {index + 1}</p>
                      <p className="font-label-md text-label-md text-on-surface-variant mt-1">{step}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Organic Protocol */}
          <div className="glass-panel rounded-2xl p-card-padding flex flex-col h-full relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <div>
                <h2 className="font-body-lg text-body-lg text-on-surface font-medium">Organic Alternatives</h2>
                <p className="font-label-md text-label-md text-on-surface-variant">Biological and natural treatments</p>
              </div>
            </div>
            <ul className="space-y-4 flex-1 relative z-10">
              <li className="flex items-start gap-3 bg-surface-container/50 p-3 rounded-lg border border-glass-stroke">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">vaccines</span>
                <div>
                  <p className="font-body-sm text-body-sm text-on-surface text-primary-fixed-dim">Neem Solution Spray</p>
                  <p className="font-label-md text-label-md text-on-surface-variant mt-1">Mix 5ml cold-pressed neem oil per liter of water with mild soap. Spray weekly.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 bg-surface-container/50 p-3 rounded-lg border border-glass-stroke">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">compost</span>
                <div>
                  <p className="font-body-sm text-body-sm text-on-surface text-primary-fixed-dim">Cow Dung Compost</p>
                  <p className="font-label-md text-label-md text-on-surface-variant mt-1">Apply well-rotted compost to strengthen plant immunity and improve soil microbiome.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Floating Action Area */}
      <div className="fixed bottom-0 w-full z-40 bg-gradient-to-t from-background via-background/90 to-transparent pt-12 pb-6 px-margin-mobile flex justify-center pointer-events-none">
        <button onClick={() => router.push('/scan')} className="pointer-events-auto bg-primary-container text-on-primary-container font-headline-md text-body-md font-medium px-8 py-4 rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 transition-all w-full max-w-sm justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
          <span className="material-symbols-outlined relative z-10">document_scanner</span>
          <span className="relative z-10">Scan Another Leaf</span>
        </button>
      </div>

      <style jsx>{`
        .metric-ring {
            background: conic-gradient(var(--color-primary-container) calc(var(--percentage) * 1%), var(--color-surface-variant) 0);
        }
      `}</style>
    </div>
  );
}
