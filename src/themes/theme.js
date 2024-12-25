// src/themes/theme.js
import { createTheme } from '@mui/material/styles';

// Создание базовой темы
const theme = createTheme({
  palette: {
    primary: {
      main: '#4413b2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    error: {
      main: '#FF5252',
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FFC107',
    },
    info: {
      main: '#2196F3',
    },
  },
  typography: {
    fontFamily: 'Verdana, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
      [createTheme().breakpoints.up('md')]: {
        fontSize: '5rem',
      },
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 700,
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
      [createTheme().breakpoints.up('md')]: {
        fontSize: '4rem',
      },
    },
    // Добавьте другие заголовки и стили по необходимости
  },
  shape: {
    borderRadius: 12,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 700,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    // Добавьте стили для других компонентов MUI по необходимости
  },
});

export default theme;
