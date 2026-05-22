import React from 'react';
import GlassCard from '@/components/ui/glass-card';

export default function DiseaseOnboardingPage() {
  return (
    <GlassCard className="max-w-2xl mx-auto mt-8 p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">Disease Detection Onboarding</h1>
      <p className="text-on-surface">Welcome to the disease detection onboarding flow. Follow the steps to set up your preferences.</p>
    </GlassCard>
  );
}
