import React from 'react';
import Link from 'next/link';
import Icon from './icon';

const routes = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/chat', label: 'Chat', icon: 'chat' },
  { href: '/community', label: 'Community', icon: 'people' },
  { href: '/alerts', label: 'Alerts', icon: 'notifications' },
  { href: '/settings', label: 'Settings', icon: 'settings' },
];

const Navbar: React.FC = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-surface-container-low glass-panel flex justify-around py-2 z-10">
    {routes.map((r) => (
      <Link key={r.href} href={r.href} className="flex flex-col items-center text-sm text-on-surface">
        <Icon name={r.icon} className="text-2xl" />
        <span>{r.label}</span>
      </Link>
    ))}
  </nav>
);

export default Navbar;
