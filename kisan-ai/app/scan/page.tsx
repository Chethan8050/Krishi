'use client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { createT } from '../../lib/i18n';

export default function ScanPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setSelectedImage, selectedImage, language } = useAppStore();
  const t = createT(language);
  const [preview, setPreview] = useState<string | null>(null);
  const crops = ['Tomato', 'Potato', 'Corn', 'Wheat', 'Rice', 'Soybean'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] min-h-screen flex flex-col font-[var(--font-inter)]">
      {/* Premium Header */}
      <header className="sticky top-0 w-full z-50 glass px-4 py-4 flex justify-between items-center border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-black tracking-tight text-[#065f46] font-[var(--font-outfit)]">{t('scan.title')}</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400">
          <span className="material-symbols-outlined">info</span>
        </button>
      </header>

      <main className="flex-grow px-6 py-8 flex flex-col gap-10 max-w-2xl mx-auto w-full pb-40">
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Upload Zone */}
        <section className="space-y-6">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={triggerUpload}
            className="relative border-2 border-dashed border-emerald-200 rounded-[32px] h-[320px] bg-white flex flex-col items-center justify-center text-center p-4 cursor-pointer overflow-hidden shadow-premium hover:border-emerald-400 transition-all group"
          >
            {preview ? (
              <div className="relative w-full h-full">
                <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-[24px]" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                   <span className="material-symbols-outlined text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity">sync</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto group-hover:bg-emerald-100 transition-colors">
                  <span className="material-symbols-outlined text-[#065f46] text-[40px] group-hover:scale-110 transition-transform">photo_camera</span>
                </div>
                <div>
                  <p className="font-black text-lg text-slate-800">{t('scan.takePhoto')}</p>
                  <p className="text-sm text-slate-400 font-medium">{t('scan.fileHint')}</p>
                </div>
              </div>
            )}
          </motion.div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex gap-4">
              <button onClick={triggerUpload} className="flex-1 flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold text-sm py-5 rounded-[24px] hover:bg-slate-50 transition-all shadow-premium active:scale-95">
                <span className="material-symbols-outlined text-emerald-600">camera_alt</span> {t('scan.camera')}
              </button>
              <button onClick={triggerUpload} className="flex-1 flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold text-sm py-5 rounded-[24px] hover:bg-slate-50 transition-all shadow-premium active:scale-95">
                <span className="material-symbols-outlined text-emerald-600">image</span> {t('scan.gallery')}
              </button>
            </div>
            
            <button 
              onClick={() => router.push('/scan/voice')} 
              className="w-full flex items-center justify-center gap-3 bg-emerald-50 text-emerald-700 font-black text-sm py-5 rounded-[24px] hover:bg-emerald-100 transition-all border border-emerald-100/50 active:scale-95"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span> {t('scan.voiceDiagnosis')}
            </button>
          </div>
        </section>

        {/* Supported Crops */}
        <section className="space-y-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">{t('scan.supported')}</h2>
          <div className="flex flex-wrap gap-2 px-1">
            {crops.map(crop => (
              <span key={crop} className="bg-white border border-slate-100 text-slate-600 px-5 py-2 rounded-full text-xs font-bold shadow-sm">{crop}</span>
            ))}
          </div>
        </section>

        {/* Tip Card - Modernized */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-[32px] flex gap-5 border border-amber-100/50 shadow-premium">
          <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-900/20">
            <span className="material-symbols-outlined text-amber-900" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
          </div>
          <div className="space-y-1">
            <p className="font-black text-amber-900 tracking-tight">{t('scan.tipTitle')}</p>
            <p className="text-sm text-amber-800/80 font-medium leading-relaxed">{t('scan.tipBody')}</p>
          </div>
        </section>
      </main>

      {/* Bottom CTA - Floating Style */}
      <div className="fixed bottom-0 left-0 w-full p-6 z-40 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc] to-transparent">
        <motion.button 
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/scan/analyzing')} 
          disabled={!selectedImage}
          className={`w-full py-5 rounded-[24px] font-black text-lg tracking-tight shadow-2xl transition-all ${
            selectedImage 
              ? 'bg-[#065f46] text-white shadow-emerald-900/30' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {selectedImage ? t('scan.analyse') : t('scan.selectImage')}
        </motion.button>
      </div>
    </div>
  );
}
