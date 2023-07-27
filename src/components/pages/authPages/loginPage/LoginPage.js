import React, { useState } from "react";
import { signIn } from "../../../../firebase/auth";
import {
  readDocument,
  switchActivityAccount,
} from "../../../../firebase/database";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function LoginPage(props) {
  const { email, setEmail, password, setPassword } = props;

  const [errorMessage = "", setErrorMessage] = useState();

  const navigate = useNavigate();

  return (
    <div className="auth">
      <div className="login">
        <div className="login__logo"></div>
        <div className="login__info">
          <label>{errorMessage}</label>
          <label
            className="login__label"
            htmlFor="email"
          >
            Почта
          </label>
          <input
            id="email"
            type="email"
            className="login__input"
            placeholder="Введите Email-адрес"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className="login__label"
            htmlFor="email"
          >
            Пароль
          </label>
          <input
            id="password"
            type="password"
            className="login__input"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className="buttons buttons__login"
          onClick={() => {
            signIn(email, password).then(async (data) => {
              await switchActivityAccount(email);
              await readDocument(email);
              await navigate('/')
            });
          }}
        >
          <p className="text">Войти</p>
        </div>
        <div
          className="buttons buttons__login"
          onClick={() =>
            navigate("/sign-up")
          }
        >
          <p className="text">Регистрация</p>
        </div>
      </div>
    </div>
  );

}


