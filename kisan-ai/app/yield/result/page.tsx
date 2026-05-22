'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function YieldResultPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { recentYieldResult, yieldInputs } = useAppStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (!recentYieldResult) {
      router.push('/yield');
    }
  }, [recentYieldResult, router]);

  if (!mounted || !recentYieldResult) return null;

  const estimate = recentYieldResult?.estimatedYieldPerAcre || 0;
  const total = recentYieldResult?.totalYield || 0;
  const grade = recentYieldResult?.grade || '-';

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pt-16 pb-24 md:pb-8 selection:bg-primary/30 selection:text-primary">
      {/* Main Canvas */}
      <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-section-gap w-full pt-24 md:pt-28">
        {/* Page Context Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="font-label-md text-label-md text-primary tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">analytics</span>
              Intelligence Report
            </p>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">
              Yield Result Analysis
            </h1>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Generated based on {yieldInputs.district} Multi-Spectral Data
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* HERO METRIC: Prediction (Large) */}
          <div className="col-span-1 md:col-span-8 glass-panel rounded-xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-60"></div>
            <div className="flex justify-between items-start mb-12 relative z-10">
              <div className="font-body-lg text-body-lg text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">monitoring</span>
                Primary Prediction
              </div>
              <div className="bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="font-label-md text-label-md text-primary font-bold">GRADE {grade}</span>
              </div>
            </div>
            
            <div className="relative z-10 flex items-baseline gap-3">
              <span className="font-display-lg text-[64px] md:text-[96px] leading-none tracking-tighter text-on-surface">{estimate}</span>
              <span className="font-headline-md text-headline-md text-primary">Quintals/Acre</span>
            </div>
            
            <div className="mt-4 relative z-10">
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                Based on current soil moisture, rainfall history, and expected season trends, the crop is tracking towards a high-efficiency harvest.
              </p>
            </div>
          </div>

          {/* TOTAL EXPECTED (Medium) */}
          <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 flex flex-col justify-between">
            <div className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-secondary">inventory_2</span>
              Total Projected Volume
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg text-on-surface mb-1">
                {total.toFixed(2)} Q
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant border-t border-glass-stroke pt-4 mt-4">
                Estimated absolute yield across the selected {yieldInputs.area} Acre parcel. Prepare logistics for bulk transport.
              </p>
            </div>
          </div>

          {/* COMPARISON METRICS (Wide) */}
          <div className="col-span-1 md:col-span-7 glass-panel rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="font-body-md text-body-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant">stacked_bar_chart</span>
                Regional Comparison
              </div>
              <div className="bg-surface-container rounded-full px-3 py-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[16px]">trending_up</span>
                <span className="font-label-md text-label-md text-primary font-bold">{recentYieldResult?.comparisonToAverage || '+12%'}</span>
              </div>
            </div>
            <div className="space-y-6 mt-8">
              {/* Bar 1: District Avg */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">District Average</span>
                  <span className="font-label-md text-label-md text-on-surface">22 Q/Acre</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary/50 rounded-full" style={{ width: '77%' }}></div>
                </div>
              </div>
              {/* Bar 2: Your Yield */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-body-sm text-body-sm text-primary font-medium">Your Prediction</span>
                  <span className="font-label-md text-label-md text-primary font-bold">{estimate} Q/Acre</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full w-full bg-primary blur-[4px] opacity-30"></div>
                  <div className="h-full bg-primary rounded-full relative z-10 shadow-[0_0_10px_rgba(78,222,163,0.5)]" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* RECOMMENDATION (Actionable Insight) */}
          <div className="col-span-1 md:col-span-5 glass-panel rounded-xl p-6 relative overflow-hidden bg-surface-container-high">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            <div className="font-body-md text-body-md text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              Agronomic Recommendation
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
              Excellent season expected.
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
              {recentYieldResult?.insights || 'Canopy health indicators are well above regional baselines. Maintain current irrigation schedules. Consider scheduling early harvest contractors to avoid end-of-season logistical bottlenecks.'}
            </p>
            <button className="w-full py-3 rounded-full bg-surface-container border border-glass-stroke font-label-md text-label-md text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
              Schedule Harvest Tasks
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        /* Glassmorphic border utility */
        .glass-panel {
            background: rgba(40, 42, 45, 0.7);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid transparent;
            background-clip: padding-box;
            position: relative;
        }
        .glass-panel::before {
            content: "";
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            z-index: -1;
            margin: -1px;
            border-radius: inherit;
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
        }
      `}</style>
    </div>
  );
}
