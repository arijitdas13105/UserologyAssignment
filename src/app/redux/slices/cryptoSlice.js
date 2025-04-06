 import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    prices: {},
    socketPrice: {},
    details: {},
    lastUpdated: null,
    alerts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPrices: (state, action) => {
      state.prices = action.payload;
      state.lastUpdated = Date.now();
    },
    setSocketPrice: (state, action) => {
      state.socketPrice = { ...state.socketPrice, ...action.payload };
      state.lastUpdated = Date.now();
    },
    setCoinDetails: (state, action) => {
      const { coinId, data } = action.payload;
      state.details[coinId] = data;
    },
    addPriceAlert: (state, action) => {
      state.alerts.unshift(action.payload);

      if (state.alerts.length > 10) {
        state.alerts.pop();
      }
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
  setPrices,
  setCoinDetails,
  addPriceAlert,
  setLoading,
  setError,
  setSocketPrice,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
