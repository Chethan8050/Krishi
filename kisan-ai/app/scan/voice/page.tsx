'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VoiceDiagnosisPage() {
  const router = useRouter();

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Bar */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-margin-mobile py-base bg-primary text-on-primary shadow-md">
        <div className="flex items-center gap-base">
          <button onClick={() => router.back()} className="p-2 active:opacity-70 transition-opacity rounded-full hover:bg-white/10">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-title-md text-title-md font-bold">Voice Diagnosis</h1>
        </div>
        <div className="flex gap-xs">
          <span className="bg-surface-container-lowest text-primary px-3 py-1 rounded-full text-label-sm font-label-bold shadow-sm">EN</span>
          <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-label-sm font-label-bold shadow-sm cursor-pointer hover:bg-primary transition-colors">KN</span>
          <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-label-sm font-label-bold shadow-sm cursor-pointer hover:bg-primary transition-colors">HI</span>
        </div>
      </header>

      <main className="flex-1 px-margin-mobile py-xl flex flex-col items-center">
        {/* Voice Interaction Section */}
        <div className="relative flex items-center justify-center w-full aspect-square max-w-[280px] mb-lg mt-8">
          {/* Pulsing Circles */}
          <div className="absolute w-[160px] h-[160px] rounded-full bg-primary/20 animate-ping"></div>
          <div className="absolute w-[200px] h-[200px] rounded-full bg-primary/10 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Main Mic Button */}
          <button className="relative z-10 w-[140px] h-[140px] rounded-full bg-primary flex items-center justify-center shadow-xl active:scale-95 transition-all hover:shadow-2xl">
            <span className="material-symbols-outlined text-[48px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
          </button>
        </div>

        <div className="text-center mb-xl">
          <p className="text-primary font-label-bold text-body-md mb-xs animate-pulse">Listening...</p>
          <p className="text-on-surface-variant italic text-label-sm">Speak your crop problem in Kannada or Hindi</p>
        </div>

        {/* Live Transcript Box */}
        <div className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-md min-h-[120px] mb-xl flex flex-col gap-xs shadow-sm">
          <span className="text-label-sm font-label-bold text-on-surface-variant uppercase tracking-wider">You said:</span>
          <p className="text-on-surface font-title-md text-[20px]">ನನ್ನ ಟೊಮ್ಯಾಟೊ ಎಲೆ ಹಳದಿಯಾಗುತ್ತಿದೆ</p>
          <p className="text-on-surface-variant italic text-body-md">"My tomato leaves are turning yellow"</p>
        </div>

        {/* Language Instruction Row */}
        <div className="grid grid-cols-3 gap-base w-full mb-xl">
          <div className="bg-surface-container-low border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center text-center hover:bg-surface-container transition-colors cursor-pointer">
            <span className="text-xl mb-1">🇬🇧</span>
            <span className="text-[11px] font-bold text-on-surface uppercase leading-tight">Say in English</span>
          </div>
          <div className="bg-surface-container-lowest border-2 border-primary rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-md">
            <span className="text-xl mb-1">🇮🇳</span>
            <span className="text-[11px] font-bold text-primary uppercase leading-tight">ಕನ್ನಡದಲ್ಲಿ ಹೇಳಿ</span>
          </div>
          <div className="bg-surface-container-low border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center text-center hover:bg-surface-container transition-colors cursor-pointer">
            <span className="text-xl mb-1">🇮🇳</span>
            <span className="text-[11px] font-bold text-on-surface uppercase leading-tight">हिंदी में बोलें</span>
          </div>
        </div>

        <div className="flex-1"></div>

        {/* Action Buttons */}
        <div className="w-full space-y-md mt-auto mb-8">
          <button className="btn btn-primary btn-full py-4 text-body-lg shadow-lg">
            Analyse What I Said
          </button>
          <button className="w-full border-2 border-outline-variant text-on-surface-variant py-4 rounded-full font-label-bold text-body-lg hover:bg-surface-container-low transition-all active:scale-95">
            Type Instead
          </button>
        </div>
      </main>
    </div>
  );
}
