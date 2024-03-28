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
        <img src={image} alt="товар" />
        <div>
          <h3>{name}</h3>
          <p>{price}</p>
        </div>
      </div>

      <div className={styles.change}>
        <Button apperarence="small" onClick={decrement}>
          <img src={decrementImg} alt="delete" />
        </Button>
        <span>{count}</span>
        <Button apperarence="small" onClick={increment}>
          <img src={IncrementImg} alt="plus" />
        </Button>
        <Button apperarence="small" onClick={clear}>
          <img src={cleartImg} alt="delete" />
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
