import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import Tema from '../../resources/Tema/Tema';

const EstudianteDashboard = () => {
  const { user, rol, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Hola, {user?.email}</h1>
      <p>Rol: {rol}</p>

      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default EstudianteDashboard;