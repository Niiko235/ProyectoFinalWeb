import React from 'react'
import './Registro.css'
import { Link } from 'react-router-dom'

const Registro = () => {
  return (
    <>
    <div id='Registro-contenedor'>
        <div id='Registro-contenedor_main' className='animate__animated animate__fadeIn'>
            <div id='Registro-contenedor-primeros'>
                <h1 id='Registro-contenedor_crear'>Crear Cuenta</h1>
                <p id='Registro-contenedor_parra'>Complete el formulario para acceder a la pagina Uniformación Amazonica</p>
            </div>
            <div id='Registro-contenedor_form'>
                <div class='Registro-contenedor_form_1'>
                    <div class='Registro-contenedor_form_1_1'>
                        <p className='form'>Nombre</p>
                        <input type="text" className='entrada'/>
                    </div>
                    <div class='Registro-contenedor_form_1_1'>
                        <p className='form'>Apellido</p>
                        <input type="text" className='entrada'/>
                    </div>
                </div>
                <div class='Registro-contenedor_form_1'>
                    <div class='Registro-contenedor_form_1_1'>
                        <p className='form'>Numero de Documento</p>
                        <input type="text" className='entrada'/>
                    </div>
                    <div class='Registro-contenedor_form_1_1'>
                        <p className='form'>Correo Electronico</p>
                        <input type='email' className='entrada'/>
                    </div>
                </div>
                <div class='Registro-contenedor_form_1'>
                    <div class='Registro-contenedor_form_1_1'>
                        <p className='form'>Telefono</p>
                        <input type="text" className='entrada'/>
                    </div>
                    <div class='Registro-contenedor_form_1_1'>
                        <p className='form'>Nombre de Usuario</p>
                        <input type='text' className='entrada'/>
                    </div>
                </div>
                <div class='Registro-contenedor_form_1'>
                    <div class='Registro-contenedor_form_1_1'>
                        <p className='form'>Contraseña</p>
                        <input type="password" className='entrada'/>
                    </div>
                    <div class='Registro-contenedor_form_1_1'>
                        <button className='Registro-contenedor_registrarse'>Registrarse</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Registro;