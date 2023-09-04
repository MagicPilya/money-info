import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/mainPage/MainPage";
import LoginPage from "../pages/authPages/loginPage/LoginPage";
import RegistrationPage from "../pages/authPages/registrationPage/RegistrationPage";

import "./App.scss";
// import { connect } from "react-redux";
const App = () => {
  const [user, setUser] = useState();

  useEffect(()=> {
    document.title="Money-info"
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage
          setUser={setUser} />}
      />
      <Route
        path="/sign-in"
        element={
          <LoginPage/>
        }
      />
      <Route
        path="/sign-up"
        element={
          <RegistrationPage
          />
        }
      />
    </Routes>
  );
};

// export default connect((state) => ({ store: state }))(App);
export default App;
