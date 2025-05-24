import { AdminContext, Admin, Resource } from 'react-admin';
import { useAuth } from '../../Context/authContext';
import dataProvider from '../../dataProvider';
import { useNavigate } from 'react-router-dom';

import ProyectoList from '../../resources/proyectos/ProyectoList';
import ProyectoEdit from '../../resources/proyectos/ProyectoEdit';
import ProyectoCreate from '../../resources/proyectos/ProyectoCreate';

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
    <Admin basename="/admin" dataProvider={dataProvider} dashboard={Dashboard}>
      
      <Resource
        name="proyectos"
        list={ProyectoList}
        edit={ProyectoEdit}
        create={ProyectoCreate}
      />
      <Resource 
        name="usuarios"
        list={docenteUsuarioList}
        edit={docenteUsuarioEdit}
        create={docenteUsuarioCreate}
      />  
    </Admin>
  );
};

export default AdminPanel;
