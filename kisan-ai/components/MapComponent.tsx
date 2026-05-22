'use client';
import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../app/store/useAppStore';

interface MapComponentProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers: Array<{ lat: number; lng: number; title: string; count: number }>;
  onMarkerClick?: (title: string, count: number) => void;
}

export default function MapComponent({ center, zoom, markers, onMarkerClick }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const { theme } = useAppStore();
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    // Inject custom CSS styling and keyframes once
    if (!document.getElementById('leaflet-custom-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'leaflet-custom-pulse-style';
      style.innerHTML = `
        @keyframes mapPulse {
          0% {
            transform: scale(0.6);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .custom-popup-glass .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 20px !important;
          color: #1e293b !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
          font-family: var(--font-inter), sans-serif !important;
        }
        .dark .custom-popup-glass .leaflet-popup-content-wrapper {
          background: rgba(15, 23, 42, 0.85) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #f1f5f9 !important;
        }
        .custom-popup-glass .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(12px) !important;
        }
        .dark .custom-popup-glass .leaflet-popup-tip {
          background: rgba(15, 23, 42, 0.85) !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Load Leaflet CSS dynamically
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS dynamically
    const initLeaflet = () => {
      if (window.L) {
        setLeafletLoaded(true);
      }
    };

    if (!window.L) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = initLeaflet;
      document.head.appendChild(script);
    } else {
      setLeafletLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || !window.L) return;

    const L = window.L;

    // Destroy existing map instance to avoid re-initialization errors
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet Map
    const map = L.map(mapRef.current, {
      center: [center.lat, center.lng],
      zoom: zoom,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Define premium map tiles based on selected theme
    const tileUrl = theme === 'dark' 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      maxZoom: 19,
    }).addTo(map);

    // Render markers with gorgeous glowing CSS pulse animations
    markers.forEach(marker => {
      const color = marker.count > 20 
        ? '#ef4444' // Red for high outbreaks
        : marker.count > 12 
        ? '#f59e0b' // Amber for warnings
        : '#10b981'; // Emerald for stable areas

      const pulseIconHtml = `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; margin-left: -22px; margin-top: -22px;">
          <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: ${color}; opacity: 0.35; transform: scale(1); animation: mapPulse 2s infinite ease-out;"></div>
          <div style="position: absolute; width: 24px; height: 24px; border-radius: 50%; background-color: ${color}; border: 2.5px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 11px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 10;">
            ${marker.count}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pulseIconHtml,
        className: 'custom-leaflet-marker',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });

      const leafletMarker = L.marker([marker.lat, marker.lng], { icon: customIcon }).addTo(map);

      leafletMarker.on('click', () => {
        if (onMarkerClick) {
          onMarkerClick(marker.title, marker.count);
        }
      });

      // Clean, beautiful info panel popup matching our glassmorphism aesthetics
      leafletMarker.bindPopup(`
        <div style="padding: 4px; font-family: var(--font-inter), sans-serif;">
          <h4 style="margin: 0; font-size: 14px; font-weight: 800; letter-spacing: -0.01em; color: ${theme === 'dark' ? '#f8fafc' : '#0f172a'};">${marker.title}</h4>
          <p style="margin: 4px 0 0 0; font-size: 11px; font-weight: 600; color: ${theme === 'dark' ? '#94a3b8' : '#64748b'};">
            ${marker.count} Outbreaks Detected
          </p>
          <div style="margin-top: 8px; display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 8px; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; background: ${color}20; color: ${color};">
            ${marker.count > 20 ? '🚨 High Alert' : marker.count > 12 ? '⚠️ Warning' : '✅ Stable'}
          </div>
        </div>
      `, {
        className: 'custom-popup-glass',
        closeButton: false,
        offset: [0, -10]
      });
    });

  }, [leafletLoaded, center, zoom, markers, theme]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" />
      {!leafletLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center gap-3">
            <span className="w-8 h-8 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></span>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Loading Satellite Maps...</p>
          </div>
        </div>
      )}
    </div>
  );
}

declare global {
  interface Window {
    L: any;
  }
}
