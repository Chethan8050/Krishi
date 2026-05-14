'use client';
import { useEffect, useRef } from 'react';

interface MapComponentProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers: Array<{ lat: number; lng: number; title: string; count: number }>;
}

export default function MapComponent({ center, zoom, markers }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      // Check if script is already appended
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`);
      if (existingScript) {
        // If script exists but google maps is not ready, it might still be loading
        // We can wait for the callback or just return if it's already loading
        window.initMap = initMap;
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#1b5e20" }]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#e9e9e9" }]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{ "color": "#f5f5f5" }]
          }
        ],
        disableDefaultUI: true,
      });

      markers.forEach(marker => {
        const googleMarker = new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map,
          title: marker.title,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#ba1a1a',
            fillOpacity: 0.8,
            scale: 15,
            strokeColor: 'white',
            strokeWeight: 2,
          },
          label: {
            text: marker.count.toString(),
            color: 'white',
            fontWeight: 'bold',
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 8px; color: #1a1c1c;">
            <strong style="display: block; font-size: 14px; margin-bottom: 4px;">${marker.title}</strong>
            <span style="font-size: 12px; color: #41493e;">${marker.count} reports detected</span>
          </div>`,
        });

        googleMarker.addListener('click', () => {
          infoWindow.open(map, googleMarker);
        });
      });
    };

    loadGoogleMaps();
  }, [center, zoom, markers]);

  return <div ref={mapRef} className="w-full h-full" />;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}
