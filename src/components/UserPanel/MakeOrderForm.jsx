// src/components/UserPanel/MakeOrderForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import useOrders from '../../hooks/useOrders';

const MakeOrderForm = () => {
  const { createOrder, orderSuccess, orderError, setOrderError, setOrderSuccess } = useOrders();
  const [orderFormData, setOrderFormData] = useState({
    Photos: [],
    Format: '',
    Quantity: 1,
    DecorationOptionID: '0',
    DeliveryMethodID: '0',
    Address: '',
    Comments: '',
    TotalPrice: 0,
  });
  const [showAddressField, setShowAddressField] = useState(false);

  // Очистка сообщений об успехе и ошибке при размонтировании компонента
  useEffect(() => {
    return () => {
      setOrderError(null);
      setOrderSuccess(false);
    };
    // eslint-disable-next-line
  }, []);

  const handleOrderChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setOrderFormData((prev) => ({
        ...prev,
        Photos: Array.from(files),
      }));
    } else {
      setOrderFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const calculatePrice = () => {
    const basePrice = 100;
    const { Quantity, Format, DecorationOptionID } = orderFormData;

    let formatMultiplier = 1;
    if (Format === '15x20') formatMultiplier = 1.5;
    if (Format === '20x30') formatMultiplier = 2;

    let decorationCost = 0;
    if (DecorationOptionID === '1') decorationCost = 50;
    if (DecorationOptionID === '2') decorationCost = 100;

    return basePrice * Quantity * formatMultiplier + decorationCost;
  };

  useEffect(() => {
    setOrderFormData((prev) => ({
      ...prev,
      TotalPrice: calculatePrice(),
    }));
    // eslint-disable-next-line
  }, [orderFormData.Quantity, orderFormData.Format, orderFormData.DecorationOptionID]);

  const handleOrderDeliveryChange = (e) => {
    const deliveryMethodID = e.target.value;
    setOrderFormData((prev) => ({
      ...prev,
      DeliveryMethodID: deliveryMethodID,
      Address: deliveryMethodID === '2' ? prev.Address : '',
    }));
    setShowAddressField(deliveryMethodID === '2');
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrderError(null);
    setOrderSuccess(false);

    const formDataToSend = new FormData();
    for (let i = 0; i < orderFormData.Photos.length; i++) {
      formDataToSend.append('Photos', orderFormData.Photos[i]);
    }
    formDataToSend.append('Format', orderFormData.Format);
    formDataToSend.append('Quantity', orderFormData.Quantity);
    formDataToSend.append('DecorationOptionID', orderFormData.DecorationOptionID);
    formDataToSend.append('DeliveryMethodID', orderFormData.DeliveryMethodID);
    formDataToSend.append(
      'Address',
      orderFormData.DeliveryMethodID === '2' ? orderFormData.Address : '-'
    );
    formDataToSend.append('Comments', orderFormData.Comments);
    formDataToSend.append('TotalPrice', orderFormData.TotalPrice);

    await createOrder(formDataToSend);

    // Если успех - сбрасываем форму
    if (!orderError && orderSuccess) {
      setOrderFormData({
        Photos: [],
        Format: '',
        Quantity: 1,
        DecorationOptionID: '0',
        DeliveryMethodID: '0',
        Address: '',
        Comments: '',
        TotalPrice: 0,
      });
      setShowAddressField(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" align="center" sx={{ fontWeight: 700, fontSize: '1.125rem' }}>
        Сделать заказ
      </Typography>
      <form onSubmit={handleOrderSubmit}>
        {/* Фотографии */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Button
            variant="contained"
            component="label"
            sx={{
              borderRadius: '12px',
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: 700,
            }}
          >
            Загрузить фотографии
            <input
              type="file"
              id="Photos"
              name="Photos"
              multiple
              onChange={handleOrderChange}
              hidden
            />
          </Button>
          {orderFormData.Photos.length > 0 && (
            <Typography sx={{ mt: 1 }}>
              Выбрано файлов: {orderFormData.Photos.length}
            </Typography>
          )}
        </FormControl>

        {/* Формат */}
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel id="format-label">Формат фотографий</InputLabel>
          <Select
            labelId="format-label"
            id="Format"
            name="Format"
            value={orderFormData.Format}
            onChange={handleOrderChange}
            label="Формат фотографий"
          >
            <MenuItem value="10x15">10x15</MenuItem>
            <MenuItem value="15x20">15x20</MenuItem>
            <MenuItem value="20x30">20x30</MenuItem>
          </Select>
        </FormControl>

        {/* Количество */}
        <TextField
          label="Количество фотографий"
          name="Quantity"
          type="number"
          value={orderFormData.Quantity}
          onChange={handleOrderChange}
          inputProps={{ min: 1 }}
          required
          fullWidth
          sx={{ mb: 2 }}
        />

        {/* Декоративные опции */}
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel id="decoration-label">Декоративные опции</InputLabel>
          <Select
            labelId="decoration-label"
            id="DecorationOptionID"
            name="DecorationOptionID"
            value={orderFormData.DecorationOptionID}
            onChange={handleOrderChange}
            label="Декоративные опции"
          >
            <MenuItem value="0">Без декора</MenuItem>
            <MenuItem value="1">Рамка</MenuItem>
            <MenuItem value="2">Холст</MenuItem>
          </Select>
        </FormControl>

        {/* Метод доставки */}
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel id="delivery-label">Метод доставки</InputLabel>
          <Select
            labelId="delivery-label"
            id="DeliveryMethodID"
            name="DeliveryMethodID"
            value={orderFormData.DeliveryMethodID}
            onChange={handleOrderDeliveryChange}
            label="Метод доставки"
          >
            <MenuItem value="0">Выберите метод</MenuItem>
            <MenuItem value="1">Самовывоз</MenuItem>
            <MenuItem value="2">Курьер</MenuItem>
          </Select>
        </FormControl>

        {/* Адрес (только если «Курьер») */}
        {showAddressField && (
          <TextField
            label="Адрес"
            name="Address"
            value={orderFormData.Address}
            onChange={handleOrderChange}
            required={orderFormData.DeliveryMethodID === '2'}
            fullWidth
            sx={{ mb: 2 }}
          />
        )}

        {/* Комментарии */}
        <TextField
          label="Комментарий"
          name="Comments"
          value={orderFormData.Comments}
          onChange={handleOrderChange}
          multiline
          rows={2}
          fullWidth
        />

        {/* Цена */}
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
          Итоговая цена: {orderFormData.TotalPrice} руб.
        </Typography>

        {/* Кнопка отправки */}
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
            mt: 2,
          }}
        >
          Отправить заказ
        </Button>

        {/* Сообщения об ошибках и успехе */}
        {orderError && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {orderError}
          </Typography>
        )}
        {orderSuccess && (
          <Typography color="success.main" align="center" sx={{ mt: 2 }}>
            Заказ успешно создан!
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default MakeOrderForm;
