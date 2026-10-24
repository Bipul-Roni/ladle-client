import { useContext } from 'react';
import { ThemeContext } from '../contexts/contexts';

export default function useTheme() {
  return useContext(ThemeContext);
}
