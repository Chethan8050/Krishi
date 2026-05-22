'use client';
import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';

const PUBLIC_ROUTES = ['/login', '/signup', '/onboarding', '/language', '/install', '/offline-demo'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const anonymousId = `anon_${Math.random().toString(36).substr(2, 9)}`;
      setUser({ id: anonymousId });
    }
    setLoading(false);
  }, [user, setUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
        <div className="w-10 h-10 border-4 border-[#1b5e20]/20 border-t-[#1b5e20] rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}