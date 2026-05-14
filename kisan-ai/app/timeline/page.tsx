'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TimelinePage() {
  const router = useRouter();

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 flex flex-col">
        <div className="bg-[#2E7D32] flex justify-between items-center px-margin-mobile py-base text-white">
          <button onClick={() => router.back()} className="material-symbols-outlined cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors">arrow_back</button>
          <h1 className="font-title-md text-title-md font-bold">Crop Health Timeline</h1>
          <span className="material-symbols-outlined cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors">filter_list</span>
        </div>
        <div className="bg-[#388E3C] px-margin-mobile py-base">
          <p className="text-white font-label-sm italic opacity-90">Track if your treatment is working</p>
        </div>
      </header>

      <main className="flex-1 px-margin-mobile py-lg space-y-lg pb-32">
        {/* Crop Selector Row */}
        <section className="flex overflow-x-auto pb-xs gap-sm scrollbar-hide">
          <button className="flex-none bg-primary text-on-primary font-label-bold py-2 px-8 rounded-full flex items-center gap-base shadow-md">
            Tomato Field A <span className="material-symbols-outlined text-[18px]">check</span>
          </button>
          <button className="flex-none bg-surface-container-high text-on-surface-variant font-label-bold py-2 px-8 rounded-full hover:bg-surface-container-highest transition-colors">
            Potato Field B
          </button>
          <button className="flex-none bg-surface-container-high text-on-surface-variant font-label-bold py-2 px-8 rounded-full hover:bg-surface-container-highest transition-colors">
            Corn Field C
          </button>
        </section>

        {/* Status Banner */}
        <section className="bg-secondary-container rounded-2xl p-lg flex items-start gap-md border border-outline-variant shadow-sm">
          <div className="bg-primary rounded-full p-1.5 mt-0.5 shadow-sm">
            <span className="material-symbols-outlined text-white text-[20px]">check</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-on-secondary-container font-bold text-title-md">Improving!</h2>
            <p className="text-on-secondary-container text-body-md opacity-90">Severity dropped 35% in 5 days</p>
            <p className="text-on-secondary-container opacity-70 text-label-sm italic">Keep applying treatment</p>
          </div>
        </section>

        {/* Chart Card */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm">
          <h3 className="text-title-md text-on-surface mb-lg">Severity Over Time</h3>
          <div className="relative h-48 w-full mb-lg">
            {/* Simple SVG Line Chart */}
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
              {/* Grid Lines */}
              <line stroke="var(--color-outline-variant)" strokeWidth="0.2" x1="0" x2="100" y1="10" y2="10" />
              <line stroke="var(--color-outline-variant)" strokeWidth="0.2" x1="0" x2="100" y1="20" y2="20" />
              <line stroke="var(--color-outline-variant)" strokeWidth="0.2" x1="0" x2="100" y1="30" y2="30" />
              {/* Trend Line */}
              <path 
                className="stroke-primary fill-none stroke-[2]"
                d="M 0 5 L 15 8 L 30 18 L 45 22 L 60 28 L 80 32 L 100 35" 
                style={{ strokeDasharray: 1000, strokeDashoffset: 0 }}
              />
              {/* Legend Points */}
              <circle cx="0" cy="5" fill="var(--color-error)" r="2" /> {/* Disease detected */}
              <circle cx="100" cy="35" fill="var(--color-primary)" r="2" /> {/* Improving */}
            </svg>
            {/* Y-Axis Labels */}
            <div className="absolute top-0 left-0 text-[10px] text-on-surface-variant font-bold opacity-60">85%</div>
            <div className="absolute bottom-0 left-0 text-[10px] text-on-surface-variant font-bold opacity-60">32%</div>
          </div>
          
          <div className="flex gap-lg justify-center">
            <div className="flex items-center gap-xs">
              <span className="w-3 h-3 bg-error rounded-full shadow-sm"></span>
              <span className="text-label-sm font-bold text-on-surface-variant">Disease detected</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-3 h-3 bg-primary rounded-full shadow-sm"></span>
              <span className="text-label-sm font-bold text-on-surface-variant">Improving</span>
            </div>
          </div>
        </section>

        {/* Scan History List */}
        <section className="space-y-md">
          <h3 className="text-title-md text-on-surface px-1">Weekly Track</h3>
          <div className="space-y-md">
            {[
              { date: 'Oct 24, 2023', disease: 'Late Blight', severity: '32%', color: 'bg-primary-container text-on-primary-container' },
              { date: 'Oct 21, 2023', disease: 'Late Blight', severity: '51%', color: 'bg-tertiary-container text-on-tertiary-container' },
              { date: 'Oct 18, 2023', disease: 'Late Blight', severity: '78%', color: 'bg-error-container text-on-error-container' },
            ].map((row, idx) => (
              <div key={idx} className="bg-surface-container-lowest rounded-xl p-md flex justify-between items-center border border-outline-variant shadow-sm hover:bg-surface-container-low transition-all cursor-pointer active:scale-[0.98]">
                <div>
                  <p className="font-bold text-body-md text-on-surface">{row.date}</p>
                  <p className="text-label-sm text-on-surface-variant opacity-80">{row.disease}</p>
                </div>
                <div className={`${row.color} px-5 py-1.5 rounded-full font-bold text-label-bold shadow-sm`}>
                  {row.severity}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-[96px] left-1/2 -translate-x-1/2 w-full max-w-[480px] px-margin-mobile z-40">
        <button 
          onClick={() => router.push('/scan')}
          className="btn btn-primary btn-full py-4 shadow-xl flex items-center justify-center gap-base active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">add</span>
          Add Today's Scan
        </button>
      </div>

          </div>
  );
}
