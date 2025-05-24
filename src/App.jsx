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

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <PublicRoute>
            <Inicio />
          </PublicRoute>} />
        <Route path="/register" element={
          <PublicRoute>
            <Registro />
          </PublicRoute>} />


        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['coordinador']}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/docente"
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
