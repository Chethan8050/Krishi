'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push('/dashboard'), 3500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main 
      className="relative h-screen w-full flex flex-col items-center justify-center bg-[#064e3b] overflow-hidden"
      onClick={() => router.push('/dashboard')}
    >
      {/* Background Animated Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 circuit-pattern pointer-events-none" 
      />
      
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -10, 10, 0]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        >
          <span 
            className="material-symbols-outlined text-[80px] text-[#065f46]" 
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            eco
          </span>
        </motion.div>

        <div className="text-center space-y-2">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl font-black text-white tracking-tighter font-[var(--font-outfit)]"
          >
            KisanAI
          </motion.h1>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-emerald-200/80 text-sm font-medium tracking-[0.2em] uppercase"
          >
            Your Smart Crop Doctor
          </motion.p>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-16 w-full max-w-[240px] px-4 space-y-4">
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="h-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
          />
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] text-center text-white/50 font-bold uppercase tracking-widest"
        >
          Analyzing soil and weather data...
        </motion.p>
      </div>

      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.5)]" />
    </main>
  );
}
