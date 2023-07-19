import React from "react";

export default function LoginPage() {
  return (
    <div className="auth">
      <div className="login">
        <div className="login__logo"></div>
        <div className="login__info">
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
          />
          <label
            className="login__label"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="password"
            type="password"
            className="login__input"
            placeholder="Введите пароль"
          />
        </div>
        <div className="buttons buttons__login">
          <p className="text">Войти</p>
        </div>
      </div>
    </div>
  );
}
