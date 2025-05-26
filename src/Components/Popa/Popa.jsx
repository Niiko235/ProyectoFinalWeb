import { useParams } from 'react-router-dom';
import { List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';
import ModalBoton from '../Modal/Modal';
import DetalleAvance from '../DetalleAvance/DetalleAvance';
import HistorialModal from '../HistoriaModal/HistorialModal';
import './Popa.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Popa = ({ proyectos }) => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [avanceSeleccionado, setAvanceSeleccionado] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [historialOpen, setHistorialOpen] = useState(false);


    const proyecto = proyectos.find((p) => p.id.toString() === id);

    if (!proyecto) return <p>Proyecto no encontrado</p>;

    const handleFilaClick = (avance) => {
        setAvanceSeleccionado(avance);
        setModalOpen(true);
    };

    const cerrarModal = () => {
        setModalOpen(false);
        setAvanceSeleccionado(null);
    };

    const abrirHistorial = () => setHistorialOpen(true);
    const cerrarHistorial = () => setHistorialOpen(false);


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
                                    <tr key={index} onClick={() => handleFilaClick(avance)} style={{ cursor: 'pointer' }}>
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
                <div style={{ marginTop: '1rem' }}>
                    <button className='Popa-boton-historial' onClick={abrirHistorial}>
                        Ver Historial de Estados (Modal)
                    </button>
                </div>
            </div>



            <DetalleAvance
                open={modalOpen}
                onClose={cerrarModal}
                avance={avanceSeleccionado}
            />
            {/* Modal de historial */}
            <HistorialModal
                open={historialOpen}
                onClose={cerrarHistorial}
                itemsDeEstado={proyecto.avances} // Aquí pasas los datos que el modal necesita
            />
        </>
    );
};

export default Popa;
