'use client';
import { useEffect } from 'react';
import { useAppStore } from '../app/store/useAppStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useAppStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}
