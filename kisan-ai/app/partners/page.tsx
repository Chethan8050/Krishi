'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const partners = [
  { type: 'Government', name: 'Karnataka State Agriculture Dept', status: 'MoU Signed', year: '2024' },
  { type: 'FPO', name: 'Mandya District FPO', status: 'Active', year: '2024' },
  { type: 'NGO', name: 'BAIF Development Foundation', status: 'Pilot', year: '2024' },
  { type: 'Corporate', name: 'UPL Agrotech', status: 'Discussions', year: '2025' },
];

const revenueModels = [
  { model: 'B2B Data License', description: 'Sell anonymized disease pattern data to agrochemical companies', price: '₹50K-5L/year' },
  { model: 'FPO Subscription', description: 'Premium features for Farmer Producer Organizations', price: '₹500/farmer/year' },
  { model: 'Insurance Integration', description: 'Data feed to crop insurance providers', price: 'Revenue share' },
  { model: 'Government Grant', description: 'Digital agriculture mission funding', price: '₹1-10Cr' },
];

export default function PartnersPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', organization: '', email: '', type: '' });

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <header className="sticky top-0 w-full z-50 glass px-4 py-4 flex justify-between items-center border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-black tracking-tight text-[#065f46]">Partner With Us</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 space-y-8 pb-32 max-w-2xl mx-auto w-full">
        {/* Stats Banner */}
        <section className="bg-gradient-to-r from-[#065f46] to-[#047857] rounded-[32px] p-8 text-white">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-black">12,847</p>
              <p className="text-xs font-bold opacity-80">Farmers Reached</p>
            </div>
            <div>
              <p className="text-3xl font-black">156</p>
              <p className="text-xs font-bold opacity-80">Villages</p>
            </div>
            <div>
              <p className="text-3xl font-black">₹4.2Cr</p>
              <p className="text-xs font-bold opacity-80">Crop Loss Prevented</p>
            </div>
          </div>
        </section>

        {/* Current Partners */}
        <section className="space-y-4">
          <h3 className="font-black text-xs uppercase tracking-[0.25em] text-slate-400 px-2">Current Partners</h3>
          
          {partners.map((partner, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[20px] p-4 border border-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  partner.type === 'Government' ? 'bg-blue-100 text-blue-600' :
                  partner.type === 'FPO' ? 'bg-green-100 text-green-600' :
                  partner.type === 'NGO' ? 'bg-purple-100 text-purple-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  <span className="material-symbols-outlined text-sm">
                    {partner.type === 'Government' ? 'account_balance' : 
                     partner.type === 'FPO' ? 'groups' : 
                     partner.type === 'NGO' ? 'volunteer_activism' : 'business'}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800">{partner.name}</p>
                  <p className="text-xs text-slate-500">{partner.type}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                partner.status === 'Active' ? 'bg-green-100 text-green-700' :
                partner.status === 'MoU Signed' ? 'bg-blue-100 text-blue-700' :
                partner.status === 'Pilot' ? 'bg-purple-100 text-purple-700' :
                'bg-amber-100 text-amber-700'
              }`}>{partner.status}</span>
            </motion.div>
          ))}
        </section>

        {/* Revenue Models */}
        <section className="space-y-4">
          <h3 className="font-black text-xs uppercase tracking-[0.25em] text-slate-400 px-2">Revenue Models</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {revenueModels.map((model, idx) => (
              <div key={idx} className="bg-white rounded-[20px] p-4 border border-slate-200">
                <h4 className="font-bold text-sm text-slate-800 mb-2">{model.model}</h4>
                <p className="text-xs text-slate-500 mb-3">{model.description}</p>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{model.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Partnership Form */}
        <section className="bg-white rounded-[28px] p-6 border border-slate-200">
          <h3 className="font-black text-sm text-slate-800 mb-6">Become a Partner</h3>
          
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Name"
              className="w-full p-4 rounded-[16px] bg-slate-50 border border-slate-200 text-sm font-bold"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Organization"
              className="w-full p-4 rounded-[16px] bg-slate-50 border border-slate-200 text-sm font-bold"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            />
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full p-4 rounded-[16px] bg-slate-50 border border-slate-200 text-sm font-bold"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <select 
              className="w-full p-4 rounded-[16px] bg-slate-50 border border-slate-200 text-sm font-bold"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="">Select Partner Type</option>
              <option value="government">Government</option>
              <option value="fpo">FPO</option>
              <option value="ngo">NGO</option>
              <option value="corporate">Corporate</option>
              <option value="investor">Investor</option>
            </select>
            
            <button className="w-full py-4 rounded-[16px] bg-[#065f46] text-white font-black">
              Submit Inquiry
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}