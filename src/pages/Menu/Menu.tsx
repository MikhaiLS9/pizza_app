import { ChangeEvent, useEffect, useState } from "react";
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
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(false);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: { name },
      });

      setProducts(data);
    } catch (e) {
      setError((e as Error).message);
      return;
    }
  };

  const serchItemProduct = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className={styles.menu}>
        <Headlin className="menu_headlin">Меню</Headlin>
        <Search
          onChange={serchItemProduct}
          className="input"
          placeholder="Введите блюдо или состав"
        />
      </div>
      {error && <>{error}</>}

      <div className={styles.products}>
        {!isLoading && products.length > 0 && <MenuList products={products} />}
      </div>
      {isLoading && (
        <div className={styles.loading_wrapper}>
          <Headlin>Загружаем продукты...</Headlin>
          <div className={styles.spinner}></div>
        </div>
      )}
      {!isLoading && products.length === 0 && (
        <div className={styles.loading_wrapper}>
          <Headlin>Товар не найден по запросу</Headlin>
          <div className={styles.spinner}></div>
        </div>
      )}
    </>
  );
}

export default Menu;
