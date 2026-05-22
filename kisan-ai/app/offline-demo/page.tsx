'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineDemo() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [simulatedDelay, setSimulatedDelay] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleNetwork = () => {
    setIsOnline(!isOnline);
    setSimulatedDelay(simulatedDelay + 1);
  };

  const runOfflineScan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <header className="sticky top-0 w-full z-50 glass px-4 py-4 flex justify-between items-center border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-black tracking-tight text-[#065f46]">Offline Mode Demo</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 space-y-8 pb-32 max-w-2xl mx-auto w-full">
        {/* Network Simulator */}
        <section className="bg-white rounded-[28px] p-6 border border-slate-200 shadow-premium">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-sm text-slate-800">Network Simulator</h3>
            <button 
              onClick={toggleNetwork}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {isOnline ? '🟢 Online' : '🔴 Offline'}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-slate-400">signal_cellular_alt</span>
              <span className="font-bold text-sm text-slate-600">Connection Status</span>
            </div>
            <p className="text-xs text-slate-500">
              {isOnline 
                ? 'Connected to server. All features available.' 
                : 'No internet connection. Running in offline mode with cached AI model.'}
            </p>
          </div>

          {!isOnline && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-amber-600">info</span>
                <span className="font-bold text-sm text-amber-800">Offline Mode Active</span>
              </div>
              <p className="text-xs text-amber-700">
                Using lightweight cached model (98% accuracy). Results sync when online.
              </p>
            </div>
          )}
        </section>

        {/* Offline Capabilities */}
        <section className="space-y-4">
          <h3 className="font-black text-xs uppercase tracking-[0.25em] text-slate-400 px-2">Available Offline</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: 'document_scanner', label: 'Disease Scan', status: 'Works' },
              { icon: 'history', label: 'Scan History', status: 'Cached' },
              { icon: 'menu_book', label: 'Disease Library', status: 'Cached' },
              { icon: 'settings', label: 'Settings', status: 'Works' },
              { icon: 'bar_chart', label: 'Yield Predictor', status: 'Works' },
              { icon: 'cloud_off', label: 'Weather (Cached)', status: '48hr data' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-[20px] p-4 border border-slate-100 shadow-sm">
                <span className="material-symbols-outlined text-[#065f46] text-2xl mb-2">{feature.icon}</span>
                <p className="font-bold text-sm text-slate-700">{feature.label}</p>
                <p className={`text-xs font-bold ${feature.status === 'Works' ? 'text-green-600' : 'text-amber-600'}`}>{feature.status}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Demo Scan */}
        <section className="space-y-4">
          <h3 className="font-black text-xs uppercase tracking-[0.25em] text-slate-400 px-2">Try Offline Scan</h3>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={runOfflineScan}
            disabled={isProcessing}
            className="w-full py-6 rounded-[24px] bg-[#065f46] text-white font-black text-lg shadow-2xl shadow-emerald-900/30 disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-3">
                <span className="material-symbols-outlined animate-spin">sync</span>
                Processing Offline...
              </span>
            ) : (
              'Run Offline Scan'
            )}
          </motion.button>

          <AnimatePresence>
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-[20px] p-4 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800">Offline Result Ready</p>
                    <p className="text-xs text-slate-500">Using cached MobileNetV2 model</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50">
                  <p className="font-bold text-emerald-800">Tomato Plant: Healthy</p>
                  <p className="text-xs text-emerald-600">Confidence: 94%</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Edge AI Info */}
        <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[28px] p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">memory</span>
            </div>
            <div>
              <h3 className="font-black text-lg">Edge AI Engine</h3>
              <p className="text-xs text-slate-400">On-device inference</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Model Size</span>
              <span className="font-bold">4.2 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Inference Time</span>
              <span className="font-bold">&lt; 500ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Offline Accuracy</span>
              <span className="font-bold">98.2%</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}