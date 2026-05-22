'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../store/useAppStore';

export default function YieldPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { yieldInputs, setYieldInputs, setRecentYieldResult } = useAppStore();
  
  const [crop, setCrop] = useState(yieldInputs.crop || 'Tomato');
  const [district, setDistrict] = useState(yieldInputs.district || 'Mandya');
  const [soilType, setSoilType] = useState(yieldInputs.soilType || 'Black Soil');
  const [season, setSeason] = useState(yieldInputs.season || 'Kharif');
  const [rainfall, setRainfall] = useState(yieldInputs.rainfall || 850);
  const [area, setArea] = useState(yieldInputs.area || 2.5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setCrop(yieldInputs.crop || 'Tomato');
    setDistrict(yieldInputs.district || 'Mandya');
    setSoilType(yieldInputs.soilType || 'Black Soil');
    setSeason(yieldInputs.season || 'Kharif');
    setRainfall(yieldInputs.rainfall || 850);
    setArea(yieldInputs.area || 2.5);
  }, [yieldInputs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const inputs = { crop, district, soilType, season, rainfall, area };
    setYieldInputs(inputs);

    try {
      const res = await fetch('/api/yield', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });
      const data = await res.json();
      setRecentYieldResult(data);
      router.push('/yield/result');
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-background text-on-background min-h-screen font-body-md overflow-x-hidden pt-16 pb-24 md:pb-8 flex flex-col">
      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-section-gap w-full flex-grow pt-24">
        {/* Header Section */}
        <div className="mb-section-gap">
          <h1 className="font-headline-lg-mobile md:text-display-lg text-on-surface mb-2">Yield Prediction Model</h1>
          <p className="font-body-md text-on-surface-variant max-w-2xl">Enter field parameters to generate an AI-driven yield estimate based on historical data and current conditions.</p>
        </div>

        {/* Bento Grid Layout for Inputs */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-gap">
          {/* Left Column: Core Parameters */}
          <div className="md:col-span-8 flex flex-col gap-gutter">
            <div className="glass-panel rounded-xl p-card-padding">
              <h2 className="font-headline-md text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">eco</span>
                Crop & Location
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Crop Selection */}
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-text-muted">Target Crop</label>
                  <div className="relative glow-primary transition-all rounded-lg">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">grass</span>
                    <select value={crop} onChange={e => setCrop(e.target.value)} className="w-full bg-surface-dark border-b border-glass-stroke border-x-0 border-t-0 text-on-surface font-body-md pl-10 pr-4 py-3 focus:ring-0 focus:border-primary focus:bg-surface-container transition-colors appearance-none rounded-t-lg">
                      {['Tomato', 'Wheat', 'Rice', 'Corn'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
                {/* District Selection */}
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-text-muted">District</label>
                  <div className="relative glow-primary transition-all rounded-lg">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">location_on</span>
                    <select value={district} onChange={e => setDistrict(e.target.value)} className="w-full bg-surface-dark border-b border-glass-stroke border-x-0 border-t-0 text-on-surface font-body-md pl-10 pr-4 py-3 focus:ring-0 focus:border-primary focus:bg-surface-container transition-colors appearance-none rounded-t-lg">
                      {['Mandya', 'Mysuru', 'Hassan', 'Tumkur'].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
                {/* Area Input */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="font-label-md text-text-muted">Cultivated Area</label>
                  <div className="relative glow-primary transition-all rounded-lg flex items-center bg-surface-dark border-b border-glass-stroke focus-within:border-primary focus-within:bg-surface-container rounded-t-lg">
                    <span className="material-symbols-outlined pl-3 text-on-surface-variant">square_foot</span>
                    <input value={area} onChange={e => setArea(parseFloat(e.target.value))} className="w-full bg-transparent border-none text-on-surface font-body-md px-3 py-3 focus:ring-0 outline-none" placeholder="Enter area" step="0.1" type="number" />
                    <span className="pr-4 text-on-surface-variant font-body-sm">Acres</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-card-padding">
              <h2 className="font-headline-md text-tertiary-container mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-container">landscape</span>
                Environmental Factors
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Soil Type */}
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-text-muted">Soil Profile</label>
                  <div className="relative glow-primary transition-all rounded-lg">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">layers</span>
                    <select value={soilType} onChange={e => setSoilType(e.target.value)} className="w-full bg-surface-dark border-b border-glass-stroke border-x-0 border-t-0 text-on-surface font-body-md pl-10 pr-4 py-3 focus:ring-0 focus:border-primary focus:bg-surface-container transition-colors appearance-none rounded-t-lg">
                      {['Black Soil', 'Red Soil', 'Alluvial Soil', 'Laterite Soil'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
                {/* Season */}
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-text-muted">Growing Season</label>
                  <div className="relative glow-primary transition-all rounded-lg">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">calendar_month</span>
                    <select value={season} onChange={e => setSeason(e.target.value)} className="w-full bg-surface-dark border-b border-glass-stroke border-x-0 border-t-0 text-on-surface font-body-md pl-10 pr-4 py-3 focus:ring-0 focus:border-primary focus:bg-surface-container transition-colors appearance-none rounded-t-lg">
                      {['Kharif', 'Rabi', 'Zaid'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
                {/* Rainfall Input */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="font-label-md text-text-muted">Expected/Historical Rainfall</label>
                  <div className="relative glow-primary transition-all rounded-lg flex items-center bg-surface-dark border-b border-glass-stroke focus-within:border-primary focus-within:bg-surface-container rounded-t-lg">
                    <span className="material-symbols-outlined pl-3 text-on-surface-variant">water_drop</span>
                    <input value={rainfall} onChange={e => setRainfall(parseFloat(e.target.value))} className="w-full bg-transparent border-none text-on-surface font-body-md px-3 py-3 focus:ring-0 outline-none" placeholder="Enter rainfall" type="number" />
                    <span className="pr-4 text-on-surface-variant font-body-sm">mm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Summary & CTA */}
          <div className="md:col-span-4 flex flex-col gap-gutter h-full">
            <div className="glass-panel rounded-xl p-card-padding flex flex-col justify-between h-full bg-gradient-to-b from-surface-container-high/80 to-surface-dim/80">
              <div>
                <h3 className="font-headline-md text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant">summarize</span>
                  Input Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="font-body-sm text-text-muted">Crop</span>
                    <span className="font-body-md text-on-surface">{crop}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="font-body-sm text-text-muted">Location</span>
                    <span className="font-body-md text-on-surface">{district}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="font-body-sm text-text-muted">Soil</span>
                    <span className="font-body-md text-on-surface">{soilType}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="font-body-sm text-text-muted">Season</span>
                    <span className="font-body-md text-on-surface">{season}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="font-body-sm text-text-muted">Area</span>
                    <span className="font-body-md text-on-surface">{area} Acres</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-body-sm text-text-muted">Rainfall</span>
                    <span className="font-body-md text-on-surface">{rainfall} mm</span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button type="submit" disabled={isLoading} className="w-full bg-surface-container border border-glass-stroke text-on-surface font-headline-md py-4 px-6 rounded-full hover:bg-primary hover:text-on-primary hover:border-primary-fixed transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] disabled:opacity-50">
                  <span className={`material-symbols-outlined ${isLoading ? 'animate-spin' : 'group-hover:animate-pulse'}`}>
                    {isLoading ? 'sync' : 'analytics'}
                  </span>
                  {isLoading ? 'Predicting...' : 'Predict Yield'}
                </button>
                <p className="text-center font-label-md text-text-muted mt-3">Model accuracy approx. 92% based on regional datasets.</p>
              </div>
            </div>
          </div>
        </form>
      </main>

      <style jsx>{`
        .glow-primary:focus-within {
            box-shadow: 0 0 24px rgba(16, 185, 129, 0.2);
            border-color: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
}
