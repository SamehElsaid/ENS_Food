import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice/cartSlice";
import adminSlice from "./admin/adminSlice";
const store = configureStore({
  reducer: {
    cart: cartSlice,
    admin: adminSlice,
  },
});
export default store;
