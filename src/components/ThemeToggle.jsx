import { FiMoon, FiSun } from 'react-icons/fi';
import useTheme from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      onClick={toggleTheme}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink hover:bg-ink/5"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      data-tooltip-id="nav-tip"
      data-tooltip-content={dark ? 'Light theme' : 'Dark theme'}
    >
      {dark ? <FiSun /> : <FiMoon />}
    </button>
  );
}
