import React from "react";

export default function PromoPage() {
  return (
    <div className="container">
      <div className="promo__topBar">
        <a href="login.html" className="">
          Вход
        </a>
        <a href="register.html" className="button">
          Регистрация
        </a>
      </div>
      <div className="promo__content">
        <h2>О приложении</h2>
        <p>
          Ваше приложение представляет собой финансового помощника, который
          поможет пользователям отслеживать свои расходы и доходы по различным
          категориям.
        </p>
        <p>Основные функции приложения:</p>
        <ul>
          <li>Учет затрат по категориям</li>
          <li>Учет заработков по категориям</li>
          <li>Генерация отчетов и статистики</li>
        </ul>
      </div>
    </div>
  );
}
