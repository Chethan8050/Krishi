'use client';
import Link from 'next/link';

export default function MarketPage() {
  const cropPrices = [
    { crop: 'Tomato', price: '₹3,200', change: '+5.2%', trend: 'up', unit: '/quintal' },
    { crop: 'Potato', price: '₹2,100', change: '-2.1%', trend: 'down', unit: '/quintal' },
    { crop: 'Cotton', price: '₹6,500', change: '+3.2%', trend: 'up', unit: '/quintal' },
    { crop: 'Sugarcane', price: '₹4,800', change: '+1.5%', trend: 'up', unit: '/quintal' },
    { crop: 'Corn', price: '₹1,950', change: '-0.8%', trend: 'down', unit: '/quintal' },
    { crop: 'Wheat', price: '₹2,450', change: '+2.3%', trend: 'up', unit: '/quintal' },
  ];

  const marketTrends = [
    { period: '7 Days', cotton: '+3.2%', tomato: '+5.2%', potato: '-2.1%' },
    { period: '30 Days', cotton: '+8.5%', tomato: '+12.3%', potato: '-5.4%' },
    { period: '3 Months', cotton: '+15.2%', tomato: '+18.9%', potato: '-8.2%' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface/70 backdrop-blur-xl border-b border-glass-stroke">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <span className="font-headline-lg text-primary font-bold">Market Prices</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto flex flex-col gap-section-gap w-full pb-12">
        {/* Market Summary */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase">Market Status</span>
              <span className="material-symbols-outlined text-tertiary">trending_up</span>
            </div>
            <div className="font-display-lg text-headline-lg text-tertiary leading-none font-semibold">+2.8%</div>
            <p className="font-body-sm text-on-surface-variant">Average Price Increase</p>
          </div>

          <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase">Top Crop</span>
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
            </div>
            <div className="font-display-lg text-headline-lg text-primary leading-none font-semibold">Tomato</div>
            <p className="font-body-sm text-on-surface-variant">+5.2% This Week</p>
          </div>

          <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase">Best Time</span>
              <span className="material-symbols-outlined text-error">schedule</span>
            </div>
            <div className="font-display-lg text-headline-lg text-error leading-none font-semibold">Now</div>
            <p className="font-body-sm text-on-surface-variant">High Demand Period</p>
          </div>
        </section>

        {/* Crop Prices */}
        <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-4">
          <h3 className="font-headline-md text-headline-md text-on-surface">Current Crop Prices</h3>
          <div className="flex flex-col gap-2">
            {cropPrices.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg hover:bg-surface-variant/30 border border-glass-stroke/50 transition-colors">
                <div className="flex-1">
                  <p className="font-body-md text-on-surface font-semibold">{item.crop}</p>
                  <p className="font-label-md text-on-surface-variant text-[12px]">{item.unit}</p>
                </div>
                <div className="text-right">
                  <p className="font-display-md text-headline-lg text-on-surface font-bold">{item.price}</p>
                  <p className={`font-body-sm flex items-center gap-1 justify-end ${item.trend === 'up' ? 'text-primary' : 'text-error'}`}>
                    <span className="material-symbols-outlined text-[14px]">{item.trend === 'up' ? 'trending_up' : 'trending_down'}</span>
                    {item.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Trends */}
        <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-4">
          <h3 className="font-headline-md text-headline-md text-on-surface">Price Trends</h3>
          <div className="flex flex-col gap-3">
            {marketTrends.map((trend, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-glass-stroke/50">
                <p className="font-body-md text-on-surface font-semibold mb-3">{trend.period}</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="font-label-md text-on-surface-variant text-[12px] mb-1">Cotton</p>
                    <p className={`font-headline-md ${trend.cotton.includes('+') ? 'text-primary' : 'text-error'}`}>{trend.cotton}</p>
                  </div>
                  <div>
                    <p className="font-label-md text-on-surface-variant text-[12px] mb-1">Tomato</p>
                    <p className={`font-headline-md ${trend.tomato.includes('+') ? 'text-primary' : 'text-error'}`}>{trend.tomato}</p>
                  </div>
                  <div>
                    <p className="font-label-md text-on-surface-variant text-[12px] mb-1">Potato</p>
                    <p className={`font-headline-md ${trend.potato.includes('+') ? 'text-primary' : 'text-error'}`}>{trend.potato}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-4 glow-primary">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">lightbulb</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Market Insight</h3>
          </div>
          <p className="font-body-md text-on-surface">Tomato prices are trending upward due to seasonal demand. Consider selling in the next 5-7 days to maximize returns. Potato prices are declining - recommend holding for better rates.</p>
        </div>
      </main>
    </div>
  );
}
