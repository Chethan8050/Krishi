'use client';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export default function ScanPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setSelectedImage, selectedImage } = useAppStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedImage);
    }
  }, [selectedImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Canvas */}
      <main className="flex-grow pt-24 pb-32 md:pb-24 px-margin-mobile md:px-margin-desktop max-w-[1200px] w-full mx-auto grid grid-cols-4 md:grid-cols-12 gap-gutter">
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Left Column / Top Section: Scanner Context */}
        <div className="col-span-4 md:col-span-7 flex flex-col gap-6">
          {/* Scanner Viewfinder */}
          <div 
            className="relative w-full aspect-[4/5] md:aspect-[4/3] rounded-2xl glass-panel overflow-hidden flex flex-col items-center justify-center container group cursor-pointer"
            onClick={triggerUpload}
          >
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${preview ? 'opacity-100' : 'opacity-40 blur-sm group-hover:blur-0 group-hover:opacity-60'}`}
              style={{ backgroundImage: `url('${preview || "https://lh3.googleusercontent.com/aida-public/AB6AXuB4iPur9a7qxIvTDO-oTpYw41lufiXYJSi2pNGwGIMcH_9GMzzAyx1n5h5dCGwjDrNlhLcBw3Wyarah5HmC2GyAPQqr-zbNLBfUefzWdqqdtknTh2EzViN_-F1KtSR9X-90H0DY53UhOO5e1VYxtSkmSsyKIWcMx2Vsp5KadDeRxpuSJQssveUoL_ib_dA9ERLrXO0PUoLuAbb9zLMTTdlU68hzgnFt4U89ro-Cny8M0_86Yv1Tw_AOWnwquyyDRGZ5tosxU82bF3F_" }')` }}
            ></div>
            <div className="absolute inset-8 scanner-reticle pointer-events-none">
              <div className="scan-line"></div>
            </div>
            {!preview && (
              <div className="z-10 text-center px-4 flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-4xl text-primary/80 animate-pulse">center_focus_strong</span>
                <h2 className="text-headline-md text-on-surface font-display-lg font-medium tracking-tight">Position leaf in frame</h2>
                <p className="font-body-sm text-body-sm text-text-muted max-w-xs">Ensure the affected area is clearly visible and well-lit for accurate analysis.</p>
              </div>
            )}
          </div>

          {/* Primary Actions (Camera/Gallery) & CTA */}
          <div className="glass-panel rounded-2xl p-card-padding flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 w-full sm:w-auto">
              <button onClick={triggerUpload} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface border border-glass-stroke transition-all duration-300 rounded-full px-6 py-3 font-body-sm text-body-sm active:scale-95 group">
                <span className="material-symbols-outlined group-hover:text-on-primary text-primary transition-colors">photo_camera</span>
                <span>Camera</span>
              </button>
              <button onClick={triggerUpload} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface border border-glass-stroke transition-all duration-300 rounded-full px-6 py-3 font-body-sm text-body-sm active:scale-95 group">
                <span className="material-symbols-outlined group-hover:text-on-primary text-primary transition-colors">photo_library</span>
                <span>Gallery</span>
              </button>
            </div>
            
            <button 
              onClick={() => {
                if (selectedImage) router.push('/scan/analyzing');
                else triggerUpload();
              }}
              className="w-full sm:w-auto bg-primary text-surface font-bold rounded-full px-8 py-4 font-headline-md active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 group transition-all duration-300 hover:brightness-110"
            >
              <span className="material-symbols-outlined">document_scanner</span>
              Analyse Crop
            </button>
          </div>
        </div>

        {/* Right Column / Bottom Section: Guidance & Data */}
        <div className="col-span-4 md:col-span-5 flex flex-col gap-8">
          {/* Visual Guide Bento Grid */}
          <div className="glass-panel rounded-2xl p-card-padding flex flex-col gap-4">
            <h3 className="font-body-lg text-body-lg text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">rule</span>
              Visual Guide
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-surface-container/50 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 border border-glass-stroke hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-tertiary">crop</span>
                <span className="font-label-md text-label-md text-text-muted leading-tight">Leaf fills 70%</span>
              </div>
              <div className="bg-surface-container/50 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 border border-glass-stroke hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-tertiary">light_mode</span>
                <span className="font-label-md text-label-md text-text-muted leading-tight">Natural light</span>
              </div>
              <div className="bg-surface-container/50 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 border border-glass-stroke hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-tertiary">blur_off</span>
                <span className="font-label-md text-label-md text-text-muted leading-tight">No blur</span>
              </div>
            </div>
          </div>

          {/* Supported Crops */}
          <div className="glass-panel rounded-2xl p-card-padding flex flex-col gap-4 flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="font-body-lg text-body-lg text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">grass</span>
                Supported Crops
              </h3>
              <span className="font-label-md text-label-md text-primary bg-primary/10 px-2 py-0.5 rounded text-[10px]">8 Supported</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: 'local_florist', name: 'Tomato' },
                { icon: 'eco', name: 'Potato' },
                { icon: 'grass', name: 'Rice' },
                { icon: 'agriculture', name: 'Wheat' },
                { icon: 'cloud', name: 'Cotton' },
                { icon: 'compost', name: 'Maize' },
                { icon: 'spa', name: 'Soybean' },
                { icon: 'lens', name: 'Onion' },
              ].map(crop => (
                <span key={crop.name} className="bg-surface-container border border-glass-stroke text-on-surface-variant font-label-md text-label-md px-3 py-1.5 rounded-full flex items-center gap-1 hover:border-primary/50 transition-colors cursor-default">
                  <span className="material-symbols-outlined text-[16px]">{crop.icon}</span> {crop.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
