'use client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export default function ScanPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setSelectedImage, selectedImage } = useAppStore();
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
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen flex flex-col">
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#f9f9f9] border-b border-[#c0c9bb]">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-[#00450d] hover:bg-[#f3f3f4] transition-colors p-1 rounded-full">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-bold text-[24px] leading-[32px] text-[#00450d]">Scan Crop</h1>
        </div>
        <button className="text-[#00450d] hover:bg-[#f3f3f4] transition-colors p-1 rounded-full">
          <span className="material-symbols-outlined">info</span>
        </button>
      </header>

      <main className="flex-grow px-4 py-6 flex flex-col gap-8 max-w-2xl mx-auto w-full">
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Upload Zone */}
        <section className="flex flex-col gap-6">
          <div 
            onClick={triggerUpload}
            className="border-2 border-dashed border-[#1b5e20] rounded-xl h-[280px] bg-white flex flex-col items-center justify-center text-center p-2 cursor-pointer overflow-hidden group"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <>
                <span className="material-symbols-outlined text-[#00450d] text-[64px] mb-2 group-hover:scale-110 transition-transform">photo_camera</span>
                <p className="font-bold text-[14px] text-[#1a1c1c] mb-1">Take or Upload Photo</p>
                <p className="text-[12px] text-[#41493e]">PNG, JPG or JPEG up to 10MB</p>
              </>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <button onClick={triggerUpload} className="flex-1 flex items-center justify-center gap-1 border border-[#00450d] text-[#00450d] font-bold text-[14px] py-4 px-6 rounded-full hover:bg-[#acf4a4]/10 transition-colors">
                <span className="material-symbols-outlined">camera_alt</span> Camera
              </button>
              <button onClick={triggerUpload} className="flex-1 flex items-center justify-center gap-1 border border-[#00450d] text-[#00450d] font-bold text-[14px] py-4 px-6 rounded-full hover:bg-[#acf4a4]/10 transition-colors">
                <span className="material-symbols-outlined">image</span> Gallery
              </button>
            </div>
            <button 
              onClick={() => router.push('/scan/voice')} 
              className="w-full flex items-center justify-center gap-2 bg-[#bdefbe] text-[#426e47] font-bold text-[14px] py-4 px-6 rounded-full hover:bg-[#a2d3a4] transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span> Use Voice Diagnosis
            </button>
          </div>
        </section>

        {/* Supported Crops */}
        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-[14px] text-[#1a1c1c]">Supported Crops</h2>
          <div className="flex overflow-x-auto gap-3 pb-1" style={{ scrollbarWidth: 'none' }}>
            {crops.map(crop => (
              <span key={crop} className="bg-[#bdefbe] text-[#426e47] px-6 py-1 rounded-full text-[12px] font-medium whitespace-nowrap">{crop}</span>
            ))}
          </div>
        </section>

        {/* Tip Card */}
        <section className="bg-[#FFF8E1] p-4 rounded-xl flex gap-4 border border-[#FFE082]">
          <span className="material-symbols-outlined text-[#5f2c00]" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-[14px] text-[#5f2c00]">For best results...</p>
            <p className="text-[16px] text-[#723600]">Ensure the plant is well-lit, the focus is sharp on the affected area, and there is minimal background clutter.</p>
          </div>
        </section>
      </main>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-[#f9f9f9] px-4 py-6 border-t border-[#c0c9bb]">
        <button 
          onClick={() => router.push('/scan/analyzing')} 
          disabled={!selectedImage}
          className={`w-full font-bold py-6 rounded-full shadow-sm active:scale-95 transition-all duration-150 ${selectedImage ? 'bg-[#1b5e20] text-white opacity-100' : 'bg-[#e0e0e0] text-[#a0a0a0] cursor-not-allowed opacity-50'}`}
        >
          {selectedImage ? 'Analyse Crop' : 'Please select an image'}
        </button>
      </div>
    </div>
  );
}
