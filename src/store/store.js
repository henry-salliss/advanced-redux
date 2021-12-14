import { createSlice, configureStore } from "@reduxjs/toolkit";

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
    increase(state, action) {
      console.log(action.payload);
      action.payload.amount = action.payload.amount + 1;
      state.quantity = state.quantity + 1;
    },
    decrease(state) {
      state.quantity = state.quantity - 1;
      console.log(state.items);
    },
    addToCart(state, action) {
      state.quantity = state.quantity + 1;
      const hasItem = state.items.some(
        (item) => item.name === action.payload.name
      );

      if (!hasItem) {
        state.items.push(action.payload);
      } else {
        console.log("already in cart");
      }
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const cartActions = cartSlice.actions;
export default store;
