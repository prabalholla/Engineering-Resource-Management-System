import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { ReactNode } from 'react';

interface ManagerRouteProps {
  children: ReactNode;
}

export function ManagerRoute({ children }: ManagerRouteProps): JSX.Element {
  const { user } = useAuth();
  const isManager = user?.role === 'manager';
  
  return isManager ? <>{children}</> : <Navigate to="/" replace />;
}
