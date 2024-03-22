// Layout.jsx

import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import UserImage from "../../assets/Intersect.png";
import CartIcon from "../../assets/cart_layout.svg";
import MenuIcon from "../../assets/menu-icon.svg";
import ExitIcon from "../../assets/exit.svg";
import { NavLink, Outlet } from "react-router-dom";

const setActive = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : styles.link;

export function Layout() {
  return (
    <>
      <div className={styles.sidebar}>
        <aside className={styles.aside}>
          <div className={styles.user}>
            <img className={styles.user_img} src={UserImage} alt="User" />
            <h3 className={styles.user_header}>Misha</h3>
            <p className={styles.user_email}>famm93@mail.ru</p>
          </div>
          <div className={styles.menu}>
            <NavLink to="/" className={setActive}>
              <img src={MenuIcon} alt="Menu" />
              Меню
            </NavLink>
            <NavLink className={setActive} to="/cart">
              <img src={CartIcon} alt="Cart" />
              Корзина
            </NavLink>
          </div>
        </aside>
        <Button className={styles.exit_btn} apperarence="small">
          <img src={ExitIcon} alt="Exit" />
          Выйти
        </Button>
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </>
  );
}
