// Layout.jsx

import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import UserImage from "../../assets/Intersect.png";
import CartIcon from "../../assets/cart_layout.svg";
import MenuIcon from "../../assets/menu-icon.svg";
import ExitIcon from "../../assets/exit.svg";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, userActions } from "../../store/userSlice";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useMemo } from "react";

const setActive = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : styles.link;

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const productCartItems = useSelector((s: RootState) => s.cart.items);

  const productCountCartItems = useMemo(() => {
    return productCartItems.reduce((acc, item) => acc + item.count, 0);
  }, [productCartItems]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const logout = async () => { 
    dispatch(userActions.logout());
    navigate("/pizza_app/auth/login");
  };

  const userProfile = useSelector((s: RootState) => s.user.profile);

  return (
    <>
      <div className={styles.sidebar}>
        <aside className={styles.aside}>
          <div className={styles.user}>
            <img className={styles.user_img} src={UserImage} alt="User" />
            <h3 className={styles.user_header}>{userProfile?.name}</h3>
            <p className={styles.user_email}>{userProfile?.email}</p>
          </div>
          <div className={styles.menu}>
            <NavLink to="/pizza_app" className={setActive}>
              <img src={MenuIcon} alt="Menu" />
              Меню
            </NavLink>
            <NavLink className={setActive} to="/pizza_app/cart">
              <img src={CartIcon} alt="Cart" />
              Корзина{" "}
              {productCountCartItems > 0 ? (
                <span className={productCountCartItems > 0 ? styles.count : ""}>
                  {productCountCartItems}
                </span>
              ) : (
                ""
              )}
            </NavLink>
          </div>
        </aside>
        <Button
          className={styles.exit_btn}
          apperarence="small"
          onClick={logout}
        >
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
