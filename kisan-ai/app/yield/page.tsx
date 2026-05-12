'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../store/useAppStore';
import BottomNav from '../../components/BottomNav';

export default function YieldPage() {
  const router = useRouter();
  const { yieldInputs, setYieldInputs, setRecentYieldResult } = useAppStore();
  
  const [crop, setCrop] = useState(yieldInputs.crop);
  const [district, setDistrict] = useState(yieldInputs.district);
  const [soilType, setSoilType] = useState(yieldInputs.soilType);
  const [season, setSeason] = useState(yieldInputs.season);
  const [rainfall, setRainfall] = useState(yieldInputs.rainfall);
  const [area, setArea] = useState(yieldInputs.area);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Save to store
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

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen pb-32">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#1b5e20] text-white">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-white">menu</span>
          <h1 className="font-bold text-[24px] text-white">Yield Predictor</h1>
        </div>
        <span className="material-symbols-outlined text-white">language</span>
      </header>
      <div className="bg-[#1b5e20] px-4 pt-1 pb-6">
        <p className="text-[16px] text-white italic opacity-90">Estimate your harvest with precision using AI-driven insights.</p>
      </div>

      <main className="px-4 -mt-2 relative z-10">
        {/* Form Card */}
        <section className="bg-white border border-[#c0c9bb] rounded-xl p-4 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Crop */}
            <div className="space-y-1">
              <label className="font-bold text-[14px] text-[#41493e] block">Select Crop</label>
              <div className="relative">
                <select value={crop} onChange={e => setCrop(e.target.value)} className="w-full bg-[#f9f9f9] border border-[#c0c9bb] rounded-xl px-4 py-3 appearance-none focus:border-[#1b5e20] focus:ring-1 focus:ring-[#1b5e20] outline-none text-[16px] text-[#1a1c1c]">
                  {['Tomato', 'Wheat', 'Rice', 'Maize'].map(c => <option key={c}>{c}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#41493e] pointer-events-none">expand_more</span>
              </div>
            </div>

            {/* District & Soil */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-[14px] text-[#41493e] block">District</label>
                <div className="relative">
                  <select value={district} onChange={e => setDistrict(e.target.value)} className="w-full bg-[#f9f9f9] border border-[#c0c9bb] rounded-xl px-4 py-3 appearance-none focus:border-[#1b5e20] outline-none text-[16px] text-[#1a1c1c]">
                    {['Mandya', 'Mysore', 'Hassan'].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#41493e] pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[14px] text-[#41493e] block">Soil Type</label>
                <div className="relative">
                  <select value={soilType} onChange={e => setSoilType(e.target.value)} className="w-full bg-[#f9f9f9] border border-[#c0c9bb] rounded-xl px-4 py-3 appearance-none focus:border-[#1b5e20] outline-none text-[16px] text-[#1a1c1c]">
                    {['Black Soil', 'Red Soil', 'Alluvial Soil'].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#41493e] pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>

            {/* Season */}
            <div className="space-y-3">
              <label className="font-bold text-[14px] text-[#41493e] block">Season</label>
              <div className="segmented-control">
                {['Kharif', 'Rabi', 'Zaid'].map(s => (
                  <button key={s} type="button" onClick={() => setSeason(s)}
                    className={season === s ? 'active' : ''}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Rainfall Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[14px] text-[#41493e]">Expected Rainfall</label>
                <span className="font-bold text-[16px] text-[#1b5e20]">{rainfall} mm</span>
              </div>
              <style>{`input[type="range"]::-webkit-slider-thumb { -webkit-appearance:none; width:24px; height:24px; background:#00450d; border-radius:50%; cursor:pointer; border:4px solid #fff; box-shadow:0 2px 4px rgba(0,0,0,0.2); }`}</style>
              <input type="range" min="0" max="2000" value={rainfall} onChange={e => setRainfall(+e.target.value)}
                className="w-full h-2 bg-[#e2e2e2] rounded-full appearance-none cursor-pointer" />
              <div className="flex justify-between text-[12px] text-[#41493e]"><span>0mm</span><span>2000mm</span></div>
            </div>

            {/* Farm Area */}
            <div className="space-y-3">
              <label className="font-bold text-[14px] text-[#41493e] block">Farm Area (Acres)</label>
              <div className="flex items-center justify-between bg-[#f9f9f9] border border-[#c0c9bb] rounded-xl p-1">
                <button type="button" onClick={() => setArea(Math.max(0.5, +(area - 0.5).toFixed(1)))}
                  className="w-12 h-12 flex items-center justify-center bg-[#e8e8e8] rounded-lg text-[#41493e] active:scale-95 transition-transform">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="font-semibold text-[20px] text-[#1a1c1c]">{area}</span>
                <button type="button" onClick={() => setArea(+(area + 0.5).toFixed(1))}
                  className="w-12 h-12 flex items-center justify-center bg-[#1b5e20] rounded-lg text-white active:scale-95 transition-transform">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 space-y-4">
              <button type="submit" disabled={isLoading} className="w-full py-6 bg-[#1b5e20] text-white rounded-full font-bold text-[20px] flex items-center justify-center gap-3 shadow-md hover:bg-opacity-90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? 'Calculating...' : 'Predict Yield'} 
                <span className={`material-symbols-outlined ${isLoading ? 'animate-spin' : ''}`}>{isLoading ? 'sync' : 'arrow_forward'}</span>
              </button>
              <button type="reset" className="w-full py-4 border-2 border-[#00450d] text-[#00450d] rounded-full font-bold text-[14px] hover:bg-[#f3f3f4] transition-colors">
                Reset Form
              </button>
            </div>
          </form>
        </section>

        {/* Info Card */}
        <section className="mt-6 p-4 bg-[#bdefbe] rounded-xl flex items-start gap-4">
          <span className="material-symbols-outlined text-[#426e47] mt-1">info</span>
          <div className="space-y-1">
            <h3 className="font-bold text-[14px] text-[#426e47]">How it works</h3>
            <p className="text-[16px] text-[#426e47] opacity-80 leading-relaxed">Our AI analyzes historical meteorological data, soil health reports from your district, and crop-specific growth cycles to provide a high-accuracy yield range for your farm area.</p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
