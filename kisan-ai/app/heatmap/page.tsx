'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleMap, useLoadScript, HeatmapLayerF } from '@react-google-maps/api';

const libraries: ("visualization")[] = ["visualization"];
const mapContainerStyle = { width: '100%', height: '100%' };
const center = { lat: 12.522, lng: 76.894 }; // Mandya, Karnataka region

// Mock Data Generators for Mandya Region
const generateMockPoints = (baseLat: number, baseLng: number, count: number, spread: number) => {
  return Array.from({ length: count }).map(() => ({
    lat: baseLat + (Math.random() - 0.5) * spread,
    lng: baseLng + (Math.random() - 0.5) * spread,
    weight: Math.random() * 2 + 0.5
  }));
};

export default function HeatmapPage() {
  const router = useRouter();
  const [activeLayer, setActiveLayer] = useState<'disease' | 'moisture' | 'risk'>('disease');

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  // Generate Data (Memoized)
  const diseaseData = useMemo(() => generateMockPoints(12.52, 76.90, 80, 0.1), []);
  const moistureData = useMemo(() => generateMockPoints(12.55, 76.85, 150, 0.15), []);
  const riskData = useMemo(() => generateMockPoints(12.50, 76.92, 50, 0.08), []);

  const getHeatmapData = (dataPoints: { lat: number, lng: number, weight: number }[]) => {
    if (!window.google) return [];
    return dataPoints.map(p => ({
      location: new window.google.maps.LatLng(p.lat, p.lng),
      weight: p.weight
    }));
  };

  const getGradient = (type: string) => {
    switch (type) {
      case 'moisture':
        return [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
        ];
      case 'risk':
        return [
          'rgba(255, 0, 0, 0)',
          'rgba(255, 128, 0, 1)',
          'rgba(255, 64, 0, 1)',
          'rgba(255, 0, 0, 1)',
          'rgba(191, 0, 0, 1)',
        ];
      case 'disease':
      default:
        // Default Google Maps gradient (Green to Red)
        return [
          'rgba(0, 255, 0, 0)',
          'rgba(173, 255, 47, 1)',
          'rgba(255, 255, 0, 1)',
          'rgba(255, 165, 0, 1)',
          'rgba(255, 0, 0, 1)',
        ];
    }
  };

  if (loadError) return <div className="p-8 text-error">Error loading maps</div>;

  return (
    <div className="flex flex-col h-[100dvh] bg-surface">
      {/* Header matching dashboard aesthetic */}
      <header className="w-full shrink-0 z-50 flex items-center px-4 md:px-6 h-16 bg-surface/70 backdrop-blur-xl border-b border-glass-stroke shadow-none">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-on-surface-variant hover:text-primary rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="ml-2 font-headline-md text-headline-md text-on-surface font-semibold">Geospatial Intelligence</h1>
      </header>

      {/* Main Map Container */}
      <main className="flex-1 relative overflow-hidden">
        {/* Map UI */}
        <div className="absolute inset-0 z-0">
          {!isLoaded ? (
            <div className="w-full h-full flex items-center justify-center bg-surface-dark">
              <span className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={center}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                mapTypeId: 'satellite',
                styles: [
                  { elementType: 'geometry', stylers: [{ color: '#212121' }] },
                  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
                  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
                  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
                  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
                  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
                ]
              }}
            >
              <HeatmapLayerF
                data={getHeatmapData(
                  activeLayer === 'disease' ? diseaseData :
                  activeLayer === 'moisture' ? moistureData : riskData
                )}
                options={{
                  radius: activeLayer === 'moisture' ? 40 : 25,
                  opacity: 0.8,
                  gradient: getGradient(activeLayer),
                }}
              />
            </GoogleMap>
          )}
        </div>

        {/* Floating Controls Overlay (Glass Panel) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-md">
          <div className="glass-panel p-2 rounded-2xl glow-primary flex flex-col gap-2">
            <div className="flex bg-surface-dark rounded-xl overflow-hidden p-1">
              <button 
                onClick={() => setActiveLayer('disease')}
                className={`flex-1 py-2 font-label-md text-label-md transition-all rounded-lg ${activeLayer === 'disease' ? 'bg-primary text-on-primary shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Disease Density
              </button>
              <button 
                onClick={() => setActiveLayer('moisture')}
                className={`flex-1 py-2 font-label-md text-label-md transition-all rounded-lg ${activeLayer === 'moisture' ? 'bg-tertiary text-on-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Soil Moisture
              </button>
              <button 
                onClick={() => setActiveLayer('risk')}
                className={`flex-1 py-2 font-label-md text-label-md transition-all rounded-lg ${activeLayer === 'risk' ? 'bg-error text-on-primary shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Spread Risk
              </button>
            </div>
            
            <div className="px-4 pb-2 pt-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-sm">info</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {activeLayer === 'disease' && 'Showing active blight clusters across farms.'}
                  {activeLayer === 'moisture' && 'Satellite derived soil moisture retention index.'}
                  {activeLayer === 'risk' && 'AI predicted high-risk zones based on wind & humidity.'}
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
