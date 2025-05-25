import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import dataProvider from '../../dataProvider';
import docenteProyectosList from '../../resources/docenteProyectos/docenteProyectosList';
import docenteProyectosEdit from '../../resources/docenteProyectos/docenteProyectosEdit';
import docenteProyectosCrear from '../../resources/docenteProyectos/docenteProyectosCrear';
import Tema from '../../resources/Tema/Tema';

import { Admin, Resource} from "react-admin";
import './DocenteDashboard.css'

const DocenteDashboard = () => {
  const { user, rol, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const Dashboard = () => (<div style={{ padding: '2rem' }}>
    <h1>Bienvenido al Panel del Docente {user?.email} </h1>
    <p>Desde aquí puedes gestionar proyectos y más.</p>
    <div className='Dash-boton'>
      <button onClick={handleLogout} className='boton-cerrar-sesion'>Cerrar sesión</button>
    </div>
  </div>);

  return (
    <>
      <Admin basename="/docente" dataProvider={dataProvider} dashboard={Dashboard} theme={Tema}>
        <Resource
        name="proyectos"
        list={docenteProyectosList}
        edit={docenteProyectosEdit}
        create={docenteProyectosCrear}
      />
      <Resource name="usuarios" />
      <Resource name="estudiantes" />
      </Admin>
    </>
  );
};

export default DocenteDashboard;
