import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

export function ManagerRoute({ children }) {
  const { isManager } = useAuth();
  
  return isManager() ? children : <Navigate to="/" replace />;
}
