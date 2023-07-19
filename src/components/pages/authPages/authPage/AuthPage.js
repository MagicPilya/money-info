import LoginPage from "../loginPage/LoginPage";
import RegistrationPage from "../registrationPage/RegistrationPage";

export default function AuthPage(props) {
  const { isLogged } = props;
  if (isLogged.loginPage) {
    return <LoginPage />;
  } else if (isLogged.registrationPage) {
    return <RegistrationPage />;
  } else {
    return (
      <div className="auth">
        <div className="auth__logo"></div>
        <div className="auth__buttons">
          <div className="buttons buttons__auth"><p className="text">Вход</p></div>
          <div className="buttons buttons__auth"><p className="text">Регистрация</p></div>
        </div>
      </div>
    );
  }
}
