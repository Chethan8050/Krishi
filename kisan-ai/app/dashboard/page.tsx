'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';

export default function Dashboard() {
  const router = useRouter();
  const quickActions = [
    { icon: 'document_scanner', label: 'Scan Crop', href: '/scan' },
    { icon: 'map', label: 'Disease Map', href: '/community' },
    { icon: 'timeline', label: 'Health Track', href: '/timeline' },
    { icon: 'bar_chart', label: 'Yield Predict', href: '/yield' },
  ];

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#1b5e20] text-white border-b border-[#c0c9bb]">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
          <h1 className="text-[20px] font-extrabold tracking-tight">KisanAI</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-[12px] font-medium text-white">EN</span>
            <span className="material-symbols-outlined text-white text-[16px]">expand_more</span>
          </div>
          <Link href="/alerts"><span className="material-symbols-outlined text-white">notifications</span></Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-8 pb-32">
        {/* Greeting Card */}
        <section className="bg-[#bdefbe] rounded-xl p-4 flex flex-col gap-1 cursor-pointer active:scale-[0.99] transition-transform" onClick={() => router.push('/alerts/weather')}>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-[24px] leading-[32px] text-[#426e47]">Good Morning, Farmer 👋</h2>
              <p className="text-[16px] text-[#41493e]">Mandya, Karnataka • Today: May 22</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="material-symbols-outlined text-[#426e47] text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>sunny</span>
              <p className="font-bold text-[14px] text-[#426e47]">32°C Sunny</p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-4">
          <h3 className="font-bold text-[14px] text-[#1a1c1c] uppercase tracking-wider">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map(({ icon, label, href }) => (
              <Link key={label} href={href} className="bg-white border border-[#c0c9bb] rounded-xl h-[80px] flex items-center px-4 gap-3 active:scale-95 transition-transform">
                <div className="w-10 h-10 rounded-full bg-[#bdefbe] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#426e47]">{icon}</span>
                </div>
                <span className="font-bold text-[14px] text-[#1a1c1c]">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Scans */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-[14px] text-[#1a1c1c] uppercase tracking-wider">Recent Scans</h3>
            <Link href="/history" className="text-[#00450d] font-bold text-[12px]">View All</Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-1" style={{ scrollbarWidth: 'none' }}>
            {[
              { name: 'Tomato', status: 'HEALTHY', statusClass: 'bg-[#bdefbe] text-[#426e47]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFd3o2a6IIT39wUnX9m6HiLScN4q7iwM1-XWkixMRttqUVwGSaH9pvKfectR8tcOZiLMKdFGK3FNvOlod5UcorrS5del_B1uXD50JvPsHMO1rfFI69nbBOjbknQJfXhz4OGU3PmEyVUs7mrc1mJAq3ZNzeq0wriShrqRGNdxOTHZa-aB5vdvCrDKztrOydGqV-erEDsGn2wge6VgHx6vA-ke0LlWX8tepMf8tQXxJfR3_zY1G2mHvpyZfnzXUzrqu7V2V-D8J9xpds' },
              { name: 'Potato', status: 'Blight Detected', statusClass: 'bg-[#ffdad6] text-[#93000a]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaS6oodAWbUCSHHtUijT5UHjBVQdmUQkDFjTvka5JIemiqarVuSosUvw2VqSV1UfMGWjr79cXoE86qOAGGhwIi2DnUGdxdhIuESg8fC-InpyZ_hNR3TfF6T9RCfeO3ONFDMLUhHL14HD3nuESkHwz7blaM8IkhMKP-4VT6KrcnQt4ZtIM7mwptsv7zhS9u-ur6hXMFUuAWcbEuGYFU6uAbDeSj1gRfx6ZEb6rlHuwdkPeVSfdqaOCc9SZxIAiJIBZ1E4RTwp8ub5Rt' },
              { name: 'Maize', status: 'HEALTHY', statusClass: 'bg-[#bdefbe] text-[#426e47]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAinPiXQbbcNvaUzDmEjkE4hBqtPArABnwk6Ja2U-M7cIJrrnX3oGNPXX3t7ZZCk7jZI-olTPSYemz7fFmryvYmveGz4A9rbv-6whhHOI6DiJTf9i7xTG-9c60y433DPzhNZEl_cmibPZmipLbawTeO3f9AjmJw8cqAavAvT7daLhAHdj43WuJn4Jndo3AY0N1o8TvXJbT03PlJGZTW8Ya6dEyqdEpcYbssp5dPPnSARh-dz3XEvwIiglnVHjDaeD3QrVWKEz8b0mjX' },
            ].map(scan => (
              <div key={scan.name} className="min-w-[140px] bg-white border border-[#c0c9bb] rounded-xl overflow-hidden flex flex-col">
                <img src={scan.img} alt={scan.name} className="h-24 w-full object-cover" />
                <div className="p-1 space-y-1">
                  <p className="font-bold text-[12px] text-[#1a1c1c] truncate">{scan.name}</p>
                  <span className={`${scan.statusClass} text-[10px] px-1 py-0.5 rounded-full inline-block font-bold`}>{scan.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Insight */}
        <section className="bg-[#1b5e20] p-4 rounded-xl text-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white">psychology</span>
          </div>
          <div>
            <p className="font-bold text-[14px]">AI Insight</p>
            <p className="text-[16px] text-white/80">Weather conditions are ideal for harvesting wheat this week.</p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
