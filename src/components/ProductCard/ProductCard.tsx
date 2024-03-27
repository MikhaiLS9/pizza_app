import { Link } from "react-router-dom";
import Headlin from "../Headlin/Headlin";
import { ProductCardProps } from "./ProductCard.props";
import Button from "../Button/Button";
import CartImg from "../../assets/cart-icon.svg";
import StarImg from "../../assets/Path 3389.svg";

import styles from "./ProductCard.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userCartAction } from "../../store/cartSlice";

function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>()

  const handleAddCart = () => {
    dispatch(userCartAction.add(props.id))
  }
  return (
    <div className={styles.product}>
      <Link to={`/products/${props.id}`}>
        <div className={styles.imageContainer}>
          <span className={styles.price}>
            {props.price} &nbsp;
            <span className={styles.currency}>₽</span>
          </span>
          <img className={styles.img_product} src={props.image} alt="" />
          <span className={styles.rating}>
            <span className={styles.text_rating}>{props.rating}&nbsp;</span>

            <img className={styles.starImg} src={StarImg} alt="star" />
          </span>
        </div>
        <div className={styles.desckription}>
          <Headlin className="product_title">{props.name}</Headlin>
          <p className={styles.product_description}>{props.description}</p>
        </div>
      </Link>
      <Button onClick={ handleAddCart} apperarence="cart">
        <img className={styles.cart_img} src={CartImg} alt="cart" />
      </Button>
    </div>
  );
}

export default ProductCard;
