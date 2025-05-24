import React, { useState } from 'react'
import { useAuth } from '../../Context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import './Registro.css'

const Registro = () => {

    const [userRegister, setUserRegister] = useState({
        email : '',
        password : '',
        name : '',  
        lastname : '',
        phone : '',
        dni : '',
        nickname : '',
        rol : 'estudiante',
    });

    const {user, signup, registrarUsers, logout} = useAuth()
    const navigate = useNavigate()

    // const [error, setError] = useState();
    
    const handleCange = ({target : {name, value}}) => 
        setUserRegister({...userRegister, [name]: value})
        // console.log(userRegister);
        

    const handleSubmit = async e => {
        e.preventDefault()
        // setError('');
        try{
            const userCredentials = await signup(userRegister.email, userRegister.password);
            const uid = userCredentials.user.uid;
            await registrarUsers(userRegister.name, userRegister.lastname, userRegister.dni, userRegister.phone, uid, userRegister.rol, userRegister.nickname);
            console.log(user);
            
            navigate('/')
        }catch (error){
            alert('cagaste');   //mejorar los errores
        
        // setError(error.message);
        
        
        }
        
    }

    return (
        <>
            <form id='Registro-contenedor' onSubmit={handleSubmit}>
                <div id='Registro-contenedor_main' className='animate__animated animate__fadeIn'>
                    <div id='Registro-contenedor-primeros'>
                        <h1 id='Registro-contenedor_crear'>Crear Cuenta</h1>
                        <p id='Registro-contenedor_parra'>Complete el formulario para acceder a la pagina Uniformación Amazonica</p>
                    </div>
                    <div id='Registro-contenedor_form'>
                        <div className='Registro-contenedor_form_1'>
                            <div className='Registro-contenedor_form_1_1'>
                                <p className='form'>Nombre</p>
                                 <input type="text" name='name' id = 'name' placeholder='David' onChange={handleCange} className='entrada'/>      {/* INPUT DEL NONBRE */}
                            </div>
                            <div className='Registro-contenedor_form_1_1'>
                                <p className='form'>Apellido</p>
                                <input type="text" name='lastname' id = 'lastname' placeholder='Orozco' onChange={handleCange} className='entrada'/>       {/* INPUT DEL APELLIDO */}
                            </div>
                        </div>
                        <div className='Registro-contenedor_form_1'>
                            <div className='Registro-contenedor_form_1_1'>
                                <p className='form'>Numero de Documento</p>
                                <input type="text" name='dni' id = 'dni' placeholder='1119234567' onChange={handleCange} className='entrada'/>        {/* INPUT DEL CC */}
                            </div>
                            <div className='Registro-contenedor_form_1_1'>
                                <p className='form'>Correo Electronico</p>
                                <input type='email' name='email' id = 'email' placeholder='youremail@company.ltd' onChange={handleCange} className='entrada'/>       {/* INPUT DEL EMAIL */}
                            </div>
                        </div>
                        <div className='Registro-contenedor_form_1'>
                            <div className='Registro-contenedor_form_1_1'>
                                <p className='form'>Telefono</p>
                                <input type="text" name='phone' id = 'phone' placeholder='3061234567' onChange={handleCange} className='entrada'/>          {/* INPUT DEL PHONE */}
                            </div>
                            <div className='Registro-contenedor_form_1_1'>
                                <p className='form'>Nombre de Usuario</p>
                                <input type='text' name='nickname' id = 'nickname' placeholder='da.orozco' onChange={handleCange} className='entrada'/>           {/* INPUT DEL NICKNAME */}
                            </div>
                        </div>
                        <div className='Registro-contenedor_form_1'>
                            <div className='Registro-contenedor_form_1_1'>
                                <p className='form'>Contraseña</p>
                                <input type="password" name='password' id = 'password' placeholder='***********'  onChange={handleCange} className='entrada'/>       {/* INPUT DE LA CONTRASEÑA */}
                            </div>
                            <div className='Registro-contenedor_form_1_1'>
                                <button className='Registro-contenedor_registrarse'>Registrarse</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Registro