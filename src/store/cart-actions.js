import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

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

export const getCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        message: "data is being fetched",
      })
    );

    const gettingData = async () => {
      const response = await fetch(
        "https://advanced-redux-e87ae-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Data not fetched");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await gettingData();
      dispatch(
        uiActions.setNotification({
          status: "success",
          message: "data fetched successfully",
        })
      );

      dispatch(cartActions.replaceCart(cartData));
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          message: "data was not fetched",
          title: "error",
        })
      );
    }
  };
};
