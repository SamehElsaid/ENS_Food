import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  open: false,
};
const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    GET_admin: (state, action) => {
      state.open = true;
    },
    LOG_ADMIN: (state, action) => {
      state.open = false;
    },
  },
});
export let { GET_admin , REFRESH} = admin.actions;
export default admin.reducer;
