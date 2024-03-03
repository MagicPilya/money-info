import React, { useEffect, useState } from "react";
import { signIn } from "../../../firebase/auth";
import { useNavigate } from "react-router";
import {
  TextField,
  Button,
  Link,
  InputAdornment,
  OutlinedInput,
  IconButton,
  InputLabel,
  FormControl,
  CssBaseline,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useInput } from "../../../hooks/useInput";

export default function LoginPage(props) {
  const email = useInput("", { isEmail: true, isEmpty: true });
  const password = useInput("", { minLength: 6, isEmpty: true });
  const [showPassword = false, toggleShowPassword] = useState();
  const [errorName, setErrorName] = useState("");
  const [newErrorName, setNewErrorName] = useState("");
  const [firebaseError, setFirebaseError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setFirebaseError(false);
    }, 3000);
  }, [firebaseError]);

  useEffect(() => {
    switch (errorName) {
      case "auth/user-not-found":
        setNewErrorName("Пользователь с данным E-mail-адресом не существует!");
        break;
      case "auth/too-many-requests":
        setNewErrorName("Слишком много запросов!");
        break;
      case "auth/wrong-password":
        setNewErrorName("Неверный пароль!");
        break;
      default:
        break;
    }
  }, [errorName]);

  return (
    <>
      <CssBaseline />
      <div className="auth">
        <div className="login">
          <div className="login__logo"></div>
          <form className="login__form" onSubmit={(e) => e.preventDefault()}>
            <div className="login__form-info">
              {firebaseError ? (
                <Alert severity="error" variant="filled">
                  {newErrorName}
                </Alert>
              ) : undefined}

              {email.isDirty && (email.isEmpty || email.emailError) && (
                <Alert severity="warning" variant="filled">
                  {email.textError}
                </Alert>
              )}
              <TextField
                id="outlined-basic"
                label="Email"
                margin="normal"
                variant="outlined"
                value={email.value.toLowerCase()}
                color="success"
                onChange={email.onChange}
                onBlur={email.onBlur}
                sx={{ "&:blur": { border: "1px solid green" } }}
              />
              {password.isDirty &&
                (password.isEmpty || password.minLengthError) && (
                  <Alert severity="warning" variant="filled">
                    {password.textError}
                  </Alert>
                )}
              <FormControl variant="outlined" margin="normal">
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  color="success"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  color="success"
                  type={showPassword ? "text" : "password"}
                  value={password.value}
                  onChange={password.onChange}
                  onBlur={password.onBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          if (!showPassword) toggleShowPassword(true);
                          else toggleShowPassword(false);
                        }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
            <Button
              disabled={!email.inputValid || !password.inputValid}
              type="submit"
              className="submit_login"
              variant="outlined"
              size="large"
              endIcon={"->"}
              sx={{
                color: "green",
                marginTop: "20px",
                "&:hover": { border: "1px solid green" },
              }}
              onClick={() => {
                signIn(email.value, password.value)
                  .then(async (data) => {
                    localStorage.setItem("user", data.user.uid);
                    await navigate("/");
                  })
                  .catch((answer) => {
                    setErrorName(answer);
                    setFirebaseError(true);
                  });
              }}
            >
              Войти
            </Button>
          </form>
          <div className="login__sign-up">
            Еще не зарегистрированы?
            <Link
              href="/sign-up"
              underline="hover"
              sx={{ textDecoration: "none", color: "green" }}
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
