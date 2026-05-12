'use client';
import Link from 'next/link';
import { useAppStore } from '../../store/useAppStore';

export default function YieldResultPage() {
  const { recentYieldResult, yieldInputs } = useAppStore();

  const estimate = recentYieldResult?.estimatedYieldPerAcre || 0;
  const total = recentYieldResult?.totalYield || 0;
  const grade = recentYieldResult?.grade || '-';

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] font-body-md min-h-screen pb-32">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#00450d] text-white border-b border-[#c0c9bb]">
        <div className="flex items-center gap-4">
          <Link href="/yield" className="material-symbols-outlined cursor-pointer">arrow_back</Link>
          <h1 className="font-bold text-[24px]">Yield Result</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined cursor-pointer">language</span>
        </div>
      </header>

      <main className="px-4 mt-6 space-y-6 max-w-2xl mx-auto">
        {/* Result Hero Card */}
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1b5e20] to-[#00450d] p-8 text-white shadow-sm">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <span className="material-symbols-outlined !text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>agriculture</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-[#bdefbe]" style={{ fontVariationSettings: "'FILL' 1" }}>potted_plant</span>
              <span className="font-bold text-[14px] uppercase tracking-wider">Estimated Yield</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-[64px] leading-none">{estimate}</span>
              <span className="font-semibold text-[20px] text-[#90d689] opacity-90">Quintals / Acre</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
              <div className="flex flex-col">
                <span className="font-medium text-[12px] text-[#90d689]">Total</span>
                <span className="font-bold text-[14px]">{total} Q</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-[12px] text-[#90d689]">Grade</span>
                <span className="font-bold text-[14px]">{grade}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-[12px] text-[#90d689]">Season</span>
                <span className="font-bold text-[14px]">{yieldInputs.season}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Bar Chart Card */}
        <section className="bg-white border border-[#c0c9bb] rounded-xl p-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-[20px]">Regional Comparison</h3>
            <span className="text-[#3c6842] font-bold text-[14px]">{recentYieldResult?.comparisonToAverage || '+0%'} above district average</span>
          </div>
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex justify-between font-medium text-[12px]">
                <span>Your Estimate</span>
                <span className="font-bold">{estimate} Q/A</span>
              </div>
              <div className="h-4 w-full bg-[#eeeeee] rounded-full overflow-hidden">
                <div className="h-full bg-[#1b5e20] rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between font-medium text-[12px]">
                <span>District Avg ({yieldInputs.district})</span>
                <span className="font-bold text-[#41493e]">22.0 Q/A</span>
              </div>
              <div className="h-4 w-full bg-[#eeeeee] rounded-full overflow-hidden">
                <div className="h-full bg-[#c0c9bb] rounded-full" style={{ width: '77%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs Summary Card */}
        <section className="bg-white border border-[#c0c9bb] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#c0c9bb] bg-[#f3f3f4] flex justify-between items-center">
            <span className="font-bold text-[14px] text-[#41493e]">INPUT PARAMETERS</span>
            <Link href="/yield" className="material-symbols-outlined text-[#41493e] text-[18px]">edit</Link>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            {[
              { icon: 'water_drop', label: 'Rainfall', val: `${yieldInputs.rainfall} mm` },
              { icon: 'compost', label: 'Soil Type', val: yieldInputs.soilType },
              { icon: 'straighten', label: 'Area', val: `${yieldInputs.area} Acres` },
              { icon: 'category', label: 'Crop', val: yieldInputs.crop },
            ].map(i => (
              <div key={i.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#eeeeee] flex items-center justify-center text-[#00450d]">
                  <span className="material-symbols-outlined">{i.icon}</span>
                </div>
                <div>
                  <p className="font-medium text-[12px] text-[#41493e]">{i.label}</p>
                  <p className="font-bold text-[14px]">{i.val}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Comment Card */}
        <section className="bg-[#bdefbe] rounded-xl p-4 border border-[#91d78a] relative">
          <div className="absolute -top-3 -right-3">
            <div className="w-10 h-10 bg-[#1b5e20] rounded-full flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="space-y-3">
              <h4 className="font-bold text-[14px] text-[#426e47]">KisanAI INSIGHTS</h4>
              <p className="text-[#426e47] text-[16px] leading-relaxed">
                {recentYieldResult?.insights || 'Analyze input successfully. Awaiting detailed remarks.'}
              </p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col gap-4 pt-2 pb-6">
          <button className="w-full bg-[#00450d] text-white py-6 rounded-full font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform">
            <span className="material-symbols-outlined">volume_up</span>
            Hear Result in Kannada
          </button>
          <Link href="/yield" className="w-full border-2 border-[#00450d] text-[#00450d] py-6 rounded-full font-bold flex items-center justify-center gap-3 active:opacity-80 transition-opacity">
            Try Different Inputs
          </Link>
        </div>
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 flex justify-around items-center px-1 py-3 bg-[#f9f9f9] border-t border-[#c0c9bb]">
        {[
          { icon: 'home', label: 'Home', href: '/dashboard' },
          { icon: 'document_scanner', label: 'Scan', href: '/scan' },
          { icon: 'bar_chart', label: 'Yield', href: '/yield', active: true },
          { icon: 'more_horiz', label: 'More', href: '/about' },
        ].map(item => (
          <Link key={item.label} href={item.href} className={`flex flex-col items-center justify-center px-4 py-1 active:scale-95 transition-transform rounded-full ${item.active ? 'bg-[#bdefbe] text-[#426e47]' : 'text-[#41493e]'}`}>
            <span className="material-symbols-outlined" style={item.active ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
            <span className="text-[12px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
