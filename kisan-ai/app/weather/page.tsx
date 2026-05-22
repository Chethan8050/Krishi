'use client';
import Link from 'next/link';

export default function WeatherPage() {
  const weatherData = [
    { time: 'Now', icon: 'clear_day', temp: '32°C', status: 'Sunny' },
    { time: '12 PM', icon: 'partly_cloudy_day', temp: '35°C', status: 'Partly Cloudy' },
    { time: '4 PM', icon: 'cloud', temp: '28°C', status: 'Cloudy' },
    { time: '8 PM', icon: 'rainy', temp: '24°C', status: 'Rainy' },
  ];

  const forecastDays = [
    { day: 'Tomorrow', high: '36°C', low: '22°C', icon: 'partly_cloudy_day', chance: '10% rain' },
    { day: 'Wednesday', high: '34°C', low: '20°C', icon: 'cloud', chance: '40% rain' },
    { day: 'Thursday', high: '30°C', low: '18°C', icon: 'rainy', chance: '80% rain' },
    { day: 'Friday', high: '32°C', low: '19°C', icon: 'clear_day', chance: '5% rain' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface/70 backdrop-blur-xl border-b border-glass-stroke">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <span className="font-headline-lg text-primary font-bold">Weather</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto flex flex-col gap-section-gap w-full pb-12">
        {/* Current Weather Card */}
        <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Mandya District</h2>
              <p className="font-body-md text-on-surface-variant">Current Conditions</p>
            </div>
            <span className="material-symbols-outlined text-[48px] text-tertiary">clear_day</span>
          </div>
          <div>
            <div className="font-display-lg text-[72px] text-on-surface leading-none font-bold">32°</div>
            <p className="font-body-lg text-on-surface-variant mt-2">Sunny & Clear</p>
          </div>
          <div className="grid grid-cols-3 gap-4 border-t border-glass-stroke pt-6">
            <div>
              <p className="font-label-md text-on-surface-variant text-[12px] uppercase">Humidity</p>
              <p className="font-headline-md text-on-surface mt-1">65%</p>
            </div>
            <div>
              <p className="font-label-md text-on-surface-variant text-[12px] uppercase">Wind Speed</p>
              <p className="font-headline-md text-on-surface mt-1">12 km/h</p>
            </div>
            <div>
              <p className="font-label-md text-on-surface-variant text-[12px] uppercase">Rainfall</p>
              <p className="font-headline-md text-on-surface mt-1">0 mm</p>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-4">
          <h3 className="font-headline-md text-headline-md text-on-surface">Hourly Forecast</h3>
          <div className="flex justify-between items-end h-40 border-b border-glass-stroke pb-4 relative">
            <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
              <div className="w-full border-t border-white"></div>
              <div className="w-full border-t border-white"></div>
              <div className="w-full border-t border-white"></div>
            </div>
            {weatherData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 z-10">
                <span className="font-label-md text-label-md text-on-surface-variant text-[12px]">{item.time}</span>
                <span className="material-symbols-outlined text-tertiary">{item.icon}</span>
                <div className="w-2 bg-tertiary/70 rounded-t-full h-20"></div>
                <span className="font-body-sm text-on-surface font-bold">{item.temp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-4">
          <h3 className="font-headline-md text-headline-md text-on-surface">5-Day Forecast</h3>
          <div className="flex flex-col gap-3">
            {forecastDays.map((day, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-variant/30 border border-glass-stroke/50">
                <div className="flex items-center gap-4 flex-1">
                  <span className="font-body-md text-on-surface min-w-[100px]">{day.day}</span>
                  <span className="material-symbols-outlined text-tertiary">{day.icon}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-label-md text-on-surface-variant text-[12px]">{day.chance}</p>
                    <p className="font-body-md text-on-surface">{day.high}/{day.low}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-4 border border-error-container/30">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-error">warning</span>
            <h3 className="font-headline-md text-headline-md text-error">Weather Alert</h3>
          </div>
          <p className="font-body-md text-on-surface">Heavy rainfall expected Thursday. Recommended: Cover crops and ensure proper drainage in low-lying areas.</p>
        </div>
      </main>
    </div>
  );
}
