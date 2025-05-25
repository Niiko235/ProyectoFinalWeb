import React from 'react';
import './HistorialEstado.css'; // CSS con nombres actualizados

// Función auxiliar para mapear tipos de estado a clases CSS para el indicador
const obtenerClaseIndicador = (tipoEstado) => {
  switch (tipoEstado) {
    case 'completado':
      return 'completado';
    case 'avanzando':
      return 'avanzando';
    case 'pendiente':
      return 'pendiente';
    case 'error':
      return 'error';
    default:
      return 'defecto'; // Clase por defecto
  }
};

const HistorialEstado = ({ itemsDeEstado }) => {
  if (!itemsDeEstado || itemsDeEstado.length === 0) {
    return (
      <div className="contenedor-historial-estados">
        <h2 className="titulo-historial-estados">Historial de estado</h2>
        <p>No hay estados para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="contenedor-historial-estados">
      <h2 className="titulo-historial-estados">Historial de estado</h2>
      {itemsDeEstado.map((item, index) => (
        <div className="item-estado" key={item.id || index}> {/* Es mejor usar un id único si está disponible */}
          <div
            className={`indicador-estado ${obtenerClaseIndicador(item.tipo)}`}
          ></div>
          <div className="detalles-estado">
            <p className="nombre-estado">{item.nombre}</p>
            {item.descripcion && (
              <p className="descripcion-estado">{item.descripcion}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistorialEstado;