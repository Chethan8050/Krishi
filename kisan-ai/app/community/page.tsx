import React from 'react';
import GlassCard from '@/components/ui/glass-card';
import Icon from '@/components/ui/icon';

const profiles = [
  { name: 'Raju Kumar', role: 'Farmer', avatar: '/assets/avatar1.png' },
  { name: 'Meena Patel', role: 'Agronomist', avatar: '/assets/avatar2.png' },
  { name: 'Sanjay Singh', role: 'Researcher', avatar: '/assets/avatar3.png' },
];

const CommunityPage: React.FC = () => (
  <div className="p-4">
    <h1 className="text-2xl font-semibold mb-6 text-primary">Community</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {profiles.map((p, i) => (
        <GlassCard key={i} className="p-4 flex items-center space-x-4">
          <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-medium text-on-surface">{p.name}</p>
            <p className="text-sm text-on-surface-variant">{p.role}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  </div>
);

export default CommunityPage;
