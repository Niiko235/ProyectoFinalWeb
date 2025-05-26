import { useAuth } from "../../Context/authContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Progress from "../Progress/Progress";

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, rol, loading } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!loading) setChecking(false);
  }, [loading]);

  if (loading || checking) return <h1><Progress /></h1>;

  if (!user) return <Navigate to="/" />;

  // Validación por rol
  if (allowedRoles && !allowedRoles.includes(rol)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
