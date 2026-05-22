'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SustainabilityPage() {
  const router = useRouter();
  
  const goals = [
    { icon: 'water_drop', title: 'Water Conservation', current: 2.4, target: 10, unit: 'Million Liters', desc: 'Reduced through precise irrigation guidance' },
    { icon: 'eco', title: 'Pesticide Reduction', current: 3400, target: 25000, unit: 'Liters Avoided', desc: 'By enabling early detection and targeted treatment' },
    { icon: 'forest', title: 'Carbon Savings', current: 120, target: 1000, unit: 'Tonnes CO₂', desc: 'From reduced pesticide production & transport' },
    { icon: 'grass', title: 'Soil Health', current: 8900, target: 50000, unit: 'Acres Protected', desc: 'Prevented过度化学投入导致的土壤退化' },
  ];

  const sdgGoals = [
    { num: '2', title: 'Zero Hunger', desc: 'Improving crop yields for food security' },
    { num: '12', title: 'Responsible Consumption', desc: 'Reducing chemical inputs in farming' },
    { num: '13', title: 'Climate Action', desc: 'Lowering agriculture carbon footprint' },
    { num: '15', title: 'Life on Land', desc: 'Promoting sustainable farming practices' },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <header className="sticky top-0 w-full z-50 glass px-4 py-4 flex justify-between items-center border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-black tracking-tight text-[#065f46]">Sustainability Impact</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 space-y-8 pb-32 max-w-2xl mx-auto w-full">
        {/* Hero */}
        <section className="text-center space-y-2">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-green-600 text-3xl">park</span>
          </div>
          <h2 className="text-2xl font-black text-slate-800">Farming That <span className="text-green-600">Heals The Earth</span></h2>
          <p className="text-sm text-slate-500">Every scan helps reduce environmental impact</p>
        </section>

        {/* Impact Goals */}
        <section className="space-y-4">
          {goals.map((goal, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[24px] p-5 border border-slate-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-600">{goal.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">{goal.title}</h4>
                  <p className="text-xs text-slate-500">{goal.desc}</p>
                </div>
              </div>
              
              <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                  transition={{ duration: 1, delay: idx * 0.2 }}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                />
              </div>
              
              <div className="flex justify-between mt-2 text-xs">
                <span className="font-bold text-green-600">{goal.current.toLocaleString()} {goal.unit}</span>
                <span className="font-bold text-slate-400">Target: {goal.target.toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
        </section>

        {/* SDG Alignment */}
        <section className="space-y-4">
          <h3 className="font-black text-xs uppercase tracking-[0.25em] text-slate-400 px-2">UN SDG Alignment</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {sdgGoals.map((sdg, idx) => (
              <div key={idx} className="bg-white rounded-[20px] p-4 border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">{sdg.num}</div>
                  <span className="font-bold text-sm text-slate-700">{sdg.title}</span>
                </div>
                <p className="text-xs text-slate-500">{sdg.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certification Info */}
        <section className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-[24px] p-6 border border-emerald-200">
          <h4 className="font-bold text-emerald-800 mb-4">Upcoming Certifications</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="text-sm text-emerald-700">Organic Farming Association (OFA) - Q2 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-300 rounded-full"></span>
              <span className="text-sm text-emerald-700">Climate Smart Agriculture - Q3 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
              <span className="text-sm text-slate-500">Fair Trade Certification - Q4 2025</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}