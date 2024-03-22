import { useEffect, useState } from "react";
import Headlin from "../../components/Headlin/Headlin";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interfaces";
import styles from "./Menu.module.css";
import axios from "axios";

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const getMenu = async () => {
    try {
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
    } catch (e) {
      console.log(e);
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
        <Search placeholder="Введите блюдо или состав" />
      </div>
      <div className={styles.products}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            description={p.ingredients.join(", ")}
            rating={p.rating}
            image={p.image}
            price={p.price}
          />
        ))}
      </div>
    </>
  );
}
