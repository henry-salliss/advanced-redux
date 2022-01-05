import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartInitialState = {
  showing: false,
  quantity: 0,
  items: [],
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    toggle(state) {
      state.showing = !state.showing;
    },
    decrease(state, action) {
      state.changed = true;
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
      state.changed = true;
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
    replaceCart(state, action) {
      state.quantity = action.payload.quantity;
      state.items = action.payload.items;
    },
  },
});

export const sendDataToCart = (cart) => {
  return async (dispatch) => {
    // waiting for data to send
    dispatch(
      uiActions.setNotification({
        status: "pending",
        message: "data is sending",
      })
    );

    // sending the PUT request
    const sendingData = async () => {
      const response = await fetch(
        "https://advanced-redux-e87ae-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      if (!response.ok) {
        throw new Error("Data not sent");
      }
    };

    // PUT request is successful
    try {
      await sendingData();
      dispatch(
        uiActions.setNotification({
          status: "success",
          message: "data sent successfully",
          title: "Sent",
        })
      );
      //  PUT request is not successful
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
