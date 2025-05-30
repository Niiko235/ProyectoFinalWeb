import { useAuth } from '../../Context/authContext';
import { Navigate, Outlet } from 'react-router-dom';
import Progress from '../Progress/Progress';

export function PublicRoute() {
  const { user, rol, loading } = useAuth();

  if (loading) return <h1><Progress/></h1>;
  // Si el usuario está autenticado y tiene un rol específico, redirigir a la ruta correspondiente
    
  if (user && rol === 'coordinador') return <Navigate to="/admin" />;
  if (user && rol === 'profesor') return <Navigate to="/docente" />;
  if (user && rol === 'estudiante') return <Navigate to="/estudiante" />;

  // Renderiza la ruta hija (Home, Login, Register)
  return <Outlet/>;
}
