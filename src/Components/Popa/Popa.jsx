import { useParams } from 'react-router-dom';
import { List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';
import ModalBoton from '../Modal/Modal';
import './Popa.css'

const Popa = ({ proyectos }) => {
    const { id } = useParams();

    const proyecto = proyectos.find((p) => p.id.toString() === id);

    if (!proyecto) return <p>Proyecto no encontrado</p>;

    return (
        <>
            <div className='Popa-principal'>
                <div className='Popa-principal-titulo'>
                    <h1>
                        {proyecto.titulo}
                    </h1>
                </div>
                <div className='Popa-descripcion'>
                    <p>
                        {proyecto.objetivos}
                    </p>
                </div>
                <div className='Popa-descripcion'>
                    <h2>
                        Avances
                    </h2>
                    <ModalBoton className='Popa-boton' />
                </div>
                <div className='Popa-tabla-container'>
                    <table className='Popa-tabla'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proyecto.avances && proyecto.avances.length > 0 ? (
                                proyecto.avances.map((avance, index) => (
                                    <tr key={index}>
                                        <td>{avance.nombre}</td>
                                        <td>{avance.descr}</td>
                                        <td>{avance.fecha}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center' }}>No hay avances</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Popa;
