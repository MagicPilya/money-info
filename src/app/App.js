import { connect } from "react-redux";
import { auth } from "../firebase";
import AuthPage from "../components/pages/authPages/authPage/AuthPage";
import MainPage from "../components/pages/mainPage/MainPage";
import "./App.scss";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
const App = (props) => {
  const [email = "", setEmail] = useState();
  const [password = "", setPassword] = useState();

  const isVisible = {
    loginPage: props.store.pages.loginPage.visibility,
    registrationPage: props.store.pages.registrationPage.visibility,
    mainPage: props.store.pages.mainPage.visibility,
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user exists!')

      return (
        <>
          <MainPage></MainPage>
        </>
      );
    } else {
      console.log('user not exists!')
      return (
        <>
          <AuthPage
            isLogged={{
              loginPage: isVisible.loginPage,
              registrationPage: isVisible.registrationPage,
            }}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </>
      );
    }
  });
  // if (!isVisible.mainPage) {
  //   // } else if (isVisible.mainPage) return (
  // }
};
export default connect((state) => ({ store: state }))(App);
