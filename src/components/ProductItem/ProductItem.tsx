import { Product } from "../../interfaces/product.interfaces";
import styles from './ProductItem.module.css'
import starImg from "../../assets/Path 3389.svg";

const ProductItem = ({ product }: { product: Product}) => {
    return (
      <div className={styles.product}>
        <img className={styles.img} src={product.image} alt={product.name} />
        <div className={styles.description}>
          <p className={styles.price}>
            Цена
            <span>
              {product.price} <span className={styles.price_span}>₽</span>
            </span>
          </p>
          <p className={styles.rating}>
            Рейтинг
            <span className={styles.rating_span}>
              {product.rating} <img src={starImg} alt="star rating" />
            </span>
          </p>
          <p className={styles.compound}>Состав:</p>
          <ul className={styles.list}>
            {product.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  export default ProductItem