import { Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/authContext';
import { ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute';
import { PublicRoute } from './Components/PublicRoute/PublicRoute';

import AdminPanel from './Pages/Admin/AdminPanel';
import DocenteDashboard from './Pages/Docente/DocenteDashboard';
import EstudianteDashboard from './Pages/Estudiante/EstudianteDashboard';
import Inicio from './Pages/Inicio/Inicio';
import Registro from './Pages/Registro/Registro';
import Home from './Pages/Home/Home';

import './App.css'
import HistorialEstado from './Components/HistorialEstado/HistorialEstado';

const datosHistorial = [
  {
    id: 'estado1', // Es buena práctica usar un id único para la key
    tipo: 'completado', // Corresponde a .indicador-estado.completado
    nombre: 'Solicitud Recibida',
    descripcion: 'Hemos recibido tu solicitud y ha sido asignada al equipo correspondiente. Número de ticket: #12345.'
  },
  {
    id: 'estado2',
    tipo: 'avanzando', // Corresponde a .indicador-estado.avanzando
    nombre: 'En Proceso de Evaluación',
    descripcion: 'Nuestro equipo técnico está actualmente evaluando la información proporcionada. Esto podría tomar entre 24-48 horas hábiles.'
  },
  {
    id: 'estado3',
    tipo: 'pendiente', // Corresponde a .indicador-estado.pendiente
    nombre: 'Pendiente de Feedback del Cliente',
    descripcion: 'Se ha enviado una versión preliminar para tu revisión. Esperamos tus comentarios para continuar.'
  },
  {
    id: 'estado4',
    tipo: 'error', // Corresponde a .indicador-estado.error
    nombre: 'Incidencia en Despliegue',
    descripcion: 'Se encontró un problema durante el último intento de despliegue. El equipo está investigando.'
  },
  {
    id: 'estado5',
    tipo: 'defecto', // Corresponde a .indicador-estado.defecto
    nombre: 'Archivado',
    descripcion: 'Este ítem ha sido archivado y ya no requiere acción inmediata.'
  }
];

// En tu componente App.js (o donde lo uses):
// import HistorialDeEstados from './HistorialDeEstados';
//
// function App() {
//   return (
//     <div className="App">
//       <HistorialDeEstados itemsDeEstado={datosHistorial} />
//     </div>
//   );
// }

function App() {
  return (
    // <HistorialEstado itemsDeEstado={datosHistorial} />
    <AuthProvider>
      <Routes>
        {/* Las rutas que están envueltan por las etiquetas PublicRoute garantizan que el login */}
        {/* o la página principal no aparezca mientras se está dentro de una sesión. De una vez */}
        {/* lo redigirá la página principal del dashboard determinado por el rol. */}

        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Home />} />                {/* Renders at "/" */}
          <Route path="login" element={<Inicio />} />       {/* Renders at "/login" */}
          <Route path="register" element={<Registro />} />  {/* Renders at "/register" */}
        </Route>


        {/* Rutas determinadas para administración por contenido dependiendo del rol */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['coordinador']}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/docente/*"
          element={
            <ProtectedRoute allowedRoles={['profesor']}>
              <DocenteDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estudiante/*"
          element={
            <ProtectedRoute allowedRoles={['estudiante']}>
              <EstudianteDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </AuthProvider>
  );
}

export default App;
