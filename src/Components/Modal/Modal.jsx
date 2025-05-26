import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { useAuth } from '../../Context/authContext'; // Asegúrate de que la ruta sea correcta

const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) onEnter(null, true);
    },
    onRest: () => {
      if (!open && onExited) onExited(null, true);
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};



const ModalBoton = ({idProyecto}) => {

  const { crearAvance } = useAuth();

  const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fecha: '',
    descripcion: '',
    archivos: [],
  });

   // Asegúrate de que guardarAvance esté definido en tu contexto
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ fecha: '', descripcion: '', archivos: [] });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        archivos: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const guardarAvance = ({ fecha, descripcion, archivos }) => {
    crearAvance(idProyecto, fecha, descripcion, archivos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.archivos.length === 0) {
      alert("Selecciona al menos un archivo.");
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = formData.archivos.map(async (file) => {
        const dataForm = new FormData();
        dataForm.append("file", file);
        dataForm.append("upload_preset", "proyectoWeb");
        dataForm.append("resource_type", "auto");

        const res = await fetch("https://api.cloudinary.com/v1_1/dmmfoz71f/auto/upload", {
          method: "POST",
          body: dataForm,
        });

        const data = await res.json();
        return data.secure_url;
      });

      const urls = await Promise.all(uploadPromises);

      guardarAvance({
        fecha: formData.fecha,
        descripcion: formData.descripcion,
        archivos: urls,
      });

      handleClose();
    } catch (error) {
      console.error("Error al subir archivos:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Agregar Avance
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography id="spring-modal-title" variant="h6" component="h2" mb={2}>
              Nuevo Avance
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Fecha"
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
              <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
                Cargar Fotos / Videos
                <input
                  type="file"
                  name="archivos"
                  hidden
                  multiple
                  onChange={handleChange}
                  accept="image/*,video/*"
                />
              </Button>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={uploading}>
                {uploading ? "Subiendo..." : "Guardar Avance"}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalBoton;
