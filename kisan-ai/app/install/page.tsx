'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function InstallPage() {
  const router = useRouter();

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen overflow-hidden relative">
      {/* Mock Home Screen Content (Blurred Background) */}
      <div className="blur-sm opacity-40 pointer-events-none">
        <header className="sticky top-0 w-full z-10 flex justify-between items-center px-margin-mobile py-base bg-surface border-b border-outline-variant">
          <div className="flex items-center gap-base">
            <span className="material-symbols-outlined text-primary">menu</span>
            <span className="font-bold text-title-md text-primary">KisanAI</span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">language</span>
        </header>
        <main className="px-margin-mobile pt-lg space-y-lg">
          <div className="p-md rounded-xl border border-outline-variant bg-surface-container-lowest">
            <div className="flex items-center justify-between mb-md">
              <h2 className="text-headline-lg-mob font-bold text-on-surface">My Farm</h2>
              <span className="material-symbols-outlined text-primary">agriculture</span>
            </div>
            <div className="grid grid-cols-2 gap-md">
              <div className="aspect-square rounded-lg bg-surface-container"></div>
              <div className="aspect-square rounded-lg bg-surface-container"></div>
            </div>
          </div>
        </main>
      </div>

      {/* PWA Install Prompt Bottom Sheet */}
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[4px] flex flex-col justify-end">
        {/* Bottom Sheet Container */}
        <div className="bg-surface-container-lowest rounded-t-[24px] w-full max-h-[90%] overflow-y-auto shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 ease-out">
          {/* Drag Handle */}
          <div className="w-full flex justify-center py-4">
            <div className="w-12 h-1.5 bg-outline-variant rounded-full opacity-60"></div>
          </div>

          {/* Header Content */}
          <div className="px-lg pb-lg flex items-center gap-md">
            <div className="w-[64px] h-[64px] bg-primary rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <span className="material-symbols-outlined text-white text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            </div>
            <div>
              <h1 className="text-headline-lg font-bold text-primary leading-tight">KisanAI</h1>
              <p className="text-on-surface-variant font-medium text-body-md">Smart Crop Doctor</p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="px-lg space-y-lg py-4">
            {[
              { title: 'Works without internet', desc: 'Access crop history and disease guides in the field without signal.', icon: 'wifi_off' },
              { title: 'Installs like a native app', desc: 'Add to your home screen for quick one-tap access anytime.', icon: 'install_mobile' },
              { title: 'Instant loading', desc: 'Optimized performance that launches 3x faster than the website.', icon: 'bolt' },
              { title: 'Free forever', desc: 'All core offline diagnostics features are included for free.', icon: 'verified' },
            ].map((benefit, idx) => (
              <div key={idx} className="flex gap-md items-start group">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-on-secondary-container text-[20px]">{benefit.icon}</span>
                </div>
                <div>
                  <h3 className="font-label-bold text-label-bold text-on-surface">{benefit.title}</h3>
                  <p className="text-on-surface-variant text-label-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Storage Info & CTA Section */}
          <div className="p-lg mt-md space-y-md border-t border-surface-variant bg-surface-container-low/30">
            <div className="flex items-center justify-center gap-xs text-on-surface-variant opacity-80">
              <span className="material-symbols-outlined text-[16px]">storage</span>
              <span className="text-label-sm font-medium">Requires ~25MB of storage space</span>
            </div>
            <div className="space-y-sm">
              {/* Primary Button */}
              <button className="btn btn-primary btn-full py-4 text-body-lg shadow-lg flex items-center justify-center gap-base active:scale-[0.98]">
                Install KisanAI App
                <span className="material-symbols-outlined">download</span>
              </button>
              {/* Secondary Button */}
              <button 
                onClick={() => router.back()} 
                className="w-full h-[48px] bg-transparent text-on-surface-variant rounded-full font-label-bold flex items-center justify-center hover:bg-surface-container transition-colors active:opacity-70"
              >
                Maybe Later
              </button>
            </div>
          </div>

          {/* Safe Area Spacer */}
          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
}
