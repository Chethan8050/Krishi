import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'hi' | 'kn';

interface AppState {
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
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'kisan-ai-storage', // local storage key
      partialize: (state) => {
        const { selectedImage, ...persistedState } = state;
        return persistedState;
      },
    }
  )
);
