import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'hi' | 'kn';

interface User {
  id: string;
  email?: string;
  fullName?: string;
  district?: string;
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  
  // Global Settings
  language: Language;
  setLanguage: (lang: Language) => void;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;

  // Scan Logic
  recentScanResult: any | null;
  setRecentScanResult: (result: any) => void;
  selectedImage: File | null;
  setSelectedImage: (image: File | null) => void;

  // Yield Inputs
  yieldInputs: {
    crop: string;
    district: string;
    soilType: string;
    season: string;
    rainfall: number;
    area: number;
  };
  setYieldInputs: (inputs: Partial<AppState['yieldInputs']>) => void;
  recentYieldResult: any | null;
  setRecentYieldResult: (result: any) => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false, hasCompletedOnboarding: false }),

      // Global Settings
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      hasCompletedOnboarding: false,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),

      recentScanResult: null,
      setRecentScanResult: (result) => set({ recentScanResult: result }),
      selectedImage: null,
      setSelectedImage: (image) => set({ selectedImage: image }),

      yieldInputs: {
        crop: 'Tomato',
        district: 'Mandya',
        soilType: 'Red Soil',
        season: 'Kharif',
        rainfall: 850,
        area: 2.5,
      },
      setYieldInputs: (inputs) => set((state) => ({ yieldInputs: { ...state.yieldInputs, ...inputs } })),
      recentYieldResult: null,
      setRecentYieldResult: (result) => set({ recentYieldResult: result }),

      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'kisan-ai-storage',
      partialize: (state) => {
        const { selectedImage, ...persistedState } = state;
        return persistedState;
      },
    }
  )
);
