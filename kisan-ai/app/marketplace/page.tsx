'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../store/useAppStore';

const products = [
  {
    id: 1,
    name: { en: 'Roma Tomatoes', kn: 'ರೊಮಾ ಟೊಮೆಟೊ', hi: 'रोमा टमाटर' },
    price: '₹40/kg',
    seller: 'Ramesh Farm',
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400',
    distance: '2.4 km',
    initial: 'R',
    bg: 'bg-secondary-container text-on-surface'
  },
  {
    id: 2,
    name: { en: 'Russet Potatoes', kn: 'ಆಲೂಗಡ್ಡೆ', hi: 'आलू' },
    price: '₹25/kg',
    seller: 'Valley Agrics',
    rating: 4.5,
    img: 'https://images.unsplash.com/photo-1518977673343-a4a623f54d4e?auto=format&fit=crop&q=80&w=400',
    distance: '3.1 km',
    initial: 'V',
    bg: 'bg-tertiary-container text-on-tertiary-container'
  },
  {
    id: 3,
    name: { en: 'Baby Spinach', kn: 'ಪಾಲಕ್', hi: 'पालक' },
    price: '₹60/kg',
    seller: 'GreenTech Farm',
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400',
    distance: '4.0 km',
    initial: 'G',
    bg: 'bg-primary-container text-on-primary-container'
  }
];

