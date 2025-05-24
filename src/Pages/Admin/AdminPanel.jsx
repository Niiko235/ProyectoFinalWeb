import { AdminContext, Admin, Resource } from 'react-admin';
import { useAuth } from '../../Context/authContext';
import dataProvider from '../../dataProvider';

import ProyectoList from '../../resources/proyectos/ProyectoList';
import ProyectoEdit from '../../resources/proyectos/ProyectoEdit';
import ProyectoCreate from '../../resources/proyectos/ProyectoCreate';

const AdminPanel = () => {
  const { rol, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (rol !== 'coordinador') return <p>Acceso denegado</p>;

  const Dashboard = () => (<div style={{ padding: '2rem' }}>
    <h1>Bienvenido al Panel de Coordinador</h1>
    <p>Desde aquí puedes gestionar proyectos, usuarios y más.</p>
  </div>);

  return (
    <Admin basename="/admin" dataProvider={dataProvider} dashboard={Dashboard}>
      <Resource
        name="proyectos"
        list={ProyectoList}
        edit={ProyectoEdit}
        create={ProyectoCreate}
      />
    </Admin>
  );
};

export default AdminPanel;
