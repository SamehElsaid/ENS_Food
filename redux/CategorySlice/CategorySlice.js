import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  refresh: 0,
  data: {},
};
const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    GET_CART: (state, action) => {
      state.data = action.payload;
    },
    REFRESH_CATEGORY: (state, action) => {
      state.refresh = action.payload;
    },
  },
});
export let { GET_CART , REFRESH_CATEGORY} = category.actions;
export default category.reducer;
