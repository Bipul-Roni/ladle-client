import { useEffect, useState } from 'react';
import { ThemeContext } from './contexts';

const getInitial = () =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('ladle-theme', theme);
    } catch {
      /* storage unavailable — theme still works for this visit */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
