'use client';
import { useRouter } from 'next/navigation';

export default function Onboarding3() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-[#f9f9f9] text-[#1a1c1c]">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-end items-center px-4 py-6 pointer-events-none">
        <button onClick={() => router.push('/dashboard')} className="pointer-events-auto bg-[#e8e8e8] text-[#41493e] px-4 py-1 rounded-full font-bold text-[12px] active:scale-95 transition-transform">
          Skip
        </button>
      </header>
      <main className="flex-1 flex flex-col relative">
        <div className="flex items-center justify-center relative overflow-hidden px-6" style={{ height: '55vh', background: 'linear-gradient(to bottom, #f0f7f0, #ffffff)' }}>
          <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXfq-EkgTbJ-xdbM3b_BA2GQNhnNK6gF6xTC5YrUnbYi1U4F_YcGFhDMHVAASzY8i7CDrQbsbeKvGC4RSNpuqr11hEiwaRMOAFSQMBaERnBXN3ggwddnG4l29VFD7bVF68I4fPbjcfiroxQ5JkgjeRI3PHpDQyApmLc7PCQqObHX8d05bJZ3851C1IkTBsMriM_gt4NlPu1Y5I-lQ_SASB8P87jBTC15X1MUGvaNEA_0E2qhYjX-NNThzbEx8mbpF70QUtz3iG5FQE"
              alt="Yield prediction" className="w-full h-auto z-10" />
            <div className="absolute inset-0 bg-[#00450d]/5 rounded-full blur-3xl -z-10 scale-125" />
          </div>
        </div>
        <section className="absolute bottom-0 left-0 w-full bg-white rounded-t-[32px] min-h-[45%] flex flex-col px-6 pt-10 pb-8 shadow-[0_-8px_32px_rgba(0,0,0,0.08)] border-t border-[#c0c9bb]">
          <div className="flex justify-center gap-1 mb-6">
            <div className="h-2 w-2 rounded-full bg-[#c0c9bb]" />
            <div className="h-2 w-2 rounded-full bg-[#c0c9bb]" />
            <div className="h-2 w-10 rounded-full bg-[#1b5e20]" />
          </div>
          <div className="flex-1 text-center flex flex-col items-center">
            <h1 className="font-bold text-[22px] text-[#1a1c1c] mb-4 leading-tight">Predict Your Harvest Yield</h1>
            <p className="text-[14px] text-[#41493e] leading-relaxed max-w-[300px]">
              Enter your crop, district, soil type and rainfall — KisanAI estimates your expected yield before the season starts.
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-auto">
            <button onClick={() => router.push('/language')} className="w-full bg-[#1b5e20] text-white font-bold py-4 rounded-lg active:opacity-90 transition-opacity">
              Get Started
            </button>
            <button onClick={() => router.push('/dashboard')} className="text-center text-[12px] font-medium text-[#41493e]">
              Already have an account? <span className="font-bold underline">Sign in</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
