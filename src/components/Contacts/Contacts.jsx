// src/components/Contacts/Contacts.jsx
import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Link as MuiLink,
  useTheme,
  Grid,
  Button,
} from '@mui/material';
import { FaVk, FaTelegramPlane, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import RoomIcon from '@mui/icons-material/Room';
import DirectionsIcon from '@mui/icons-material/Directions';

const socialLinks = [
  { icon: <FaVk />, label: 'VK', href: 'https://vk.com/yourprofile' },
  { icon: <FaTelegramPlane />, label: 'Telegram', href: 'https://t.me/yourprofile' },
  { icon: <FaWhatsapp />, label: 'WhatsApp', href: 'https://wa.me/yournumber' },
  { icon: <FaInstagram />, label: 'Instagram', href: 'https://instagram.com/yourprofile' },
];

const Contacts = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        padding: { xs: '3rem 1rem', sm: '4rem 2rem', md: '6rem var(--horizontal-padding)' },
        minHeight: '65vh',
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
      }}
    >
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
          Контакты
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
          {/* Карта */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                position: 'relative',
                paddingTop: '56.25%', // Соотношение сторон 16:9
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: theme.shadows[3],
              }}
            >
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=43.980162%2C56.297962&z=17&lang=ru_RU"
                title="Местоположение"
                frameBorder="0"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: '0',
                }}
              ></iframe>
            </Box>
          </Grid>

          {/* Информация о контактах */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                alignItems: { xs: 'center', md: 'flex-start' },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography variant="h5" sx={{ fontSize: '1.8rem', fontWeight: 700 }}>
                +7 (977) 000-00-00
              </Typography>
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    component={MuiLink}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: theme.palette.text.primary,
                      transition: 'color 0.3s ease, transform 0.3s ease',
                      '&:hover': {
                        color:
                          social.label === 'VK'
                            ? '#4c75a3'
                            : social.label === 'Telegram'
                            ? '#0088cc'
                            : social.label === 'WhatsApp'
                            ? '#25d366'
                            : social.label === 'Instagram'
                            ? '#e4405f'
                            : theme.palette.primary.main,
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <RoomIcon color="primary" />
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  НИЖНИЙ НОВГОРОД, <br /> ПРОСП. ГАГАРИНА, 23, К. 6 <br /> ЭТАЖ 4, КАБИНЕТ 401
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<DirectionsIcon />}
                sx={{
                  border: '2px solid',
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  borderRadius: '15px',
                  fontWeight: 700,
                  padding: '0.8rem 1.5rem',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.paper,
                  },
                }}
                href="#"
              >
                Построить маршрут
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Дополнительная информация */}
        <Box sx={{ marginTop: '2rem' , mb: 3}}>
          <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 700 }}>
            ПО ПРИБЫТИИ НА МЕСТО СОВЕТУЕМ ПОСМОТРЕТЬ{' '} <br />
            <MuiLink
              href="#"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              КАК ПРОЙТИ
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Contacts;
