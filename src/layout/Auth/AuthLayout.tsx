import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

import LogoImg from "../../assets/Group.svg";

function AuthLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img className={styles.logo_img} src={LogoImg} alt="Logo" />
      </div>
      <div className={styles.login}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
