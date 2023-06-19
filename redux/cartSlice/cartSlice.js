import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  refresh: 0,
  data: {},
};
const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    GET_CART: (state, action) => {
      state.data = action.payload;
    },
    REFRESH: (state, action) => {
      state.refresh = action.payload;
    },
  },
});
export let { GET_CART , REFRESH} = cart.actions;
export default cart.reducer;
