// src/resources/coordinadorProyectos/ProyectoVistaPersonalizada.jsx
import { useParams } from 'react-router-dom';
import { useGetOne } from 'react-admin';

// import './ProyectoVista.css'; // tu estilo propio

const CoordinadorProyectoVista = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOne('proyectos', { id: Number(id) });

  console.log(data);

  if (isLoading) return <p>Cargando proyecto...</p>;
  if (error) return <p>Error al cargar proyecto</p>;

  return (
    <div className="proyecto-vista">
      <h1>{data.titulo}</h1>
      <p><strong>Área:</strong> {data.area}</p>
      <p><strong>Objetivos:</strong> {data.objetivos}</p>
      <p><strong>Cronograma:</strong> {data.cronograma}</p>
      <p><strong>Presupuesto:</strong> ${data.presupuesto}</p>
      <p><strong>Institución:</strong> {data.institucion}</p>
      <p><strong>Estado:</strong> {data.estado}</p>
    </div>
  );
};

export default CoordinadorProyectoVista;
