'use client';
import { useRouter } from 'next/navigation';
import { useAppStore, Language } from '../store/useAppStore';

export default function LanguagePage() {
  const router = useRouter();
  const { language, setLanguage } = useAppStore();

  const handleSelect = (langCode: Language) => {
    setLanguage(langCode);
    router.back();
  };

  const languages = [
    { code: 'en' as Language, flag: '🇬🇧', name: 'English', subtitle: 'English' },
    { code: 'kn' as Language, flag: '🇮🇳', name: 'ಕನ್ನಡ', subtitle: 'Kannada' },
    { code: 'hi' as Language, flag: '🇮🇳', name: 'हिन्दी', subtitle: 'Hindi' },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-surface flex flex-col shadow-xl">
      <header className="p-4 flex items-center justify-between border-b border-outline-variant bg-surface">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center text-on-surface-variant active:bg-surface-container-low rounded-full transition-colors">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <h1 className="font-bold text-label-bold text-primary tracking-widest uppercase">Select Language</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-grow p-6 space-y-4">
        <p className="text-on-surface-variant text-label-sm font-medium mb-2 uppercase tracking-wider px-2">Preferred Language</p>
        <div className="space-y-3">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full h-[80px] flex items-center px-5 rounded-2xl gap-5 cursor-pointer transition-all active:scale-[0.98] border-2 ${
                language === lang.code 
                  ? 'border-primary bg-secondary-container/30 shadow-sm' 
                  : 'border-outline-variant bg-surface-container-lowest hover:border-outline'
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center text-3xl bg-surface-container rounded-full shadow-inner shrink-0">
                {lang.flag}
              </div>
              <div className="flex-grow flex flex-col items-start justify-center">
                <span className={`font-bold text-body-lg ${language === lang.code ? 'text-primary' : 'text-on-surface'}`}>
                  {lang.name}
                </span>
                <span className="text-label-sm text-on-surface-variant opacity-80">{lang.subtitle}</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                language === lang.code ? 'border-primary bg-primary' : 'border-outline'
              }`}>
                {language === lang.code && (
                  <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </main>

      <footer className="p-8 text-center">
        <p className="text-label-sm text-on-surface-variant leading-relaxed">
          You can change this anytime later<br />in the App Settings.
        </p>
      </footer>
    </div>
  );
}
