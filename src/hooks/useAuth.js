import { useContext } from 'react';
import { AuthContext } from '../contexts/contexts';

export default function useAuth() {
  return useContext(AuthContext);
}
