import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Headlin from "../Headlin/Headlin";
import Input from "../Input/Input";

import styles from "./Login.module.css";
import { FormEvent, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login, userActions } from "../../store/userSlice";
import { AppDispatch, RootState } from "../../store/store";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, userLoginMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) navigate("/pizza_app");
  }, [jwt, navigate]);

  const HandleLoginBtn = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const { email, password } = e.target as typeof e.target & LoginForm;

    await sendLoad(email.value, password.value);
  };

  const sendLoad = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };
  return (
    <div className={styles.container}>
      <Headlin className="login_headlin">Вход</Headlin>
      {userLoginMessage && <div>{userLoginMessage}</div>}
      <form className={styles.form} onSubmit={HandleLoginBtn} action="">
        <div className={styles.field}>
          <label htmlFor="email">Ваш email</label>
          <Input
            id="email"
            name="email"
            className="login_input"
            placeholder="Емаил"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            id="password"
            name="password"
            className="login_input"
            placeholder="Пароль"
          />
        </div>

        <Button apperarence="big">Вход</Button>
      </form>

      <Link className={styles.link} to="/pizza_app/auth/registration">
        Нет акканута?
        <span className={styles.span}>Зарегистрироваться </span>
      </Link>
    </div>
  );
}
export default Login;
