// src/components/Prices/Prices.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  styled,
} from '@mui/material';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const services = [
  {
    category: 'Фото',
    items: [
      { name: 'Фотопечать 10x15', price: '50₽ за штуку' },
      { name: 'Фотопечать 15x20', price: '100₽ за штуку' },
    ],
  },
  {
    category: 'Видео',
    items: [{ name: 'Видеосъемка на час', price: '5000₽' }],
  },
  {
    category: 'Печать',
    items: [
      { name: 'Печать на холсте', price: '3000₽' },
      { name: 'Печать на футболке', price: '1500₽' },
    ],
  },
  {
    category: 'Аренда',
    items: [{ name: 'Аренда фотостудии', price: '1000₽ за час' }],
  },
];

// Styled component for the background icon
const BackgroundIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '55%',
  transform: 'translate(-50%, -50%) rotate(-20deg)',
  color: 'rgba(68, 19, 178, 0.1)',
  fontSize: '35rem',
  pointerEvents: 'none',
  filter: 'blur(25px)',
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

const Prices = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      component="section"
      id="prices"
      sx={{
        position: 'relative',
        padding: {
          xs: '3rem 1rem',
          sm: '4rem 2rem',
          md: '6rem var(--horizontal-padding)',
        },
        minHeight: '70vh',
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
      }}
    >
      {/* Background Icons */}
      <BackgroundIcon sx={{ left: '100%' }}>
        <CurrencyRubleIcon sx={{ fontSize: 'inherit' }} />
      </BackgroundIcon>
      <BackgroundIcon sx={{ right: '100%', left: 'auto', transform: 'translate(50%, -50%) rotate(20deg) scaleX(-1)' }}>
        <CurrencyRubleIcon sx={{ fontSize: 'inherit' }} />
      </BackgroundIcon>

      {/* Content Container */}
      <Box
        sx={{
          zIndex: 2,
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
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
          Цены
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {services.map((service, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
              sx={{
                backgroundColor: theme.palette.background.paper,
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: '12px',
                '&:before': {
                  display: 'none',
                },
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                '&.Mui-expanded': {
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                sx={{
                  backgroundColor: theme.palette.background.paper,

                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.paper,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    fontWeight: 700,
                  }}
                >
                  {service.category}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {service.items.map((item, itemIndex) => (
                  <Typography
                    key={itemIndex}
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.name} - {item.price}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Prices;
