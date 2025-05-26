import React from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { useSpring, animated } from '@react-spring/web';
import HistorialEstado from '../HistorialEstado/HistorialEstado';

const Fade = React.forwardRef(function Fade(props, ref) {
    const {
        children, in: open, onEnter, onExited, ...other
    } = props;

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
        // @ts-expect-error
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const HistorialModal = ({ open, onClose, itemsDeEstado }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
        >
            <Fade in={open}>
                <Box sx={modalStyle}>
                    <HistorialEstado itemsDeEstado={[
                        { id: 1, nombre: 'Inicio', tipo: 'pendiente', descripcion: 'Proyecto creado' },
                        { id: 2, nombre: 'En curso', tipo: 'avanzando' },
                        { id: 3, nombre: 'Finalizado', tipo: 'completado', descripcion: 'Proyecto finalizado' }
                    ]} />
                </Box>
            </Fade>
        </Modal>
    );
};

export default HistorialModal;
