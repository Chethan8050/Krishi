'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';

const diseases = [
  { name: 'Tomato Early Blight', crop: 'Tomato', type: 'Fungal', severity: 'High', severityClass: 'bg-[#ffdad6] text-[#93000a]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOO86QrnrxoggxUhU8UGQPMpcKYHxx5cigKvOuEFwUMn1FzcijbWJQ-96-19cmnDtSgMvrjgrk9Xi_GubkxkJCL2GqQzA798wHIZjZCt_iVUd5NqRBZNZs5cvOt-QIHtfbNTfoNOAF09PLVzU8eF1wvU4PX-_WOCmFqprlxN5WtuG8oYMKoBjq3ij4THkFFQ4FJjVCjYJr-wdGalFuHJV7ExM4_67tnWPEfIy6s3vDJOe5utmr1UAzXll-GQPHNSaPRfm_ism5NrLC' },
  { name: 'Potato Late Blight', crop: 'Potato', type: 'Oomycete', severity: 'High', severityClass: 'bg-[#ffdad6] text-[#93000a]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDebG_M-I5g05_diUoPFR3sAij4wluJf6NgC8KPYcqvP12Di0GZGMBhWM5fPykGq_DipHSRrZyJ3wruEAlZsB98-x7_Fo-RRUe5ZQGg7PZGkOEQtBWNn0p-Tf6KjUeT0FyWo_NhEjCGJ7Jini6yRuJ-B-Sc0MenOpBlcSaAKa1MRMY_GhPg8xttqgliJTzH9uAFi1uJA6tO3VRYB6f3tZfNxKOp8sEeYcxfv2Om9CjE5kcriwz4lyON-__hyPmuyqR0XaGZ0_CoPFo8' },
  { name: 'Corn Leaf Spot', crop: 'Corn', type: 'Fungal', severity: 'Mod', severityClass: 'bg-[#ffdcc6] text-[#311300]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFK4hZSss2bI3unjWw8D2HdM3AoCETmP-YIctZzaI5mW1HlOffGZnxkFmwQpy5xtHGsPfkCbriBZNARMS0smj5u-HKEstKZCU7gXnpblRpw4UJ4pSPAru6W6_HDR7gLy9vTsepX2RoJXe0QL1yNZBL9U9he5CcF14gc3AApaP6g5-_4xDmIp9Xk0vhl7mTzT5tO-5Hoqk35yK3ZxPc62uPpQsvUPNq6DT7Fe_u4nEJm1Xn6-w9ckJEp6YlaYFEc1Un_R8bHPWlcY98' },
  { name: 'Rice Leaf Streak', crop: 'Rice', type: 'Bacterial', severity: 'Mod', severityClass: 'bg-[#ffdcc6] text-[#311300]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnWpwEFVek2hj23w5ZsfJjkOsWoLFZyQRORfnExSgV3ejTYE6Ux7ST4f_PRyIpdoVUAzHWoiAKXhSXCdGICNtgxsdUEnxAE1vBYBQ4XCyPNjb24MJ7Ni-xi7yKMWO_iDfjFwwXyeH6vuAlrS5y1_x9QrJzzHBHWQnltMBcA3KS3NcI3ypkCBX0rxXBs_Yz2p53k2Xag_CwLIvxdXf05TjfYA-tFDgShGqboB1EB5a9mi4b6EdROgZhGfntViTV3XJtmM6EupyH0YKk' },
  { name: 'Wheat Head Blight', crop: 'Wheat', type: 'Fungal', severity: 'Low', severityClass: 'bg-[#bdefbe] text-[#426e47]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhmlBry79arVz41vppXSrrvYPRZMXv2v61ACdRtoG-2KOh9iHPKMNElqNPD9pgmMTqHrrXfM2-rq-cDqkKz5VyisyVeobt6ti_0tebpvacZn3qyZaytWQMiVnPvN_f4BJ0V7H19viQtDFMO0qTPBU6-ID6RRqjmkKr0_ePOhDi0tByBhmB2JFKPwjidK3niizlD9NBbqOQMfcMbd8qDH3Rcq2VbG9KPE55dZ8WMmkr9RfdA2cEKswW7oeQbJzdXyucFiXJogbTnUVq' },
];

const filters = ['All', 'Tomato', 'Potato', 'Corn', 'Rice', 'Wheat'];

export default function LibraryPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = diseases.filter(d =>
    (activeFilter === 'All' || d.crop === activeFilter) &&
    (search === '' || d.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-white min-h-screen text-[#1a1c1c]">
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#f9f9f9] border-b border-[#c0c9bb]">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="material-symbols-outlined text-[#00450d] active:opacity-80 transition-opacity">arrow_back</button>
          <h1 className="font-bold text-[24px] text-[#00450d]">Disease Library</h1>
        </div>
        <button className="material-symbols-outlined text-[#00450d]">language</button>
      </header>

      <main className="max-w-3xl mx-auto px-margin-mobile py-lg pb-32">
        {/* Search */}
        <div className="relative mb-xl group">
          <div className="absolute inset-y-0 left-md flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-on-surface-variant opacity-60 group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-12 bg-surface-container-low border-outline-variant focus:border-primary shadow-sm"
            placeholder="Search disease or crop..."
            type="text"
          />
        </div>

        {/* Categories Grid (New) */}
        <section className="mb-xl">
          <h3 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-widest mb-md px-1">Specialties</h3>
          <div className="grid grid-cols-2 gap-md">
            {[
              { label: 'Fungal', icon: 'scuba_diving', color: 'bg-secondary-container text-on-secondary-container' },
              { label: 'Bacterial', icon: 'biotech', color: 'bg-tertiary-container text-on-tertiary-container' },
              { label: 'Viral', icon: 'coronavirus', color: 'bg-error-container text-on-error-container' },
              { label: 'Nutrients', icon: 'science', color: 'bg-primary-container text-on-primary-container' },
            ].map((cat, idx) => (
              <div key={idx} className={`${cat.color} p-lg rounded-2xl flex flex-col items-center gap-base shadow-sm active:scale-95 transition-transform cursor-pointer border border-black/5`}>
                <span className="material-symbols-outlined text-[32px]">{cat.icon}</span>
                <span className="font-bold text-label-bold">{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Filter Pills */}
        <div className="flex gap-sm overflow-x-auto pb-lg scrollbar-hide">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-8 py-2 rounded-full whitespace-nowrap font-bold text-label-bold transition-all border shadow-sm ${activeFilter === f ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Disease List */}
        <section className="space-y-md">
          <div className="flex justify-between items-center px-1 mb-md">
            <h3 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-widest">Reports ({filtered.length})</h3>
            <span className="text-label-sm font-medium text-on-surface-variant opacity-60">Showing {filtered.length} of 38</span>
          </div>
          {filtered.map(d => (
            <Link key={d.name} href={`/library/${d.name.toLowerCase().replace(/ /g, '-')}`}
              className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-md flex items-center gap-md hover:bg-surface-container-low transition-all active:scale-[0.98] shadow-sm group">
              <div className="w-24 h-24 rounded-xl bg-surface-container flex-shrink-0 overflow-hidden shadow-inner">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={d.img} alt={d.name} />
              </div>
              <div className="flex-grow min-w-0 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-body-lg text-primary truncate group-hover:text-primary-container transition-colors">{d.name}</h3>
                  <p className="text-label-sm text-on-surface-variant opacity-70">{d.crop} • {d.type}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${d.severityClass} px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-sm`}>{d.severity}</span>
                  <span className="material-symbols-outlined text-on-surface-variant opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
