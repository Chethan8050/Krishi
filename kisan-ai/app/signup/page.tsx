'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
      <div className="w-10 h-10 border-4 border-[#1b5e20]/20 border-t-[#1b5e20] rounded-full animate-spin" />
    </div>
  );
}
