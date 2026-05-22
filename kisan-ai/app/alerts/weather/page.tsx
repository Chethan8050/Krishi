'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '../../store/useAppStore';
import { createT } from '../../../lib/i18n';

interface WeatherData {
  location: string;
  today: {
    temp: number;
    tempMin: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    description?: string;
  };
  risk: {
    level: 'High' | 'Medium' | 'Low';
    reason: string;
  };
  forecast: Array<{
    date: string;
    dayName: string;
    tempMax: number;
    tempMin: number;
    humidity: number;
    rainfall: number;
    riskLevel: 'High' | 'Medium' | 'Low';
  }>;
  lastUpdated: string;
}

const riskConfig = {
  High:   { color: 'text-error',     bg: 'bg-error',     icon: 'coronavirus',       label: 'High Risk',   barBg: 'bg-error' },
  Medium: { color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]', icon: 'sick',              label: 'Med Risk',    barBg: 'bg-[#F59E0B]' },
  Low:    { color: 'text-primary',   bg: 'bg-primary',   icon: 'health_and_safety', label: 'Low Risk',    barBg: 'bg-primary' },
};

export default function WeatherAlertPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { language } = useAppStore();
  const t = createT(language);

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Prevent hydration mismatch — only render dynamic content after mount
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    fetch('/api/weather?lat=12.52&lon=76.90&location=Mandya,+Karnataka')
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setWeather(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return 'partly_cloudy_day';
    if (weather.today.rainfall > 10) return 'rainy';
    if (weather.today.rainfall > 2) return 'grain';
    if (weather.today.temp > 35) return 'sunny';
    return 'partly_cloudy_day';
  };

  // Show a simple loading skeleton before hydration completes
  if (!mounted) {
    return (
      <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-[#1b5e20] text-[48px] animate-spin">sync</span>
          <p className="text-[#41493e]">Loading...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-[#1b5e20] text-[48px] animate-spin">sync</span>
          <p className="text-[#41493e]">{t('weather.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="material-symbols-outlined text-[#ba1a1a] text-[48px]">cloud_off</span>
          <p className="text-[#41493e]">{error || t('common.error')}</p>
          <button onClick={() => window.location.reload()} className="bg-[#1b5e20] text-white px-6 py-3 rounded-full font-bold">
            <span className="material-symbols-outlined mr-2">refresh</span>
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  const risk = riskConfig[weather.risk.level];

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen pb-24 overflow-x-hidden">
      {/* Top App Bar */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#1b5e20] text-white border-b border-[#c0c9bb]">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="material-symbols-outlined cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors">arrow_back</button>
          <h1 className="text-[20px] font-bold text-white">{t('weather.title')}</h1>
        </div>
        <span className="material-symbols-outlined cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors">language</span>
      </header>

      {/* Location Strip */}
      <div className="bg-[#e8e8e8] px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#1b5e20]">location_on</span>
          <span className="font-bold text-[14px] text-[#1a1c1c]">{weather.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[12px] text-[#41493e]">Live data</span>
        </div>
      </div>

      <main className="p-4 space-y-6">
        {/* Today's Conditions Card */}
        <section className="bg-white border border-[#c0c9bb] rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#1a1c1c]">{t('weather.today')}</h2>
              <p className="text-[14px] text-[#41493e] capitalize">{weather.today?.description || 'Partly cloudy'}</p>
            </div>
            <span className="material-symbols-outlined text-[#1b5e20] text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>{getWeatherIcon()}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center p-3 bg-[#f3f3f4] rounded-lg">
              <span className="material-symbols-outlined text-[#1b5e20] mb-1">device_thermostat</span>
              <span className="text-[12px] font-medium text-[#41493e]">{t('weather.temp')}</span>
              <span className="text-[18px] font-bold text-[#1b5e20]">{weather.today.temp}°C</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-[#f3f3f4] rounded-lg">
              <span className="material-symbols-outlined text-[#F59E0B] mb-1">humidity_percentage</span>
              <span className="text-[12px] font-medium text-[#41493e]">{t('weather.humidity')}</span>
              <span className="text-[18px] font-bold text-[#F59E0B]">{weather.today.humidity}%</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-[#f3f3f4] rounded-lg">
              <span className="material-symbols-outlined text-blue-600 mb-1">rainy</span>
              <span className="text-[12px] font-medium text-[#41493e]">{t('weather.rainfall')}</span>
              <span className="text-[18px] font-bold text-blue-600">{weather.today.rainfall}mm</span>
            </div>
          </div>
        </section>

        {/* Risk Alert Card */}
        <section className={`rounded-xl p-4 shadow-sm border ${
          weather.risk.level === 'High' ? 'bg-[#FFEBEE] border-[#ba1a1a]/20' :
          weather.risk.level === 'Medium' ? 'bg-[#FFF8E1] border-[#F59E0B]/20' :
          'bg-[#E8F5E9] border-[#1b5e20]/20'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined ${risk.color} text-[28px]`} style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              <h3 className={`font-bold text-[15px] ${risk.color} uppercase tracking-wide`}>
                {weather.risk.level === 'High' ? t('weather.highRiskTitle') : weather.risk.level === 'Medium' ? 'Moderate Disease Risk' : 'Low Disease Risk'}
              </h3>
            </div>
            {weather.risk.level !== 'Low' && (
              <span className={`${risk.bg} text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shadow-sm`}>Alert Active</span>
            )}
          </div>
          <p className="text-[14px] text-[#41493e] leading-relaxed">
            {language === 'en' ? `Current humidity levels (${weather.today.humidity}%) combined with high daytime temperatures (${weather.today.temp}°C) create optimal conditions for Early and Late Blight in your crops.` : weather.risk.reason}
          </p>
          {weather.risk.level !== 'Low' && (
            <div className="bg-white/50 p-3 rounded-lg flex items-start gap-2 border border-white/40 mt-3">
              <span className="material-symbols-outlined text-[#1b5e20] shrink-0">info</span>
              <p className="text-[12px] font-medium text-[#1a1c1c] leading-snug">
                Fungal spores thrive in these conditions. Immediate preventive measures are recommended.
              </p>
            </div>
          )}
        </section>

        {/* Action Row — only show for elevated risk */}
        {weather.risk.level !== 'Low' && (
          <div className="flex flex-col gap-3">
            <Link 
              href="/marketplace"
              className="w-full py-4 bg-[#1b5e20] text-white font-bold rounded-full shadow-md active:scale-[0.98] transition-transform text-center"
            >
              {t('weather.applyFungicide')}
            </Link>
            <Link 
              href={`/chat?query=I have a high risk of Blight in my crops. What treatment plan do you suggest for Mandya?`}
              className="w-full py-4 bg-white text-[#41493e] font-bold rounded-full border border-[#c0c9bb] shadow-sm active:bg-[#f3f3f4] transition-colors text-center"
            >
              {t('weather.treatmentPlan')}
            </Link>
          </div>
        )}

        {/* 3-Day Forecast */}
        <section>
          <h2 className="text-[18px] font-bold text-[#1a1c1c] mb-3">{t('weather.forecast')}</h2>
          <div className="grid grid-cols-3 gap-3">
            {weather.forecast.map((day) => {
              const dayRisk = riskConfig[day.riskLevel];
              return (
                <div key={day.date} className="bg-white border border-[#c0c9bb] rounded-xl p-3 flex flex-col items-center text-center shadow-sm">
                  <span className="text-[12px] font-medium text-[#41493e]">{day.dayName}</span>
                  <span className={`material-symbols-outlined ${dayRisk.color} my-1`}>{dayRisk.icon}</span>
                  <span className={`text-[12px] font-bold ${dayRisk.color}`}>{dayRisk.label}</span>
                  <div className={`mt-1 w-full h-1 ${dayRisk.barBg} rounded-full`}></div>
                  <div className="mt-1 flex gap-2 text-[10px] text-[#41493e]">
                    <span>{day.tempMax}°</span>
                    <span className="opacity-50">{day.humidity}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Wind Speed Card */}
        <section className="bg-white border border-[#c0c9bb] rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 bg-[#f3f3f4] rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[#1b5e20]">air</span>
          </div>
          <div>
            <h4 className="font-bold text-[14px] text-[#1a1c1c]">Wind Speed</h4>
            <p className="text-[14px] text-[#41493e]">{weather.today.windSpeed} km/h today</p>
          </div>
        </section>

        {/* Insights Bento Section */}
        <section className="grid grid-cols-1 gap-3">
          <div className="bg-[#f3f3f4] rounded-xl p-4 border border-[#c0c9bb] flex items-center gap-4">
            <img 
              alt="Blight signs" 
              className="w-20 h-20 rounded-lg object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIwGuwHj9lw2E1ZESLBmWEesiUNC_BUrY2VLN0aWUTPq2pGa-pYD_1htgTMALzilB13brsXulyx1IAJvjQFLTaf_jEOtt21skg7hatna7p_qIrWsnlnPHNwC27NovlP_YuQhZ0kRwWE0GDaxLHmaR8WQBNGOt9eheptvexQyGXTQJrxj-A8sKHX28bWFWwAn04wnUM861X8m5FUSmEpFHpdINCyAkLQkYl4Q33JW0C9vGpvTgp7my_3i8-Gm9H9pP8-KCS_FFIMHzK"
            />
            <div>
              <h4 className="font-bold text-[14px] text-[#1a1c1c]">{t('weather.blightIdentification')}</h4>
              <p className="text-[12px] text-[#41493e]">{t('weather.learnToSpot')}</p>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <p className="text-center text-[12px] text-[#41493e] opacity-60">
          Last updated: {new Date(weather.lastUpdated).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </main>

          </div>
  );
}
