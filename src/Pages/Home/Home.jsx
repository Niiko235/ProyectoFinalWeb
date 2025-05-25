import React from 'react'
import './Home.css'

import { Link } from 'react-router-dom';

import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';


const Home = () => {
    return (
        <>
        <div className='home-principal'>
                <div id='home-Circulos'>
                    <div id='home-Circulos_Amarrillo' className='animate__animated  animate__bounceIn'></div>
                    <div id='home-Circulos_Azul' className='animate__animated  animate__bounceIn'></div>
                    <div id='home-Circulos_Amarrillo-2' className='animate__animated  animate__bounceIn'></div>
                </div>
                <div id='main-home'>      
                    <div id='home-titulo'>
                        <h1 className='animate__animated animate__zoomIn'>Bienvenido a Uniformación Amazonica</h1>
                        <p className='animate__animated animate__zoomIn'>Seleccione una opcion para continuar</p>
                    </div>
                    <div id='home-opciones' className='animate__animated animate__zoomIn'>
                        <div className='cartas'>
                            <div id='cartas-login'>
                                {<LoginIcon className='cartas-icono'/>}
                            </div>
                            <div id='cartas-descripcion'>
                                <h2>Iniciar Sesión</h2>
                                <p>Ingrese a su cuenta ya creada</p>
                            </div>
                            <Link to={"/login"} id='cartas-boton'>
                                Iniciar Sesión
                            </Link>
                        </div>
                        <div className='cartas'>
                            <div id='cartas-login'>
                                {<HowToRegIcon sx={{ fontSize: 50}}/>}
                            </div>
                            <div id='cartas-descripcion'>
                                <h2>Registrarse</h2>
                                <p>Crea una nueva cuenta</p>
                            </div>
                            <Link to={"/register"} id='cartas-boton'>
                                Crear Cuenta
                            </Link>
                        </div>
                    </div>
                </div>
                <div id='Footer-Circulos'>
                    <div id='Footer-Circulos-amarillo'></div>
                    <div id='Footer-Circulos-azul'></div>
                </div>
        </div>
            
            
        </>
    )
}

export default Home