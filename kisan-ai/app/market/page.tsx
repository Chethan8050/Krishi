'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SellProduceModal from '@/components/SellProduceModal';

export default function MarketPage() {
  const [activeTab, setActiveTab] = useState<'trends' | 'farmdirect' | 'oneshot'>('trends');
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

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

  const [farmDirectListings, setFarmDirectListings] = useState([
    { id: 1, crop: 'Organic Tomatoes', farmer: 'Ramesh Gowda', distance: '1.2 km away', price: '₹35/kg', date: 'Harvesting Tomorrow', quantity: '50 kg', image: '/crops/tomatoes.png', status: 'upcoming', sellType: 'fixed' },
    { id: 2, crop: 'Fresh Potatoes', farmer: 'Suresh Patil', distance: '3.5 km away', price: '₹22/kg', date: 'Available Now', quantity: '200 kg', image: '/crops/potatoes.png', status: 'available', sellType: 'fixed' },
    { id: 3, crop: 'Sweet Corn', farmer: 'Lakshmi N', distance: '5.0 km away', price: '₹15/piece', date: 'Harvesting in 3 Days', quantity: '100 pieces', image: '/crops/corn.png', status: 'upcoming', sellType: 'fixed' },
    { id: 4, crop: 'Ragi (Finger Millet)', farmer: 'Kumar V', distance: '8.1 km away', price: '₹40/kg', date: 'Available Now', quantity: '500 kg', image: '/crops/ragi.png', status: 'available', sellType: 'fixed' },
  ]);

  const [oneShotListings, setOneShotListings] = useState([
    { id: 101, crop: 'Bulk Wheat Harvest', farmer: 'Prakash Rao', distance: '12 km away', minPrice: '2300', currentBid: '2450', endsIn: '14h 23m', quantity: '50 Quintals', image: '/crops/wheat.png', status: 'auction' },
    { id: 102, crop: 'Entire Onion Yield', farmer: 'Anil Kumar', distance: '8.5 km away', minPrice: '1500', currentBid: '1550', endsIn: '22h 10m', quantity: '100 Quintals', image: '/crops/onions.png', status: 'auction' },
  ]);

  const handlePostListing = (newListing: any) => {
    // Add the new listing to the top of the feed
    setFarmDirectListings([newListing, ...farmDirectListings]);
    setIsSellModalOpen(false);
  };

  const handlePostOneShot = (newListing: any) => {
    const rawPrice = newListing.price.replace(/[^0-9]/g, '') || '0';
    const oneShotListing = {
      id: Date.now(),
      crop: newListing.crop,
      farmer: 'You',
      distance: '0 km away',
      minPrice: rawPrice,
      currentBid: rawPrice,
      endsIn: '24h 00m', // 1 day duration
      quantity: newListing.quantity,
      image: newListing.image,
      status: 'auction'
    };
    setOneShotListings([oneShotListing, ...oneShotListings]);
    setIsSellModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full md:left-64 md:w-[calc(100%-16rem)] z-50 flex flex-col bg-surface/70 backdrop-blur-xl border-b border-glass-stroke">
        <div className="flex justify-between items-center px-margin-mobile h-16">
          <div className="flex items-center gap-4">
            <button onClick={() => window.history.back()} className="md:hidden text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <span className="font-headline-lg text-primary font-bold">Market</span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex px-margin-mobile md:px-margin-desktop gap-6 mt-auto">
          <button 
            onClick={() => setActiveTab('trends')}
            className={`pb-3 font-body-md transition-colors relative ${activeTab === 'trends' ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Market Trends
            {activeTab === 'trends' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full glow-primary"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('farmdirect')}
            className={`pb-3 font-body-md transition-colors relative flex items-center gap-1 ${activeTab === 'farmdirect' ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            FarmDirect <span className="material-symbols-outlined text-[14px]">storefront</span>
            {activeTab === 'farmdirect' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full glow-primary"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('oneshot')}
            className={`pb-3 font-body-md transition-colors relative flex items-center gap-1 ${activeTab === 'oneshot' ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            One Shot <span className="material-symbols-outlined text-[14px]">local_shipping</span>
            {activeTab === 'oneshot' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full glow-primary"></div>}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto flex flex-col gap-section-gap w-full pb-12">
        
        {activeTab === 'trends' ? (
          <>
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

            {/* Crop Prices & Trends Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              <div className="md:col-span-7 glass-panel rounded-xl p-card-padding flex flex-col gap-4">
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

              <div className="md:col-span-5 flex flex-col gap-gutter">
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
                <div className="glass-panel rounded-xl p-card-padding flex flex-col gap-4 glow-primary mt-auto">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">lightbulb</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Market Insight</h3>
                  </div>
                  <p className="font-body-md text-on-surface">Tomato prices are trending upward due to seasonal demand. Consider selling in the next 5-7 days to maximize returns.</p>
                </div>
              </div>
            </div>
          </>
        ) : activeTab === 'farmdirect' ? (
          <>
            {/* FarmDirect Hero */}
            <div className="glass-panel rounded-xl p-card-padding glow-primary flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="z-10 max-w-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary icon-fill text-3xl">storefront</span>
                  <h2 className="font-display-lg text-headline-lg text-on-surface">FarmDirect Marketplace</h2>
                </div>
                <p className="font-body-md text-on-surface-variant">Connect directly with local consumers and businesses. Skip the middlemen, set your own prices, and increase your profits with transparent local trading.</p>
              </div>
              <div className="z-10 shrink-0">
                <button 
                  onClick={() => setIsSellModalOpen(true)}
                  className="flex items-center gap-2 bg-primary text-on-primary font-headline-md text-body-md px-6 py-3 rounded-full hover:bg-primary-fixed-dim transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/40"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  Sell Your Produce
                </button>
              </div>
            </div>

            {/* FarmDirect Feed */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end mb-2">
                <h3 className="font-headline-md text-headline-md text-on-surface">Hyperlocal Produce</h3>
                <div className="flex items-center gap-2 text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
                  <span className="material-symbols-outlined text-sm">tune</span>
                  <span className="font-label-md text-label-md">Filter (5 km)</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-gutter">
                {farmDirectListings.map((listing) => (
                  <div key={listing.id} className="glass-panel rounded-xl overflow-hidden flex flex-col group hover:border-primary/30 transition-colors">
                    {/* Image Header */}
                    <div className="h-40 relative bg-surface-dark overflow-hidden">
                      <img src={listing.image} alt={listing.crop} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${listing.status === 'available' ? 'bg-primary/90 text-on-primary backdrop-blur-md' : 'bg-tertiary/90 text-on-tertiary backdrop-blur-md'}`}>
                          {listing.sellType === 'bidding' ? 'Auction' : (listing.status === 'available' ? 'Available' : 'Pre-Book')}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background to-transparent p-4 pb-2 pt-10">
                        <h4 className="font-headline-md text-body-lg text-on-surface font-semibold">{listing.crop}</h4>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm">person</span>
                          <span className="font-body-sm">{listing.farmer}</span>
                        </div>
                        <div className="flex items-center gap-1 text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm">location_on</span>
                          <span className="font-label-md text-label-md text-[11px]">{listing.distance}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="bg-surface-variant/30 rounded-lg p-2 border border-glass-stroke/50">
                          <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">
                            {listing.sellType === 'bidding' ? 'Min Price' : 'Price'}
                          </p>
                          <p className="font-body-md text-primary font-bold">{listing.price}</p>
                        </div>
                        <div className="bg-surface-variant/30 rounded-lg p-2 border border-glass-stroke/50">
                          <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Quantity</p>
                          <p className="font-body-md text-on-surface font-semibold">{listing.quantity}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-1 mb-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-sm text-tertiary">event</span>
                        <span className="font-body-sm">{listing.date}</span>
                      </div>

                      {/* Actions */}
                      <div className="mt-auto grid grid-cols-2 gap-2 pt-2 border-t border-glass-stroke/50">
                        <button className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-glass-stroke text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors font-body-sm font-medium">
                          <span className="material-symbols-outlined text-sm">chat</span>
                          Chat
                        </button>
                        {listing.sellType === 'bidding' ? (
                          <button 
                            onClick={() => {
                              const bid = prompt(`Enter your bid for ${listing.crop} (Minimum ${listing.price}):`);
                              if (bid) alert(`Bid of ₹${bid} placed successfully!`);
                            }}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary hover:text-on-secondary transition-colors font-body-sm font-medium">
                            <span className="material-symbols-outlined text-sm">gavel</span>
                            Bid Now
                          </button>
                        ) : listing.status === 'available' ? (
                          <button 
                            onClick={() => alert(`Order placed successfully for ${listing.crop}!`)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-on-primary transition-colors font-body-sm font-medium">
                            <span className="material-symbols-outlined text-sm">shopping_cart</span>
                            Buy Now
                          </button>
                        ) : (
                          <button 
                            onClick={() => alert(`Pre-booking accepted for ${listing.crop}!`)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-tertiary/20 text-tertiary border border-tertiary/30 hover:bg-tertiary hover:text-on-tertiary transition-colors font-body-sm font-medium">
                            <span className="material-symbols-outlined text-sm">bookmark</span>
                            Pre-Book
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : activeTab === 'oneshot' ? (
          <>
            {/* One Shot Hero */}
            <div className="glass-panel rounded-xl p-card-padding glow-primary flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden bg-gradient-to-br from-surface to-surface-variant border-primary/20">
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="z-10 max-w-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary icon-fill text-3xl">local_shipping</span>
                  <h2 className="font-display-lg text-headline-lg text-on-surface">One Shot Bulk Sale</h2>
                </div>
                <p className="font-body-md text-on-surface-variant">Sell your entire harvest in one go. Set a minimum price and let buyers bid for 24 hours. The highest bidder secures your produce!</p>
              </div>
              <div className="z-10 shrink-0">
                <button 
                  onClick={() => setIsSellModalOpen(true)}
                  className="flex items-center gap-2 bg-primary text-on-primary font-headline-md text-body-md px-6 py-3 rounded-full hover:bg-primary-fixed-dim transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/40"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  Create Auction
                </button>
              </div>
            </div>

            {/* One Shot Feed */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end mb-2">
                <h3 className="font-headline-md text-headline-md text-on-surface">Active Bulk Auctions</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-gutter">
                {oneShotListings.map((listing) => (
                  <div key={listing.id} className="glass-panel rounded-xl overflow-hidden flex flex-col group hover:border-primary/30 transition-colors border border-primary/10">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-surface-dark overflow-hidden">
                        <img src={listing.image} alt={listing.crop} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-error/90 text-on-error backdrop-blur-md flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">timer</span>
                            {listing.endsIn}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col gap-3 flex-1 w-full md:w-3/5">
                        <h4 className="font-headline-md text-body-lg text-on-surface font-semibold">{listing.crop}</h4>
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm">person</span>
                          <span className="font-body-sm">{listing.farmer} • {listing.distance}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="bg-surface-variant/30 rounded-lg p-2 border border-glass-stroke/50">
                            <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Quantity</p>
                            <p className="font-body-md text-on-surface font-semibold">{listing.quantity}</p>
                          </div>
                          <div className="bg-primary/5 rounded-lg p-2 border border-primary/20">
                            <p className="font-label-md text-[10px] text-primary uppercase tracking-wider mb-1">Current Bid</p>
                            <p className="font-body-md text-primary font-bold">₹{listing.currentBid}</p>
                          </div>
                        </div>
                        <div className="text-[11px] text-on-surface-variant text-right">
                          Min Price: ₹{listing.minPrice}
                        </div>
                        <div className="mt-auto pt-3 border-t border-glass-stroke/50">
                          <button 
                            onClick={() => {
                              const bid = prompt(`Enter your bid for ${listing.crop} (Must be > ₹${listing.currentBid}):`);
                              if (bid && parseInt(bid) > parseInt(listing.currentBid)) {
                                alert(`Bid of ₹${bid} placed successfully! You are now the highest bidder.`);
                              } else if (bid) {
                                alert('Bid must be higher than the current bid.');
                              }
                            }}
                            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors font-body-sm font-bold shadow-md shadow-primary/20">
                            <span className="material-symbols-outlined text-sm">gavel</span>
                            Place Bid
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </main>
      
      {/* Modal */}
      <SellProduceModal 
        isOpen={isSellModalOpen} 
        onClose={() => setIsSellModalOpen(false)} 
        onSubmit={activeTab === 'oneshot' ? handlePostOneShot : handlePostListing} 
      />
    </div>
  );
}
