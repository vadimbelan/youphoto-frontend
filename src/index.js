// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Не удалось найти корневой элемент с id "root".');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Нормализует стили браузера */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
