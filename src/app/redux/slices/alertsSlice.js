// redux/slices/alertSlice.js
import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alerts",
  initialState: [],
  reducers: {
    addAlert: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addAlert } = alertSlice.actions;

export default alertSlice.reducer;
 