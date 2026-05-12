'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login success
    router.push('/onboarding/1');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9] text-[#1a1c1c] items-stretch">
      <header className="w-full flex justify-center items-center py-10">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-[#1b5e20] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
          </div>
          <h1 className="text-[28px] font-extrabold tracking-tight text-[#1b5e20]">KisanAI</h1>
        </div>
      </header>

      <main className="flex-1 px-6 flex flex-col items-center justify-start pt-4">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="text-center">
            <h2 className="text-[24px] font-bold mb-2">Welcome Back</h2>
            <p className="text-[14px] text-[#41493e]">Sign in to continue your crop diagnosis</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-[#1a1c1c] uppercase tracking-wider ml-1">Phone Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#41493e] font-bold">+91</span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit number"
                  className="w-full bg-white border border-[#c0c9bb] rounded-xl py-4 pl-14 pr-4 focus:border-[#1b5e20] focus:ring-2 focus:ring-[#1b5e20]/20 outline-none transition-all text-[16px]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1b5e20] text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-transform text-[18px] flex items-center justify-center gap-2"
            >
              Sign In
              <span className="material-symbols-outlined">login</span>
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#c0c9bb]"></div>
            </div>
            <div className="relative flex justify-center text-[12px]">
              <span className="bg-[#f9f9f9] px-4 text-[#41493e] font-medium uppercase tracking-widest">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-[#c0c9bb] bg-white rounded-xl py-3 active:scale-95 transition-transform">
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-5 h-5" />
              <span className="text-[14px] font-bold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 border border-[#c0c9bb] bg-white rounded-xl py-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[#1b5e20]">sms</span>
              <span className="text-[14px] font-bold">OTP</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center px-6">
        <p className="text-[13px] text-[#41493e]">
          Don't have an account? <Link href="/signup" className="text-[#1b5e20] font-bold underline">Register Now</Link>
        </p>
      </footer>
    </div>
  );
}
