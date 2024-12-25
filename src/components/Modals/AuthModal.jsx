// src/components/Modals/AuthModal.jsx
import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import useAuth from '../../hooks/useAuth';
import UserPanel from '../UserPanel/UserPanel';
import ManagerPanel from './ManagerPanel';

const AuthModal = ({ onClose, isOpen }) => {
  const {
    loggedInUser,
    userRole,
    error,
    success,
    login,
    registerUser,
    logout,
    setError,
    setSuccess,
  } = useAuth();

  // Активная вкладка: 0 = «Вход», 1 = «Регистрация»
  const [activeTab, setActiveTab] = useState(0);

  // Данные форм (вход / регистрация)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  // Смена вкладок (Вход / Регистрация)
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError(null);
    setSuccess(false);
    setPasswordMismatch(false);
    // Сброс полей при переключении вкладок
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    });
  };

  // Обработка инпутов
  const handleChangeAuth = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Сабмит входа или регистрации
  const handleSubmitAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setPasswordMismatch(false);

    // Если вкладка «Вход»
    if (activeTab === 0) {
      await login(formData.username, formData.password);
      if (success) {
        onClose();
      }
    } else {
      // Вкладка «Регистрация»
      if (formData.password !== formData.confirmPassword) {
        setPasswordMismatch(true);
        return;
      }
      await registerUser(formData);
      if (success) {
        setActiveTab(0);
      }
    }
  };

  // Кнопка «Выйти»
  const handleLogout = () => {
    logout();
    onClose();
  };

  // =========================
  // ЕСЛИ вошли МЕНЕДЖЕРОМ
  // =========================
  if (loggedInUser && userRole === 1) {
    return (
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%' }, boxSizing: 'border-box' } }}
      >
        <ManagerPanel onClose={onClose} onLogout={handleLogout} />
      </Drawer>
    );
  }

  // =========================
  // ЕСЛИ вошли ПОЛЬЗОВАТЕЛЕМ
  // =========================
  if (loggedInUser && userRole === 0) {
    return (
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 }, boxSizing: 'border-box' } }}
      >
        <UserPanel onLogout={handleLogout} />
      </Drawer>
    );
  }

  // =========================
  // ЕСЛИ НЕ вошли
  // =========================
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 }, boxSizing: 'border-box' } }}
    >
      <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}
        >
          Личный кабинет
        </Typography>

        {/* Вкладки (Вход / Регистрация) */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Вход" sx={{ fontSize: '0.9rem' }} />
          <Tab label="Регистрация" sx={{ fontSize: '0.9rem' }} />
        </Tabs>

        {/* Содержимое вкладок */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {/* Вкладка Вход */}
          {activeTab === 0 && (
            <Box
              component="form"
              onSubmit={handleSubmitAuth}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                label="Логин"
                name="username"
                value={formData.username}
                onChange={handleChangeAuth}
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
              <TextField
                label="Пароль"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChangeAuth}
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  borderRadius: '12px',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                }}
              >
                Войти
              </Button>
            </Box>
          )}

          {/* Вкладка Регистрация */}
          {activeTab === 1 && (
            <Box
              component="form"
              onSubmit={handleSubmitAuth}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                label="Имя"
                name="name"
                value={formData.name}
                onChange={handleChangeAuth}
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
              <TextField
                label="Логин"
                name="username"
                value={formData.username}
                onChange={handleChangeAuth}
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
              <TextField
                label="Почта"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChangeAuth}
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
              <TextField
                label="Телефон"
                name="phone"
                value={formData.phone}
                onChange={handleChangeAuth}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
              <TextField
                label="Пароль"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChangeAuth}
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
              <TextField
                label="Подтвердите пароль"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChangeAuth}
                required
                error={passwordMismatch}
                helperText={passwordMismatch ? 'Пароли не совпадают' : ''}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  borderRadius: '12px',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                }}
              >
                Зарегистрироваться
              </Button>
            </Box>
          )}

          {/* Сообщение об ошибке */}
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {/* Сообщение об успехе (для вкладки Регистрация) */}
          {success && activeTab === 1 && (
            <Typography color="success.main" align="center" sx={{ mt: 2 }}>
              Регистрация прошла успешно! Пожалуйста, войдите в систему.
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Button
          variant="contained"
          color="secondary"
          onClick={onClose}
          fullWidth
          sx={{
            borderRadius: '12px',
            padding: '0.75rem',
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          Закрыть
        </Button>
      </Box>
    </Drawer>
  );
};

export default AuthModal;
