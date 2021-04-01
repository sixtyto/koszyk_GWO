import { configureStore } from "@reduxjs/toolkit";
import cartDataReducer from "./cart";

const store = configureStore({
  reducer: {
    cartData: cartDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
