import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";

import AddCardIcon from "@mui/icons-material/AddCard";
import {
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  Typography,
  Fade,
  Modal,
  Box,
  Backdrop,
  Alert,
} from "@mui/material";

import {
  addAccount,
  addCurrency,
  deleteInitialValues,
  setCurrentCurrency,
  setCurrentAccount,
} from "../../firebase/database";

import AddSomeDataWithOneInput from "../addSomeDataWithOneInput/AddSomeDataWithOneInput";
import { useInput } from "../../hooks/useInput";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AddAccountModal(props) {
  const store = props.store;
  const user = store.currentUser.user;
  const userInfo = user.userInfo;

  const currenciesList = user.currencies;
  const accountsList = user.accounts;
  const uid = userInfo.uid;

  const dispatch = useDispatch();

  const name = useInput("", { isEmpty: true, minLenght: 4, maxLength: 16 });
  const balance = useInput(0, { isNegative: true, isEmpty: true });
  const currency = useInput("", { isEmpty: true });
  const transmittedValue = useInput("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 8,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let accountInfo = {
    totalMoney: balance.value,
    currency: currency.value,
    name: name.value,
  };

  const handleSubmitCurrency = async (currencyName) => {
    if (currenciesList.length === 0) {
      await addCurrency(uid, currencyName, 0);
      await deleteInitialValues(userInfo.uid, "currencies");
      await setCurrentCurrency(uid, currencyName);
      await setCurrentAccount(uid, accountInfo.name, 0);
      dispatch({
        type: "ADD_CURRENCY",
        payload: { currencyName: currencyName },
      });
      dispatch({
        type: "SET_ACTIVE_CURRENCY",
        payload: currencyName,
      });
      dispatch({
        type: "SET_ACTIVE_ACCOUNT",
        payload: { name: accountInfo.name, index: 0 },
      });
    } else {
      let increment = 0;

      for (let i = 0; i <= currenciesList.length; i++) {
        increment = i;
      }
      await addCurrency(uid, currencyName, increment);

      dispatch({
        type: "ADD_CURRENCY",
        payload: { currencyName: currencyName },
      });
    }
  };

  const clearState = () => {
    name.setValue("");
    balance.setValue("");
    currency.setValue("");
  };

  const handleSubmitAccount = async () => {
    dispatch({ type: "ADD_ACCOUNT", payload: accountInfo });

    await addAccount(uid, accountInfo, accountsList.length);
    await clearState();
    await handleClose();
  };

  return (
    <div>
      <MenuItem onClick={handleOpen}>
        <div className="modal__addAcount-triggerName">Добавить счёт</div>
        <AddCardIcon sx={{ marginLeft: "5px" }} color="success" />
      </MenuItem>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <form
            className="addAccountModal__form"
            onSubmit={(e) => e.preventDefault()}
          >
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Добавление счета
              </Typography>
              {name.isDirty &&
                (name.isEmpty ||
                  name.maxLengthError ||
                  name.minLengthError) && (
                  <Alert severity="warning" variant="filled">
                    {name.textError}
                  </Alert>
                )}
              <TextField
                label="Название счёта"
                margin="normal"
                variant="outlined"
                value={name.value}
                color="success"
                onChange={name.onChange}
                onBlur={name.onBlur}
                sx={{ "&:blur": { border: "1px solid green" } }}
              ></TextField>

              {balance.isDirty && (balance.isNegative || balance.isEmpty) && (
                <Alert severity="warning" variant="filled">
                  {balance.textError}
                </Alert>
              )}
              <TextField
                type="number"
                label="Баланс"
                margin="normal"
                variant="outlined"
                value={balance.value}
                color="success"
                onChange={balance.onChange}
                onBlur={balance.onBlur}
                sx={{ "&:blur": { border: "1px solid green" } }}
              ></TextField>
              {currency.isDirty && currency.isEmpty && (
                <Alert severity="warning" variant="filled">
                  {currency.textError}
                </Alert>
              )}
              <FormControl margin="normal" sx={{ width: "53%" }}>
                <InputLabel id="demo-simple-select-label">
                  Валюта счета
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currency.value}
                  label="Валюта счёта"
                  onChange={currency.onChange}
                  onBlur={currency.onBlur}
                >
                  {currenciesList.map((item, key) => (
                    <MenuItem
                      value={item.currencyName}
                      key={key}
                      onClick={() => {}}
                    >
                      {item.currencyName}
                    </MenuItem>
                  ))}

                  <AddSomeDataWithOneInput
                    transmittedValue={transmittedValue}
                    triggerName="Добавить валюту"
                    title="Добавление валюты"
                    handleSubmit={handleSubmitCurrency}
                    placeholder="Валюта"
                  />
                </Select>
              </FormControl>
              <Button
                disabled={
                  !name.inputValid ||
                  !balance.inputValid ||
                  !currency.inputValid
                }
                type="submit"
                onClick={handleSubmitAccount}
                variant="contained"
                color="success"
              >
                Принять
              </Button>
            </Box>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}

export default connect((state) => ({ store: state }))(AddAccountModal);
