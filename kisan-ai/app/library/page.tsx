'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { createT } from '../../lib/i18n';

const diseases = [
  {
    id: 1,
    name: { en: 'Tomato Early Blight', kn: 'ಟೊಮೆಟೊ ಅರ್ಲಿ ಬ್ಲೈಟ್', hi: 'टमाटर अगेती झुलसा' },
    crop: { en: 'Tomato', kn: 'ಟೊಮೆಟೊ', hi: 'टमाटर' },
    type: { en: 'Fungal', kn: 'ಶಿಲೀಂಧ್ರ', hi: 'कवक' },
    severity: 'High',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOO86QrnrxoggxUhU8UGQPMpcKYHxx5cigKvOuEFwUMn1FzcijbWJQ-96-19cmnDtSgMvrjgrk9Xi_GubkxkJCL2GqQzA798wHIZjZCt_iVUd5NqRBZNZs5cvOt-QIHtfbNTfoNOAF09PLVzU8eF1wvU4PX-_WOCmFqprlxN5WtuG8oYMKoBjq3ij4THkFFQ4FJjVCjYJr-wdGalFuHJV7ExM4_67tnWPEfIy6s3vDJOe5utmr1UAzXll-GQPHNSaPRfm_ism5NrLC'
  },
  {
    id: 2,
    name: { en: 'Potato Late Blight', kn: 'ಆಲೂಗಡ್ಡೆ ಲೇಟ್ ಬ್ಲೈಟ್', hi: 'आलू पछेती झुलसा' },
    crop: { en: 'Potato', kn: 'ಆಲೂಗಡ್ಡೆ', hi: 'आलू' },
    type: { en: 'Oomycete', kn: 'ಅಣಬೆ', hi: 'ओमीसीट' },
    severity: 'High',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDebG_M-I5g05_diUoPFR3sAij4wluJf6NgC8KPYcqvP12Di0GZGMBhWM5fPykGq_DipHSRrZyJ3wruEAlZsB98-x7_Fo-RRUe5ZQGg7PZGkOEQtBWNn0p-Tf6KjUeT0FyWo_NhEjCGJ7Jini6yRuJ-B-Sc0MenOpBlcSaAKa1MRMY_GhPg8xttqgliJTzH9uAFi1uJA6tO3VRYB6f3tZfNxKOp8sEeYcxfv2Om9CjE5kcriwz4lyON-__hyPmuyqR0XaGZ0_CoPFo8'
  },
  {
    id: 3,
    name: { en: 'Corn Leaf Spot', kn: 'ಮೆಕ್ಕೆಜೋಳದ ಎಲೆ ಚುಕ್ಕೆ', hi: 'मक्का पत्ती धब्बा' },
    crop: { en: 'Corn', kn: 'ಮೆಕ್ಕೆಜೋಳ', hi: 'मक्का' },
    type: { en: 'Fungal', kn: 'ಶಿಲೀಂಧ್ರ', hi: 'कवक' },
    severity: 'Mod',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFK4hZSss2bI3unjWw8D2HdM3AoCETmP-YIctZzaI5mW1HlOffGZnxkFmwQpy5xtHGsPfkCbriBZNARMS0smj5u-HKEstKZCU7gXnpblRpw4UJ4pSPAru6W6_HDR7gLy9vTsepX2RoJXe0QL1yNZBL9U9he5CcF14gc3AApaP6g5-_4xDmIp9Xk0vhl7mTzT5tO-5Hoqk35yK3ZxPc62uPpQsvUPNq6DT7Fe_u4nEJm1Xn6-w9ckJEp6YlaYFEc1Un_R8bHPWlcY98'
  },
  {
    id: 4,
    name: { en: 'Rice Leaf Streak', kn: 'ಭತ್ತದ ಎಲೆ ಸ್ಟ್ರೀಕ್', hi: 'चावल की पत्ती की लकीर' },
    crop: { en: 'Rice', kn: 'ಭತ್ತ', hi: 'चावल' },
    type: { en: 'Bacterial', kn: 'ಬ್ಯಾಕ್ಟೀರಿಯಾ', hi: 'जीवाणु' },
    severity: 'Mod',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnWpwEFVek2hj23w5ZsfJjkOsWoLFZyQRORfnExSgV3ejTYE6Ux7ST4f_PRyIpdoVUAzHWoiAKXhSXCdGICNtgxsdUEnxAE1vBYBQ4XCyPNjb24MJ7Ni-xi7yKMWO_iDfjFwwXyeH6vuAlrS5y1_x9QrJzzHBHWQnltMBcA3KS3NcI3ypkCBX0rxXBs_Yz2p53k2Xag_CwLIvxdXf05TjfYA-tFDgShGqboB1EB5a9mi4b6EdROgZhGfntViTV3XJtmM6EupyH0YKk'
  },
  {
    id: 5,
    name: { en: 'Wheat Head Blight', kn: 'ಗೋಧಿ ಹೆಡ್ ಬ್ಲೈಟ್', hi: 'गेहूं का सिर झुलसा' },
    crop: { en: 'Wheat', kn: 'ಗೋಧಿ', hi: 'गेहूं' },
    type: { en: 'Fungal', kn: 'ಶಿಲೀಂಧ್ರ', hi: 'कवक' },
    severity: 'Low',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhmlBry79arVz41vppXSrrvYPRZMXv2v61ACdRtoG-2KOh9iHPKMNElqNPD9pgmMTqHrrXfM2-rq-cDqkKz5VyisyVeobt6ti_0tebpvacZn3qyZaytWQMiVnPvN_f4BJ0V7H19viQtDFMO0qTPBU6-ID6RRqjmkKr0_ePOhDi0tByBhmB2JFKPwjidK3niizlD9NBbqOQMfcMbd8qDH3Rcq2VbG9KPE55dZ8WMmkr9RfdA2cEKswW7oeQbJzdXyucFiXJogbTnUVq'
  }
];

