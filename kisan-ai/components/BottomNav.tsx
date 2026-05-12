'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: 'home', label: 'Home', href: '/dashboard' },
    { icon: 'document_scanner', label: 'Scan', href: '/scan' },
    { icon: 'bar_chart', label: 'Yield', href: '/yield' },
    { icon: 'more_horiz', label: 'More', href: '/about' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <div className="icon-wrapper">
              <span 
                className="material-symbols-outlined" 
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
            </div>
            <span className="label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
