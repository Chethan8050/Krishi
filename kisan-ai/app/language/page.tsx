'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppStore, Language } from '../store/useAppStore';

export default function LanguagePage() {
  const router = useRouter();
  const { language, setLanguage } = useAppStore();

  const handleSelect = (langCode: Language) => {
    setLanguage(langCode);
    setTimeout(() => router.back(), 300);
  };

  const languages = [
    { code: 'en' as Language, icon: '🇺🇸', name: 'English', subtitle: 'English' },
    { code: 'kn' as Language, icon: '🇮🇳', name: 'ಕನ್ನಡ', subtitle: 'Kannada' },
    { code: 'hi' as Language, icon: '🇮🇳', name: 'हिन्दी', subtitle: 'Hindi' },
  ];

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] min-h-screen flex flex-col font-[var(--font-inter)]">
      {/* Premium Header */}
      <header className="sticky top-0 w-full z-50 glass px-6 py-5 flex justify-between items-center border-b border-slate-200/50">
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <h1 className="text-xl font-black tracking-tight text-[#065f46] font-[var(--font-outfit)] uppercase tracking-[0.1em]">Select Language</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-grow p-8 space-y-10 max-w-2xl mx-auto w-full">
        <div className="space-y-2">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">Preferred Language</p>
          <div className="space-y-4">
            {languages.map((lang, idx) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleSelect(lang.code)}
                className={`w-full group flex items-center p-6 rounded-[32px] gap-6 transition-all border-2 ${
                  language === lang.code 
                    ? 'border-emerald-500 bg-white shadow-premium-lg' 
                    : 'border-slate-100 bg-white hover:border-emerald-200 shadow-sm'
                }`}
              >
                <div className={`w-14 h-14 flex items-center justify-center text-2xl rounded-2xl transition-colors ${
                  language === lang.code ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400'
                }`}>
                  {lang.icon}
                </div>
                <div className="flex-grow text-left">
                  <p className={`text-lg font-black tracking-tight ${language === lang.code ? 'text-[#065f46]' : 'text-slate-800'}`}>
                    {lang.name}
                  </p>
                  <p className="text-sm font-medium text-slate-400">{lang.subtitle}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  language === lang.code ? 'border-emerald-500 bg-emerald-500 scale-110' : 'border-slate-200 bg-transparent'
                }`}>
                  {language === lang.code && (
                    <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 rounded-[32px] p-8 border border-emerald-100/50 flex gap-5">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
              <span className="material-symbols-outlined text-emerald-600">info</span>
           </div>
           <p className="text-sm font-medium text-emerald-800 leading-relaxed">
             This selection will update all text, voice help, and AI expert responses to your preferred language.
           </p>
        </div>
      </main>

      <footer className="p-10 text-center pb-32">
        <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
          You can change this anytime later<br />in the App Settings.
        </p>
      </footer>
    </div>
  );
}
