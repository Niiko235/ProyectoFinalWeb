import React from 'react'
import './Inicio.css'

const Inicio = () => {
  return (
    <>
        <div id='Inicio-contenedor'>
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
                    <input type="text" className='entrada'/>
                  </div>
                  <div className='Inicio-form'>
                    <p className='form'>Contraseña</p>
                    <input type="password" className='entrada'/>
                  </div>
                  <div class='Inicio-form-boton'>
                        <button className='Inicio-iniciar'>Registrarse</button>
                  </div>
                </div>
            </main>
        </div>
        
    </>
  )
}

export default Inicio