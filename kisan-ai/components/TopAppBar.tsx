'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function TopAppBar() {
  const pathname = usePathname();

  // Optionally hide on some screens
  if (pathname === '/login' || pathname.startsWith('/onboarding')) {
    return null;
  }

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface/70 backdrop-blur-xl border-b border-glass-stroke shadow-none transition-transform duration-150">
      <div className="flex items-center">
        <Link href="/" className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary tracking-tight font-bold">
          KrishiDrishti
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button aria-label="translate" className="text-on-surface-variant hover:text-primary-fixed transition-colors relative group">
          <span className="material-symbols-outlined">translate</span>
          <span className="absolute -bottom-1 -right-1 bg-surface-container border border-glass-stroke font-label-md text-label-md text-primary px-1 rounded-sm text-[10px]">EN</span>
        </button>
        <button aria-label="account_circle" className="text-on-surface-variant hover:text-primary-fixed transition-colors">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
}
