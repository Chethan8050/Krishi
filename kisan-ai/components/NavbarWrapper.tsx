'use client';
import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide bottom nav on splash screen and other specific pages if needed
  const hideNav = pathname === '/login' || pathname === '/onboarding' || pathname.startsWith('/onboarding/') || pathname === '/heatmap';
  
  if (hideNav) return null;
  
  return (
    <>
      <Sidebar />
      <BottomNav />
    </>
  );
}
