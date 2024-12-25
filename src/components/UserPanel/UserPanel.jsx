// src/components/UserPanel/UserPanel.jsx
import React, { useState } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import UserOrders from './UserOrders';
import MakeOrderForm from './MakeOrderForm';
import useAuth from '../../hooks/useAuth';

const UserPanel = ({ onLogout }) => {
  const [showMakeOrder, setShowMakeOrder] = useState(false);
  const { loggedInUser } = useAuth();

  const handleToggleMakeOrder = () => {
    setShowMakeOrder((prev) => !prev);
  };

  return (
    <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: 700, fontSize: '1.125rem', mb: 3 }}
      >
        Добро пожаловать, {loggedInUser}!
      </Typography>

      <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
        <Button
          variant="contained"
          onClick={handleToggleMakeOrder}
          fullWidth
          sx={{
            borderRadius: '12px',
            padding: '0.75rem',
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          {showMakeOrder ? 'Закрыть форму заказа' : 'Сделать заказ'}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onLogout}
          fullWidth
          sx={{
            borderRadius: '12px',
            padding: '0.75rem',
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          Выйти из профиля
        </Button>
      </Stack>

      {showMakeOrder ? (
        <Box sx={{ mt: 4, width: '100%', maxWidth: 600 }}>
          <MakeOrderForm />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 4, width: '100%' }}>
          <UserOrders />
        </Box>
      )}
    </Box>
  );
};

export default UserPanel;
