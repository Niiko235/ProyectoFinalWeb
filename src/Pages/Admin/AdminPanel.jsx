import { AdminContext, Admin, Resource, CustomRoutes } from 'react-admin';
import { useAuth } from '../../Context/authContext';
import dataProvider from '../../dataProvider';
import { Route, useNavigate } from 'react-router-dom';
import Tema from '../../resources/Tema/Tema';

/* Rutas para el crud de proyectos*/
import coordinadorProyectoList from '../../resources/coordinadorProyectos/coordinadorProyectoList/';
import coordinadorProyectoEdit from '../../resources/coordinadorProyectos/coordinadorProyectoEdit/';
import coordinadorProyectoCreate from '../../resources/coordinadorProyectos/coordinadorProyectoCreate/';
import CoordinadorProyectoVista from '../../resources/coordinadorProyectos/coordinadorProyectoVista';

/* Rutas para el crud de usuarios*/
import docenteUsuarioList from '../../resources/docenteUsuario/docenteUsuarioList';
import docenteUsuarioCreate from '../../resources/docenteUsuario/docenteUsuarioCreate';
import docenteUsuarioEdit from '../../resources/docenteUsuario/docenteUsuarioEdit';

import './AdminPanel.css'


const AdminPanel = () => {
  const { rol, loading, logout} = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Cargando...</p>;
  if (rol !== 'coordinador') return <p>Acceso denegado</p>;
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const Dashboard = () => (<div style={{ padding: '2rem' }}>
    <h1>Bienvenido al Panel de Coordinador</h1>
    <p>Desde aquí puedes gestionar proyectos, usuarios y más.</p>
    <div className='Dash-Boton'>
      <button onClick={handleLogout} className='Dash-Admin-boton'>Cerrar sesión</button>
    </div>
  </div>);

  return (
    <Admin basename="/admin" dataProvider={dataProvider} dashboard={Dashboard} theme={Tema}>
      
      <Resource
        name="proyectos"
        list={coordinadorProyectoList}
        edit={coordinadorProyectoEdit}
        create={coordinadorProyectoCreate}
      />
      <Resource 
        name="usuarios"
        list={docenteUsuarioList}
        edit={docenteUsuarioEdit}
        create={docenteUsuarioCreate}
      />  

      {/* Ruta personalizada */}
      <CustomRoutes>
        <Route path="/proyectos/:id/vista" element={<CoordinadorProyectoVista />} />
      </CustomRoutes>
    </Admin>
  );
};

export default AdminPanel;
