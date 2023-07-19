import AuthPage from "../components/pages/authPages/authPage/AuthPage";
import "./App.scss";

const App = () => {
  const isVisible = {
    loginPage: true,
    registrationPage: false,
  }; // Позже заменить на реальную проверку!

    return (
      <>
        <AuthPage
          isLogged={{
            loginPage: isVisible.loginPage,
            registrationPage: isVisible.registrationPage,
          }}
        />
      </>
    );
}

export default App;
