import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { auth } = useAuth();
  if (!auth) return <Navigate to="/login" />;
  if (requiredRole && auth.user?.role !== requiredRole) return <Navigate to="/unauthorized" />;
  return children;
}
