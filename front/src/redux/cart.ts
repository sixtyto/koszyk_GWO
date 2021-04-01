import { createSlice } from "@reduxjs/toolkit";
import { components } from "../types/schema";

export type InitialStateProps = {
  books: components["schemas"]["Book"][];
  order: components["schemas"]["Order"];
};

const initialState: InitialStateProps = {
  order: {
    order: [],
    first_name: "",
    last_name: "",
    zip_code: "",
    city: "",
  },
  books: [],
};

export const counterSlice = createSlice({
  name: "cart data",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.books = action.payload;
    },
    addToCartDispatcher: (state, action) => {
      if (
        [...state.order.order].filter((item) => item.id === action.payload)[0]
      ) {
        state.order.order = [
          ...state.order.order.filter((item) => item.id !== action.payload),
          {
            id: action.payload,
            quantity:
              [...state.order.order].filter(
                (item) => item.id === action.payload
              )[0].quantity + 1,
          },
        ];
      } else {
        state.order.order = [
          ...state.order.order,
          {
            id: action.payload,
            quantity: 1,
          },
        ];
      }
    },
    removeCart: (state) => {
      state.order.order = [];
    },
    removeFromCartDispatcher: (state, action) => {
      state.order.order = [
        ...state.order.order.filter((item) => item.id !== action.payload),
      ];
    },
    setFirstNameDispatcher: (state, action) => {
      state.order.first_name = action.payload;
    },
    setLastNameDispatcher: (state, action) => {
      state.order.last_name = action.payload;
    },
    setZipCodeDispatcher: (state, action) => {
      state.order.zip_code = action.payload;
    },
    setCityDispatcher: (state, action) => {
      state.order.city = action.payload;
    },
  },
});

export const {
  getData,
  addToCartDispatcher,
  removeCart,
  removeFromCartDispatcher,
  setFirstNameDispatcher,
  setLastNameDispatcher,
  setZipCodeDispatcher,
  setCityDispatcher,
} = counterSlice.actions;
export default counterSlice.reducer;
