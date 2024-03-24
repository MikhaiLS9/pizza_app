import { forwardRef } from "react";
import styles from "./Search.module.css";
import cn from "classnames";
import { SearchProps } from "./Search.props";
import serchImg from "../../assets/serch.svg";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
  { isValid = true, className, ...props },
  ref
) {
  return (
    <div className={styles.input_wrapper}>
      <input
        ref={ref}
        className={cn(styles[className || ""], {
          [styles["invalid"]]: isValid,
        })}
        {...props}
      />
      <img className={cn(styles.img_serch)} src={serchImg} alt="Иконка лупы" />
    </div>
  );
});
export default Search;
