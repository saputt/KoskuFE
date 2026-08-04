import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { useMe } from '../features/auth/hooks/useAuth';

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useAuthStore();
  const { isFetching } = useMe(isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;

  if (!user || isFetching) {
    return <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Memuat...</p>;
  }

  if (role && user?.role !== role) return <Navigate to="/login" replace />;

  return children;
}
