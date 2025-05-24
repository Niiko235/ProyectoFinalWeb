import React from 'react'
import './Usuarios.css'

import { Admin, Resource } from 'react-admin';
import dataProvider from '../../dataProvider';


import ProyectoList from '../../resources/proyectos/ProyectoList';
import ProyectoCreate from '../../resources/proyectos/ProyectoCreate'; 
import ProyectoEdit from '../../resources/proyectos/ProyectoEdit';
import UsuarioList from '../../resources/usuarios/UsuarioList';


const Usuarios = () => {
  console.log('dataProvider', dataProvider)
  return (
    // <div className='usuarios'>
    //   <h1>Usuarios</h1>
    // </div>
  // <Admin dataProvider={dataProvider}>
  //   <Resource name="proyectos" list={ProyectoList} create={ProyectoCreate} edit={ProyectoEdit} />
  //   {/* <Resource name="usuarios" list={UsuarioList} /> */}
  // </Admin>
  <h1>Namde!?😁😁</h1>
  )
}

export default Usuarios