'use client';
import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide bottom nav on splash screen and other specific pages if needed
  const hideNav = pathname === '/' || pathname === '/login' || pathname === '/onboarding' || pathname.startsWith('/onboarding/');
  
  if (hideNav) return null;
  
  return <BottomNav />;
}
