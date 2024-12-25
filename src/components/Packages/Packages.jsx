// src/components/Packages/Packages.jsx
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, useTheme, styled } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MovieIcon from '@mui/icons-material/Movie';

const packagesData = [
  {
    icon: <AssignmentIcon fontSize="large" />,
    title: 'Фотосалон на 2 часа',
    price: '1500 ₽',
    description: 'Подходит для стандартных съемок.',
  },
  {
    icon: <VideoLibraryIcon fontSize="large" />,
    title: 'Фотосалон на 4 часа',
    price: '3000 ₽',
    description: 'Для профессиональных портфолио.',
  },
  {
    icon: <MovieIcon fontSize="large" />,
    title: 'Фотосалон на 24 часа',
    price: '5000 ₽',
    description: 'Идеально для свадебных и рекламных съемок.',
  },
];

// Styled component for background lines
const LinesBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '3px',
  background: 'linear-gradient(to right, rgba(68, 19, 178, 0.2), rgba(68, 19, 178, 0.5))',
  filter: 'blur(5px)',
  transformOrigin: 'center',
}));

const Packages = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="packages"
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        padding: {
          xs: '3rem 1rem',
          sm: '4rem 2rem',
          md: '6rem var(--horizontal-padding)',
        },
        minHeight: '80vh',
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
      }}
    >
      {/* Фоновые линии */}
      <LinesBackground sx={{ top: '20%', transform: 'rotate(-5deg)' }} />
      <LinesBackground
        sx={{
          top: '45%',
          transform: 'rotate(8deg)',
          background: 'linear-gradient(to left, rgba(68, 19, 178, 0.2), rgba(68, 19, 178, 0.5))',
        }}
      />
      <LinesBackground sx={{ top: '75%', transform: 'rotate(-8deg)' }} />

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
          Аренда
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {packagesData.map((pkg, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  border: `2px solid ${theme.palette.primary.main}`,
                  borderRadius: '12px',
                  padding: '2rem',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.paper,
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto',
                    fontSize: '2rem',
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  {pkg.icon}
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.6rem' },
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    marginBottom: '1rem',
                  }}
                >
                  {pkg.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                    marginBottom: '1.5rem',
                  }}
                >
                  {pkg.price}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                    color: theme.palette.text.secondary,
                    marginBottom: '1rem',
                  }}
                >
                  {pkg.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.paper,
                    borderRadius: '24px',
                    fontSize: '1rem',
                    padding: '0.5rem 1.5rem',
                    fontWeight: 700,
                    transition: 'background-color 0.3s ease, transform 0.2s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Забронировать
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Packages;
