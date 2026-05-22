import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClasses = 'rounded-full px-4 py-2 focus:outline-none transition-colors duration-200';
  const variantClasses =
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-primary/90'
      : 'bg-secondary text-primary-foreground hover:bg-secondary/90';
  // Using CSS custom properties defined in globals.css
  const style = {
    '--bg-color': variant === 'primary' ? 'var(--color-primary)' : 'var(--color-secondary)',
    '--text-color': variant === 'primary' ? 'var(--color-on-primary)' : 'var(--color-on-secondary)'
  } as React.CSSProperties;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={style as any}
    >
      {children}
    </button>
  );
};

export default Button;
