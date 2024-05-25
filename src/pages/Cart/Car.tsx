/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { AppDispatch, RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interfaces";
import { useEffect, useState } from "react";
import { userCartAction } from "../../store/cartSlice";
import cleartImg from "../../assets/shopping_cart_empty_side_view_daeiai8dloaf.svg";
import ProductMissing from "../../layout/components/ProductMissing/ProductMissing";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import FormToCart from "../../layout/components/FormToCart/FormToCart";
import Headline from "../../layout/components/Headline/Headline";

const DELIVERY_FEE = 150;
const SALE15 = 0.85;

export function Cart() {
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [cartProducts, setCardProducts] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    loadItems();
  }, [items]);

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);

    return data;
  };
  const loadItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCardProducts(res);
  };

  const productsWithCount = items.map((item) => {
    const product = cartProducts.find((prod) => prod.id === item.id);

    return { ...product, count: item.count };
  });

  const productsOnOrder = productsWithCount.reduce((acc, item) => {
    if (item.price) {
      acc += item.count * item.price;
    }
    return acc;
  }, 0);
  const clearFullCart = () => {
    dispatch(userCartAction.clearCart());
  };

  const success = async () => {
    await axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(userCartAction.clearCart());
    navigate("/pizza_app/success");
  };

  const handlePromoApply = (isValid: boolean) => {
    setIsPromoApplied(isValid);
  };
  const finalTotal = isPromoApplied
    ? (DELIVERY_FEE + productsOnOrder) * SALE15
    : DELIVERY_FEE + productsOnOrder;

  console.log(isPromoApplied);

  return (
    <div className={styles.container}>
      <Headline>Корзина</Headline>
      <Button appearance="clear_cart" onClick={clearFullCart}>
        <img src={cleartImg} alt="delete" />
      </Button>
      {productsWithCount.map((p, index) => (
        <CartItem
          key={p.id || index + 1}
          count={p.count || 0}
          image={p.image || ""}
          price={p.price || 0}
          name={p.name || "Название не указано"}
          id={p.id || 0}
          {...productsWithCount}
        />
      ))}

      {items.length > 0 ? (
        <div className={styles.block}>
          <FormToCart onPromoApply={handlePromoApply} />
          <div className={styles.checkout_result}>
            <div className={styles.result}>
              <p>
                Товары в заказе <span>({productsWithCount.length})</span>{" "}
              </p>
              <span className={styles.text}>
                {productsOnOrder} <span className={styles.mark}>₽</span>
              </span>
            </div>
            <hr />
            <div className={styles.result}>
              <p>Доставка</p>

              <span className={styles.text}>
                {DELIVERY_FEE} <span className={styles.mark}>₽</span>
              </span>
            </div>
            <hr />
            <div className={styles.result}>
              <p>Итог: </p>
              {!isPromoApplied ? (
                <>
                  {" "}
                  <span className={styles.text}>
                    {DELIVERY_FEE + productsOnOrder}{" "}
                    <span className={styles.mark}>₽</span>
                  </span>
                </>
              ) : (
                <span className={styles.text}>
                  Промокод применен : {finalTotal}{" "}
                  <span className={styles.mark}>₽</span>
                </span>
              )}
            </div>
            <hr />
          </div>
          <Button onClick={success} appearance="big">
            Оформить
          </Button>
        </div>
      ) : (
        <ProductMissing />
      )}
    </div>
  );
}
