'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppStore } from '../app/store/useAppStore';
import { createT } from '../lib/i18n';

export default function BottomNav() {
  const pathname = usePathname();
  const { language } = useAppStore();
  const t = createT(language);

  const navItems = [
    { icon: 'home', label: t('nav.home'), href: '/dashboard' },
    { icon: 'document_scanner', label: t('nav.scan'), href: '/scan' },
    { icon: 'menu_book', label: t('nav.library'), href: '/library' },
    { icon: 'chat', label: t('nav.chat'), href: '/chat' },
    { icon: 'settings', label: t('nav.settings'), href: '/settings' },
  ];

  return (
    <nav className="bottom-nav bg-[var(--color-surface)] dark:bg-[var(--color-surface-container)] border-t border-slate-100 dark:border-slate-800">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`bottom-nav-item ${isActive ? 'active' : ''} text-slate-500 dark:text-slate-400`}
          >
            <div className="relative flex items-center justify-center">
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[var(--color-primary-fixed)] rounded-2xl w-16 h-8 -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="icon-wrapper">
                <span 
                  className="material-symbols-outlined transition-all duration-300" 
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                    color: isActive ? 'var(--color-primary)' : 'inherit'
                  }}
                >
                  {item.icon}
                </span>
              </div>
            </div>
            <span className={`label transition-colors duration-300 ${isActive ? 'text-[var(--color-primary)]' : ''}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
