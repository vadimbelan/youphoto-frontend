// src/components/Footer/Footer.jsx
import React from 'react';
import { Box, Typography, useTheme, styled } from '@mui/material';

// Стили для контейнера футера
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '2rem var(--horizontal-padding)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  maxWidth: '1140px',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    padding: '1.5rem var(--horizontal-padding)',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    gap: '1rem',
  },
}));

// Стили для элементов футера
const FooterText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  textAlign: 'center',
  margin: '0.5rem 0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.95rem',
  },
}));

const Footer = () => {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ backgroundColor: theme.palette.background.default, mb: '2rem' }}>
      {/* Верхняя линия */}
      <Box
        sx={{
          borderTop: `2px solid ${theme.palette.primary.main}`,
          width: '100%',
          marginBottom: '1.5rem',
        }}
      />

      {/* Контент футера */}
      <FooterContainer>
        <FooterText>
          ПРОЕКТИРОВАНИЕ И АРХИТЕКТУРА ПРОГРАММНЫХ СИСТЕМ
        </FooterText>
        <FooterText>
          БЕЛАН ВАДИМ, САВЧУК АНТОН, ЖАТКИН ВЯЧЕСЛАВ
        </FooterText>
      </FooterContainer>
    </Box>
  );
};

export default Footer;
