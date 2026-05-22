'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '../app/store/useAppStore';
import { createT } from '../lib/i18n';

export default function BottomNav() {
  const pathname = usePathname();
  const { language } = useAppStore();

  const navItems = [
    { icon: 'home_max', label: 'Home', href: '/' },
    { icon: 'sensors', label: 'Detection', href: '/scan' },
    { icon: 'analytics', label: 'Yield', href: '/yield' },
    { icon: 'chat', label: 'Chat', href: '/chat' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 bg-surface-container/80 backdrop-blur-2xl border-t border-glass-stroke shadow-lg shadow-primary/5 rounded-t-xl">
      {navItems.map((item) => {
        // Simple logic for active: active if path starts with href (except for exact /)
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all duration-200 w-16 ${
              isActive
                ? 'text-primary bg-primary/10 rounded-xl py-1 px-3 transform scale-90'
                : 'text-on-surface-variant hover:text-primary active:scale-90'
            }`}
          >
            <span
              className={`material-symbols-outlined mb-1 ${isActive ? 'icon-fill' : ''}`}
            >
              {item.icon}
            </span>
            <span className={`font-label-md text-label-md text-[10px] ${isActive ? 'font-bold' : ''}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
