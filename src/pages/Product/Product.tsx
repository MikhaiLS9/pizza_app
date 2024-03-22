import { useLoaderData} from "react-router-dom";
import { Product } from "../../interfaces/product.interfaces";

function Product() {
  const data = useLoaderData() as Product;

  return <div>{data.name}</div>;
}
export default Product;
