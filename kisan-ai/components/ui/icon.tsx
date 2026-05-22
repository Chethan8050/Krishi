import React from 'react';

type IconProps = {
  name: string;
  className?: string;
};

const Icon: React.FC<IconProps> = ({ name, className = '' }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

export default Icon;
