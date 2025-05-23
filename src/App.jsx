import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './Context/authContext'
import { ProtectedRoute } from './Components/PortectedRoute/ProtectedRoute'

import Registro from './Pages/Registro/Registro'
import Usuarios from './Pages/Usuarios/Usuarios'
import Home from './Pages/Home/Home'
import Inicio from './Pages/Inicio/Inicio'


const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* en usuers colocaremos todas las rutas protegidas -> buscar si hay otro metodo */}
          <Route path='/user'
            element = {
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            }
          />
          {/* aqui van las rutas que no requieren iniciar sesion para verlas */}
          <Route path='/register' element = {<Registro />} />
          <Route path='/login' element = {<Inicio />} />
          <Route path='/' element = {<Home />} />

        </Routes>
      </AuthProvider>
     
    </>
  )
}

export default App