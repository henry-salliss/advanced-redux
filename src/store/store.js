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
      state.quantity = state.quantity + 1;
      console.log(action.payload.quantity);
      action.payload.quantity = action.payload.quantity + 1;
      console.log(action.payload.quantity);
    },
    decrease(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => {
        console.log(item.key);
        console.log(id);
        return item.key === id;
      });
      state.quantity = state.quantity - 1;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.key !== id);
        console.log(state.items);
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
      console.log(newItem.key);
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

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const cartActions = cartSlice.actions;

export default store;
