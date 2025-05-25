// src/customTheme.js
import { createTheme } from '@mui/material/styles';

const Tema = createTheme({
  palette: {
    primary: {
      main: '#0033cc', // Color para la barra superior y botones primarios
    },
    secondary: {
      main: '#f7ff00', // Puedes usarlo en botones secundarios u otros elementos
    },
    background: {
      default: '#e6ecff', // Color de fondo principal del dashboard
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#e6ecff', // Color específico de la AppBar
        },
      },
    },
  },
});

export default Tema;
