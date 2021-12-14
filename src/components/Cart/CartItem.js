import classes from "./CartItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/store";

const CartItem = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const decreaseButtonHandler = () => {
    dispatch(cartActions.decrease());
  };
  const cartItemsJSX = cartItems.map((item) => {
    const increaseButtonHandler = () => {
      dispatch(cartActions.increase(item));
    };
    return (
      <li key={item.key} className={classes.item}>
        <header>
          <h3>{item.name}</h3>
          <div className={classes.price}>
            ${item.price.toFixed(2)}{" "}
            <span className={classes.itemprice}>
              (${item.price.toFixed(2)}/item)
            </span>
          </div>
        </header>
        <div className={classes.details}>
          <div className={classes.quantity}>
            x <span>{item.amount}</span>
          </div>
          <div className={classes.actions}>
            <button onClick={decreaseButtonHandler}>-</button>
            <button onClick={increaseButtonHandler}>+</button>
          </div>
        </div>
      </li>
    );
  });

  return cartItemsJSX;
};

export default CartItem;
