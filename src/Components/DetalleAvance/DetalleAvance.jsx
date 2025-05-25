import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const DetalleAvance = ({ open, onClose, avance }) => {
  if (!avance) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-avance-titulo"
      aria-describedby="modal-avance-descripcion"
    >
      <Box sx={style}>
        <Typography variant="h6" id="modal-avance-titulo" gutterBottom>
          {avance.nombre}
        </Typography>
        <Typography variant="body1"><strong>Descripción:</strong> {avance.descr}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}><strong>Fecha:</strong> {avance.fecha}</Typography>

        {/* Aquí puedes mostrar imágenes si avance.fotos es un arreglo de URLs */}
        {avance.fotos && avance.fotos.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <Typography variant="body2"><strong>Fotos:</strong></Typography>
            {avance.fotos.map((foto, idx) => (
              <img
                key={idx}
                src={foto}
                alt={`Foto ${idx + 1}`}
                style={{ width: '100%', marginTop: '0.5rem', borderRadius: 4 }}
              />
            ))}
          </div>
        )}

        <Button onClick={onClose} sx={{ mt: 2 }} variant="outlined" fullWidth>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default DetalleAvance;