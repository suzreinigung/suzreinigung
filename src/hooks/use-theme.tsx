import { createContext, useContext, useEffect } from 'react';

// Dark theme is now permanent - no more theme switching
type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
  // Keeping these for compatibility but they do nothing
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always use dark theme
  const theme: Theme = 'dark';

  useEffect(() => {
    const root = document.documentElement;

    // Always set dark theme
    root.classList.remove('light');
    root.classList.add('dark');

    // Clean up any old theme storage
    localStorage.removeItem('suz-theme');

    // Always set dark theme color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#111827');
    }
  }, []);

  // No-op functions for compatibility
  const toggleTheme = () => {
    // Do nothing - dark theme is permanent
  };

  const setTheme = () => {
    // Do nothing - dark theme is permanent
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
