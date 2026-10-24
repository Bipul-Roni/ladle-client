import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for Firebase to restore the session so a reload never bounces to login
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" state={location.pathname} replace />;
  return children;
}
