import React from 'react'
import './Intro.css'

import { Link } from 'react-router-dom';

import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';


const Intro = () => {
  return (
    <>
        <div id='intro-Circulos'>
            <div id='intro-Circulos_Amarrillo' className='animte__animated  animate__bounceIn'></div>
            <div id='intro-Circulos_Azul' className='animte__animated  animate__bounceIn'></div>
            <div id='intro-Circulos_Amarrillo-2' className='animte__animated  animate__bounceIn'></div>
        </div>
        <div id='main-intro'>      
            <div id='intro-titulo'>
                <h1 className='animate__animated animate__slideInUp'>Bienvenido a Uniformación Amazonica</h1>
                <p className='animate__animated animate__slideInUp'>Seleccione una opcion para continuar</p>
            </div>
            <div id='intro-opciones' className='animate__animated animate__slideInUp'>
                <div className='cartas'>
                    <div id='cartas-login'>
                        {<LoginIcon sx={{background: '#ffffff', fontSize: 50}}/>}
                    </div>
                    <div id='cartas-descripcion'>
                        <h2>Iniciar Sesión</h2>
                        <p>Ingrese a su cuenta ya creada</p>
                    </div>
                    <Link to={"/inicio"} id='cartas-boton'>
                        Iniciar Sesión
                    </Link>
                </div>
                <div className='cartas'>
                    <div id='cartas-login'>
                        {<HowToRegIcon sx={{background: '#ffffff', fontSize: 50}}/>}
                    </div>
                    <div id='cartas-descripcion'>
                        <h2>Registrarse</h2>
                        <p>Crea una nueva cuenta</p>
                    </div>
                    <Link to={"/registrarse"} id='cartas-boton'>
                        Crear Cuenta
                    </Link>
                </div>
            </div>
        </div>
        <div id='Footer-Circulos'>
            <div id='Footer-Circulos-amarillo'></div>
            <div id='Footer-Circulos-azul'></div>
        </div>
    </>
  )
}

export default Intro