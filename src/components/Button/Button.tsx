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
      })}
    >
      {children}
    </button>
  );
}

export default Button;
