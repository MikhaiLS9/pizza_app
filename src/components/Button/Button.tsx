import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";
import cn from "classnames";

function Button({
  children,
  className,
  apperarence = "small",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(styles.button, styles.accent, className, {
        [styles.small]: apperarence === "small",
        [styles.big]: apperarence === "big",
        [styles.cart]: apperarence === "cart",
        [styles.registration]: apperarence === "registration",
        [styles.increment]: apperarence === "increment",
        [styles.decrement]: apperarence === "decrement",
        [styles.delete_item]: apperarence === "delete_item",
        [styles.clear_cart]: apperarence === "clear_cart",
        [styles.promo]: apperarence === "promo",
        [styles.back_menu]: apperarence === "back_menu",
      })}
    >
      {children}
    </button>
  );
}

export default Button;
