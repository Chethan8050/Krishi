'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function TopAppBar() {
  const pathname = usePathname();

  // Hide on screens that have their own custom headers or are standalone
  if (pathname === '/login' || pathname.startsWith('/onboarding') || pathname === '/chat' || pathname === '/heatmap') {
    return null;
  }

  return (
    <header className="fixed top-0 w-full md:left-64 md:w-[calc(100%-16rem)] z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface/70 backdrop-blur-xl border-b border-glass-stroke shadow-none transition-all duration-150">
      <div className="flex items-center md:hidden">
        <Link href="/" className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight font-bold">
          KrishiDrishti
        </Link>
      </div>
      <div className="hidden md:flex flex-1 items-center px-2">
        {/* Optional desktop breadcrumbs or search could go here */}
      </div>
      <div className="flex items-center gap-4">
        <div id="google_translate_element" className="h-8 flex items-center overflow-hidden rounded-md border border-glass-stroke"></div>
        <button aria-label="account_circle" className="text-on-surface-variant hover:text-primary-fixed transition-colors">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
}
