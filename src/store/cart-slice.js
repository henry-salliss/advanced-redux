import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  showing: false,
  quantity: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    toggle(state) {
      state.showing = !state.showing;
    },
    decrease(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => {
        return item.key === id;
      });
      state.quantity = state.quantity - 1;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.key !== id);
      } else {
        existingItem.quantity--;
        existingItem.price = existingItem.price - existingItem.totalPrice;
      }
    },
    addToCart(state, action) {
      state.quantity = state.quantity + 1;

      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.price = existingItem.price + newItem.price;
      } else {
        state.items.push({
          name: newItem.name,
          price: newItem.price,
          totalPrice: newItem.totalPrice,
          quantity: newItem.quantity,
          key: newItem.key,
        });
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
