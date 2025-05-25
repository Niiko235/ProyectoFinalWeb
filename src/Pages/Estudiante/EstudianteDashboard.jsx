import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import Tema from '../../resources/Tema/Tema';
import { Admin, Resource } from "react-admin";
import dataProvider from '../../dataProvider';
import Imagen from '../../img/imagen.jpg'
import CardProyect from '../../Components/CardProyec/CardProyec';
import { useState, useEffect } from 'react';

const EstudianteDashboard = () => {
  const { user, rol, logout } = useAuth();
  const navigate = useNavigate();

  const [proyectos, setProyectos] = useState([]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    // Suponiendo que Juan tiene id 1
    dataProvider.getList("proyectos", {
      filter: { teamId: 2 }
    }).then(response => {
      setProyectos(response.data);
    });
  }, []);

  const Dashboard = () => (
    <div className='Dashdoce-principal'>
      <h1>Hola, {user?.email}</h1>
      <p>Rol: {rol}</p>
      {proyectos.map(proy => (
          <CardProyect key={proy.id} proyecto={proy} />
        ))}
      <div className='Dash-boton'>
        <button onClick={handleLogout} className='boton-cerrar-sesion'>Cerrar sesión</button>
      </div>
    </div>
  );

  return (
    <Admin basename="/estudiante" dashboard={Dashboard} theme={Tema}>
      <Resource name="proyectos">
        <div>
          HOLA
        </div>
      </Resource>
    </Admin>
  );
};

export default EstudianteDashboard;