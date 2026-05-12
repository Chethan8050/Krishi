'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';

export default function CommunityMapPage() {
  const router = useRouter();

  return (
    <div className="bg-background font-body-md text-on-background min-h-screen flex flex-col pb-24 overflow-x-hidden">
      {/* Top Bar */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-margin-mobile py-base bg-primary text-white border-b border-outline-variant">
        <div className="flex items-center gap-md">
          <button onClick={() => router.back()} className="material-symbols-outlined cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors">menu</button>
          <h1 className="font-headline-lg-mob text-headline-lg-mob font-bold">Disease Heatmap</h1>
        </div>
        <span className="material-symbols-outlined cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors">language</span>
      </header>

      {/* Sub-header */}
      <div className="px-margin-mobile py-md bg-primary/5">
        <p className="text-on-surface-variant font-label-bold text-label-bold uppercase tracking-wider">Live disease reports from Karnataka farmers</p>
      </div>

      {/* Map Canvas Area */}
      <main className="flex-grow relative overflow-hidden">
        <div className="h-[360px] bg-inverse-surface w-full relative overflow-hidden shadow-inner">
          {/* Karnataka Map Image */}
          <img 
            className="w-full h-full object-cover opacity-30 grayscale contrast-125" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb3Ez2qQN7rchBEwXpl8t0ORBhdUiXCYdXXwt8dCdKRzjNw5LraudJpLtiEzr__SAu7ly5IBW9Zmf2mZ7XvIQqoOAQealL4S-x3XAIkR-32TWJ3qp_4yTulKTLyfj-3mOroorRsq3poU93UvJzFYnnRhAGE8_PE2HcxVXtp3XaOLQJSpVvk8TmSq1rwS1m67APc7f1XVxkbkxwz30jZ3oacEb_XR6KdbtkbhXqwdikTdux86eGgZbP6RDl6vWXPzMlIBAHNS9nGCF4"
            alt="Karnataka Map"
          />
          
          {/* Heatmap Overlay (Mocked) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_65%,rgba(186,26,26,0.3)_0%,transparent_35%),radial-gradient(circle_at_38%_75%,rgba(186,26,26,0.2)_0%,transparent_30%),radial-gradient(circle_at_55%_45%,rgba(255,143,0,0.2)_0%,transparent_25%)]"></div>

          {/* District Markers */}
          <div className="absolute top-[60%] left-[45%] flex flex-col items-center group">
            <div className="bg-error w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xl animate-pulse ring-4 ring-error/20">24</div>
            <span className="text-white text-[11px] font-bold mt-1.5 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">Mandya</span>
          </div>

          <div className="absolute top-[75%] left-[38%] flex flex-col items-center">
            <div className="bg-error w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg ring-4 ring-error/10">18</div>
            <span className="text-white text-[11px] font-bold mt-1.5 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">Mysuru</span>
          </div>

          <div className="absolute top-[40%] left-[55%] flex flex-col items-center">
            <div className="bg-tertiary-container w-7 h-7 rounded-full flex items-center justify-center text-on-tertiary-container font-bold text-xs shadow-lg">11</div>
            <span className="text-white text-[11px] font-bold mt-1.5 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">Tumkur</span>
          </div>

          <div className="absolute top-[50%] left-[30%] flex flex-col items-center">
            <div className="bg-tertiary-container w-6 h-6 rounded-full flex items-center justify-center text-on-tertiary-container font-bold text-[10px] shadow-lg">7</div>
            <span className="text-white text-[11px] font-bold mt-1.5 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">Hassan</span>
          </div>

          <div className="absolute top-[55%] left-[65%] flex flex-col items-center">
            <div className="bg-primary-fixed w-5 h-5 rounded-full flex items-center justify-center text-on-primary-fixed font-bold text-[9px] shadow-lg">3</div>
            <span className="text-white text-[11px] font-bold mt-1.5 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">Bengaluru</span>
          </div>

          {/* Map Controls Floating */}
          <div className="absolute top-md right-md flex flex-col gap-sm">
            <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-[20px]">layers</span>
            </button>
            <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-[20px]">my_location</span>
            </button>
          </div>

          {/* Legend Overlay */}
          <div className="absolute bottom-12 left-md bg-inverse-surface/80 backdrop-blur-md p-md rounded-2xl border border-outline/30 space-y-sm shadow-2xl">
            <h4 className="font-bold text-[10px] text-white/60 uppercase tracking-widest px-0.5">Outbreak Risk</h4>
            <div className="space-y-base">
              <div className="flex items-center gap-base">
                <div className="w-3 h-3 bg-error rounded-full shadow-sm shadow-error/40"></div>
                <span className="text-[11px] font-bold text-white">High</span>
              </div>
              <div className="flex items-center gap-base">
                <div className="w-3 h-3 bg-tertiary-container rounded-full shadow-sm shadow-tertiary/40"></div>
                <span className="text-[11px] font-bold text-white">Moderate</span>
              </div>
              <div className="flex items-center gap-base">
                <div className="w-3 h-3 bg-primary-fixed rounded-full shadow-sm shadow-primary/40"></div>
                <span className="text-[11px] font-bold text-white">Safe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sheet Panel */}
        <div className="bg-surface-container-lowest rounded-t-[32px] -mt-10 relative z-10 px-margin-mobile pt-lg pb-32 border-t border-outline-variant shadow-[0_-12px_32px_rgba(0,0,0,0.15)] max-w-2xl mx-auto w-full">
          {/* Drag Handle */}
          <div className="w-12 h-1.5 bg-outline-variant rounded-full mx-auto mb-lg opacity-60"></div>
          
          <div className="flex justify-between items-center mb-xl">
            <div>
              <p className="text-label-sm font-bold text-on-surface-variant uppercase tracking-widest mb-xs">Current Selection</p>
              <h2 className="text-display-lg text-primary">Mandya District</h2>
            </div>
            <div className="bg-error-container text-on-error-container px-6 py-2 rounded-2xl font-bold text-title-md shadow-sm border border-error/10">
              24 <span className="text-label-sm font-medium opacity-80 ml-1">Reports</span>
            </div>
          </div>

          {/* Most Reported Disease Card */}
          <div className="bg-surface-container-low border border-outline-variant p-lg rounded-2xl mb-lg relative overflow-hidden group">
            <div className="flex items-center gap-base mb-md">
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>coronavirus</span>
              <p className="font-bold text-label-bold text-on-surface-variant uppercase tracking-wide">Top Threat</p>
            </div>
            <div className="flex justify-between items-end relative z-10">
              <p className="text-headline-lg font-bold text-primary">Tomato Early Blight</p>
              <p className="text-display-lg text-on-surface opacity-80">67%</p>
            </div>
            <div className="w-full bg-outline-variant h-2.5 rounded-full mt-md overflow-hidden shadow-inner">
              <div className="bg-primary h-full w-[67%] rounded-full shadow-md animate-in slide-in-from-left duration-1000"></div>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[100px] text-primary opacity-5 group-hover:scale-110 transition-transform">agriculture</span>
          </div>

          {/* Warning Banner */}
          <div className="bg-tertiary-container/30 border border-tertiary/20 p-lg rounded-2xl mb-xl flex gap-lg items-center shadow-sm">
            <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-white">warning</span>
            </div>
            <p className="text-on-tertiary-container font-body-md leading-relaxed">
              <strong>Spread Warning:</strong> Disease moving from Mysuru toward your area. Apply preventive fungicide this week to secure your crop.
            </p>
          </div>

          {/* Primary Action */}
          <button className="btn btn-primary btn-full flex items-center justify-center gap-md shadow-xl py-5 text-body-lg group active:scale-[0.98]">
            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">shield_with_house</span>
            Protect My Crops Now
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
