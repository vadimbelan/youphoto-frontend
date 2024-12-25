// src/components/About/About.jsx
import React from 'react';
import { Box, Typography, Grid, useTheme, styled } from '@mui/material';
import { FaUser, FaHome, FaClock, FaStar } from 'react-icons/fa';

const features = [
  { icon: <FaUser />, text: 'Команда профессионалов' },
  { icon: <FaHome />, text: 'Заказы из дома' },
  { icon: <FaClock />, text: 'Быстрая обработка' },
  { icon: <FaStar />, text: 'Высокое качество' },
];

// Стили для фоновой иконки
const BackgroundIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '55%',
  left: '100%',
  transform: 'translate(-50%, -50%) rotate(-20deg)',
  color: 'rgba(68, 19, 178, 0.1)',
  fontSize: '40rem',
  pointerEvents: 'none',
  filter: 'blur(40px)',
  [theme.breakpoints.down('md')]: {
    fontSize: '20rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '15rem',
  },
  [theme.breakpoints.down('xs')]: {
    display: 'none',
  },
}));

const BackgroundIconMirror = styled(BackgroundIcon)(({ theme }) => ({
  left: '0%',
  transform: 'translate(-50%, -50%) rotate(20deg)',
}));

const About = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="about"
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        padding: { xs: '3rem 1rem', sm: '4rem 2rem', md: '6rem var(--horizontal-padding)' },
        minHeight: '70vh',
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
      }}
    >
      {/* Фоновые иконки */}
      <BackgroundIcon>
        <FaStar />
      </BackgroundIcon>
      <BackgroundIconMirror>
        <FaStar />
      </BackgroundIconMirror>

      {/* Контейнер контента */}
      <Box
        sx={{
          zIndex: 2,
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          paddingX: { xs: '0.5rem', sm: '1rem', md: '2rem' },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '5rem' },
            color: theme.palette.primary.main,
            fontWeight: 700,
            marginBottom: '3rem',
          }}
        >
          Почему мы?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '2rem',
                  backgroundColor: theme.palette.background.paper,
                  border: `2px solid ${theme.palette.primary.main}`,
                  borderRadius: '15px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Box
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: '3rem',
                    marginBottom: '1rem',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  {feature.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
