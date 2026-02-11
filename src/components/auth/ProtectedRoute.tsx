import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { session } = useAuthStore();
  const location = useLocation();

  if (!session.isAuthenticated) {
    return <Navigate to={`/entrar?next=${location.pathname}`} replace />;
  }

  return <>{children}</>;
};
