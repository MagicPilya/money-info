import React, { useState } from "react";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage(props) {
  const { email, setEmail, password, setPassword, setUser, user } = props;

  const [errorMessage = "", setErrorMessage] = useState();
  const [showPassword = false, toggleShowPassword] = useState();

  const navigate = useNavigate();
  
  return (
    <>
      <CssBaseline />
      <div className="auth">
        <div className="login">
          <div className="login__logo"></div>
          <div className="login__info">
            <label>{errorMessage}</label>
            <TextField
              id="outlined-basic"
              label="Email"
              margin="normal"
              variant="outlined"
              value={email}
              color="success"
              onChange={(e) => setEmail(e.target.value)}
              sx={{ "&:blur": { border: "1px solid green" } }}
            />
            <FormControl
              variant="outlined"
              margin="normal"
            >
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              signIn(email, password).then(async (data) => {
                localStorage.setItem("user", data.user.uid);
                await navigate("/");
              });
            }}
          >
            Войти
          </Button>
          <div className="login__sign-up">
            Еще не зарегестрированы?
            <Link
              href="/sign-up"
              underline="hover"
              sx={{ textDecoration: "none", color: "green" }}
            >
              Зарегестрироваться
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
