import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import Tema from '../../resources/Tema/Tema';
import { Admin, Resource, CustomRoutes } from "react-admin";
import Imagen from '../../img/imagen.jpg'
import CardProyect from '../../Components/CardProyec/CardProyec';
import { useState, useEffect } from 'react';
import Popa from '../../Components/Popa/Popa';
import { Route } from 'react-router-dom';
import HistorialEstado from '../../Components/HistorialEstado/HistorialEstado'
import './EstudianteDashboard.css'


const EstudianteDashboard = () => {
  const { user, rol, logout, getProyectosMios } = useAuth();
  const navigate = useNavigate();

  const [proyectos, setProyectos] = useState([]);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const fetchProyectos = async () => {
      const res = await getProyectosMios();
      setProyectos(res);
    };
    if (user) fetchProyectos();

    // console.log(proyectos);
    
  }, []);


  const Dashboard = () => (
    <div className='Dashdoce-principal'>
      <h1>Hola, {user.email} {rol}</h1>
      <p>Rol: {rol}</p>
      <div className='Dashcode-proyectos'>
        {proyectos.map(proyecto => (
          <CardProyect key={proyecto.id} proyecto={proyecto} />
        ))}
      </div>
      <div className='Dash-boton'>
        <button onClick={handleLogout} className='boton-cerrar-sesion'>Cerrar sesión</button>
      </div>
    </div>
  );

  return (
    <Admin basename="/estudiante" dashboard={Dashboard} theme={Tema}>
      <CustomRoutes>
        <Route path="/compartir/:id" element={<Popa key={proyectos.id} proyectos={proyectos} />} />
      </CustomRoutes>
      <Resource name="proyectos" />
    </Admin>
  );
};

export default EstudianteDashboard;