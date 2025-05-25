import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import Tema from '../../resources/Tema/Tema';
import { Admin, Resource } from "react-admin";
import EstudiantedataProvider from './EstudiantedataProvider';
import CardProyect from '../../Components/CardProyec/CardProyec';
import { db } from '../../Firebase/firabase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const EstudianteDashboard = () => {
  const { user, rol, logout } = useAuth();
  const navigate = useNavigate();

  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchProyectos = async () => {
      if (!user) return;
      const q = query(collection(db, "proyectos"), where("team", "array-contains", user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProyectos(data);
      setLoading(false);
    };

    fetchProyectos();
  }, [user]);

  const Dashboard = () => (
    <div className='Dashdoce-principal'>
      <h1>Hola, {user?.email}</h1>
      <p>Rol: {rol}</p>

      {loading ? (
        <p>Cargando proyectos...</p>
      ) : proyectos.length === 0 ? (
        <p>No tienes proyectos asignados.</p>
      ) : (
        <div className="proyectos-lista">
          {proyectos.map(proy => (
            <CardProyect key={proy.id} proyecto={proy} />
          ))}
        </div>
      )}

      <div className='Dash-boton'>
        <button onClick={handleLogout} className='boton-cerrar-sesion'>Cerrar sesión</button>
      </div>
    </div>
  );

  return (
    user ? (
      <Admin
        basename="/estudiante"
        dashboard={Dashboard}
        theme={Tema}
        dataProvider={EstudiantedataProvider(user)} // 💡 Pasas el usuario autenticado aquí
      >
        <Resource name="proyectos" />
      </Admin>
    ) : null
  );
};

export default EstudianteDashboard;


// import { useAuth } from '../../Context/authContext';
// import { useNavigate } from 'react-router-dom';
// import Tema from '../../resources/Tema/Tema';
// import { Admin, Resource } from "react-admin";
// import EstudiantedataProvider from './EstudiantedataProvider';
// import Imagen from '../../img/imagen.jpg'
// import CardProyect from '../../Components/CardProyec/CardProyec';

// const EstudianteDashboard = () => {
//   const { user, rol, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   const Dashboard = () => (
//     <div className='Dashdoce-principal'>
//       <h1>Hola, {user?.email}</h1>
//       <p>Rol: {rol}</p>
//       <div className='Dash-boton'>
//         <button onClick={handleLogout} className='boton-cerrar-sesion'>Cerrar sesión</button>
//       </div>
//     </div>
//   );

//   return (
//     <Admin basename="/estudiante" dashboard={Dashboard} theme={Tema}>
//       <Resource name="proyectos">
//         <div>
//           HOLA
//         </div>
//       </Resource>
//     </Admin>
//   );
// };

// export default EstudianteDashboard;