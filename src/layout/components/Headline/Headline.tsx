import { HeadlineProps } from "./Headline.props";
import styles from "./Headline.module.css";

function Headline({ children, className = '', ...props }: HeadlineProps) {
  return (
    <h2 {...props} className={styles[className]}>
      {children}
    </h2>
  );
}

export default Headline;
