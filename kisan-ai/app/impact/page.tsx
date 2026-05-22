'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

const ImpactStats = () => {
  const stats = [
    { label: 'Farmers Helped', value: '12,847', icon: 'groups', color: 'bg-emerald-500 dark:bg-emerald-600' },
    { label: 'Crops Saved', value: '45,230', icon: 'eco', color: 'bg-green-500 dark:bg-green-600' },
    { label: 'Districts Covered', value: '156', icon: 'map', color: 'bg-blue-500 dark:bg-blue-600' },
    { label: 'Disease Alerts', value: '8,421', icon: 'warning', color: 'bg-amber-500 dark:bg-amber-600' },
  ];

  return (
    <section className="space-y-6">
      <h3 className="font-black text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 px-2">Real-Time Impact</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-[28px] p-6 border border-slate-100 dark:border-slate-700/50 shadow-premium transition-all duration-300"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
              <span className="material-symbols-outlined text-white">{stat.icon}</span>
            </div>
            <p className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{stat.value}</p>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const LiveActivity = () => {
  const activities = [
    { farmer: 'Ramesh K.', location: 'Mandya, KA', disease: 'Tomato Blight', time: '2 min ago', status: 'treated' },
    { farmer: 'Lakshmamma', location: 'Hassan, KA', disease: 'Rice Blast', time: '5 min ago', status: 'alert' },
    { farmer: 'Venkatappa', location: 'Mysore, KA', disease: 'Healthy', time: '8 min ago', status: 'healthy' },
    { farmer: 'Basavaraj', location: 'Chitradurga, KA', disease: 'Groundnut Leaf Spot', time: '12 min ago', status: 'treated' },
  ];

  return (
    <section className="space-y-4">
      <h3 className="font-black text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 px-2">Live Activity Feed</h3>
      <div className="bg-white dark:bg-slate-800 rounded-[24px] p-6 border border-slate-100 dark:border-slate-700/50 shadow-premium transition-all duration-300">
        {activities.map((activity, idx) => (
          <div key={idx} className={`flex items-center gap-4 py-4.5 ${idx !== activities.length - 1 ? 'border-b border-slate-100/85 dark:border-slate-750' : ''}`}>
            <div className={`w-3.5 h-3.5 rounded-full ${activity.status === 'healthy' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : activity.status === 'alert' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]'}`}></div>
            <div className="flex-1">
              <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{activity.farmer} • <span className="opacity-80 font-semibold">{activity.location}</span></p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{activity.disease}</p>
            </div>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-550">{activity.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const RegionalMap = () => {
  return (
    <section className="space-y-4">
      <h3 className="font-black text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 px-2">Karnataka Disease Heatmap</h3>
      <div className="bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-slate-800/40 dark:to-slate-900/40 rounded-[28px] p-6 border border-slate-200/60 dark:border-slate-800/80 transition-all duration-300">
        <div className="flex items-center justify-between mb-5 px-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]"></div>
            <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.4)]"></div>
            <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]"></div>
            <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Safe</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {['Mandya', 'Hassan', 'Mysore', 'Chitradurga', 'Tumkur', 'Bangalore Rural', 'Kolar', 'Chikballapur', 'Davanagere', 'Shimoga'].map((district, idx) => {
            const risk = idx % 3 === 0 ? 'high' : idx % 2 === 0 ? 'moderate' : 'safe';
            return (
              <div key={district} className={`p-3 rounded-2xl text-center text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                risk === 'high' 
                  ? 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100/50 dark:border-red-950/30' 
                  : risk === 'moderate' 
                  ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-100/50 dark:border-amber-950/30' 
                  : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-950/30'
              }`}>
                {district.slice(0, 10)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const SavingsCalculator = () => {
  const [crops, setCrops] = useState(100);
  const savedAmount = crops * 2500;
  const savedWater = crops * 500;

  return (
    <section className="space-y-4">
      <h3 className="font-black text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 px-2">Farmer Savings Calculator</h3>
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 rounded-[32px] p-8 text-white shadow-xl shadow-emerald-950/10">
        <p className="text-xs font-black uppercase tracking-widest text-emerald-100/70 mb-2">Preventative Protection Impact</p>
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-6">
          <span className="text-4xl sm:text-5xl font-black font-[var(--font-outfit)] tracking-tight">₹{savedAmount.toLocaleString()}</span>
          <span className="text-sm font-semibold opacity-90 mb-1.5">saved in prevented crop losses</span>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-200">water_drop</span>
            <span className="text-sm font-bold text-emerald-55">{savedWater.toLocaleString()} Liters Water Conserved</span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-150">Based on 100 Farmers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ImpactPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useAppStore();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-300 font-[var(--font-inter)]">
      <header className="sticky top-0 w-full z-50 glass dark:glass-dark px-6 py-5 flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-slate-600 dark:text-slate-300"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-black tracking-tight text-[#065f46] dark:text-[#10b981] font-[var(--font-outfit)] uppercase tracking-[0.05em]">KisanAI Impact</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-slate-600 dark:text-slate-300"
          >
            <span className="material-symbols-outlined text-[20px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/45 border border-emerald-100/50 dark:border-emerald-800/20 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-450 uppercase tracking-widest">Live</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 space-y-8 pb-32 max-w-2xl mx-auto w-full">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ImpactStats />
          <div className="mt-10"><LiveActivity /></div>
          <div className="mt-10"><RegionalMap /></div>
          <div className="mt-10"><SavingsCalculator /></div>
        </motion.div>
      </main>
    </div>
  );
}