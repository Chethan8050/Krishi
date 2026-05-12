'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';

const history = [
  { id: 1, name: 'Tomato — Early Blight', date: 'Oct 24, 2023', time: '10:30 AM', status: 'Disease Detected', type: 'disease', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpg3tm4xqES2o3aHw11HossazhODlcpLjY6QT5h3Huou6NdiYq9ZYdOB1-dxQqW_YeiG-ilKSUBKeq1G7sKS0SF61Fj2Xp8j7m_gPvpdY2VdQdwuE3q3sQOelrtXHStOn-3ioLBn69U6RYq2EJhPtwBSLI02bW7bg0OM3fO14O_KbMW0KFhmx2rcttKAw5XCVx_IuFMjoUI7C4deT2AaR8lhtjEkyk4LXLBHE9ty8qEzF9YBdf1y1C49WRq9ZJPjcdh6Lz5cQ34joG' },
  { id: 2, name: 'Maize — Healthy', date: 'Oct 22, 2023', time: '08:15 AM', status: 'Healthy', type: 'healthy', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk8WPf1kiytF-cKC8Nrq0BTMvC2zvAsXrM4s7Pu5G7UsraZfo7bV9gKvwijx3OWms-O-DNNof1S2_LxEkOmb2KYzwQ6VZjpOXjrBCgCUIW9rWu6XdMqXi-rlW_MM5dtzoU1r4OFF0wcdd-k5LbEa9hONFk6ejrGtT2IG_9jYHSTyqRYEtk1Hm1w-cpQmLkUVg0XaL3j6pD8VkZHIgPowelS-u6ZWUJ-5CNLn5jbxo-GEMDxIEooYPzysrMBHMqHl_ofO3SodaWoYe8' },
  { id: 3, name: 'Wheat — Yellow Rust', date: 'Oct 19, 2023', time: '04:45 PM', status: 'Disease Detected', type: 'disease', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf-Gru53m-tnIkUp8k6-SEkdizwUAq2kFgbGwXjYNatc1IJ5ebC3BV-ojDrzfnNrLrEZtaeOVtg4ca7dIBhf1sVbZQtjNyvWgh_DgDOP3PuB4XPPNKrqQET9ULrmv8wYbURRSsJG45vDzX7aElXA1BnfGyQQ_WRmQazlA_yR8mHa5vU7n8Kmty5JtDrpax_BwK3p7fr51ufw1ZNUmq9lNXyeS5dagu0uMAsimMEtt49SHrc0zeoYGkJgSAsFtFX2YxVgMWhg89ShLg' },
  { id: 4, name: 'Potato — Healthy', date: 'Oct 15, 2023', time: '11:20 AM', status: 'Healthy', type: 'healthy', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8IYNv39Xfkc-BWo3bYSFV8nOzX48tqF7Q3ACOf-nxy5Cyyz-nJ4P8Q2VLjS_6BiYClH1zuzDrD_u-i8BpGTfqse4ihiuYxZ70lRLzuBK-cqJQ8GK4NsNWmdFOw3OViBemR6hiGhbOp-clxBi7PmDv6rzlXd3tg41BG8isqC15w1x9V43qOtgDmbHDZIWICV7Ytfj4smpDPonXnCDWz1XiFGZ-AVKaeXiOIqi-S0edfZlpJVdQ3n_tUav__CkR7IgEGYY1su2sLgtS' },
];

export default function HistoryPage() {
  const router = useRouter();

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen font-body-md pb-32">
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#f9f9f9] border-b border-[#c0c9bb]">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="material-symbols-outlined text-[#00450d] active:opacity-80 transition-opacity">arrow_back</button>
          <h1 className="font-bold text-[24px] text-[#00450d]">My Scan History</h1>
        </div>
        <button className="material-symbols-outlined text-[#00450d] active:opacity-80 transition-opacity">filter_list</button>
      </header>

      <main className="max-w-[480px] mx-auto px-margin-mobile pt-lg">
        {/* Filter Tabs */}
        <section className="flex gap-sm mb-lg overflow-x-auto pb-base scrollbar-hide">
          <button className="bg-primary text-on-primary font-bold text-label-bold px-8 py-2 rounded-full whitespace-nowrap shadow-sm">All</button>
          <button className="bg-surface-container-high text-on-surface-variant font-bold text-label-bold px-8 py-2 rounded-full whitespace-nowrap hover:bg-surface-container-highest transition-colors">Diseases</button>
          <button className="bg-surface-container-high text-on-surface-variant font-bold text-label-bold px-8 py-2 rounded-full whitespace-nowrap hover:bg-surface-container-highest transition-colors">Healthy</button>
          <button className="bg-surface-container-high text-on-surface-variant font-bold text-label-bold px-8 py-2 rounded-full whitespace-nowrap hover:bg-surface-container-highest transition-colors">Recent</button>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-3 gap-sm mb-xl">
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-2xl text-center shadow-sm">
            <span className="block font-bold text-[32px] text-primary leading-tight">12</span>
            <span className="block font-medium text-label-sm text-on-surface-variant opacity-70">Total</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-2xl text-center shadow-sm">
            <span className="block font-bold text-[32px] text-error leading-tight">3</span>
            <span className="block font-medium text-label-sm text-on-surface-variant opacity-70">Diseases</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-2xl text-center shadow-sm">
            <span className="block font-bold text-[32px] text-secondary leading-tight">9</span>
            <span className="block font-medium text-label-sm text-on-surface-variant opacity-70">Healthy</span>
          </div>
        </section>

        {/* List */}
        <div className="space-y-md">
          {history.map(item => (
            <Link key={item.id} href={item.type === 'disease' ? '/scan/result/disease' : '/scan/result/healthy'}
              className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-md flex items-center gap-md hover:bg-surface-container-low transition-all active:scale-[0.98] shadow-sm group">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container shadow-inner">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-title-md truncate text-primary mb-0.5">{item.name}</h3>
                <p className="font-medium text-label-sm text-on-surface-variant opacity-70 mb-2">{item.date} • {item.time}</p>
                <span className={`inline-block text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${
                  item.type === 'disease' ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'
                }`}>
                  {item.status}
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">chevron_right</span>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
