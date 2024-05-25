import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import styles from "../Login/Login.module.css";
import { FormEvent, useEffect } from "react";
import { registration, userActions } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import Headline from "../Headline/Headline";

export type RegistrationForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

function Registration() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { jwt, userRegistrationMessage } = useSelector(
    (s: RootState) => s.user
  );

  useEffect(() => {
    if (jwt) navigate("/");
  }, [jwt, navigate]);

  const HandleLoginBtn = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const { email, password, name } = e.target as typeof e.target &
      RegistrationForm;
    dispatch(
      registration({
        email: email.value,
        password: password.value,
        name: name.value,
      })
    );
  };

  return (
    <div className={styles.container}>
      <Headline className="login_headline">Регистрация</Headline>
      {userRegistrationMessage && <div>{userRegistrationMessage}</div>}
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

        <div className={styles.field}>
          <label htmlFor="name">Ваше имя</label>
          <Input
            id="name"
            name="name"
            className="login_input"
            placeholder="Имя"
          />
        </div>

        <Button appearance="registration" className="registration">
          Зарегистрироваться
        </Button>
      </form>

      <Link className={styles.link} to="/pizza_app/auth/login">
        Есть акканут?
        <span className={styles.span}>Войти </span>
      </Link>
    </div>
  );
}
export default Registration;
