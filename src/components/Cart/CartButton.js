import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/store";

const CartButton = (props) => {
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();

  const cartButtonHandler = () => {
    dispatch(cartActions.toggle());
  };
  return (
    <button className={classes.button} onClick={cartButtonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
