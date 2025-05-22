import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './Context/authContext'
import { ProtectedRoute } from './Components/PortectedRoute/ProtectedRoute'

import Intro from './Components/Intro/Intro'
import Registro from './Components/Registro/Registro'

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          

          <Route path='/register' element = {<Registro />} />
          <Route path='/' element = {<Intro />} />
          
          
        </Routes>
      </AuthProvider>
     
    </>
  )
}

export default App