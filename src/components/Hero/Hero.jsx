// src/components/Hero/Hero.jsx
import React from 'react';
import { Box, Typography, useTheme, styled } from '@mui/material';

// Стили для фоновых линий
const HeroLines = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '3px',
  background: 'linear-gradient(to right, rgba(68, 19, 178, 0.2), rgba(68, 19, 178, 0.5))',
  filter: 'blur(5px)',
  transformOrigin: 'center',
}));

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      className="hero"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: { xs: '60vh', sm: '70vh', md: '90vh' },
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        padding: { xs: '0 1rem', sm: '0 2rem', md: '0 var(--horizontal-padding)' },
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Фоновые линии */}
      <HeroLines sx={{ top: '30%', transform: 'rotate(10deg)' }} />
      <HeroLines
        sx={{
          top: '50%',
          transform: 'rotate(-10deg)',
          background: 'linear-gradient(to left, rgba(68, 19, 178, 0.2), rgba(68, 19, 178, 0.5))',
        }}
      />
      <HeroLines sx={{ top: '70%', transform: 'rotate(5deg)' }} />

      {/* Контейнер контента */}
      <Box
        sx={{
          zIndex: 2,
          position: 'relative',
          textAlign: 'center',
          padding: { xs: '1rem', sm: '2rem', md: '0' },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem', md: '5rem' },
            color: theme.palette.primary.main,
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          ФОТОСАЛОН <br /> В НИЖНЕМ НОВГОРОДЕ
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
