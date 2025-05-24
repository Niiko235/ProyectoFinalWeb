import React, { useState } from 'react'
import { useAuth } from '../../Context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import './Inicio.css'
const Inicio = () => {

  const [user, setUser] = useState({
        email : '',
        password : '',
    });

    const {login} = useAuth()

    const navigate = useNavigate()

  // const [error, setError] = useState(); si vamos a utilizar error toca agregar como componente y usar tailwind


  const handleCange = ({target : {name, value}}) => {
      setUser({...user, [name]: value})
  }
    
    

  const handleSubmit = async e => {
    e.preventDefault()
    // setError('');
    try{
      await login(user.email, user.password)
      // navigate("/user")
    }catch (error){
      // console.log('cagaste');
      alert("Credenciales invalidas")
      // setError(error.message);
    }
  }

  return (
    <>
        <form id='Inicio-contenedor' onSubmit={handleSubmit}>
            <div id='Inicio-Circulos'>
                <div id='Inicio-Circulos_Amarrillo' className='animate__animated  animate__bounceIn'></div>
                <div id='Inicio-Circulos_Amarrillo-2' className='animate__animated  animate__bounceIn'></div>
                <div id='Inicio-Circulos_Amarrillo-3' className='animate__animated  animate__bounceIn'></div>
                <div id='Inicio-Circulos_Azul' className='animate__animated  animate__bounceIn'></div>
                <div id='Inicio-Circulos_Azul-2' className='animate__animated  animate__bounceIn'></div>
                <div id='Inicio-Circulos_Azul-3' className='animate__animated  animate__bounceIn'></div>
            </div>
            <main className='animate__animated  animate__bounceIn'>
                <div id='Inicio-contenedor_titulos'>
                  <h1>Uniformación Amazonica</h1>
                  <p>Ingrese los datos para iniciar sesión</p>
                  <div className='Inicio-form'>
                    <p className='form'>Correo Electronico</p>
                    <input type="email" name='email' placeholder='youremail@company.ltd' onChange={handleCange} className='entrada'/>
                  </div>
                  <div className='Inicio-form'>
                    <p className='form'>Contraseña</p>
                    <input type="password" name='password' placeholder='***********' id='password' onChange={handleCange} className='entrada'/>
                  </div>
                  <div className='Inicio-form-boton'>
                        <button className='Inicio-iniciar'>Iniciar sesion</button>
                  </div>
                </div>
            </main>
        </form>
        
    </>
  )
}

export default Inicio