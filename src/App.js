import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { useSelector } from "react-redux";

function App() {
  const showing = useSelector((state) => state.cart.showing);

  console.log(showing);

  return (
    <Layout>
      {showing && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
