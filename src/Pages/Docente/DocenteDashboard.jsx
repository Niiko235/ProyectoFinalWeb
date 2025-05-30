import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';

import DataProviderDocente from './DataProviderDocente';

import docenteProyectosList from '../../resources/docenteProyectos/docenteProyectosList';
import docenteProyectosEdit from '../../resources/docenteProyectos/docenteProyectosEdit';
import docenteProyectosCrear from '../../resources/docenteProyectos/docenteProyectosCrear';
import Tema from '../../resources/Tema/Tema';
import Imagen from '../../img/imagen.jpg';

import { Admin, Resource} from "react-admin";
import './DocenteDashboard.css'

const DocenteDashboard = () => {
  
  const { user, rol, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const Dashboard = () => (
  <div className='Dashdoce-principal'>
    <h1>Bienvenido al Panel del Docente {user?.email} </h1>
    <p>Desde aquí puedes gestionar proyectos y más.</p>
    <div className='Dashdoce-imagen-cont'>
      <img src={Imagen} alt="..."  className='Dashdoce-imagen'/>
    </div>
    <div className='Dash-Boton'>
      <button onClick={handleLogout} className='boton-cerrar-sesion'>Cerrar sesión</button>
    </div>
  </div>
  );


  const dataProvider = DataProviderDocente(user);

  return (
    <>
      <Admin basename="/docente" dataProvider={dataProvider} dashboard={Dashboard} theme={Tema}>
        <Resource
        name="projects"
        list={docenteProyectosList}
        edit={docenteProyectosEdit}
        create={docenteProyectosCrear}
      />
      <Resource name="users" />
      <Resource name="progresses" />
      </Admin>
    </>
  );
};

export default DocenteDashboard;
