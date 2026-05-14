'use client';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { createT, type LangCode } from '../../../lib/i18n';

// Map our app language codes to Web Speech API lang codes
const speechLangMap: Record<LangCode, string> = {
  en: 'en-IN',
  kn: 'kn-IN',
  hi: 'hi-IN',
};

export default function VoiceDiagnosisPage() {
  const router = useRouter();
  const { language } = useAppStore();
  const t = createT(language);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [activeLang, setActiveLang] = useState<LangCode>(language);
  const [error, setError] = useState('');
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [typedText, setTypedText] = useState('');

  const recognitionRef = useRef<any>(null);

  // ── Check browser support ──
  const isSpeechSupported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // ── Initialize recognition ──
  const initRecognition = useCallback(() => {
    if (!isSpeechSupported) return null;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = speechLangMap[activeLang];

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setTranscript(final || interim);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech error:', event.error);
      if (event.error === 'no-speech') {
        setError(t('voice.noSpeech'));
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return recognition;
  }, [activeLang, isSpeechSupported, t]);

  // ── Toggle listening ──
  const toggleListening = () => {
    setError('');
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = initRecognition();
    if (!recognition) {
      setError('Speech recognition not supported in this browser.');
      return;
    }

    recognitionRef.current = recognition;
    recognition.lang = speechLangMap[activeLang];
    recognition.start();
    setIsListening(true);
    setTranscript('');
  };

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  // ── Analyse the transcript ──
  const handleAnalyse = () => {
    const text = showTypeInput ? typedText : transcript;
    if (!text.trim()) return;
    
    // Store the voice description and navigate to a results summary
    // For now we'll do a keyword-based disease match
    const diseaseKeywords: Record<string, string[]> = {
      'Early blight': ['yellow', 'brown spots', 'leaf spots', 'ಹಳದಿ', 'ಕಂದು', 'पीला', 'भूरे धब्बे'],
      'Late blight': ['black', 'rotting', 'dark patches', 'ಕಪ್ಪು', 'ಕೊಳೆ', 'काला', 'सड़ना'],
      'Powdery mildew': ['white powder', 'white spots', 'ಬಿಳಿ ಪುಡಿ', 'सफ़ेद पाउडर'],
      'Leaf curl': ['curling', 'twisted', 'ಮಡಿಸು', 'ಸುರುಳಿ', 'मुड़ना', 'मरोड़'],
      'Bacterial spot': ['spots', 'water soaked', 'ಕಲೆ', 'धब्बे'],
      'Mosaic virus': ['mosaic', 'pattern', 'ಮೊಸಾಯಿಕ್', 'मोज़ेक'],
    };

    const lowerText = text.toLowerCase();
    let matchedDisease = 'Unknown issue';
    let bestScore = 0;

    for (const [disease, keywords] of Object.entries(diseaseKeywords)) {
      const score = keywords.filter(kw => lowerText.includes(kw.toLowerCase())).length;
      if (score > bestScore) {
        bestScore = score;
        matchedDisease = disease;
      }
    }

    // Store result and navigate
    const result = {
      status: bestScore > 0 ? 'disease' : 'disease',
      crop: 'Described Crop',
      disease: bestScore > 0 ? matchedDisease : 'Possible issue detected',
      confidence: bestScore > 0 ? 0.65 : 0.3,
      severity: 'Moderate',
      voiceTranscript: text,
      treatment: [
        'Take a photo of the affected area for accurate AI diagnosis.',
        'Isolate the affected plants if possible.',
        'Apply neem-based organic pesticide as a precaution.',
        'Consult your local Krishi Vigyan Kendra (KVK) for expert advice.',
      ],
    };

    // Use the app store to pass results
    const { setRecentScanResult } = useAppStore.getState();
    setRecentScanResult(result);
    router.push('/scan/result/disease');
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Bar */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-margin-mobile py-base bg-primary text-on-primary shadow-md">
        <div className="flex items-center gap-base">
          <button onClick={() => router.back()} className="p-2 active:opacity-70 transition-opacity rounded-full hover:bg-white/10">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-title-md text-title-md font-bold">{t('voice.title')}</h1>
        </div>
        <div className="flex gap-xs">
          {(['en', 'kn', 'hi'] as LangCode[]).map(lang => (
            <button
              key={lang}
              onClick={() => {
                setActiveLang(lang);
                // Stop current recognition if active and restart with new lang
                if (isListening) {
                  recognitionRef.current?.stop();
                  setIsListening(false);
                }
              }}
              className={`px-3 py-1 rounded-full text-label-sm font-label-bold shadow-sm cursor-pointer transition-colors ${
                activeLang === lang
                  ? 'bg-surface-container-lowest text-primary'
                  : 'bg-primary-container text-on-primary-container hover:bg-primary'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-margin-mobile py-xl flex flex-col items-center">
        {/* Voice Interaction Section */}
        <div className="relative flex items-center justify-center w-full aspect-square max-w-[280px] mb-lg mt-8">
          {/* Pulsing Circles — only when listening */}
          {isListening && (
            <>
              <div className="absolute w-[160px] h-[160px] rounded-full bg-primary/20 animate-ping"></div>
              <div className="absolute w-[200px] h-[200px] rounded-full bg-primary/10 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </>
          )}
          
          {/* Main Mic Button */}
          <button 
            onClick={toggleListening}
            className={`relative z-10 w-[140px] h-[140px] rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-all hover:shadow-2xl ${
              isListening ? 'bg-error' : 'bg-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[48px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isListening ? 'stop' : 'mic'}
            </span>
          </button>
        </div>

        <div className="text-center mb-xl">
          {isListening ? (
            <p className="text-primary font-label-bold text-body-md mb-xs animate-pulse">{t('voice.listening')}</p>
          ) : (
            <p className="text-on-surface-variant font-label-bold text-body-md mb-xs">{t('voice.tapToSpeak')}</p>
          )}
          <p className="text-on-surface-variant italic text-label-sm">{t('voice.speakHint')}</p>
          {!isSpeechSupported && (
            <p className="text-error text-label-sm mt-2">⚠ Speech recognition is not supported in this browser. Try Chrome or Edge.</p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="w-full bg-error-container text-on-error-container p-md rounded-xl mb-md flex items-center gap-sm">
            <span className="material-symbols-outlined">error</span>
            <p className="text-body-md">{error}</p>
          </div>
        )}

        {/* Live Transcript Box */}
        {!showTypeInput && (
          <div className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-md min-h-[120px] mb-xl flex flex-col gap-xs shadow-sm">
            <span className="text-label-sm font-label-bold text-on-surface-variant uppercase tracking-wider">{t('voice.youSaid')}</span>
            {transcript ? (
              <p className="text-on-surface font-title-md text-[20px]">{transcript}</p>
            ) : (
              <p className="text-on-surface-variant italic text-body-md opacity-50">
                {isListening ? '...' : t('voice.tapToSpeak')}
              </p>
            )}
          </div>
        )}

        {/* Type Input (alternative) */}
        {showTypeInput && (
          <div className="w-full mb-xl">
            <textarea
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              placeholder={t('voice.speakHint')}
              className="input-field min-h-[120px] resize-none"
              rows={4}
            />
          </div>
        )}

        {/* Language Instruction Row */}
        <div className="grid grid-cols-3 gap-base w-full mb-xl">
          <div
            onClick={() => { setActiveLang('en'); }}
            className={`border rounded-lg p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              activeLang === 'en' ? 'bg-surface-container-lowest border-2 border-primary shadow-md' : 'bg-surface-container-low border-outline-variant hover:bg-surface-container'
            }`}
          >
            <span className="text-xl mb-1">🇬🇧</span>
            <span className={`text-[11px] font-bold uppercase leading-tight ${activeLang === 'en' ? 'text-primary' : 'text-on-surface'}`}>Say in English</span>
          </div>
          <div
            onClick={() => { setActiveLang('kn'); }}
            className={`border rounded-lg p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              activeLang === 'kn' ? 'bg-surface-container-lowest border-2 border-primary shadow-md' : 'bg-surface-container-low border-outline-variant hover:bg-surface-container'
            }`}
          >
            <span className="text-xl mb-1">🇮🇳</span>
            <span className={`text-[11px] font-bold uppercase leading-tight ${activeLang === 'kn' ? 'text-primary' : 'text-on-surface'}`}>ಕನ್ನಡದಲ್ಲಿ ಹೇಳಿ</span>
          </div>
          <div
            onClick={() => { setActiveLang('hi'); }}
            className={`border rounded-lg p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              activeLang === 'hi' ? 'bg-surface-container-lowest border-2 border-primary shadow-md' : 'bg-surface-container-low border-outline-variant hover:bg-surface-container'
            }`}
          >
            <span className="text-xl mb-1">🇮🇳</span>
            <span className={`text-[11px] font-bold uppercase leading-tight ${activeLang === 'hi' ? 'text-primary' : 'text-on-surface'}`}>हिंदी में बोलें</span>
          </div>
        </div>

        <div className="flex-1"></div>

        {/* Action Buttons */}
        <div className="w-full space-y-md mt-auto mb-8">
          <button
            onClick={handleAnalyse}
            disabled={!transcript.trim() && !typedText.trim()}
            className={`btn btn-primary btn-full py-4 text-body-lg shadow-lg ${
              (!transcript.trim() && !typedText.trim()) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {t('voice.analyseBtn')}
          </button>
          <button
            onClick={() => setShowTypeInput(!showTypeInput)}
            className="w-full border-2 border-outline-variant text-on-surface-variant py-4 rounded-full font-label-bold text-body-lg hover:bg-surface-container-low transition-all active:scale-95"
          >
            {showTypeInput ? t('voice.tapToSpeak') : t('voice.typeInstead')}
          </button>
        </div>
      </main>
    </div>
  );
}
