import React from 'react';

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  const baseClasses = 'glass-panel rounded-xl p-4 backdrop-blur-md';
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
