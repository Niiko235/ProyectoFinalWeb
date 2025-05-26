import { useParams } from 'react-router-dom';
import { useGetOne } from 'react-admin';
const CoordinadorProyectoVista = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOne('projects', { id });
  if (isLoading) return <p>Cargando proyecto...</p>;
  if (error) return <p>Error al cargar proyecto</p>;

  return (
    <div className="proyecto-vista">
      <h1>{data.title}</h1>
      <p><strong>Área:</strong> {data.area}</p>
      <p><strong>Objetivos:</strong> {data.goals}</p>
      <p><strong>Cronograma:</strong> {data.cronograma}</p>
      <p><strong>Presupuesto:</strong> ${data.price}</p>
      <p><strong>Institución:</strong> {data.institution}</p>
      <p><strong>Estado:</strong> {data.status}</p>
    </div>
  );
};

export default CoordinadorProyectoVista;
