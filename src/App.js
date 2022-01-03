import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

import { useSelector, useDispatch } from "react-redux";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showing = useSelector((state) => state.cart.showing);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendData = async () => {
      dispatch(
        uiActions.setNotification({
          status: "pending",
          message: "data is sending",
        })
      );
      const response = await fetch(
        "https://advanced-redux-e87ae-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      if (!response.ok) {
        throw new Error("Data not sent");
      }

      dispatch(
        uiActions.setNotification({
          status: "success",
          message: "data sent successfully",
          title: "Sent",
        })
      );
    };
    if (isInitial) {
      isInitial = false;
      return;
    }

    sendData().catch((error) => {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
          title={notification.title}
        />
      )}
      <Layout>
        {showing && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
