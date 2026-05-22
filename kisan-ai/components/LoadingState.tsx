'use client';
import { motion } from 'framer-motion';

interface LoadingStateProps {
  message?: string;
  type?: 'scanning' | 'loading' | 'uploading';
}

export default function LoadingState({ message = 'Loading...', type = 'loading' }: LoadingStateProps) {
  const configs = {
    scanning: {
      icon: 'document_scanner',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
    loading: {
      icon: 'hourglass_empty',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    uploading: {
      icon: 'cloud_upload',
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
  };

  const config = configs[type];

  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center`}
      >
        <span className={`material-symbols-outlined ${config.color}`}>{config.icon}</span>
      </motion.div>
      <div>
        <p className="font-bold text-sm text-slate-700">{message}</p>
        <p className="text-xs text-slate-400">Please wait...</p>
      </div>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50/80 backdrop-blur-sm border border-red-200">
      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
        <span className="material-symbols-outlined text-red-500">error</span>
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm text-red-700">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="text-xs font-bold text-red-500 underline mt-1">
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

export function OfflineIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-white py-2 px-4 text-center text-sm font-bold flex items-center justify-center gap-2"
    >
      <span className="material-symbols-outlined text-lg">wifi_off</span>
      You&apos;re offline - using cached data
    </motion.div>
  );
}