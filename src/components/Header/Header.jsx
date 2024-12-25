// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import AuthModal from '../Modals/AuthModal';

const navItems = [
  { label: 'О НАС', href: '#about' },
  { label: 'АРЕНДА', href: '#packages' },
  { label: 'ЦЕНЫ', href: '#prices' },
  { label: 'КОНТАКТЫ', href: '#contact' },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Обработчик открытия/закрытия Drawer
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  // Обработчик скролла для изменения стиля заголовка
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isScrolled ? 0 : 0}
        sx={{
          backgroundColor: theme.palette.background.paper,
          transition: 'background-color 0.3s ease, height 0.3s ease',
          height: isScrolled ? '70px' : '80px',
          justifyContent: 'center',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1140px', margin: '0 auto', width: '100%' }}>
          {/* Логотип */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="#hero"
            sx={{
              textDecoration: 'none',
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              fontSize: '1.5rem',
              '&:hover': { color: theme.palette.primary.dark },
            }}
          >
            ФОТОСАЛОН
          </Typography>

          {/* Навигация */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: '1.5rem' }}>
              {navItems.map((item) => (
                <Typography
                  key={item.label}
                  component={MuiLink}
                  href={item.href}
                  sx={{
                    textDecoration: 'none',
                    color: theme.palette.text.primary,
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          ) : (
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Действия */}
          {!isMobile && (
            <Button
              variant="outlined"
              onClick={() => setIsAuthModalOpen(true)}
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                borderWidth: '2px',
                borderRadius: '12px',
                fontWeight: '700',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.paper,
                },
              }}
            >
              МОЙ ПРОФИЛЬ
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Мобильное меню */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 250, backgroundColor: theme.palette.background.paper },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.label} onClick={toggleDrawer(false)}>
              <ListItemText>
                <Typography
                  component={MuiLink}
                  href={item.href}
                  sx={{
                    textDecoration: 'none',
                    color: theme.palette.text.primary,
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  {item.label}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
          <ListItem button onClick={() => { toggleDrawer(false)(); setIsAuthModalOpen(true); }}>
            <ListItemText>
              <Typography
                sx={{
                  textDecoration: 'none',
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: '1rem',
                  '&:hover': { color: theme.palette.primary.dark },
                }}
              >
                МОЙ ПРОФИЛЬ
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>

      {/* Модальное окно аутентификации */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;
