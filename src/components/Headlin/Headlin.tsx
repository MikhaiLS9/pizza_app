import { HeadlinProps } from "./Headlig.props";
import styles from "./Headlin.module.css";

function Headlin({ children, className = '', ...props }: HeadlinProps) {
  return (
    <h2 {...props} className={styles[className]}>
      {children}
    </h2>
  );
}

export default Headlin;
