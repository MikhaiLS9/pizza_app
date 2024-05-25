import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Headline from "../Headline/Headline";

function ProductMissing() {
  const navigate = useNavigate();
  const backToMenu = () => {
    navigate("/pizza_app");
  };

  return (
    <div>
      <Headline>Добавьте товар в корзину </Headline>
      <Button appearance="big" onClick={backToMenu}>
        Добавить
      </Button>
    </div>
  );
}

export default ProductMissing;
