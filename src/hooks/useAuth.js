// src/hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Получение данных из localStorage при инициализации
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (storedUsername) setLoggedInUser(storedUsername);
    if (storedRole) setUserRole(parseInt(storedRole, 10));

    // Установка базового URL для axios
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Функция входа
  const login = useCallback(async (username, password) => {
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.post('/api/user/login', {
        Username: username,
        Password: password,
      });

      const { token, role } = response.data;

      // Сохранение данных в localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);

      // Установка заголовков для последующих запросов
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setLoggedInUser(username);
      setUserRole(parseInt(role, 10));
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setError(err.response?.data?.message || 'Ошибка при входе');
    }
  }, []);

  // Функция регистрации
  const registerUser = useCallback(async (formData) => {
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.post('/api/user/register', {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone || null,
        password: formData.password,
        role: 0, // По умолчанию роль пользователя
      });

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации');
    }
  }, []);

  // Функция выхода
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setLoggedInUser(null);
    setUserRole(null);
    setError(null);
    setSuccess(false);
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  return {
    loggedInUser,
    userRole,
    error,
    success,
    login,
    registerUser,
    logout,
    setError,
    setSuccess,
  };
};

export default useAuth;
