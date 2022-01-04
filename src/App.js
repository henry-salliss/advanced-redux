import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendDataToCart, getCartData } from "./store/cart-actions";

import { useSelector, useDispatch } from "react-redux";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showing = useSelector((state) => state.cart.showing);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // load cart from firebase
  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  // send new cart data to firebase
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendDataToCart(cart));
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
