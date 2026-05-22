'use client';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../../store/useAppStore';
import { useEffect, useState } from 'react';

export default function ResultHealthyPage() {
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
    utterance.text = `${recentScanResult.crop}. Healthy. ${recentScanResult.message}. Care Tips: ${recentScanResult.tips.join('. ')}`;
    window.speechSynthesis.speak(utterance);
  };

  if (!mounted || !recentScanResult) return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <span className="material-symbols-outlined text-primary text-[48px] animate-spin">sync</span>
    </div>
  );

  return (
    <div className="bg-background text-on-surface min-h-screen pb-[100px] md:pb-0 overflow-x-hidden antialiased flex flex-col">
      {/* Main Canvas */}
      <main className="flex-grow pt-24 md:pt-28 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto space-y-section-gap w-full">
        {/* Result Overview Area */}
        <section className="flex flex-col items-center justify-center text-center space-y-6 py-8">
          <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full glass-panel glow-effect">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '64px', fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
          <div className="space-y-2">
            <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Healthy Plant</h2>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-[18px]">psychology</span>
              <span className="font-label-md text-body-sm text-primary">Confidence {Math.round(recentScanResult.confidence * 100)}%</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
            {recentScanResult.message}
          </p>
        </section>

        {/* Bento Grid Layout for Details & Tips */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Analyzed Image */}
          <div className="md:col-span-5 glass-panel rounded-xl overflow-hidden min-h-[300px] flex flex-col">
            <div className="p-4 border-b border-glass-stroke flex justify-between items-center bg-surface-container/50">
              <h3 className="font-headline-md text-body-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">image</span>
                Analyzed Sample
              </h3>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase bg-surface-variant/50 px-2 py-1 rounded">{recentScanResult.crop}</span>
            </div>
            <div className="flex-grow bg-surface relative min-h-[250px]">
              <img 
                alt="Analyzed crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-80" 
                src={imageUrl || "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=800"} 
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              </div>
            </div>
          </div>

          {/* Care Tips */}
          <div className="md:col-span-7 flex flex-col gap-gutter">
            <div className="glass-panel rounded-xl p-card-padding flex-grow flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">spa</span>
                  Maintenance Protocol
                </h3>
                <button onClick={speakResult} className="inline-flex items-center gap-2 bg-surface border border-glass-stroke hover:bg-primary/10 hover:border-primary/50 text-on-surface hover:text-primary transition-all rounded-full px-4 py-2 font-label-md text-body-sm group">
                  <span className="material-symbols-outlined group-hover:text-primary">volume_up</span>
                  Hear Care Tips
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                {recentScanResult.tips.map((tip: string, idx: number) => {
                  const icons = ['water_drop', 'science', 'calendar_month', 'cut'];
                  const colors = ['text-tertiary', 'text-primary', 'text-on-surface', 'text-error'];
                  return (
                    <div key={idx} className="bg-surface-container/50 border border-glass-stroke rounded-lg p-4 flex gap-4 items-start hover:border-primary/30 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0">
                        <span className={`material-symbols-outlined ${colors[idx % colors.length]}`}>{icons[idx % icons.length]}</span>
                      </div>
                      <div>
                        <h4 className="font-headline-md text-body-md text-on-surface mb-1">Protocol {idx + 1}</h4>
                        <p className="font-body-md text-body-sm text-on-surface-variant">{tip}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="flex justify-center gap-4 py-8">
          <button className="bg-surface border border-glass-stroke hover:bg-surface-container text-on-surface px-6 py-3 rounded-full font-headline-md text-body-md transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined">history</span>
            Save to Log
          </button>
          <button onClick={() => router.push('/scan')} className="bg-primary hover:bg-primary/90 text-background border border-transparent px-6 py-3 rounded-full font-headline-md text-body-md transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">add_a_photo</span>
            New Scan
          </button>
        </section>
      </main>

      <style jsx>{`
        .glow-effect {
            box-shadow: 0 0 24px rgba(16, 185, 129, 0.15);
        }
      `}</style>
    </div>
  );
}
