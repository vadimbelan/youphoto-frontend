// src/components/Modals/OrderDetailsModal.jsx
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  useTheme,
} from '@mui/material';

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  const theme = useTheme();

  if (!order) return null;

  const {
    orderID,
    status,
    dateCreated,
    deliveryMethodID,
    address,
    decorationOptionID,
    comments,
    totalPrice,
    quantity,
    photos,
  } = order;

  const getDecorationName = (id) => {
    switch (parseInt(id, 10)) {
      case 0:
        return 'Без декора';
      case 1:
        return 'Рамка';
      case 2:
        return 'Холст';
      default:
        return 'Неизвестно';
    }
  };

  const getDeliveryMethodName = (id) => {
    switch (parseInt(id, 10)) {
      case 1:
        return 'Самовывоз';
      case 2:
        return 'Курьер';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500 },
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Детали заказа {orderID}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography gutterBottom>
          <strong>Статус:</strong> {status}
        </Typography>
        <Typography gutterBottom>
          <strong>Дата создания:</strong> {new Date(dateCreated).toLocaleString('ru-RU')}
        </Typography>
        <Typography gutterBottom>
          <strong>Метод доставки:</strong> {getDeliveryMethodName(deliveryMethodID)}
        </Typography>
        <Typography gutterBottom>
          <strong>Адрес:</strong> {address || 'Не указан'}
        </Typography>
        <Typography gutterBottom>
          <strong>Опция декора:</strong> {getDecorationName(decorationOptionID)}
        </Typography>
        <Typography gutterBottom>
          <strong>Комментарии:</strong> {comments || 'Отсутствуют'}
        </Typography>
        <Typography gutterBottom>
          <strong>Общая стоимость:</strong> {totalPrice} руб.
        </Typography>
        <Typography gutterBottom>
          <strong>Количество:</strong> {quantity}
        </Typography>

        {photos && photos.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {photos.map((photo, index) => (
              <Box
                component="img"
                key={index}
                src={`data:image/jpeg;base64,${photo}`}
                alt={`Фото ${index + 1}`}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 1,
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  ':hover': { transform: 'scale(1.05)' },
                }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ mt: 'auto' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            fullWidth
            sx={{
              borderRadius: '12px',
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: 700,
              mt: 2,
            }}
          >
            Закрыть
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default OrderDetailsModal;
