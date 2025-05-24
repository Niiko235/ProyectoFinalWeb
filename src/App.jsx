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

function App() {
  return (
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
          path="/estudiante"
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
