import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../slices/cryptoSlice';
import weatherReducer from '../slices/weatherSlice';
import newsReducer from '../slices/newsSlice';
import alertsReducer from '../slices/alertsSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    weather: weatherReducer,
    news: newsReducer,
    alerts: alertsReducer
  },
});