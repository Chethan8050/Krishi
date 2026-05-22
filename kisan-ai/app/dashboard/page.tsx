'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface/70 backdrop-blur-xl border-b border-glass-stroke shadow-none transition-transform duration-150">
        <div className="flex items-center">
          <span className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary tracking-tight font-bold">KrishiDrishti</span>
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="translate" className="text-on-surface-variant hover:text-primary-fixed transition-colors">
            <span className="material-symbols-outlined">translate</span>
          </button>
          <button aria-label="account_circle" className="text-on-surface-variant hover:text-primary-fixed transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto flex flex-col gap-section-gap w-full">
        {/* Header Section */}
        <section className="flex flex-col gap-2">
          <h1 className="font-display-lg text-[40px] leading-[40px] md:text-[60px] md:leading-[60px] text-on-surface font-medium tracking-[-0.025em]">Dashboard Overview</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Real-time intelligence for your fields.</p>
        </section>

        {/* Top Metrics Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {/* Metric 1: Farm Health */}
          <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-3 glow-primary">
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Farm Health</span>
              <span className="material-symbols-outlined text-primary">monitor_heart</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-display-lg text-headline-lg text-primary leading-none font-semibold">82</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant pb-1">/100</span>
            </div>
            <div className="w-full bg-surface-variant h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-primary h-full rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>
          {/* Metric 2: Weather */}
          <div className="glass-panel rounded-xl p-card-padding flex flex-col justify-between gap-3">
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Weather</span>
              <span className="material-symbols-outlined text-tertiary">clear_day</span>
            </div>
            <div>
              <div className="font-display-lg text-headline-lg text-on-surface leading-none font-semibold">32°C</div>
              <div className="font-body-sm text-body-sm text-tertiary mt-1">Sunny &amp; Clear</div>
            </div>
          </div>
          {/* Metric 3: Alerts */}
          <div className="glass-panel rounded-xl p-card-padding flex flex-col justify-between gap-3 border border-error-container/30">
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Active Alerts</span>
              <span className="material-symbols-outlined text-error">warning</span>
            </div>
            <div>
              <div className="font-display-lg text-headline-lg text-error leading-none font-semibold">2</div>
              <div className="font-body-sm text-body-sm text-error/80 mt-1">Disease Detected</div>
            </div>
          </div>
          {/* Metric 4: Market */}
          <div className="glass-panel rounded-xl p-card-padding flex flex-col justify-between gap-3">
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Market Opp</span>
              <span className="material-symbols-outlined text-primary">trending_up</span>
            </div>
            <div>
              <div className="font-display-lg text-headline-lg text-on-surface leading-none font-semibold">+₹600</div>
              <div className="font-body-sm text-body-sm text-primary mt-1">Cotton / Quintal</div>
            </div>
          </div>
        </section>

        {/* Bento Layout: Main Content */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12">
          {/* Left Col (Wider) */}
          <div className="md:col-span-8 flex flex-col gap-gutter">
            {/* AI Recommendation Priority Card */}
            <div className="glass-panel rounded-xl p-card-padding glow-primary flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex items-center gap-3 z-10">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary icon-fill">neurology</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Intelligence Insight</h2>
              </div>
              <div className="z-10 pl-1">
                <p className="font-body-lg text-body-lg text-on-surface mb-2">High humidity detected in Sector B. Optimal conditions for fungal spread.</p>
                <div className="flex items-start gap-3 mt-4">
                  <span className="material-symbols-outlined text-tertiary mt-0.5">check_circle</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">Recommended Action: Initiate foliar spray application tomorrow morning between 06:00 and 08:00 AM.</p>
                </div>
                <div className="flex items-start gap-3 mt-3">
                  <span className="material-symbols-outlined text-tertiary mt-0.5">visibility</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">Monitor adjacent tomato rows for early blight symptoms over the next 48 hours.</p>
                </div>
              </div>
              <div className="mt-4 z-10 flex gap-3">
                <button className="bg-surface-variant border border-glass-stroke text-on-surface hover:bg-primary hover:text-on-primary font-body-sm text-body-sm px-4 py-2 rounded-full transition-colors">Acknowledge</button>
                <button className="bg-transparent border border-glass-stroke text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm px-4 py-2 rounded-full transition-colors">View Details</button>
              </div>
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Weather Timeline */}
              <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-4">
                <h3 className="font-headline-md text-[18px] font-semibold text-on-surface">Weather Forecast</h3>
                <div className="flex justify-between items-end h-32 border-b border-glass-stroke pb-2 relative">
                  <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                    <div className="w-full border-t border-white"></div>
                    <div className="w-full border-t border-white"></div>
                    <div className="w-full border-t border-white"></div>
                  </div>
                  <div className="flex flex-col items-center gap-2 z-10">
                    <span className="font-label-md text-label-md text-on-surface-variant">Now</span>
                    <span className="material-symbols-outlined text-tertiary text-sm">clear_day</span>
                    <div className="w-2 bg-tertiary rounded-t-full h-16"></div>
                  </div>
                  <div className="flex flex-col items-center gap-2 z-10">
                    <span className="font-label-md text-label-md text-on-surface-variant">12 PM</span>
                    <span className="material-symbols-outlined text-tertiary text-sm">partly_cloudy_day</span>
                    <div className="w-2 bg-tertiary/70 rounded-t-full h-20"></div>
                  </div>
                  <div className="flex flex-col items-center gap-2 z-10">
                    <span className="font-label-md text-label-md text-on-surface-variant">4 PM</span>
                    <span className="material-symbols-outlined text-on-surface-variant text-sm">cloud</span>
                    <div className="w-2 bg-surface-variant rounded-t-full h-14"></div>
                  </div>
                  <div className="flex flex-col items-center gap-2 z-10">
                    <span className="font-label-md text-label-md text-on-surface-variant">8 PM</span>
                    <span className="material-symbols-outlined text-primary text-sm">rainy</span>
                    <div className="w-2 bg-primary rounded-t-full h-8"></div>
                  </div>
                </div>
              </div>

              {/* Market Trends */}
              <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-4">
                <h3 className="font-headline-md text-[18px] font-semibold text-on-surface">Market Trends</h3>
                <div className="flex-1 relative border-b border-glass-stroke pb-2 h-32">
                  <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                    <div className="w-full border-t border-white"></div>
                    <div className="w-full border-t border-white"></div>
                    <div className="w-full border-t border-white"></div>
                  </div>
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    <path d="M0,80 C30,60 50,90 80,40 C110,-10 150,50 200,20" fill="none" stroke="#4edea3" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                    <circle cx="200" cy="20" fill="#10b981" r="4"></circle>
                  </svg>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="font-label-md text-label-md text-on-surface-variant">Cotton</span>
                  <span className="font-label-md text-label-md text-primary">+3.2% Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col */}
          <div className="md:col-span-4 flex flex-col gap-gutter">
            {/* Quick Actions Grid */}
            <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-4">
              <h3 className="font-headline-md text-[18px] font-semibold text-on-surface">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/scan" className="bg-surface-variant/50 hover:bg-surface-variant border border-glass-stroke rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all hover:border-primary/50 group">
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">document_scanner</span>
                  <span className="font-label-md text-label-md text-on-surface">Scan Crop</span>
                </Link>
                <Link href="/yield" className="bg-surface-variant/50 hover:bg-surface-variant border border-glass-stroke rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all hover:border-primary/50 group">
                  <span className="material-symbols-outlined text-tertiary group-hover:scale-110 transition-transform">bar_chart</span>
                  <span className="font-label-md text-label-md text-on-surface">Yield Predict</span>
                </Link>
                <button className="bg-surface-variant/50 hover:bg-surface-variant border border-glass-stroke rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all hover:border-primary/50 group">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:scale-110 transition-transform">cloud</span>
                  <span className="font-label-md text-label-md text-on-surface">Weather</span>
                </button>
                <Link href="/marketplace" className="bg-surface-variant/50 hover:bg-surface-variant border border-glass-stroke rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all hover:border-primary/50 group">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:scale-110 transition-transform">storefront</span>
                  <span className="font-label-md text-label-md text-on-surface">Market</span>
                </Link>
              </div>
            </div>

            {/* Recent Scans */}
            <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-4 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-headline-md text-[18px] font-semibold text-on-surface">Recent Scans</h3>
                <Link href="/history" className="font-label-md text-label-md text-primary hover:underline">View All</Link>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-variant/30 transition-colors border border-transparent hover:border-glass-stroke">
                  <div className="w-12 h-12 rounded-md bg-surface-dark overflow-hidden shrink-0 border border-glass-stroke">
                    <img alt="Tomato Leaf" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8Uhi-VqPEUaLDqhJjACOY2NBsxm_mu1h1Bn7ZHH_6RYl7iEjY1bmGzCnRkbpJqzL21jJqqgIyaGNV6IYUhK6CB_7Ys8JJzITKwxWpO1j2xuFJFPVQ-7ONuqYUMHC8ZjOrOjQxPn-3THcJPkFSdv5INUB2pPhXM-GXzkA0OdELhH0F_1hj-SX19NoQgVw0O7mOye5r5bisYvUOML0wb8kf4PbghZZTXLX6ID5-Zfohfsb5XIYDnD1SsBox-CgRtYDkYF9U2hPDEOR7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body-sm text-body-sm text-on-surface truncate">Tomato Sector 4</div>
                    <div className="font-label-md text-label-md text-error flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">warning</span> Early Blight
                    </div>
                  </div>
                  <div className="bg-error-container/20 text-error px-2 py-1 rounded text-xs font-medium">87%</div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-variant/30 transition-colors border border-transparent hover:border-glass-stroke">
                  <div className="w-12 h-12 rounded-md bg-surface-dark overflow-hidden shrink-0 border border-glass-stroke">
                    <img alt="Potato Field" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpgxj67LHrVxAnOEySHt9CCvT7DLeuPg3Zwwpkc8xNHrcepQyS6Vz23v3G12uN7DCvutrUloCFbvDWGE5RWe0xSxSr3eGI5EVyrgRZnS8XKIus5U_FhExiSQJxThzbykrdEHOI9pqQ3iyNZnIESm1jMVLsnHflPmXmi5ajpAiHOsCuXr5nyZ-f4Kb7iAWVjS0nXdmbPc8h95TmkMj2gSEgn3izvxiT9j7nK3d_sSkXYuFv-X-hq28Lc4PsD9lzDc8AdzEUVP7Qe0x0" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body-sm text-body-sm text-on-surface truncate">Potato Sector 1</div>
                    <div className="font-label-md text-label-md text-primary flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> Healthy
                    </div>
                  </div>
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">96%</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
