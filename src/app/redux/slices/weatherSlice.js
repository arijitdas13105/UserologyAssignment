import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    cities: [],
    historicalData: {},
    alerts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setCurrentWeather: (state, action) => {
      const { city, data } = action.payload;
      state.cities = state.cities.map((c) =>
        c.name === city ? { ...c, currentWeather: data } : c
      );
    },

    setHistoricalData: (state, action) => {
      const { city, data } = action.payload;
      state.historicalData[city] = data;
    },
    addWeatherAlert: (state, action) => {
      state.alerts.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCities,
  setCurrentWeather,
  setHistoricalData,
  addWeatherAlert,
  setLoading,
  setError,
} = weatherSlice.actions;

export default weatherSlice.reducer;
