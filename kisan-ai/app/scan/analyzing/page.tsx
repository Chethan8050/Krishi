'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../store/useAppStore';

export default function AnalyzingPage() {
  const router = useRouter();
  const { setRecentScanResult, selectedImage } = useAppStore();
  const [currentStep, setCurrentStep] = useState(2); // 0=uploaded, 1=preprocess, 2=running, 3=generating

  useEffect(() => {
    let isMounted = true;
    
    const analyze = async () => {
      if (!selectedImage) {
        router.push('/scan');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('image', selectedImage);

        const res = await fetch('/api/scan', { 
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        
        if (!isMounted) return;
        
        setCurrentStep(3); // Moving to final step visually
        setRecentScanResult(data);
        
        // Short delay for visual effect
        setTimeout(() => {
          if (data.status === 'healthy') {
            router.push('/scan/result/healthy');
          } else {
            router.push('/scan/result/disease');
          }
        }, 800);
      } catch (err) {
        console.error(err);
        // Fallback for demo
        router.push('/scan/result/disease');
      }
    };
    
    analyze();
    return () => { isMounted = false; };
  }, [router, setRecentScanResult, selectedImage]);

  const steps = [
    { label: 'Image uploaded', done: currentStep >= 0 },
    { label: 'Preprocessing image', done: currentStep >= 1 },
    { label: 'Running detection', active: currentStep === 2, done: currentStep > 2 },
    { label: 'Generating treatment', active: currentStep === 3, pending: currentStep < 3 },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col text-[#1a1c1c]">
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#f9f9f9] border-b border-[#c0c9bb]">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#717a6d] opacity-50 cursor-not-allowed">arrow_back</span>
          <h1 className="font-bold text-[24px] leading-[32px] text-[#00450d]">Analysing...</h1>
        </div>
        <span className="material-symbols-outlined text-[#00450d]">language</span>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        {/* Progress Ring */}
        <div className="relative flex items-center justify-center mb-8">
          <svg className="w-48 h-48">
            <circle className="text-[#e2e2e2]" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="8" />
            <circle className="text-[#1b5e20]" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor"
              strokeDasharray="502.65" strokeDashoffset="175.92" strokeLinecap="round" strokeWidth="8"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="material-symbols-outlined text-[#00450d] text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
          </div>
        </div>

        <div className="text-center space-y-1 mb-8">
          <h2 className="font-bold text-[24px] text-[#1a1c1c]">AI is analysing your crop</h2>
          <p className="text-[16px] text-[#41493e]">Scanning for 38 possible diseases...</p>
        </div>

        <div className="w-full max-w-md space-y-4">
          {steps.map(step => (
            <div key={step.label} className={`flex items-center gap-4 p-4 rounded-xl border ${step.active ? 'bg-[#bdefbe] border-[#3c6842]' : step.done ? 'bg-[#f9f9f9] border-[#c0c9bb]' : 'bg-[#f9f9f9] border-[#c0c9bb] opacity-50'}`}>
              {step.done && <span className="material-symbols-outlined text-[#00450d]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
              {step.active && <span className="material-symbols-outlined text-[#3c6842] animate-spin">sync</span>}
              {step.pending && <span className="material-symbols-outlined text-[#717a6d]">radio_button_unchecked</span>}
              <span className={`font-bold text-[14px] ${step.active ? 'text-[#426e47]' : step.done ? 'text-[#1a1c1c]' : 'text-[#41493e]'}`}>{step.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 w-full max-w-md overflow-hidden rounded-xl border border-[#c0c9bb] aspect-video relative">
          <img className="w-full h-full object-cover grayscale-[20%]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQeDRc2BInUIbiMZ4TMzaBo9hnpV0vcIm3WtYxf66t8lmWTUlqJapBvXh8QaIIQgttrrCPqvIQdPMSl7GWC5rn5N0rvCSGSnH-YK4u2QwUj5n4DWOuwRcHtdcKeDFViBxk9gG345MOU42Onh1LEUSRh6bvrRit_BzFeCep7NzuHna-kjzuogiNjlqwqCPCYvDAbyT_RfmECRAEhMZaaqaUc3v64uAl15lmH1CGvFRtVfU2Pc0OBGY_tlmETL8DA9x7eKy4hgtss6QF"
            alt="Crop being analyzed" />
          <div className="absolute inset-0 bg-[#00450d]/10 flex items-center justify-center">
            <div className="w-full h-1 bg-[#1b5e20]/40 shadow-[0_0_15px_rgba(27,94,32,0.8)] absolute top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </main>

      <footer className="p-4 text-center">
        <p className="text-[12px] text-[#41493e] italic">This usually takes 3–5 seconds</p>
      </footer>
    </div>
  );
}
