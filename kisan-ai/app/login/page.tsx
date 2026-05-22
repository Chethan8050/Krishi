'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { useAppStore } from '../store/useAppStore';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    return digits;
  };

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const fullPhone = `+91${phone}`;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: fullPhone,
        options: {
          channel: 'sms',
        }
      });

      if (error) throw error;
      setStep('otp');
      setResendTimer(30);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const fullPhone = `+91${phone}`;

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: fullPhone,
        token: otp,
        type: 'sms'
      });

      if (error) throw error;

      if (data.user) {
        setUser({
          id: data.user.id,
          phone: data.user.phone || fullPhone,
        });
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    await sendOTP({ preventDefault: () => {} } as React.FormEvent);
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
            <h2 className="text-[24px] font-bold mb-2">
              {step === 'phone' ? 'Welcome Back' : 'Verify OTP'}
            </h2>
            <p className="text-[14px] text-[#41493e]">
              {step === 'phone' 
                ? 'Sign in to continue your crop diagnosis'
                : `Enter the 6-digit code sent to +91 ${phone}`
              }
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={sendOTP} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#1a1c1c] uppercase tracking-wider ml-1">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#41493e] font-bold">+91</span>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit number"
                    className="w-full bg-white border border-[#c0c9bb] rounded-xl py-4 pl-14 pr-4 focus:border-[#1b5e20] focus:ring-2 focus:ring-[#1b5e20]/20 outline-none transition-all text-[16px]"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || phone.length !== 10}
                className="w-full bg-[#1b5e20] disabled:bg-[#c0c9bb] text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-transform text-[18px] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send OTP
                    <span className="material-symbols-outlined">sms</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOTP} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#1a1c1c] uppercase tracking-wider ml-1">Verification Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  className="w-full bg-white border border-[#c0c9bb] rounded-xl py-4 px-4 focus:border-[#1b5e20] focus:ring-2 focus:ring-[#1b5e20]/20 outline-none transition-all text-[16px] text-center tracking-[0.5em] font-mono"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-[#1b5e20] disabled:bg-[#c0c9bb] text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-transform text-[18px] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Verify & Sign In'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-[14px] text-[#1b5e20] font-bold"
                >
                  Change phone number
                </button>
              </div>
            </form>
          )}

          {step === 'otp' && resendTimer > 0 && (
            <p className="text-center text-[14px] text-[#41493e]">
              Resend OTP in {resendTimer}s
            </p>
          )}

          {step === 'otp' && resendTimer === 0 && (
            <div className="text-center">
              <button
                onClick={handleResend}
                disabled={loading}
                className="text-[14px] text-[#1b5e20] font-bold underline"
              >
                Resend OTP
              </button>
            </div>
          )}
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