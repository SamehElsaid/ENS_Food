import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice/cartSlice";
import adminSlice from "./admin/adminSlice";
import CategorySlice from "./CategorySlice/CategorySlice";
const store = configureStore({
  reducer: {
    cart: cartSlice,
    admin: adminSlice,
    category:CategorySlice
  },
});
export default store;
