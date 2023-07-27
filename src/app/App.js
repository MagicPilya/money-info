import {useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../components/pages/mainPage/MainPage";
import LoginPage from "../components/pages/authPages/loginPage/LoginPage";
import RegistrationPage from "../components/pages/authPages/registrationPage/RegistrationPage";

import "./App.scss";
// import { connect } from "react-redux";
const App = () => {
  const [email = "", setEmail] = useState();
  const [password = "", setPassword] = useState();

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage />}
      />
      <Route
        path="/sign-in"
        element={
          <LoginPage
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        }
      />
      <Route
        path="/sign-up"
        element={
          <RegistrationPage
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        }
      />
    </Routes>
  );
};

// export default connect((state) => ({ store: state }))(App);
export default App;
