'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DiseaseDetailPage() {
  const router = useRouter();

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen pb-32">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#f9f9f9] border-b border-[#c0c9bb]">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-[#00450d] hover:bg-[#f3f3f4] transition-colors p-1 active:opacity-80 rounded-full">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-bold text-[24px] text-[#00450d]">Disease Info</h1>
        </div>
        <button className="text-[#00450d] hover:bg-[#f3f3f4] transition-colors p-1 active:opacity-80 rounded-full">
          <span className="material-symbols-outlined">bookmark</span>
        </button>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="bg-[#E8F5E9] p-4 md:p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-[#c0c9bb]">
            <span className="material-symbols-outlined text-[#00450d] text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>coronavirus</span>
          </div>
          <h2 className="font-bold text-[32px] text-[#00450d] mb-1">Tomato Early Blight</h2>
          <p className="text-[16px] italic text-[#41493e] mb-4">Alternaria solani</p>
          <div className="flex gap-3">
            <span className="bg-[#1b5e20] text-[#90d689] px-4 py-1 rounded-full font-medium text-[12px]">Fungal</span>
            <span className="bg-[#823f00] text-[#ffb481] px-4 py-1 rounded-full font-medium text-[12px]">Moderate risk</span>
          </div>
        </section>

        {/* Tabs */}
        <nav className="flex border-b border-[#c0c9bb] sticky top-[56px] bg-[#f9f9f9] z-40">
          <button className="flex-1 py-4 font-bold text-[14px] text-[#00450d] border-b-2 border-[#00450d]">Overview</button>
          <button className="flex-1 py-4 font-bold text-[14px] text-[#41493e] hover:bg-[#f3f3f4] transition-colors">Treatment</button>
          <button className="flex-1 py-4 font-bold text-[14px] text-[#41493e] hover:bg-[#f3f3f4] transition-colors">Prevention</button>
        </nav>

        {/* Content Canvas */}
        <div className="p-4 space-y-8">
          {/* Bento Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What is it? */}
            <div className="bg-white border border-[#c0c9bb] p-4 rounded-xl shadow-sm md:col-span-2">
              <h3 className="font-semibold text-[20px] text-[#00450d] mb-3">What is it?</h3>
              <div className="bg-[#bdefbe]/20 p-4 rounded-lg mb-4 flex gap-4 items-start">
                <span className="material-symbols-outlined text-[#3c6842]" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                <p className="text-[16px] text-[#41493e] leading-relaxed">
                  Early blight is a common fungal disease that affects tomatoes, potatoes, and peppers. It primarily targets older leaves first, creating concentric "target" spots that eventually lead to leaf drop and reduced fruit yield.
                </p>
              </div>
            </div>

            {/* Affected Crops */}
            <div className="bg-white border border-[#c0c9bb] p-4 rounded-xl">
              <h3 className="font-semibold text-[20px] text-[#00450d] mb-4">Affected Crops</h3>
              <div className="flex gap-4">
                {[
                  { icon: 'nutrition', name: 'Tomato' },
                  { icon: 'egg', name: 'Potato' },
                  { icon: 'potted_plant', name: 'Pepper' }
                ].map(c => (
                  <div key={c.name} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#e2e2e2] rounded-full flex items-center justify-center mb-1">
                      <span className="material-symbols-outlined text-[#41493e]">{c.icon}</span>
                    </div>
                    <span className="font-medium text-[12px]">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            <div className="bg-white border border-[#c0c9bb] p-4 rounded-xl">
              <h3 className="font-semibold text-[20px] text-[#00450d] mb-3">Symptoms</h3>
              <ul className="space-y-3">
                {[
                  'Dark brown spots with concentric rings.',
                  'Yellowing of leaves around the dark spots.',
                  'Premature defoliation of lower canopy.'
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#00450d] text-[20px]">check_circle</span>
                    <span className="text-[16px] text-[#41493e]">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Season Risk Chart */}
            <div className="bg-white border border-[#c0c9bb] p-4 rounded-xl md:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-[20px] text-[#00450d]">Season Risk</h3>
                <span className="font-medium text-[12px] text-[#41493e]">Risk Level per Month</span>
              </div>
              <div className="flex items-end justify-between h-32 gap-1">
                {[
                  { m: 'JAN', h: '20%', c: 'bg-[#bdefbe]' },
                  { m: 'FEB', h: '30%', c: 'bg-[#bdefbe]' },
                  { m: 'MAR', h: '40%', c: 'bg-[#bdefbe]' },
                  { m: 'APR', h: '60%', c: 'bg-[#823f00]' },
                  { m: 'MAY', h: '85%', c: 'bg-[#ba1a1a]' },
                  { m: 'JUN', h: '95%', c: 'bg-[#ba1a1a]' },
                  { m: 'JUL', h: '90%', c: 'bg-[#ba1a1a]' },
                  { m: 'AUG', h: '70%', c: 'bg-[#823f00]' },
                  { m: 'SEP', h: '45%', c: 'bg-[#bdefbe]' },
                  { m: 'OCT', h: '30%', c: 'bg-[#bdefbe]' },
                  { m: 'NOV', h: '20%', c: 'bg-[#bdefbe]' },
                  { m: 'DEC', h: '15%', c: 'bg-[#bdefbe]' },
                ].map(r => (
                  <div key={r.m} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full ${r.c} rounded-t-sm`} style={{ height: r.h }}></div>
                    <span className="text-[10px] font-bold">{r.m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Context Image */}
          <div className="rounded-xl overflow-hidden border border-[#c0c9bb] shadow-sm relative h-48">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZPLko5qaNi9io66V_f39TO_83XzdUXhOnEreHVGZMWxu0J3IQhjlrTh5I5rMhXcxKdmaBxON0Mo5ZXeEK6Cn8qKKAj-ygSiDvJPcg19yMgRYqIh6YtAMKu55lFKH3gbpR4wAMAlFQlVqSnmGiNKioW2Tae6a00UUhQE5aBniDB8soq_ESEZVMsQljL_5BPxslCwyveiIayx_IAi6HZgGB-A4bqvzkCgjMGBoNkzI7bN9rzN3D0Psd2zpt7aJXT2kJynVaolBVZIx8" alt="Disease detail" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white font-medium text-[12px]">Microscopic view of Alternaria solani spores</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#f9f9f9] p-4 border-t border-[#c0c9bb] z-50">
        <Link href="/scan" className="w-full block text-center bg-[#00450d] text-white py-4 rounded-full font-bold text-[24px] shadow-md active:scale-95 transition-transform">
          Scan My Crop Now
        </Link>
      </footer>
    </div>
  );
}
