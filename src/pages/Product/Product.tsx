import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Product as Product_interface } from "../../interfaces/product.interfaces";
import { Suspense } from "react";
import styles from "./Product.module.css";
import Button from "../../components/Button/Button";
import cartImg from "../../assets/cart-icon.svg";
import arrowImg from "../../assets/left_arrow_b5hqu8dra3y4.svg";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userCartAction } from "../../store/cartSlice";
import ProductItem from "../../layout/components/ProductItem/ProductItem";
import Headline from "../../layout/components/Headline/Headline";
function Product() {
  const data = useLoaderData() as { data: Product_interface };
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handelClickBackMenu = () => {
    navigate("/pizza_app");
  };

  const addToCart = (id: number) => {
    console.log(id);

    dispatch(userCartAction.add(id));
  };

  return (
    <>
      <Suspense
        fallback={
          <div className={styles.loading_wrapper}>
            <Headline>Загружаю ...</Headline>
            <div className={styles.spinner}></div>
          </div>
        }
      >
        <Await resolve={data.data}>
          {({ data }: { data: Product_interface }) => (
            <div className={styles.container}>
              <div className={styles.header}>
                <Button onClick={handelClickBackMenu} appearance="back_menu">
                  <img src={arrowImg} alt="arrow" />
                </Button>
                <Headline>{data.name}</Headline>
                <Button onClick={() => addToCart(data.id)} appearance="small">
                  <img src={cartImg} alt="cart" /> В корзину
                </Button>
              </div>
              <ProductItem product={data} />
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
}

export default Product;