export default function DiseaseLibrary() {
  const router = useRouter();
  const { language } = useAppStore();
  const t = createT(language);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');

  useEffect(() => { setMounted(true); }, []);

  const crops = ['All', 'Tomato', 'Potato', 'Corn', 'Rice', 'Wheat'];

  const filteredDiseases = diseases.filter(d => {
    const matchesSearch = d.name.en.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           d.name.kn.includes(searchTerm) || 
                           d.name.hi.includes(searchTerm);
    const matchesCrop = selectedCrop === 'All' || d.crop.en === selectedCrop;
    return matchesSearch && matchesCrop;
  });

  if (!mounted) return null;

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] min-h-screen flex flex-col font-[var(--font-inter)]">
      {/* Premium Header */}
      <header className="sticky top-0 w-full z-50 glass px-6 py-5 flex justify-between items-center border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-black tracking-tight text-[#065f46] font-[var(--font-outfit)]">{t('library.title')}</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400">
          <span className="material-symbols-outlined">info</span>
        </button>
      </header>

      <main className="flex-grow px-6 py-8 space-y-8 pb-40 max-w-4xl mx-auto w-full">
        {/* Search Bar - Modern Glassmorphism */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-600">
            <span className="material-symbols-outlined text-slate-400">search</span>
          </div>
          <input 
            className="w-full pl-14 pr-6 py-4.5 rounded-3xl border-2 border-slate-100 bg-white shadow-premium focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/5 outline-none text-[16px] font-medium transition-all" 
            placeholder={t('library.search')}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Pills - Modernized */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {crops.map(crop => (
            <motion.button 
              key={crop}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCrop(crop)}
              className={`${
                selectedCrop === crop 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 border-emerald-600' 
                  : 'bg-white text-slate-600 border-slate-100 shadow-sm hover:border-emerald-200'
              } px-6 py-2.5 rounded-full whitespace-nowrap font-black text-xs uppercase tracking-widest border-2 transition-all`}
            >
              {crop === 'All' ? t('library.all') : crop}
            </motion.button>
          ))}
        </div>

        {/* Disease List - Premium Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredDiseases.map((disease, idx) => (
              <motion.div 
                layout
                key={disease.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white border border-slate-100 rounded-[32px] p-4 flex items-center gap-5 hover:border-emerald-200 transition-all shadow-premium group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-2xl bg-slate-50 flex-shrink-0 overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <img className="w-full h-full object-cover" src={disease.img} alt={disease.name.en} />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-black text-lg text-slate-800 tracking-tight leading-tight mb-1 truncate">
                    {disease.name[language] || disease.name.en}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                    <span>{disease.crop[language] || disease.crop.en}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span>{disease.type[language] || disease.type.en}</span>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.15em] shrink-0 ${
                  disease.severity === 'High' ? 'bg-red-50 text-red-600' : 
                  disease.severity === 'Mod' ? 'bg-amber-50 text-amber-600' : 
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  {disease.severity}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* Stats Footer - Elegant */}
        <div className="pt-10 text-center space-y-4">
          <div className="inline-flex items-center px-6 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            {t('library.showing').replace('{count}', filteredDiseases.length.toString()).replace('{total}', '38')}
          </div>
          <p className="text-xs text-slate-300 font-medium px-10">
            Can't find what you're looking for? Try searching by symptoms or ask Dr. Somanna in the chat.
          </p>
        </div>
      </main>
    </div>
  );
}
