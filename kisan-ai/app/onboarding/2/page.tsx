'use client';
import { useRouter } from 'next/navigation';

export default function Onboarding2() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#f9f9f9] text-[#1a1c1c]">
      <header className="w-full flex justify-end items-center px-4 py-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-[#e8e8e8] text-[#41493e] font-bold text-[12px] px-6 py-2 rounded-full hover:bg-[#e2e2e2] transition-colors"
        >
          Skip
        </button>
      </header>

      <main className="flex-grow w-full flex items-center justify-center px-4 relative">
        <div className="w-full max-w-[320px] aspect-square flex items-center justify-center">
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
            <span className="material-symbols-outlined text-[300px] text-[#00450d]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
          </div>
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1oLX4QD-VIKCDA4bDW6wLiuoQe1OZlbjUNRQcCkAU1KK5G_sVy-SnXwUootaWLFvKb2QFNSewV27fbJjiHSnpUdSO3pjSA786TtP-_1ePuqIZWcMOHJ3FrrXi38dDG3rFGO978xH6Ijt8cy13MZ6bqCLmniuRE7cD35186JfQ53vdClH2qGL9rTawD2VsH52o33O7KY0Q0Q8Y5o_kxYDRHixpcsZh-GH4Sx5k8J1zh3Ll7VT6XnhtWDtDeCrichGC9JujbjKaT5Km"
              alt="Smartphone Illustration"
              className="w-48 h-auto drop-shadow-xl"
            />
            <div className="mt-6 flex items-center gap-2 bg-[#bdefbe] text-[#426e47] px-6 py-2 rounded-full shadow-sm">
              <span className="material-symbols-outlined">volume_up</span>
              <span className="font-bold text-[12px]">ಕನ್ನಡ ಆಡಿಯೋ ಲಭ್ಯವಿದೆ</span>
            </div>
          </div>
        </div>
      </main>

      <section className="bg-white w-full flex-1 rounded-t-[32px] shadow-[0_-8px_32px_rgba(0,0,0,0.08)] flex flex-col items-stretch px-6 pt-10 pb-8 z-20 -mt-8 border-t border-outline-variant">
        <div className="flex gap-1 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#c0c9bb]" />
          <div className="w-6 h-2 rounded-full bg-[#1b5e20]" />
          <div className="w-2 h-2 rounded-full bg-[#c0c9bb]" />
        </div>
        <div className="text-center space-y-3 mb-6">
          <h1 className="text-[#1a1c1c] font-bold text-[22px] leading-tight">Speaks in Your Language</h1>
          <p className="text-[#41493e] text-[14px] max-w-[300px] mx-auto leading-relaxed">
            Get diagnosis and treatment advice in English, Kannada, or Hindi — spoken aloud so every farmer can understand.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['EN', 'ಕನ್ನಡ', 'हिं'].map(lang => (
            <div key={lang} className="border border-[#00450d] text-[#00450d] px-6 py-1 rounded-full font-bold text-[12px] flex items-center justify-center min-w-[64px]">
              {lang}
            </div>
          ))}
        </div>
        <div className="w-full mt-auto">
          <button
            onClick={() => router.push('/onboarding/3')}
            className="w-full bg-[#1b5e20] text-white font-semibold text-[20px] py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            Next
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
}
