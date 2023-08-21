import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/mainPage/MainPage";
import LoginPage from "../pages/authPages/loginPage/LoginPage";
import RegistrationPage from "../pages/authPages/registrationPage/RegistrationPage";

import "./App.scss";
// import { connect } from "react-redux";
const App = () => {
  const [email = "", setEmail] = useState();
  const [password = "", setPassword] = useState();
  const [user, setUser] = useState();

  useEffect(()=> {
    document.title="Money-info"
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage
          setEmail={setEmail}
          setPassword={setPassword}
          setUser={setUser} />}
      />
      <Route
        path="/sign-in"
        element={
          <LoginPage
            
            
            email={email}
            password={password}
            user={user}
            setEmail={setEmail}
            setPassword={setPassword}
            setUser={setUser}
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
