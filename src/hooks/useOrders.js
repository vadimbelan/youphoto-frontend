// src/hooks/useOrders.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderError, setOrderError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [managerOrders, setManagerOrders] = useState([]);
  const [managerSelectedOrder, setManagerSelectedOrder] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  // =============================
  //          ПОЛЬЗОВАТЕЛЬ
  // =============================
  const fetchUserOrders = useCallback(async () => {
    setOrderError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Пользователь не аутентифицирован.');
      
      const response = await axios.get(`${API_URL}/api/order/fetch-user-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (err) {
      setOrderError(err.response?.data?.message || err.message || 'Ошибка при получении заказов');
    }
  }, [API_URL]);

  const fetchOrderDetails = useCallback(async (orderId) => {
    setOrderError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Пользователь не аутентифицирован.');

      const response = await axios.get(`${API_URL}/api/order/track/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedOrder(response.data);
    } catch (err) {
      setOrderError(err.response?.data?.message || err.message || 'Ошибка при получении деталей заказа');
    }
  }, [API_URL]);

  const createOrder = useCallback(async (orderFormData) => {
    setOrderError(null);
    setOrderSuccess(false);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Пользователь не аутентифицирован.');

      const response = await axios.post(`${API_URL}/api/order/create`, orderFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setOrderSuccess(true);
        await fetchUserOrders(); // Обновление списка заказов после создания
      }
    } catch (err) {
      setOrderError(err.response?.data?.message || err.message || 'Ошибка при создании заказа. Попробуйте снова.');
    }
  }, [API_URL, fetchUserOrders]);

  // =============================
  //          МЕНЕДЖЕР
  // =============================
  const fetchManagerOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Менеджер не аутентифицирован.');

      const response = await axios.get(`${API_URL}/api/manager/view-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setManagerOrders(response.data);
    } catch (err) {
      console.error('Ошибка при получении заказов менеджера:', err);
    }
  }, [API_URL]);

  const fetchManagerOrderDetails = useCallback(async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Менеджер не аутентифицирован.');

      const response = await axios.get(`${API_URL}/api/order/track/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setManagerSelectedOrder(response.data);
    } catch (err) {
      console.error('Ошибка при запросе деталей (менеджер):', err);
    }
  }, [API_URL]);

  const updateManagerOrderStatus = useCallback(async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Менеджер не аутентифицирован.');

      const formDataToSend = new FormData();
      formDataToSend.append('OrderID', orderId);
      formDataToSend.append('Status', newStatus);

      await axios.post(`${API_URL}/api/order/update`, formDataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Обновление локального состояния
      setManagerOrders((prev) =>
        prev.map((order) =>
          order.orderID === orderId ? { ...order, status: newStatus } : order
        )
      );
      setManagerSelectedOrder((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    } catch (err) {
      console.error('Ошибка при обновлении статуса (менеджер):', err);
    }
  }, [API_URL]);

  return {
    // Пользовательские функции и состояния
    orders,
    selectedOrder,
    orderError,
    orderSuccess,
    fetchUserOrders,
    fetchOrderDetails,
    createOrder,

    // Менеджерские функции и состояния
    managerOrders,
    managerSelectedOrder,
    fetchManagerOrders,
    fetchManagerOrderDetails,
    updateManagerOrderStatus,
    setSelectedOrder,
    setManagerSelectedOrder,
    setOrderError,
    setOrderSuccess,
  };
};

export default useOrders;
