// src/components/UserPanel/UserOrders.jsx
import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import useOrders from '../../hooks/useOrders';
import OrderDetailsModal from '../Modals/OrderDetailsModal';

const UserOrders = () => {
  const {
    orders,
    selectedOrder,
    orderError,
    fetchUserOrders,
    fetchOrderDetails,
    setSelectedOrder,
  } = useOrders();

  // Локальный стейт для управления открытием модального окна
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  const handleOrderClick = async (orderId) => {
    await fetchOrderDetails(orderId);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
    setDetailsOpen(false);
  };

  return (
    <Box sx={{ padding: '1rem' }}>
      <Typography variant="h6" align="center" sx={{ fontWeight: 700, fontSize: '1.125rem', mb: 3 }}>
        Мои заказы
      </Typography>

      {orderError && (
        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
          {orderError}
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Paper
              key={order.orderID}
              variant="outlined"
              sx={{
                p: 2,
                cursor: 'pointer',
                borderRadius: '12px',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(100, 179, 166, 0.1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
              }}
              onClick={() => handleOrderClick(order.orderID)}
            >
              <Typography variant="subtitle1">
                <strong>ID заказа:</strong> {order.orderID}
              </Typography>
              <Typography variant="body2">
                <strong>Дата создания:</strong> {new Date(order.dateCreated).toLocaleString('ru-RU')}
              </Typography>
              <Typography variant="body2">
                <strong>Статус:</strong> {order.status}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography align="center">У вас пока нет заказов.</Typography>
        )}
      </Box>

      {/* Модальное окно с деталями заказа */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={detailsOpen}
        onClose={handleCloseDetails}
      />
    </Box>
  );
};

export default UserOrders;
