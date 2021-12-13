import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartInitialState = { showing: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    toggle(state) {
      state.showing = !state.showing;
      console.log(state.showing);
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
