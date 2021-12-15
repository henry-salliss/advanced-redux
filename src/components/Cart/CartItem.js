import classes from "./CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/store";

const CartItem = (props) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { title, quantity, totalPrice, price } = props.item;

  const decreaseButtonHandler = () => {
    console.log(props);
    dispatch(cartActions.decrease({ id: props.item.key, price }));
  };
  const increaseButtonHandler = () => {
    dispatch(
      cartActions.addToCart({
        name: title,
        price: +totalPrice,
        quantity: 1,
        totalPrice: price.toFixed(2),
        key: Math.random(),
      })
    );
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${price}{" "}
          <span className={classes.itemprice}>(${totalPrice}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decreaseButtonHandler}>-</button>
          <button onClick={increaseButtonHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
