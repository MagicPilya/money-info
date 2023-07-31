import React, { useState } from "react";
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

export default function LoginPage(props) {
  const [name = "", setName] = useState();
  const { email, setEmail, password, setPassword } = props;
  const [showPassword = false, toggleShowPassword] = useState();

  const [errorMessage = "", setErrorMessage] = useState();

  const navigate = useNavigate();

  return (
    <div className="auth">
      <div className="registration">
        <div className="registration__logo"></div>
        <div className="registration__info">
          <label>{errorMessage}</label>
          <TextField
            id="outlined-basic"
            type="text"
            label="Name"
            margin="normal"
            variant="outlined"
            value={name}
            color="success"
            onChange={(e) => setName(e.target.value)}
            sx={{ "&:blur": { border: "1px solid green" } }}
          />
          <TextField
            id="outlined-basic"
            type="email"
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
          variant="outlined"
          size="large"
          endIcon={"->"}
          sx={{
            color: "green",
            marginTop: "20px",
            "&:hover": { border: "1px solid green" },
          }}
          onClick={async () => {
            await signUp(email, password).then(async (answer) => {
              await addUser(name, email, answer.user.uid);
              localStorage.setItem("user", answer.user.uid);
              await navigate("/");
            });
          }}
        >
          Зарегестрироваться
        </Button>
        <div className="registration__sign-in">
          Уже зарегестрированы?
          <Link
            href="/sign-in"
            underline="hover"
            sx={{ textDecoration: "none", color: "green" }}
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
