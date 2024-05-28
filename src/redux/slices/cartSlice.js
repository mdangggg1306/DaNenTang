import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setCategories, addToCart, removeFromCart, updateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
