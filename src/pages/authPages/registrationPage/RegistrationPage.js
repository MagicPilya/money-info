import React, { useState, useEffect } from "react";
import { signUp } from "../../../firebase/auth";
import { addUser } from "../../../firebase/database";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {useInput} from "../../../hooks/useInput";
import {Alert} from "@mui/material";

const inputStyle = {
  "width": "300px"
}

export default function LoginPage() {
  const [showPassword = false, toggleShowPassword] = useState();
  const navigate = useNavigate();
  const email = useInput('', {isEmpty: true, isEmail: true});
  const password = useInput('', {isEmpty: true, minLength: 6});
  const name = useInput('', {isEmpty: true, minLength: 2, maxLength: 10});

  const [firebaseError, setFirebaseError] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [newErrorName, setNewErrorName] = useState('');

  useEffect(() => {
    setTimeout( () => {
      setFirebaseError(false);
    }, 3000)
  }, [firebaseError]);

  useEffect ( () => {
    switch (errorName) {
      case "auth/email-already-in-use": {
        setNewErrorName("Email-адрес уже зарегистрирован");
      }
    }
  }, [errorName])
  return (
    <div className="auth">
      <div className="registration">
        <div className="registration__logo"></div>
        <form onSubmit={e => e.preventDefault()}>
          {firebaseError ? <Alert severity="error" variant="filled" >{newErrorName}</Alert> : undefined}
        <div className="registration__info">
          {((name.isDirty) && (
              name.isEmpty ||
              name.maxLengthError ||
              name.minLengthError)) && (
              <Alert
                sx={inputStyle}
                severity="warning"
                variant="filled">{name.textError}
              </Alert>)}
          <TextField
          id="outlined-basic"
            type="text"
            label="Имя"
            margin="normal"
            variant="outlined"
            value={name.value}
            color="success"
            onChange={name.onChange}
            onBlur={name.onBlur}
            sx={ {...inputStyle, "&:blur": { border: "1px solid green" } }}
          />
          {((email.isDirty) && (
              email.isEmpty ||
              email.emailError)) && (
              <Alert
                  sx={inputStyle}
                  severity="warning"
                  variant="filled">{email.textError}
              </Alert>)}
          <TextField
            id="outlined-basic"
            type="email"
            label="Email"
            margin="normal"
            variant="outlined"
            value={email.value.toLowerCase()}
            color="success"
            onChange={email.onChange}
            onBlur={email.onBlur}
            sx={{...inputStyle, "&:blur": { border: "1px solid green" } }}
          />
          {((password.isDirty) && (
              password.isEmpty ||
              password.minLengthError)) && (
              <Alert
                  sx={inputStyle}
                  severity="warning"
                  variant="filled">{password.textError}
              </Alert>)}
          <FormControl
            variant="outlined"
            margin="normal"
            sx={inputStyle}
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              color="success"
            >
              Пароль
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
              label="Пароль"
            />
          </FormControl>
        </div>
        <Button
          disabled={ !name.inputValid ||!email.inputValid || !password.inputValid }
          type="submit"
          variant="outlined"
          size="large"
          endIcon={"->"}
          sx={{
            color: "green",
            marginTop: "20px",
            "&:hover": { border: "1px solid green" },
          }}
          onClick={async () => {
            await signUp(email.value, password.value).then(async (answer) => {
              await addUser(name.value, email.value, answer.user.uid);
              localStorage.setItem("user", answer.user.uid);
              await navigate("/");
            })
              .catch(error => {
                setErrorName(error);
                setFirebaseError(true);
              });
          }}
        >
          Зарегистрироваться
        </Button>
        <div className="registration__sign-in">
          Уже зарегистрированы?
          <Link
            href="/sign-in"
            underline="hover"
            sx={{ textDecoration: "none", color: "green" }}
          >
            Войти
          </Link>
        </div>
        </form>
        </div>
    </div>
  );
}
