import ProductCard from "../../../layout/components/ProductCard/ProductCard";
import { MenuListProps } from "./MenuList.props";
function MenuList({ products }: MenuListProps) {
  return (
    <>
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
    </>
  );
}

export default MenuList;
