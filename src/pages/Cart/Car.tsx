import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Headlin from "../../components/Headlin/Headlin";
import Input from "../../components/Input/Input";
import { AppDispatch, RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interfaces";
import { useEffect, useState } from "react";
import { userCartAction } from "../../store/cartSlice";
import cleartImg from "../../assets/menu-icon.svg";

const DELIVERE_FEE = 150;

export function Cart() {
  const [cartProducts, setCardProducts] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch<AppDispatch>()
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

  return (
    <div>
      <Headlin>Корзина</Headlin>
      <Button apperarence="small" onClick={clearFullCart}>
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

      <form action="">
        <Input placeholder="Промокод" />
        <Button apperarence="small">Применить</Button>
      </form>
      <div>
        <div>
          Товары в заказе
          <span> {productsOnOrder}</span> <hr />
        </div>
        <div>
          Доставка
          <span> {DELIVERE_FEE}</span> <hr />
        </div>
        <div>
          Итог:<span> {DELIVERE_FEE + productsOnOrder}</span> <hr />
        </div>
      </div>
      <Button apperarence="big">Оформить</Button>
    </div>
  );
}


