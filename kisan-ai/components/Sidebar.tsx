'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '../app/store/useAppStore';

export default function Sidebar() {
  const pathname = usePathname();
  const { language } = useAppStore();

  // Hide sidebar on splash screen and onboarding pages
  const hideSidebar = pathname === '/login' || pathname === '/onboarding' || pathname.startsWith('/onboarding/');

  if (hideSidebar) return null;

  const navItems = [
    { icon: 'home_max', label: 'Dashboard', href: '/' },
    { icon: 'document_scanner', label: 'Scan Crop', href: '/scan' },
    { icon: 'bar_chart', label: 'Yield Predict', href: '/yield' },
    { icon: 'neurology', label: 'AI Chat', href: '/chat' },
    { icon: 'cloud', label: 'Weather', href: '/weather' },
    { icon: 'storefront', label: 'Market', href: '/market' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-surface-container/80 backdrop-blur-2xl border-r border-glass-stroke shadow-lg shadow-primary/5 z-[60] pt-6 pb-8 px-4">
      {/* Brand logo */}
      <div className="px-4 mb-8">
        <Link href="/" className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
          KrishiDrishti
        </Link>
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
        <div className="text-xs font-label-md text-on-surface-variant uppercase tracking-wider px-4 mb-2">Main Menu</div>
        {navItems.map((item) => {
          // Home is a special case for exact matching
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20 glow-primary'
                  : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface border border-transparent'
              }`}
            >
              <span className={`material-symbols-outlined transition-transform group-hover:scale-110 ${isActive ? 'icon-fill' : ''}`}>
                {item.icon}
              </span>
              <span className={`font-body-sm text-body-sm ${isActive ? 'font-medium' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-glass-stroke flex flex-col gap-2">
        <Link
          href="/settings"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
            pathname.startsWith('/settings')
              ? 'bg-primary/10 text-primary border border-primary/20 glow-primary'
              : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface border border-transparent'
          }`}
        >
          <span className="material-symbols-outlined transition-transform group-hover:scale-110">settings</span>
          <span className="font-body-sm text-body-sm">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
