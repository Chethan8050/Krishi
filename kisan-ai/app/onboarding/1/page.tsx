'use client';
import { useRouter } from 'next/navigation';

export default function Onboarding1() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-[#f9f9f9] text-[#1a1c1c] items-stretch">
      <header className="w-full flex justify-end items-center px-4 py-6 fixed top-0 z-10">
        <button
          onClick={() => router.push('/dashboard')}
          className="border border-[#c0c9bb] text-[#41493e] font-bold text-[12px] px-6 py-2 rounded-full hover:bg-[#f3f3f4] transition-colors"
        >
          Skip
        </button>
      </header>

      <main className="flex-[1.2] flex flex-col justify-center items-center px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f9f9f9]/50 -z-10" />
        <div className="w-full max-w-[320px] aspect-square flex items-center justify-center">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7QSOLlRWaCfP7_HMjBdCB185vzdAXO_IVgFtXbkauKmxp2IoKMsSnN4HSJz-NUQ-b5oZ66CdEydHTB7oxw71uvrNOlyCvMWZ8nKoUF0TvHX8D2iGBMZkWGLyTvBhh_C4AQy2jazs5Ocprrqm8pXkX_KEe2b15yskQn-X00QyWkSv-ojzPsTA1wMF6VP3Q2oQyfufuNACkwTgKPJIcr-SVzc0VbGmEJfhShbBNa784aiTlhOZlav6K7ql29qNw-NpDOXt_XmO9VDIM"
            alt="Farmer scanning crop"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </main>

      <section className="flex-1 w-full bg-white rounded-t-[32px] shadow-[0_-12px_48px_rgba(0,0,0,0.1)] px-6 py-10 flex flex-col justify-between items-stretch text-center z-20 -mt-10 border-t border-outline-variant">
        <div className="w-full flex flex-col items-center max-w-[500px] mx-auto">
          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1b5e20]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#c0c9bb]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#c0c9bb]" />
          </div>
          <h1 className="font-extrabold text-[26px] leading-tight text-[#1a1c1c] mb-4">
            Detect Crop Disease Instantly
          </h1>
          <p className="text-[16px] text-[#41493e] px-4 max-w-[320px] leading-relaxed">
            Just take a photo of your plant. Our AI identifies the disease in seconds — no agronomist needed.
          </p>
          <div className="w-full mt-10">
            <button
              onClick={() => router.push('/onboarding/2')}
              className="w-full bg-[#1b5e20] text-white font-bold text-[18px] py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform shadow-xl"
            >
              Next
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
