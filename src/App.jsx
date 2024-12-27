// src/App.jsx
import React, { Suspense, lazy } from 'react';
import Header from './components/Header/Header';
import { Box, CircularProgress } from '@mui/material';

// Ленивая загрузка компонентов
const Hero = lazy(() => import('./components/Hero/Hero'));
const About = lazy(() => import('./components/About/About'));
const Packages = lazy(() => import('./components/Packages/Packages'));
const Prices = lazy(() => import('./components/Prices/Prices'));
const Contacts = lazy(() => import('./components/Contacts/Contacts'));
const Footer = lazy(() => import('./components/Footer/Footer'));

const App = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Suspense
        fallback={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <Hero />
        <About />
        <Packages />
        <Prices />
        <Contacts />
        <Footer />
      </Suspense>
    </Box>
  );
};

export default App;
