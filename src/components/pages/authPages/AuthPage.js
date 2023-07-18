import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";

export default function AuthPage(props) {
  const { isLogged } = props;
  if (isLogged.loginPage) {
    return <LoginPage />;
  } else if (isLogged.registrationPage) {
    return <RegistrationPage />;
  }
}
