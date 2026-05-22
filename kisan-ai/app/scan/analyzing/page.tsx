'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../store/useAppStore';

export default function AnalyzingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { setRecentScanResult, selectedImage } = useAppStore();
  const [currentStep, setCurrentStep] = useState(2); // 0=uploaded, 1=preprocess, 2=running, 3=generating

  useEffect(() => {
    setMounted(true);
    let isMounted = true;
    
    const analyze = async () => {
      if (!selectedImage) {
        router.push('/scan');
        return;
      }

      setRecentScanResult(null);

      try {
        const formData = new FormData();
        formData.append('image', selectedImage);

        const res = await fetch('/api/scan', { 
          method: 'POST',
          body: formData
        });
        
        if (!res.ok) {
          throw new Error('Prediction failed');
        }

        const data = await res.json();
        
        if (!isMounted) return;
        
        setCurrentStep(3);
        setRecentScanResult(data);
        
        setTimeout(() => {
          if (data.status === 'healthy') {
            router.push('/scan/result/healthy');
          } else {
            router.push('/scan/result/disease');
          }
        }, 1200);
      } catch (err: any) {
        console.error('[Scan Error]:', err);
        alert(`Scan failed: ${err.message}`);
        router.push('/scan');
      }
    };
    
    analyze();
    return () => { isMounted = false; };
  }, [router, setRecentScanResult, selectedImage]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen text-on-surface flex items-center justify-center relative overflow-hidden antialiased bg-[#111416]">
      {/* Background Atmospheric Image / Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-cover bg-center" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2acqPwxj2O1IzXHWuj4mHZXw5XNsslzvNRXe0wVqHzD6RAVihax3_bAR_wCFUjzJhxqIHF6wmngW1qwg7D0p4vdRvvYidY0KLO_jlz86huXwIXUILHig2vYSZ0aIruirdUfMVKn40dtLOYPNs1PF_KlRl9Wf76usJS2VBCQuNvceWNkqCEoYzCBdZWOfTj2TLb2tgaqrBoOWDcslswsDNVXLAF4j4kHnTcnt_Xs_Gz9Zxg1gFux_TQs2o7LkKXLwfwFFbS69T0hC6')" }}
      ></div>
      {/* Radial Glow Behind Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#10b981]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      {/* Main Loading Canvas */}
      <main className="relative z-10 w-full max-w-md px-margin-mobile md:px-0">
        <div className="glass-panel gradient-border-shell rounded-2xl p-6 md:p-8 flex flex-col items-center">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="relative w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border border-glass-stroke glow-active mb-2">
              <div className="absolute inset-0 rounded-full border-2 border-primary-container pulse-ring pointer-events-none"></div>
              <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                memory
              </span>
            </div>
            <div>
              <h1 className="font-display-lg text-display-lg text-[#FFFFFF] tracking-tight mb-2 leading-none">Processing Data</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">KrishiDrishti AI Core</p>
            </div>
          </div>

          {/* Central Progress Bar */}
          <div className="w-full mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="font-label-md text-label-md text-[#10B981] tracking-wider uppercase">Running</span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                {currentStep === 0 ? '25%' : currentStep === 1 ? '50%' : currentStep === 2 ? '75%' : '100%'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full bg-[#10B981] progress-bar-fill rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"></div>
            </div>
          </div>

          {/* Stepper List */}
          <div className="w-full space-y-0 relative">
            <div className="absolute left-[15px] top-[20px] bottom-[20px] w-[2px] bg-surface-variant z-0"></div>
            <div className="absolute left-[15px] top-[20px] h-[50%] w-[2px] bg-[#10B981] z-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>

            {/* Step 1: Upload */}
            <div className="flex items-start gap-4 relative z-10 pb-6">
              <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-surface-container border border-primary-container shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-surface-container border border-surface-variant'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {currentStep >= 1 ? (
                  <span className="material-symbols-outlined text-[#10B981] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                ) : (
                  <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                )}
              </div>
              <div className="flex flex-col pt-1">
                <span className={`font-body-md text-body-md ${currentStep >= 1 ? 'text-[#A9B7C6]' : 'text-[#10B981] font-medium'}`}>Upload complete</span>
              </div>
            </div>

            {/* Step 2: Preprocessing */}
            <div className="flex items-start gap-4 relative z-10 pb-6">
              <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-surface-container border border-primary-container shadow-[0_0_8px_rgba(16,185,129,0.3)]' : currentStep === 1 ? 'bg-primary-container/20 border border-primary-container shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-surface-container border border-surface-variant'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {currentStep >= 2 ? (
                  <span className="material-symbols-outlined text-[#10B981] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                ) : currentStep === 1 ? (
                  <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                ) : (
                  <div className="w-2 h-2 bg-surface-variant rounded-full"></div>
                )}
              </div>
              <div className="flex flex-col pt-1">
                <span className={`font-body-md text-body-md ${currentStep >= 2 ? 'text-[#A9B7C6]' : currentStep === 1 ? 'text-[#10B981] font-medium' : 'text-on-surface-variant'}`}>Preprocessing</span>
              </div>
            </div>

            {/* Step 3: Disease model running */}
            <div className="flex items-start gap-4 relative z-10 pb-6">
              <div className={`w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-surface-container border border-primary-container shadow-[0_0_8px_rgba(16,185,129,0.3)]' : currentStep === 2 ? 'bg-primary-container/20 border border-primary-container shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-surface-container border border-surface-variant'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {currentStep >= 3 ? (
                  <span className="material-symbols-outlined text-[#10B981] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                ) : currentStep === 2 ? (
                  <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                ) : (
                  <div className="w-2 h-2 bg-surface-variant rounded-full"></div>
                )}
              </div>
              <div className="flex flex-col pt-1">
                <span className={`font-body-md text-body-md ${currentStep >= 3 ? 'text-[#A9B7C6]' : currentStep === 2 ? 'text-[#10B981] font-medium' : 'text-on-surface-variant'}`}>Disease model running</span>
              </div>
            </div>

            {/* Step 4: Generation */}
            <div className="flex items-start gap-4 relative z-10">
              <div className={`w-8 h-8 rounded-full ${currentStep >= 4 ? 'bg-surface-container border border-primary-container shadow-[0_0_8px_rgba(16,185,129,0.3)]' : currentStep === 3 ? 'bg-primary-container/20 border border-primary-container shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-surface-container border border-surface-variant'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {currentStep >= 4 ? (
                  <span className="material-symbols-outlined text-[#10B981] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                ) : currentStep === 3 ? (
                  <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                ) : (
                  <div className="w-2 h-2 bg-surface-variant rounded-full"></div>
                )}
              </div>
              <div className="flex flex-col pt-1">
                <span className={`font-body-md text-body-md ${currentStep >= 4 ? 'text-[#A9B7C6]' : currentStep === 3 ? 'text-[#10B981] font-medium' : 'text-on-surface-variant'}`}>Treatment generation</span>
              </div>
            </div>
          </div>

          {/* Footer Estimate */}
          <div className="mt-8 pt-6 w-full border-t border-glass-stroke text-center">
            <span className="font-label-md text-label-md text-on-surface-variant flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              Estimated time: 3–5 seconds
            </span>
          </div>
        </div>
      </main>

      <style jsx>{`
        .gradient-border-shell {
            position: relative;
        }
        .gradient-border-shell::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1px;
            background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), transparent);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
        }

        .glow-active {
            box-shadow: 0 0 24px rgba(16, 185, 129, 0.2);
        }

        .progress-bar-fill {
            animation: fillProgress 4s ease-in-out infinite;
        }

        @keyframes fillProgress {
            0% { width: 45%; }
            50% { width: 75%; }
            100% { width: 45%; }
        }

        .pulse-ring {
            animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.5; }
            80% { transform: scale(2); opacity: 0; }
            100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
