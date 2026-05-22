'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '../store/useAppStore';
import { supabase } from '../lib/supabase';

const PUBLIC_ROUTES = ['/login', '/signup', '/onboarding', '/language', '/install', '/offline-demo'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, setUser } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session && !PUBLIC_ROUTES.some(route => pathname?.startsWith(route))) {
          router.push('/login');
        } else if (session && (pathname === '/login' || pathname === '/signup')) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          phone: session.user.phone || '',
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router, setUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
        <div className="w-10 h-10 border-4 border-[#1b5e20]/20 border-t-[#1b5e20] rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}