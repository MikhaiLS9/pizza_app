import { useEffect, useState } from "react";
import Headlin from "../../components/Headlin/Headlin";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interfaces";
import styles from "./Menu.module.css";
import axios from "axios";
import MenuList from "./MenuList/MenuList";

function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const getMenu = async () => {
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      setIsLoading(false);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);

      setProducts(data);
      setIsLoading(!isLoading);
    } catch (e) {
      setError((e as Error).message);
      setIsLoading(!isLoading);
      return;
    }
  };

  useEffect(() => {
    getMenu();
  }, []);
  return (
    <>
      <div className={styles.menu}>
        <Headlin className="menu_headlin">Меню</Headlin>
        <Search className="input" placeholder="Введите блюдо или состав" />
      </div>
      {error && <>{error}</>}

      <div className={styles.products}>
        {isLoading && <MenuList products={products} />}
      </div>
      {!isLoading && (
        <div className={styles.loading_wrapper}>
          <Headlin>Меню загружается ...</Headlin>
          <div className={styles.spinner}></div>
        </div>
      )}
    </>
  );
}

export default Menu;
