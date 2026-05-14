'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchScanHistory, type ScanRecord } from '../../lib/supabase';
import { useAppStore } from '../store/useAppStore';
import { createT } from '../../lib/i18n';

export default function HistoryPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { language } = useAppStore();
  const t = createT(language);

  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'disease' | 'healthy'>('all');

  useEffect(() => {
    setMounted(true);
    fetchScanHistory(30).then(data => {
      setScans(data);
      setLoading(false);
    });
  }, []);

  const filtered = scans.filter(s => {
    if (activeFilter === 'all') return true;
    return s.status === activeFilter;
  });

  const totalCount = scans.length;
  const diseaseCount = scans.filter(s => s.status === 'disease').length;
  const healthyCount = scans.filter(s => s.status === 'healthy').length;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    });
  };
  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  if (!mounted) {
    return (
      <div className="bg-[#f9f9f9] min-h-screen flex items-center justify-center">
        <span className="material-symbols-outlined text-[#00450d] text-[48px] animate-spin">sync</span>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] font-body-md min-h-screen flex flex-col pb-32">
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-white border-b border-[#c0c9bb] shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="material-symbols-outlined text-[#00450d] hover:bg-[#f3f3f4] p-1 rounded-full transition-colors">arrow_back</button>
          <h1 className="font-bold text-[24px] text-[#00450d]">{t('history.title')}</h1>
        </div>
        <button className="material-symbols-outlined text-[#00450d] active:opacity-80 transition-opacity">filter_list</button>
      </header>

      <main className="max-w-[480px] mx-auto px-4 pt-6 w-full">
        {/* Filter Tabs */}
        <section className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { key: 'all' as const, label: t('history.total') },
            { key: 'disease' as const, label: t('history.diseases') },
            { key: 'healthy' as const, label: t('history.healthy') },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`font-bold text-[14px] px-8 py-2 rounded-full whitespace-nowrap shadow-sm transition-colors border ${
                activeFilter === f.key
                  ? 'bg-[#00450d] text-white border-[#00450d]'
                  : 'bg-white text-[#41493e] border-[#c0c9bb] hover:bg-[#f3f3f4]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white border border-[#c0c9bb] p-4 rounded-2xl text-center shadow-sm">
            <span className="block font-bold text-[32px] text-[#00450d] leading-tight">{totalCount}</span>
            <span className="block font-medium text-[12px] text-[#41493e] opacity-70 uppercase tracking-widest">{t('history.total')}</span>
          </div>
          <div className="bg-white border border-[#c0c9bb] p-4 rounded-2xl text-center shadow-sm">
            <span className="block font-bold text-[32px] text-[#ba1a1a] leading-tight">{diseaseCount}</span>
            <span className="block font-medium text-[12px] text-[#41493e] opacity-70 uppercase tracking-widest">{t('history.diseases')}</span>
          </div>
          <div className="bg-white border border-[#c0c9bb] p-4 rounded-2xl text-center shadow-sm">
            <span className="block font-bold text-[32px] text-[#3c6842] leading-tight">{healthyCount}</span>
            <span className="block font-medium text-[12px] text-[#41493e] opacity-70 uppercase tracking-widest">{t('history.healthy')}</span>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <span className="material-symbols-outlined text-[#00450d] text-[48px] animate-spin">sync</span>
            <p className="text-[#41493e]">{t('common.loading')}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <span className="material-symbols-outlined text-[#41493e] text-[64px] opacity-30">document_scanner</span>
            <p className="text-[#41493e] text-[18px]">{t('history.noScans')}</p>
            <button 
              onClick={() => router.push('/scan')} 
              className="mt-4 bg-[#00450d] text-white px-8 py-4 rounded-full font-bold shadow-lg active:scale-95 transition-transform flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              {t('dash.scanCrop')}
            </button>
          </div>
        )}

        {/* Scan List */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-4">
            {filtered.map(scan => (
              <Link 
                key={scan.id} 
                href={scan.status === 'disease' ? '/scan/result/disease' : '/scan/result/healthy'}
                className="bg-white border border-[#c0c9bb] rounded-2xl p-4 flex items-center gap-4 hover:bg-[#f3f3f4] transition-all active:scale-[0.98] shadow-sm group"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#f9f9f9] shadow-inner flex items-center justify-center border border-[#c0c9bb]">
                  {scan.image_url ? (
                    <img src={scan.image_url} alt={scan.crop} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <span className="material-symbols-outlined text-[#41493e] text-[32px] opacity-40">eco</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[16px] truncate text-[#00450d] mb-0.5">
                    {scan.crop}{scan.disease ? ` — ${scan.disease}` : ''}
                  </h3>
                  <p className="font-medium text-[12px] text-[#41493e] opacity-70 mb-2">
                    {formatDate(scan.created_at)} • {formatTime(scan.created_at)}
                  </p>
                  <span className={`inline-block text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${
                    scan.status === 'disease' 
                      ? 'bg-[#ffdad6] text-[#93000a]' 
                      : 'bg-[#bdefbe] text-[#426e47]'
                  }`}>
                    {scan.status === 'disease' ? t('common.diseaseDetected') : t('history.healthy')}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#41493e] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">chevron_right</span>
              </Link>
            ))}
          </div>
        )}
      </main>

          </div>
  );
}
