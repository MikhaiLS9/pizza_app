import { Await, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interfaces";
import { Suspense } from "react";
import Headlin from "../../components/Headlin/Headlin";
import styles from '../Menu/Menu.module.css'
function Product() {
  const data = useLoaderData() as { data: Product };

  return (
    <>
      <Suspense
        fallback={
          <div className={styles.loading_wrapper}>
            <Headlin>Загружаю ...</Headlin>
            <div className={styles.spinner}></div>
          </div>
        }
      >
        <Await resolve={data.data}>
          {({ data }: { data: Product }) => <>Product - {data.name}</>}
        </Await>
      </Suspense>
    </>
  );
}

export default Product;
