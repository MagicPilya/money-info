import React, { useState } from "react";
import { signUp} from '../../../../firebase/auth';
import { addUser, switchActivityAccount } from "../../../../firebase/database";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function LoginPage(props) {
  const [name = '', setName] = useState();
  const { email, setEmail, password, setPassword } = props;


  const [errorMessage = '', setErrorMessage] = useState();

  const navigate = useNavigate();

  return (
    <div className="auth">
      <div className="registration">
        <div className="registration__logo"></div>
        <div className="registration__info">
          <label>{errorMessage}</label>
          <label
            className="registration__label"
            htmlFor="name"
          >
            Отображаемое имя
          </label>
          <input
            id="name"
            type="text"
            className="registration__input"
            placeholder="Введите никнэйм"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label
            className="registration__label"
            htmlFor="email"
          >
            Почта
          </label>
          <input
            id="email"
            type="email"
            className="registration__input"
            placeholder="Введите Email-адрес"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className="registration__label"
            htmlFor="password"
          >
            Пароль
          </label>
          <input
            id="password"
            type="password"
            className="registration__input"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div 
          className="buttons buttons__registration"
          onClick={ async () => {
            await signUp(email, password)
              .then ( async (answer) => await addUser(name, email, answer.user.uid));
          }}  
        >
          <p className="text">Зарегестрироваться</p>
        </div>
        <div 
          className="buttons buttons__registration"
          onClick={() =>{
            navigate('/sign-in')
          }}

        >
          <p className="text">Войти</p>
        </div>
      </div>
    </div>
  );
}