export default function Marketplace() {
  const router = useRouter();
  const { language } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true); 
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md overflow-x-hidden pb-safe md:pb-0">
      {/* TopAppBar (Mobile) */}
      <header className="md:hidden fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface/70 backdrop-blur-xl border-b border-glass-stroke">
        <div className="h-8 w-auto font-display-lg text-headline-lg-mobile text-primary tracking-tight font-bold">
          KrishiDrishti
        </div>
        <div className="flex gap-4">
          <button className="text-on-surface-variant hover:text-primary-fixed transition-colors active:scale-95 duration-150">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>translate</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary-fixed transition-colors active:scale-95 duration-150">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>account_circle</span>
          </button>
        </div>
      </header>

      {/* SideNav (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 fixed h-full bg-surface-container/80 backdrop-blur-2xl border-r border-glass-stroke z-40 px-6 py-8">
        <div className="mb-12 font-display-lg text-headline-md text-primary tracking-tight font-bold">
          KrishiDrishti
        </div>
        <nav className="flex-1 flex flex-col gap-4">
          <a onClick={() => router.push('/dashboard')} className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-all py-3 px-4 font-body-md hover:bg-surface-variant/50 rounded-xl cursor-pointer">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>home_max</span>
            Home
          </a>
          <a onClick={() => router.push('/scan')} className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-all py-3 px-4 font-body-md hover:bg-surface-variant/50 rounded-xl cursor-pointer">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>sensors</span>
            Detection
          </a>
          <a onClick={() => router.push('/yield')} className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-all py-3 px-4 font-body-md hover:bg-surface-variant/50 rounded-xl cursor-pointer">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>analytics</span>
            Intelligence
          </a>
          <a className="flex items-center gap-3 text-primary bg-primary/10 rounded-xl py-3 px-4 font-body-md font-bold transition-all glow-active cursor-pointer">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
            Marketplace
          </a>
        </nav>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 w-full mt-16 md:mt-0 md:ml-64 p-margin-mobile md:p-margin-desktop overflow-y-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-section-gap gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-white">Marketplace Overview</h1>
            <p className="font-body-md text-body-md text-text-muted mt-1">FarmDirect Intelligence</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1a1c1f] px-6 py-3 rounded-full border border-glass-stroke hover:border-primary/50 hover:bg-surface-variant transition-all font-body-sm text-body-sm text-white">
              <span className="material-symbols-outlined text-primary text-[20px]">add</span>
              New Listing
            </button>
            <button className="flex items-center justify-center bg-primary text-white px-6 py-3 rounded-full hover:brightness-110 transition-all font-body-sm text-body-sm font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              Market Intel
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter md:gap-gutter">
          {/* Revenue Metrics (Farmer View) */}
          <div className="md:col-span-8 glass-panel rounded-xl p-card-padding flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-headline-md text-on-surface">Revenue Forecast</h2>
              <div className="flex gap-2 bg-surface-dark rounded-full p-1 border border-glass-stroke">
                <button className="px-4 py-1 rounded-full bg-surface-variant text-on-surface font-label-md text-label-md">7D</button>
                <button className="px-4 py-1 rounded-full text-text-muted hover:text-on-surface font-label-md text-label-md transition-colors">30D</button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1">
                <p className="font-body-sm text-body-sm text-text-muted mb-4 line-clamp-1">Total Sales</p>
                <p className="font-display-lg text-[40px] leading-tight text-primary">₹45,200</p>
                <div className="flex items-center gap-1 text-primary-fixed-dim mt-1 bg-primary/10 w-fit px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  <span className="font-label-md text-label-md">+12.5%</span>
                </div>
              </div>
              <div className="flex-1 border-t md:border-t-0 md:border-l border-glass-stroke pt-4 md:pt-0 md:pl-6">
                <p className="font-body-sm text-body-sm text-text-muted mb-4 line-clamp-1">Active Orders</p>
                <p className="font-display-lg text-[40px] leading-tight text-on-surface">14</p>
                <p className="font-body-sm text-body-sm text-text-muted mb-4 line-clamp-1">3 pending pickup</p>
              </div>
            </div>

            {/* Abstract Chart Visual */}
            <div className="h-32 w-full mt-auto relative">
              <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                <div className="border-b border-white w-full"></div>
                <div className="border-b border-white w-full"></div>
                <div className="border-b border-white w-full"></div>
                <div className="border-b border-white w-full"></div>
              </div>
              <svg className="w-full h-full preserve-3d" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"></stop>
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0,80 Q20,60 40,70 T80,30 T100,20 L100,100 L0,100 Z" fill="url(#lineGrad)"></path>
                <path d="M0,80 Q20,60 40,70 T80,30 T100,20" fill="none" stroke="#10b981" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                <circle cx="40" cy="70" fill="#111416" r="3" stroke="#10b981" strokeWidth="2"></circle>
                <circle cx="80" cy="30" fill="#111416" r="3" stroke="#10b981" strokeWidth="2"></circle>
                <circle cx="100" cy="20" fill="#111416" r="3" stroke="#10b981" strokeWidth="2"></circle>
              </svg>
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="md:col-span-4 flex flex-col gap-gutter">
            <div className="glass-panel rounded-xl p-card-padding flex items-center justify-between cursor-pointer hover:bg-surface-variant/30 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <div>
                  <h3 className="font-body-lg text-body-lg text-white font-medium group-hover:text-primary transition-colors">My Listings</h3>
                  <p className="font-body-sm text-body-sm text-text-muted mb-4 line-clamp-1">Manage 8 active items</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-text-muted group-hover:text-tertiary transition-colors">chevron_right</span>
            </div>
            
            <div className="glass-panel rounded-xl p-card-padding flex items-center justify-between cursor-pointer hover:bg-surface-variant/30 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined">local_shipping</span>
                </div>
                <div>
                  <h3 className="font-body-lg text-body-lg text-white font-medium group-hover:text-primary transition-colors">Order Fulfillment</h3>
                  <p className="font-body-sm text-body-sm text-text-muted mb-4 line-clamp-1">2 requires attention</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">chevron_right</span>
            </div>
            
            {/* Weather/Crop Condition Widget */}
            <div className="glass-panel rounded-xl p-card-padding flex-1 relative overflow-hidden flex flex-col justify-end min-h-[140px]">
              <div className="absolute inset-0 bg-gradient-to-br from-surface-dark to-transparent opacity-80 z-0"></div>
              <div className="relative z-10 flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2 text-secondary mb-1">
                    <span className="material-symbols-outlined text-[18px]">partly_cloudy_day</span>
                    <span className="font-label-md text-label-md tracking-wider">TODAY</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Optimal Harvest</h3>
                  <p className="font-body-sm text-body-sm text-text-muted mb-4 line-clamp-1">Tomatoes · Humidity 65%</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-glass-stroke bg-surface-container flex items-center justify-center text-primary backdrop-blur-md">
                  <span className="material-symbols-outlined">notifications_active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Produce (Buyer View Integration) */}
          <div className="md:col-span-12 glass-panel rounded-xl p-card-padding mt-4 bg-surface-container-lowest">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface">Local Harvest Radar</h2>
                <p className="font-body-sm text-body-sm text-text-muted mb-4 line-clamp-1">Produce available within 5km radius</p>
              </div>
              <button className="text-primary hover:text-primary-fixed transition-colors font-body-sm text-body-sm flex items-center gap-1">
                View Map <span className="material-symbols-outlined text-[16px]">map</span>
              </button>
            </div>
            
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
              {products.map(product => (
                <div key={product.id} className="min-w-[280px] w-[280px] snap-start bg-surface-container-low rounded-lg border border-glass-stroke overflow-hidden hover:border-primary/50 transition-all group">
                  <div className="h-32 bg-surface-container-lowest relative">
                    <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `url('${product.img}')` }}></div>
                    <div className="absolute top-3 right-3 bg-surface/80 backdrop-blur-md px-2 py-1 rounded-md border border-glass-stroke flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-[14px]">location_on</span>
                      <span className="font-label-md text-label-md text-on-surface">{product.distance}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-body-lg text-body-lg text-white font-medium group-hover:text-primary transition-colors">{product.name[language] || product.name.en}</h3>
                      <div className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[12px] font-medium border border-primary/20">{product.price}</div>
                    </div>
                    <p className="font-body-sm text-body-sm text-text-muted mb-4 line-clamp-1">Freshly picked, organic certified.</p>
                    <div className="flex items-center justify-between border-t border-glass-stroke pt-3 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full ${product.bg} flex items-center justify-center text-[10px] font-bold`}>{product.initial}</div>
                        <span className="font-label-md text-label-md text-on-surface-variant">{product.seller}</span>
                      </div>
                      <div className="flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-label-md text-label-md">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Spacer for mobile nav */}
        <div className="h-24 md:h-8 w-full"></div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 md:bottom-8 right-8 z-40 bg-primary hover:bg-primary-fixed-dim text-on-primary rounded-full px-6 py-4 flex items-center gap-3 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
        <span className="font-label-md text-label-md font-bold">Add Listing</span>
      </button>

      {/* BottomNavBar (Mobile) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 bg-surface-container/80 backdrop-blur-2xl border-t border-glass-stroke shadow-lg shadow-primary/5">
        <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all py-1 px-3">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>home_max</span>
          <span className="font-label-md text-label-md mt-1">Home</span>
        </button>
        <button onClick={() => router.push('/scan')} className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all py-1 px-3">
          <span className="material-symbols-outlined">sensors</span>
          <span className="font-label-md text-label-md mt-1">Detection</span>
        </button>
        <button onClick={() => router.push('/yield')} className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all py-1 px-3">
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-label-md text-label-md mt-1">Intelligence</span>
        </button>
        <button className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl py-1 px-3 transform scale-90 duration-200 glow-active">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
          <span className="font-label-md text-[10px] font-bold">Market</span>
        </button>
      </nav>

      <style jsx>{`
        .glass-panel {
            background-color: rgba(12, 14, 17, 0.85);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            position: relative;
            border: 0.67px solid rgba(16, 185, 129, 0.1);
        }
        .glass-panel::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 0.67px;
            background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.15), transparent);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
        }
        .glow-active {
            box-shadow: 0 0 24px rgba(16, 185, 129, 0.3);
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 16px); }
      `}</style>
    </div>
  );
}
