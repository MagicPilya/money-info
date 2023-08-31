import { useState } from "react";
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

export default function LoginPage() {
  const [showPassword = false, toggleShowPassword] = useState();
  const [errorMessage = "", setErrorMessage] = useState();
  const navigate = useNavigate();

  const email = useInput('', {isEmpty: true, minLength: 3, isEmail: true});
  const password = useInput('', {isEmpty: true, minLength: 5, maxLength: 10});
  const name = useInput('', {isEmpty: true, minLength: 2});
  return (
    <div className="auth">
      <div className="registration">
        <div className="registration__logo"></div>
        <form onSubmit={e => e.preventDefault()}>
        <div className="registration__info">
          {(name.isDirty && name.isEmpty) && <div style={{color: "red"}}>Поле не может быть пустым</div>}
          {(name.isDirty && name.minLengthError) && <div style={{color: "red"}}>Поле должно содержать не менее 2 символа</div>}
          <TextField
            id="outlined-basic"
            type="text"
            label="Name"
            margin="normal"
            variant="outlined"
            value={name.value}
            color="success"
            onChange={name.onChange}
            onBlur={name.onBlur}
            sx={{ "&:blur": { border: "1px solid green" } }}
          />
          {(email.isDirty && email.isEmpty) && <div style={{color: "red"}}>Поле не может быть пустым</div>}
          {(email.isDirty && email.minLengthError) && <div style={{color: "red"}}>Поле должно содержать не менее 3 символа</div>}
          {(email.isDirty && email.emailError) && <div style={{color: "red"}}>Не правильный email</div>}
          <TextField
            id="outlined-basic"
            type="email"
            label="Email"
            margin="normal"
            variant="outlined"
            value={email.value}
            color="success"
            onChange={email.onChange}
            onBlur={email.onBlur}
            sx={{ "&:blur": { border: "1px solid green" } }}
          />
          {(password.isDirty && password.isEmpty) && <div style={{color: "red"}}>Поле не может быть пустым</div>}
          {(password.isDirty && password.minLengthError) && <div style={{color: "red"}}>Поле должно содержать не менее 5 символов</div>}
          {(password.isDirty && password.maxLengthError) && <div style={{color: "red"}}>Поле должно содержать не более 10 символов</div>}
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
            await signUp(email, password).then(async (answer) => {
              await addUser(name, email, answer.user.uid);
              localStorage.setItem("user", answer.user.uid);
              await navigate("/");
            });
          }}
        >
          Зарегистрироваться
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
        </form>
        </div>
    </div>
  );
}
