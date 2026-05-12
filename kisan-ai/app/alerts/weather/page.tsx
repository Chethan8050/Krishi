'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WeatherAlertPage() {
  const router = useRouter();

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-24 overflow-x-hidden">
      {/* Top App Bar */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-margin-mobile py-base bg-primary-container text-on-primary-container border-b border-outline-variant">
        <div className="flex items-center gap-md">
          <button onClick={() => router.back()} className="material-symbols-outlined cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors">menu</button>
          <h1 className="text-headline-lg-mob font-bold text-white">Weather Risk Alert</h1>
        </div>
        <span className="material-symbols-outlined cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors">language</span>
      </header>

      {/* Location Strip */}
      <div className="bg-surface-container-low px-margin-mobile py-sm flex justify-between items-center shadow-inner">
        <div className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-primary">location_on</span>
          <span className="font-label-bold text-label-bold text-on-surface">Mandya, Karnataka</span>
        </div>
        <div className="flex items-center gap-xs">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-label-sm font-label-sm text-on-surface-variant">Live data</span>
        </div>
      </div>

      <main className="p-margin-mobile space-y-lg">
        {/* Today's Conditions Card */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <h2 className="text-title-md font-bold text-on-surface mb-md">Today's Conditions</h2>
          <div className="grid grid-cols-3 gap-md">
            <div className="flex flex-col items-center p-sm bg-surface-container rounded-lg">
              <span className="material-symbols-outlined text-primary mb-xs">device_thermostat</span>
              <span className="text-label-sm font-medium text-on-surface-variant">Temp</span>
              <span className="text-title-md font-bold text-primary">32°C</span>
            </div>
            <div className="flex flex-col items-center p-sm bg-surface-container rounded-lg">
              <span className="material-symbols-outlined text-[#F59E0B] mb-xs">humidity_percentage</span>
              <span className="text-label-sm font-medium text-on-surface-variant">Humidity</span>
              <span className="text-title-md font-bold text-[#F59E0B]">84%</span>
            </div>
            <div className="flex flex-col items-center p-sm bg-surface-container rounded-lg">
              <span className="material-symbols-outlined text-blue-600 mb-xs">rainy</span>
              <span className="text-label-sm font-medium text-on-surface-variant">Rainfall</span>
              <span className="text-title-md font-bold text-blue-600">12mm</span>
            </div>
          </div>
        </section>

        {/* Risk Alert Card */}
        <section className="bg-[#FFEBEE] border border-error/20 rounded-xl p-md shadow-sm">
          <div className="flex items-center justify-between mb-sm">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-error text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              <h3 className="font-label-bold text-[15px] text-error uppercase tracking-wide">High Disease Risk</h3>
            </div>
            <span className="bg-error text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shadow-sm">Alert Active</span>
          </div>
          <div className="space-y-sm">
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Current humidity levels (84%) combined with high daytime temperatures (32°C) create optimal conditions for <span className="font-bold text-on-surface">Early and Late Blight</span> in your <span className="font-bold text-on-surface">Tomato and Potato</span> crops.
            </p>
            <div className="bg-white/50 p-sm rounded-lg flex items-start gap-sm border border-white/40">
              <span className="material-symbols-outlined text-primary shrink-0">info</span>
              <p className="text-label-sm font-medium text-on-surface leading-snug">Fungal spores thrive in these conditions. Immediate preventive measures are recommended to protect yield.</p>
            </div>
          </div>
        </section>

        {/* Action Row */}
        <div className="flex flex-col gap-sm">
          <button className="w-full py-4 bg-primary text-on-primary font-label-bold rounded-full shadow-md active:scale-[0.98] transition-transform">
            Apply Fungicide Tonight
          </button>
          <button className="w-full py-4 bg-surface-container-high text-on-surface-variant font-label-bold rounded-full border border-outline-variant shadow-sm active:bg-surface-container-highest transition-colors">
            See Treatment Plan
          </button>
        </div>

        {/* 3-Day Forecast */}
        <section>
          <h2 className="text-title-md font-bold text-on-surface mb-md">Disease Risk Forecast</h2>
          <div className="grid grid-cols-3 gap-sm">
            {/* Tomorrow */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-sm flex flex-col items-center text-center shadow-sm">
              <span className="text-label-sm font-medium text-on-surface-variant">Tomorrow</span>
              <span className="material-symbols-outlined text-error my-xs">coronavirus</span>
              <span className="text-label-bold font-bold text-error">High Risk</span>
              <div className="mt-xs w-full h-1 bg-error rounded-full"></div>
            </div>
            {/* Thu */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-sm flex flex-col items-center text-center shadow-sm">
              <span className="text-label-sm font-medium text-on-surface-variant">Thu</span>
              <span className="material-symbols-outlined text-[#F59E0B] my-xs">sick</span>
              <span className="text-label-bold font-bold text-[#F59E0B]">Med Risk</span>
              <div className="mt-xs w-full h-1 bg-[#F59E0B] rounded-full"></div>
            </div>
            {/* Fri */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-sm flex flex-col items-center text-center shadow-sm">
              <span className="text-label-sm font-medium text-on-surface-variant">Fri</span>
              <span className="material-symbols-outlined text-primary my-xs">health_and_safety</span>
              <span className="text-label-bold font-bold text-primary">Low Risk</span>
              <div className="mt-xs w-full h-1 bg-primary rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="bg-surface-variant/30 rounded-xl p-md border border-outline-variant flex items-center gap-md">
          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 shadow-sm">
            <img 
              alt="Potato field blight" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIwGuwHj9lw2E1ZESLBmWEesiUNC_BUrY2VLN0aWUTPq2pGa-pYD_1htgTMALzilB13brsXulyx1IAJvjQFLTaf_jEOtt21skg7hatna7p_qIrWsnlnPHNwC27NovlP_YuQhZ0kRwWE0GDaxLHmaR8WQBNGOt9eheptvexQyGXTQJrxj-A8sKHX28bWFWwAn04wnUM861X8m5FUSmEpFHpdINCyAkLQkYl4Q33JW0C9vGpvTgp7my_3i8-Gm9H9pP8-KCS_FFIMHzK"
            />
          </div>
          <div>
            <h4 className="font-label-bold text-on-surface">Blight Identification</h4>
            <p className="text-label-sm text-on-surface-variant">Learn to spot signs before they spread across your fields.</p>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 flex justify-around items-center px-1 py-3 bg-surface border-t border-outline-variant">
        {[
          { icon: 'home', label: 'Home', href: '/dashboard' },
          { icon: 'document_scanner', label: 'Scan', href: '/scan' },
          { icon: 'bar_chart', label: 'Yield', href: '/yield' },
          { icon: 'more_horiz', label: 'More', href: '/about' },
        ].map(item => (
          <Link key={item.label} href={item.href} className={`flex flex-col items-center justify-center px-4 py-1 active:scale-95 transition-transform rounded-full ${item.active ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant'}`}>
            <span className="material-symbols-outlined" style={item.active ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
            <span className="text-label-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
