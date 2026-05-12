'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] font-body-md min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#f9f9f9] border-b border-[#c0c9bb]">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="material-symbols-outlined text-[#00450d] hover:bg-[#f3f3f4] transition-colors rounded-full p-2">arrow_back</button>
          <h1 className="font-bold text-[24px] text-[#00450d]">About KisanAI</h1>
        </div>
        <button className="material-symbols-outlined text-[#00450d] hover:bg-[#f3f3f4] transition-colors rounded-full p-2">language</button>
      </header>

      <main className="flex-grow max-w-screen-xl mx-auto w-full px-margin-mobile pt-lg pb-32">
        {/* Branding Block */}
        <section className="flex flex-col items-center text-center mb-xl">
          <div className="w-28 h-28 bg-primary-container rounded-full flex items-center justify-center mb-md shadow-lg">
            <span className="material-symbols-outlined text-on-primary-container text-[56px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
          </div>
          <h2 className="text-display-lg text-primary mb-xs">KisanAI</h2>
          <p className="text-body-lg text-on-surface-variant">Your AI-powered crop doctor.</p>
        </section>

        {/* Impact Stats Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col items-center text-center shadow-sm">
            <span className="material-symbols-outlined text-primary mb-base">coronavirus</span>
            <p className="font-bold text-[40px] text-primary leading-none mb-xs">38</p>
            <p className="text-label-bold text-on-surface-variant uppercase tracking-wide">Diseases Detected</p>
          </div>
          <div className="bg-secondary-container border border-outline-variant rounded-xl p-md flex flex-col items-center text-center shadow-sm">
            <span className="material-symbols-outlined text-on-secondary-container mb-base">translate</span>
            <p className="font-bold text-[40px] text-on-secondary-container leading-none mb-xs">3</p>
            <p className="text-label-bold text-on-secondary-container uppercase tracking-wide">Languages</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col items-center text-center shadow-sm">
            <span className="material-symbols-outlined text-tertiary mb-base">payments</span>
            <p className="font-bold text-[40px] text-tertiary leading-none mb-xs">₹0</p>
            <p className="text-label-bold text-on-surface-variant uppercase tracking-wide">Total Cost</p>
          </div>
        </section>

        {/* Structured Sections */}
        <div className="space-y-md">
          {/* Built For */}
          <section className="bg-primary text-on-primary rounded-2xl p-lg overflow-hidden relative shadow-md">
            <div className="relative z-10">
              <div className="flex items-center gap-base mb-md">
                <span className="material-symbols-outlined text-white">volunteer_activism</span>
                <h3 className="text-title-md text-white">Our Mission</h3>
              </div>
              <p className="text-body-md text-white opacity-90 leading-relaxed">
                Dedicated to the betterment of Indian farmers, KisanAI leverages state-of-the-art computer vision to bridge the gap between agricultural expertise and local fields. Our mission is to ensure every farmer has a digital doctor in their pocket to secure their livelihood and increase yield.
              </p>
            </div>
            <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-[160px] text-white opacity-10 rotate-12">agriculture</span>
          </section>

          {/* Built With */}
          <section className="bg-surface-container-low rounded-2xl p-lg border border-outline-variant">
            <div className="flex items-center gap-base mb-md">
              <span className="material-symbols-outlined text-primary">architecture</span>
              <h3 className="text-title-md text-primary">Built With</h3>
            </div>
            <div className="flex flex-wrap gap-sm">
              {['TensorFlow', 'PlantVillage Dataset', 'Tailwind CSS', 'Python', 'Next.js'].map(tech => (
                <span key={tech} className="bg-surface-container-highest text-on-surface px-4 py-1.5 rounded-full text-label-bold border border-outline-variant">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Team */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm">
            <div className="flex items-center gap-base mb-lg">
              <span className="material-symbols-outlined text-primary">groups</span>
              <h3 className="text-title-md text-primary">The Team</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              {[
                { name: 'Preetham S M', role: 'Lead Developer' },
                { name: 'Rohit Gowda', role: 'AI Researcher' }
              ].map(member => (
                <div key={member.name} className="flex items-center gap-md p-3 hover:bg-surface-container-low rounded-xl transition-colors border border-transparent hover:border-outline-variant">
                  <div className="w-14 h-14 bg-surface-container rounded-full flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-on-surface-variant text-3xl">person</span>
                  </div>
                  <div>
                    <p className="font-bold text-body-md text-on-surface">{member.name}</p>
                    <p className="text-label-sm text-on-surface-variant">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* App Metadata */}
        <div className="mt-xl pt-lg border-t border-outline-variant text-center space-y-md">
          <button 
            onClick={() => router.push('/install')} 
            className="btn btn-primary btn-full py-4 shadow-lg flex items-center justify-center gap-base active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">download_for_offline</span>
            Install Offline App
          </button>
          <p className="text-label-sm text-on-surface-variant opacity-70">Version 1.2.0 • Build 2024.10</p>
        </div>
      </main>

      <footer className="mb-32 flex justify-center pb-4">
        <p className="text-label-bold text-on-surface-variant">Made with ❤️ for Indian farmers.</p>
      </footer>

      <BottomNav />
    </div>
  );
}
