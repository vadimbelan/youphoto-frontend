// src/components/Modals/ManagerPanel.jsx
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Modal,
} from '@mui/material';
import useOrders from '../../hooks/useOrders';

const ManagerPanel = ({ onClose, onLogout }) => {
  const {
    managerOrders,
    managerSelectedOrder,
    fetchManagerOrders,
    fetchManagerOrderDetails,
    updateManagerOrderStatus,
    setManagerSelectedOrder,
  } = useOrders();

  const [selectedPhoto, setSelectedPhoto] = useState(null); // Для хранения выбранного фото
  const managerStatuses = ['Pending', 'In Progress', 'Transferred for delivery', 'Done'];

  useEffect(() => {
    fetchManagerOrders();
  }, [fetchManagerOrders]);

  const handleManagerStatusChange = (e) => {
    if (!managerSelectedOrder) return;
    setManagerSelectedOrder({ ...managerSelectedOrder, status: e.target.value });
  };

  const handleApplyChanges = () => {
    if (managerSelectedOrder) {
      updateManagerOrderStatus(managerSelectedOrder.orderID, managerSelectedOrder.status);
    }
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo); // Установить выбранное фото
  };

  const handleClosePhotoModal = () => {
    setSelectedPhoto(null); // Закрыть модальное окно
  };

  return (
    <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Панель менеджера
      </Typography>

      <Grid container spacing={2} sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Список всех заказов
            </Typography>
            {managerOrders.length > 0 ? (
              managerOrders.map((order) => (
                <Paper
                  key={order.orderID}
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 1,
                    cursor: 'pointer',
                    backgroundColor:
                      managerSelectedOrder && managerSelectedOrder.orderID === order.orderID
                        ? 'rgba(100, 179, 166, 0.1)'
                        : 'inherit',
                    '&:hover': { backgroundColor: 'rgba(100, 179, 166, 0.05)' },
                  }}
                  onClick={() => fetchManagerOrderDetails(order.orderID)}
                >
                  <Typography variant="subtitle1">
                    <strong>ID заказа:</strong> {order.orderID}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Статус:</strong> {order.status}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Клиент ID:</strong> {order.clientID}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Дата создания:</strong>{' '}
                    {new Date(order.dateCreated).toLocaleString('ru-RU')}
                  </Typography>
                </Paper>
              ))
            ) : (
              <Typography>Нет доступных заказов.</Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Детали заказа
          </Typography>
          {managerSelectedOrder ? (
            <Box
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                height: '90%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Детали заказа {managerSelectedOrder.orderID}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography>
                  <strong>Статус:</strong>
                </Typography>
                <FormControl sx={{ minWidth: 200, ml: 2 }} size="small">
                  <InputLabel>Статус</InputLabel>
                  <Select
                    label="Статус"
                    value={managerSelectedOrder.status}
                    onChange={handleManagerStatusChange}
                  >
                    {managerStatuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Typography gutterBottom>
                <strong>Дата создания:</strong> {new Date(managerSelectedOrder.dateCreated).toLocaleString('ru-RU')}
              </Typography>
              <Typography gutterBottom>
                <strong>Клиент ID:</strong> {managerSelectedOrder.clientID}
              </Typography>
              <Typography gutterBottom>
                <strong>Метод доставки:</strong>{' '}
                {managerSelectedOrder.deliveryMethodID === '1' ? 'Самовывоз' : 'Курьер'}
              </Typography>
              <Typography gutterBottom>
                <strong>Адрес:</strong> {managerSelectedOrder.address || 'Не указан'}
              </Typography>
              <Typography gutterBottom>
                <strong>Опция декора:</strong>{' '}
                {managerSelectedOrder.decorationOptionID === '1'
                  ? 'Рамка'
                  : managerSelectedOrder.decorationOptionID === '2'
                  ? 'Холст'
                  : 'Без декора'}
              </Typography>
              <Typography gutterBottom>
                <strong>Комментарии:</strong> {managerSelectedOrder.comments || 'Отсутствуют'}
              </Typography>
              <Typography gutterBottom>
                <strong>Общая стоимость:</strong> {managerSelectedOrder.totalPrice} руб.
              </Typography>
              <Typography gutterBottom>
                <strong>Количество:</strong> {managerSelectedOrder.quantity}
              </Typography>

              {managerSelectedOrder.photos && managerSelectedOrder.photos.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography gutterBottom>
                    <strong>Загруженные фотографии:</strong>
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {managerSelectedOrder.photos.map((photo, index) => (
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
                          cursor: 'pointer',
                        }}
                        onClick={() => handlePhotoClick(photo)}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleApplyChanges}
                fullWidth
              >
                Применить изменения
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                p: 2,
                border: '1px dashed',
                borderColor: 'grey.300',
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Выберите заказ.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
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
          Закрыть панель
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
          Выйти из аккаунта
        </Button>
      </Box>

      {/* Модальное окно для увеличения фотографий */}
      <Modal open={!!selectedPhoto} onClose={handleClosePhotoModal}>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: '90%',
            maxHeight: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src={`data:image/jpeg;base64,${selectedPhoto}`}
            alt="Увеличенное фото"
            sx={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            component="a"
            href={`data:image/jpeg;base64,${selectedPhoto}`}
            download={`photo_${new Date().getTime()}.jpg`}
          >
            Скачать
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManagerPanel;
