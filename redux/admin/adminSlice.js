import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  open: false,
  num:0
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
    REFRESHDATA: (state, action) => {
      state.num = action.payload;
    },
  },
});
export let { GET_admin , REFRESHDATA} = admin.actions;
export default admin.reducer;
