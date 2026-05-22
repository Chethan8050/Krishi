'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const competitors = [
  {
    name: 'Plantix',
    logo: '🌿',
    strengths: ['Large user base', 'Good image library'],
    weaknesses: ['Requires internet', 'No regional language audio', 'Western-focused'],
    pricing: 'Freemium',
  },
  {
    name: 'CropIn',
    logo: '🌾',
    strengths: ['Enterprise features', 'Weather integration'],
    weaknesses: ['B2B only', 'Complex UI', 'No direct farmer app'],
    pricing: 'Enterprise',
  },
  {
    name: 'Fasal',
    logo: '💧',
    strengths: ['IoT integration', 'Weather predictions'],
    weaknesses: ['Requires sensors', 'Premium pricing', 'Limited disease detection'],
    pricing: 'Paid Subscription',
  },
  {
    name: 'KrishiNetwork',
    logo: '📱',
    strengths: ['Government tie-ups', 'MSP pricing'],
    weaknesses: ['Basic AI features', 'Limited crop coverage', 'No offline mode'],
    pricing: 'Free',
  },
];

const features = [
  { name: 'Offline Mode', kisanAI: true, plantix: false, cropin: false, fasal: false, krishi: false },
  { name: 'Regional Language Audio', kisanAI: true, plantix: false, cropin: false, fasal: false, krishi: true },
  { name: 'Edge AI (No Server)', kisanAI: true, plantix: false, cropin: false, fasal: false, krishi: false },
  { name: 'Disease Detection (38+)', kisanAI: true, plantix: true, cropin: false, fasal: false, krishi: true },
  { name: 'Yield Prediction', kisanAI: true, plantix: false, cropin: true, fasal: true, krishi: false },
  { name: 'Marketplace', kisanAI: true, plantix: true, cropin: true, fasal: false, krishi: true },
  { name: 'Community Alerts', kisanAI: true, plantix: true, cropin: false, fasal: false, krishi: true },
  { name: 'Free for Farmers', kisanAI: true, plantix: 'Limited', cropin: false, fasal: false, krishi: true },
];

export default function ComparePage() {
  const router = useRouter();

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <header className="sticky top-0 w-full z-50 glass px-4 py-4 flex justify-between items-center border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-black tracking-tight text-[#065f46]">Why KisanAI Wins</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 space-y-10 pb-32 max-w-2xl mx-auto w-full">
        {/* Hero Comparison */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-black text-slate-800">The Only Solution Built for <span className="text-emerald-600">Rural India</span></h2>
          <p className="text-sm text-slate-500">No internet? No problem. KisanAI works where others fail.</p>
        </section>

        {/* Feature Matrix */}
        <section className="bg-white rounded-[28px] p-6 border border-slate-200 shadow-premium">
          <h3 className="font-black text-sm text-slate-800 mb-6">Feature Comparison Matrix</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 text-xs font-bold text-slate-400">Feature</th>
                  <th className="text-center py-3 text-xs font-black text-emerald-600">KisanAI</th>
                  <th className="text-center py-3 text-xs font-bold text-slate-400">Plantix</th>
                  <th className="text-center py-3 text-xs font-bold text-slate-400">CropIn</th>
                  <th className="text-center py-3 text-xs font-bold text-slate-400">Fasal</th>
                  <th className="text-center py-3 text-xs font-bold text-slate-400">KrishiNet</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <motion.tr 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-slate-100"
                  >
                    <td className="py-3 text-xs font-bold text-slate-700">{feature.name}</td>
                    <td className="text-center py-3">
                      {typeof feature.kisanAI === 'boolean' ? (
                        feature.kisanAI 
                          ? <span className="text-emerald-500 font-bold">✓</span> 
                          : <span className="text-slate-300">—</span>
                      ) : (
                        <span className="text-xs text-amber-600 font-bold">{feature.kisanAI}</span>
                      )}
                    </td>
                    <td className="text-center py-3">
                      {typeof feature.plantix === 'boolean' ? (
                        feature.plantix 
                          ? <span className="text-green-500">✓</span> 
                          : <span className="text-slate-300">—</span>
                      ) : (
                        <span className="text-xs text-amber-600">{feature.plantix}</span>
                      )}
                    </td>
                    <td className="text-center py-3">
                      {typeof feature.cropin === 'boolean' ? (
                        feature.cropin 
                          ? <span className="text-green-500">✓</span> 
                          : <span className="text-slate-300">—</span>
                      ) : (
                        <span className="text-xs text-amber-600">{feature.cropin}</span>
                      )}
                    </td>
                    <td className="text-center py-3">
                      {typeof feature.fasal === 'boolean' ? (
                        feature.fasal 
                          ? <span className="text-green-500">✓</span> 
                          : <span className="text-slate-300">—</span>
                      ) : (
                        <span className="text-xs text-amber-600">{feature.fasal}</span>
                      )}
                    </td>
                    <td className="text-center py-3">
                      {typeof feature.krishi === 'boolean' ? (
                        feature.krishi 
                          ? <span className="text-green-500">✓</span> 
                          : <span className="text-slate-300">—</span>
                      ) : (
                        <span className="text-xs text-amber-600">{feature.krishi}</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Competitor Cards */}
        <section className="space-y-4">
          <h3 className="font-black text-xs uppercase tracking-[0.25em] text-slate-400 px-2">Competitor Analysis</h3>
          
          {competitors.map((comp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[24px] p-5 border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">{comp.logo}</div>
                <div className="flex-1">
                  <h4 className="font-black text-slate-800">{comp.name}</h4>
                  <span className="text-xs font-bold text-slate-500">{comp.pricing}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs font-bold text-green-700 mb-1">✓ Strengths</p>
                  <ul className="text-xs text-green-600 space-y-1">
                    {comp.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-xs font-bold text-red-700 mb-1">✗ Weaknesses</p>
                  <ul className="text-xs text-red-600 space-y-1">
                    {comp.weaknesses.map((w, i) => <li key={i}>• {w}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Why KisanAI Wins */}
        <section className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-[28px] p-6 text-white">
          <h3 className="font-black text-lg mb-6">Why KisanAI Wins</h3>
          
          <div className="space-y-4">
            {[
              { icon: 'wifi_off', title: 'Works Offline', desc: 'Edge AI runs on-device, no internet required' },
              { icon: 'record_voice_over', title: 'Voice First', desc: 'Audio diagnosis in Kannada, Hindi, English' },
              { icon: 'groups', title: 'Farmer First', desc: '100% free for farmers, B2B revenue model' },
              { icon: 'hub', title: 'Community Alert', desc: 'Disease spread warnings at village level' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm opacity-80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}