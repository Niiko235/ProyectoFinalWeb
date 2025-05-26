import { useParams } from 'react-router-dom';
import { List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';
import ModalBoton from '../Modal/Modal';
import DetalleAvance from '../DetalleAvance/DetalleAvance';
import HistorialModal from '../HistoriaModal/HistorialModal';
import './Popa.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';


// Librerías utilizadas para la importación a pdf
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Popa = ({ proyectos }) => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [avanceSeleccionado, setAvanceSeleccionado] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [historialOpen, setHistorialOpen] = useState(false);

    const { getAvances } = useAuth();


    const proyecto = proyectos.find((p) => p.id.toString() === id);

    const [avances, setAvances] = useState([]);
    const [getDescripcion, setGetDescripcion] = useState([]);
    const [getEstados, setGetEstados] = useState([]);

    useEffect(() => {
        const fetchAvances = async () => {
            const res = await getAvances(proyecto);  // funcion para traer avances del auth

            setAvances(res);
        };

        if (proyecto) {
            fetchAvances();

            // Asegura que siempre sean arrays y filtra valores falsy
            setGetDescripcion([
                ...((Array.isArray(proyecto.observacionesPrevias) ? proyecto.observacionesPrevias : [])),
                ...(proyecto.observaciones ? [proyecto.observaciones] : [])
            ]);
            setGetEstados([
                ...((Array.isArray(proyecto.estadosPrevios) ? proyecto.estadosPrevios : [])),
                ...(proyecto.status ? [proyecto.status] : [])
            ]);
        }
    }, [proyecto]);


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


    // console.log('Descripción:', getDescripcion);
    // console.log('Estados:', getEstados);


    /* Exportación a pdf */
    const exportarPDF = async () => {
        const elemento = document.getElementById('Popa-principal-#');

        if (!elemento) return alert("No se encontró el contenido del proyecto");

        const canvas = await html2canvas(elemento, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`proyecto_${proyecto.id}.pdf`);
    };

    return (
        <>
            <div id='Popa-principal-#' className='Popa-principal'>
                <div className='Popa-principal-titulo'>
                    <h1>
                        {proyecto.title}
                    </h1>
                </div>
                <div className='Popa-descripcion'>
                    <p>
                        {proyecto.goals}
                    </p>
                </div>
                <div className='Popa-descripcion'>
                    <h2>
                        {proyecto.descripcion}
                    </h2>
                    <ModalBoton className='Popa-boton' idProyecto={id} />
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
                            {avances && avances.length > 0 ? (
                                avances.map((avance, index) => (
                                    <tr key={index} onClick={() => handleFilaClick(avance)} style={{ cursor: 'pointer' }}>
                                        <td>{(index + 1)}</td>
                                        <td>{avance.fecha}</td>
                                        <td>{avance.descripcion}</td>
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
                    <button onClick={exportarPDF} className="boton-exportar">
                        📄 Exportar a PDF
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
                itemsDeEstado={getEstados} // Aquí pasas los datos que el modal necesita
                descripcionDeEstado={getDescripcion} // Aquí pasas la descripción del proyecto
            />
        </>
    );
};

export default Popa;
