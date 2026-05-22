import React from 'react';
import Navbar from '../../components/ui/navbar';
import GlassCard from '../../components/ui/glass-card';

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">
        <GlassCard className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Alerts Center</h1>
          <p className="text-gray-700">Here you can view all your alerts and notifications.</p>
          {/* Add alert list components here */}
        </GlassCard>
      </main>
    </div>
  );
}
