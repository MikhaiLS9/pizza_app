import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";
import cn from "classnames";

function Button({
  children,
  className,
  appearance: appearance = "small",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(styles.button, styles.accent, className, {
        [styles.small]: appearance === "small",
        [styles.big]: appearance === "big",
        [styles.cart]: appearance === "cart",
        [styles.registration]: appearance === "registration",
        [styles.increment]: appearance === "increment",
        [styles.decrement]: appearance === "decrement",
        [styles.delete_item]: appearance === "delete_item",
        [styles.clear_cart]: appearance === "clear_cart",
        [styles.promo]: appearance === "promo",
        [styles.back_menu]: appearance === "back_menu",
      })}
    >
      {children}
    </button>
  );
}

export default Button;
