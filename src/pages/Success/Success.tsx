import styles from "./Success.module.css";
import pizzaImg from "../../assets/image 119.png";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Headline from "../../layout/components/Headline/Headline";

function Success() {
  const navigate = useNavigate();

  const backToOrder = () => {
    navigate("/pizza_app");
  };
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <img src={pizzaImg} alt="pizza" />
        <Headline>Ваш заказ успешно оформлен!</Headline>
        <Button onClick={backToOrder} appearance="big">
          Сделать новый
        </Button>
      </div>
    </div>
  );
}

export default Success;
