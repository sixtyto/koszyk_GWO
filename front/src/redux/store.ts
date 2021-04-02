import { configureStore } from "@reduxjs/toolkit";
import cartData from "./cart";

const store = configureStore({
  reducer: {
    cartData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
