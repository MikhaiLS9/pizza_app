import { Link } from "react-router-dom";
import Headlin from "../Headlin/Headlin";
import { ProductCardProps } from "./ProductCard.props";
import Button from "../Button/Button";
import CartImg from "../../assets/cart-icon.svg";
import StarImg from "../../assets/Path 3389.svg";

import styles from "./ProductCard.module.css";

function ProductCard(props: ProductCardProps) {
  return (
    <Link to={`/products/${props.id}`}>
      <div className={styles.product}>
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
          <Button apperarence="cart">
            <img className={styles.cart_img} src={CartImg} alt="cart" />
          </Button>
        </div>
        <div className={styles.desckription}>
          <Headlin className="product_title">{props.name}</Headlin>
          <p className={styles.product_description}>{props.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
