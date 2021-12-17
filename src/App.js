import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { useSelector } from "react-redux";

function App() {
  const showing = useSelector((state) => state.cart.showing);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetch(
      "https://advanced-redux-e87ae-default-rtdb.firebaseio.com/cart.json",
      { method: "PUT", body: JSON.stringify(cart) }
    );
  }, [cart]);

  return (
    <Layout>
      {showing && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
