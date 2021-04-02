import { createSlice } from "@reduxjs/toolkit";
import { BooksType, OrderType } from "../types";
import { setLocalStorage } from "../utils";

export type InitialStateProps = {
  books: BooksType;
  cart: OrderType;
};

const initialState: InitialStateProps = {
  cart: {
    order: [],
    first_name: "",
    last_name: "",
    zip_code: "",
    city: "",
  },
  books: [],
};

export const cartSlice = createSlice({
  name: "cart data",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.books = action.payload;
    },
    addToCartDispatcher: (state, action) => {
      if ([...state.cart.order].filter(({ id }) => id === action.payload)[0]) {
        state.cart.order = [
          ...state.cart.order.filter(({ id }) => id !== action.payload),
          {
            id: action.payload,
            quantity:
              [...state.cart.order].filter(({ id }) => id === action.payload)[0]
                .quantity + 1,
          },
        ];
      } else {
        state.cart.order = [
          ...state.cart.order,
          {
            id: action.payload,
            quantity: 1,
          },
        ];
      }
      setLocalStorage(state.cart.order);
    },
    removeCart: (state) => {
      state.cart.order = [];
      setLocalStorage(state.cart.order);
    },
    setCart: (state, action) => {
      state.cart.order = action.payload;
      setLocalStorage(state.cart.order);
    },
    clearForm: (state) => {
      state.cart.first_name = "";
      state.cart.last_name = "";
      state.cart.zip_code = "";
      state.cart.city = "";
    },
    removeFromCartDispatcher: (state, action) => {
      state.cart.order = [
        ...state.cart.order.filter(({ id }) => id !== action.payload),
      ];
      setLocalStorage(state.cart.order);
    },
    setFirstNameDispatcher: (state, action) => {
      state.cart.first_name = action.payload;
    },
    setLastNameDispatcher: (state, action) => {
      state.cart.last_name = action.payload;
    },
    setZipCodeDispatcher: (state, action) => {
      state.cart.zip_code = action.payload;
    },
    setCityDispatcher: (state, action) => {
      state.cart.city = action.payload;
    },
  },
});

export const {
  getData,
  addToCartDispatcher,
  removeCart,
  setCart,
  clearForm,
  removeFromCartDispatcher,
  setFirstNameDispatcher,
  setLastNameDispatcher,
  setZipCodeDispatcher,
  setCityDispatcher,
} = cartSlice.actions;
export default cartSlice.reducer;
