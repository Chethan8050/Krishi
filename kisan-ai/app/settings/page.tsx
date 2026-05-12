'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] font-body-md min-h-screen flex flex-col pb-24">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-[#f9f9f9] border-b border-[#c0c9bb]">
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="material-symbols-outlined text-[#41493e] hover:bg-[#f3f3f4] transition-colors p-1 rounded-full">arrow_back</button>
          <h1 className="font-bold text-[24px] text-[#00450d]">Settings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-margin-mobile py-lg space-y-xl max-w-2xl mx-auto w-full pb-32">
        {/* Profile Card */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg flex items-center gap-lg shadow-sm">
          <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center shadow-lg relative">
            <span className="material-symbols-outlined text-on-primary-container text-[40px]">person</span>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary border-2 border-surface rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[12px]">edit</span>
            </div>
          </div>
          <div>
            <h2 className="text-headline-lg-mob font-bold text-primary leading-tight">Preetham S M</h2>
            <p className="text-body-md text-on-surface-variant opacity-80">Farmer ID: #44021</p>
            <div className="flex items-center gap-xs mt-1 text-secondary font-bold text-label-sm">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Verified Professional
            </div>
          </div>
        </section>

        {/* Settings Groups */}
        <div className="space-y-lg">
          {/* General Section */}
          <section>
            <h3 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-widest mb-md px-1">General Settings</h3>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl divide-y divide-outline-variant shadow-sm overflow-hidden">
              {[
                { icon: 'language', label: 'App Language', value: 'English', action: () => router.push('/language') },
                { icon: 'notifications_active', label: 'Notifications', value: 'Enabled', toggle: true, active: true },
                { icon: 'dark_mode', label: 'Dark Mode', value: 'Off', toggle: true, active: false },
                { icon: 'location_on', label: 'Field Location', value: 'Hassan, Karnataka' },
              ].map((item, idx) => (
                <div key={idx} onClick={item.action} className="flex items-center justify-between p-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px]">{item.icon}</span>
                    </div>
                    <span className="font-bold text-body-md text-on-surface">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-base">
                    {item.toggle ? (
                      <div className={`w-11 h-6 rounded-full relative p-1 shadow-inner transition-colors ${item.active ? 'bg-primary/20' : 'bg-outline-variant/40'}`}>
                        <div className={`w-4 h-4 rounded-full absolute top-1 shadow-md transition-all ${item.active ? 'bg-primary right-1' : 'bg-on-surface-variant left-1'}`}></div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-xs">
                        <span className="text-label-sm font-medium text-on-surface-variant opacity-60">{item.value}</span>
                        <span className="material-symbols-outlined text-on-surface-variant opacity-40">chevron_right</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Account & Safety Section */}
          <section>
            <h3 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-widest mb-md px-1">Account & Safety</h3>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl divide-y divide-outline-variant shadow-sm overflow-hidden">
              {[
                { icon: 'security', label: 'Data Privacy', color: 'text-on-surface' },
                { icon: 'contact_support', label: 'Get Help', color: 'text-on-surface' },
                { icon: 'logout', label: 'Logout', color: 'text-error' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className={`material-symbols-outlined text-[20px] ${item.color}`}>{item.icon}</span>
                    </div>
                    <span className={`font-bold text-body-md ${item.color}`}>{item.label}</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant opacity-40">chevron_right</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer info */}
        <div className="text-center py-xl">
          <div className="inline-flex items-center gap-base mb-base">
            <span className="material-symbols-outlined text-primary text-[20px]">eco</span>
            <span className="font-bold text-primary tracking-widest uppercase text-label-bold">KisanAI</span>
          </div>
          <p className="text-label-sm text-on-surface-variant opacity-60">Handcrafted for Bharat • © 2024</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
