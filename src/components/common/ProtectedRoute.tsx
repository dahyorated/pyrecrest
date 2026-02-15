import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('pyrecrest_admin_token');

  if (!token || !isTokenValid(token)) {
    localStorage.removeItem('pyrecrest_admin_token');
    localStorage.removeItem('pyrecrest_admin_name');
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
