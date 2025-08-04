import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      setTheme: (theme: 'light' | 'dark') => set({ isDarkMode: theme === 'dark' }),
    }),
    {
      name: 'theme-storage',
    }
  )
);