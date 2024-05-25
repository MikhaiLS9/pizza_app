import { useState } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import styles from "./FormToCart.module.css";

interface FormToCartProps {
  onPromoApply: (isValid: boolean) => void; // новый callback prop
}

const PROMO_CODE = ["LETO", "ZIMA"];

function FormToCart({ onPromoApply }: FormToCartProps) {
  const [promoValid, setPromoValid] = useState<boolean>(true);
  const applyPromo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("promo") as HTMLInputElement;
    const isValid = PROMO_CODE.includes(input.value);
    onPromoApply(isValid);
    setPromoValid(isValid);
  };

  return (
    <form className={styles.form} onSubmit={applyPromo}>
      <Input
        className={promoValid ? "promo" : "promo_false"}
        name="promo"
        placeholder={promoValid ? "Промокод" : "Не верный промокод"}
      />
      <Button appearance="promo">Применить</Button>
    </form>
  );
}

export default FormToCart;
