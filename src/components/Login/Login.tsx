import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Headlin from "../Headlin/Headlin";
import Input from "../Input/Input";

import styles from "./Login.module.css";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../helpers/API";
import { LoginResponse } from "../../interfaces/auth.interfaces";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

function Login() {
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate()

  const HandleLoginBtn = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const { email, password } = e.target as typeof e.target & LoginForm;

    await sendLoad(email.value, password.value);
  };

  const sendLoad = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('jwt', data.access_token)
      navigate('/')
    } catch (e) {
      if (e instanceof AxiosError) setError(e.response?.data.message);
    }
  };
  return (
    <div className={styles.container}>
      <Headlin className="login_headlin">Вход</Headlin>
      {error && <div>{error}</div>}
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

      <Link className={styles.link} to="/auth/registration">
        Нет акканута?
        <span className={styles.span}>Зарегистрироваться </span>
      </Link>
    </div>
  );
}
export default Login;
