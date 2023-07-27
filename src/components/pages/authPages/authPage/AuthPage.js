import { useDispatch } from "react-redux";
import LoginPage from "../loginPage/LoginPage";
import RegistrationPage from "../registrationPage/RegistrationPage";

export default function AuthPage(props) {
  const dispatch = useDispatch();
  const { email, setEmail, password, setPassword } = props;
  const { isLogged } = props;
  if (isLogged.loginPage) {
    return (
      <LoginPage
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    );
  } else if (isLogged.registrationPage) {
    return (
      <RegistrationPage
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    );
  } else {
    return (
      <div className="auth">
        <div className="auth__logo"></div>
        <div className="auth__buttons">
          <div
            className="buttons buttons__auth"
            onClick={ () => {
              dispatch({type: "CHANGE_VISIBILITY_OF_PAGE", payload: { page: "loginPage", visibility: true }});
            }
            } 
          >
            <p className="text">Вход</p>
          </div>
          <div
            className="buttons buttons__auth"
            onClick={() =>
              dispatch({
                type: "CHANGE_VISIBILITY_OF_PAGE",
                payload: { page: "registrationPage", visibility: true },
              })
            }
          >
            <p className="text">Регистрация</p>
          </div>
        </div>
      </div>
    );
  }
}
