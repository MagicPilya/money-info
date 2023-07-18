import AuthPage from "../components/pages/authPages/AuthPage";
import PromoPage from "../components/pages/promoPage/PromoPage";
import "./App.scss";

const App = () => {
  const isVisible = {
    promoPage: true,
    loginPage: false,
    registrationPage: false,
  }; // Позже заменить на реальную проверку!

  if (!isVisible.promoPage) {
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
  } else if (isVisible.promoPage) {
    return <PromoPage />;
  }
};

export default App;
