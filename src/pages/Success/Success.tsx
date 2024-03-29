import styles from "./Success.module.css";
import pizzaImg from "../../assets/image 119.png";
import Headlin from "../../components/Headlin/Headlin";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  

  const backToOrder = () => {
    navigate("/pizza_app");
    
  };
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <img src={pizzaImg} alt="pizza" />
        <Headlin>Ваш заказ успешно оформлен!</Headlin>
        <Button onClick={backToOrder} apperarence="big">
          Сделать новый
        </Button>
      </div>
    </div>
  );
}

export default Success;
