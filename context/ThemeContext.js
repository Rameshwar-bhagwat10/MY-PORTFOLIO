// context/ThemeContext.js
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark'); // Default to dark theme
  const [mounted, setMounted] = useState(false);

  // Handle initial theme setup
  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme or default to dark
    const saved = localStorage.getItem('theme');
    const initialTheme = saved || 'dark';
    
    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', initialTheme);
    setTheme(initialTheme);
    
    // Store the theme
    localStorage.setItem('theme', initialTheme);
  }, []);

  // Update theme when it changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
