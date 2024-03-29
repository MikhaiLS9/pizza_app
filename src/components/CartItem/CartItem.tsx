import styles from "./CartItem.module.css";
import Button from "../Button/Button";
import { CartItemProps } from "./CartItem.props";
import { useDispatch } from "react-redux";
import { userCartAction } from "../../store/cartSlice";

import IncrementImg from "../../assets/increment.svg";
import decrementImg from "../../assets/decrement.svg";
import cleartImg from "../../assets/clear_item.svg";

function CartItem(props: CartItemProps) {
  const { name, id, image, price, count } = props;
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(userCartAction.add(id));
  };

  const decrement = () => {
    dispatch(userCartAction.remove(id));
  };
  const clear = () => {
    dispatch(userCartAction.clearItem(id));
  };

  return (
    <div className={styles.cart_items}>
      <div className={styles.item}>
        <img className={styles.img_items} src={image} alt="товар" />
        <div className={styles.title}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.price}>{price} ₽</p>
        </div>
      </div>

      <div className={styles.change}>
        <Button apperarence="decrement" onClick={decrement}>
          <img
            className={`${styles.img_button} ${styles.decrement}`}
            src={decrementImg}
            alt="minus"
          />
        </Button>
        <span>{count}</span>
        <Button apperarence="increment" onClick={increment}>
          <img
            className={`${styles.img_button} ${styles.increment}`}
            src={IncrementImg}
            alt="plus"
          />
        </Button>
        <Button apperarence="delete_item" onClick={clear}>
          <img
            className={`${styles.img_button} ${styles.delete_item}`}
            src={cleartImg}
            alt="delete"
          />
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
