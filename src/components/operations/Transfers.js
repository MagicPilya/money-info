import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Alert,
  Typography,
} from "@mui/material";
import { useInput } from "../../hooks/useInput";
import { connect, useDispatch } from "react-redux";
import { findDataOfAccount } from "../../utils/arraysOperations";
import {
  decreaseAccountMoney,
  increaseAccountMoney,
} from "../../firebase/database";
import { setOperation } from "../../firebase/database";

import setFinalObjectFromInputs from "../../utils/setFinalObjectFromInputs";
const selectStyle = {
  width: "300px",
};

const textFieldStyle = {
  width: "300px",
};
function Transfers(props) {
  const { accounts, currentAccount } = props;
  const dispatch = useDispatch();
  const transferDirection = useInput("", { isEmpty: true });
  const transferSum = useInput("", { isEmpty: true, isNegative: true });

  const store = props.store;
  const user = store.currentUser.user;
  const userInfo = user.userInfo;

  const uid = userInfo.uid;
  const currentAccountIndex = userInfo.currentAccountIndex;
  const currentCurrency = userInfo.currentCurrency;
  const operations = user.operations;

  let currentAccountCurrency = "";
  accounts.map((item) => {
    if (item.name === currentAccount) {
      currentAccountCurrency = item.currency;
    }
    return undefined;
  });

  const handleSubmit = async () => {
    const indexTo = +findDataOfAccount(
      accounts,
      transferDirection.value,
      "index"
    );
    const amountFrom = +findDataOfAccount(
      accounts,
      currentAccount,
      "totalMoney"
    );
    const amountTo = +findDataOfAccount(
      accounts,
      transferDirection.value,
      "totalMoney"
    );
    await decreaseAccountMoney(
      uid,
      currentAccountIndex,
      +amountFrom,
      +transferSum.value
    );
    await increaseAccountMoney(uid, indexTo, amountTo, +transferSum.value);
    dispatch({
      type: "TRANSFER_MONEY",
      payload: {
        from: +currentAccount,
        to: +transferDirection.value,
        amount: +transferSum.value,
      },
    });

    // eslint-disable-next-line
    Date.prototype.today = function () {
      return (
        (this.getDate() < 10 ? "0" : "") +
        this.getDate() +
        "/" +
        (this.getMonth() + 1 < 10 ? "0" : "") +
        (this.getMonth() + 1) +
        "/" +
        this.getFullYear()
      );
    };
    const currentDate = new Date();
    const dateTime = currentDate.today();

    // Сохранение операции
    setFinalObjectFromInputs(
      "Перевод",
      currentAccount,
      transferDirection.value,
      dateTime,
      "minus",
      transferSum.value,
      currentCurrency
    ).then(async (resObject) => {
      dispatch({
        type: "ADD_OPERATION",
        payload: resObject,
      });
      await setOperation(uid, operations.length, resObject);
    });
  };
  return (
    <div className="operations__transfers">
      <form
        className="operations__transfers-form"
        id="operations-transfers-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Typography variant="h4" gutterBottom component="h4">
          Перевод на другой счет
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="div">
          Для перевода необходимо соответсвие валюты!
        </Typography>

        <div className="operations__transfers-form-input">
          {transferDirection.isDirty && transferDirection.isEmpty && (
            <Alert severity="warning" variant="filled">
              {transferDirection.textError}
            </Alert>
          )}
          <FormControl sx={selectStyle}>
            <InputLabel id="operations__transfers-form-selectAccountTo-label">
              Перевод на счет
            </InputLabel>
            <Select
              labelId="operations__transfers-form-selectAccountTo-label"
              id="operations__transfers-form-selectAccountTo"
              label="Перевод на счет"
              value={transferDirection.value}
              onChange={transferDirection.onChange}
              onBlur={transferDirection.onBlur}
            >
              {accounts.map((item, key) =>
                item.name !== currentAccount &&
                item.currency === currentAccountCurrency ? (
                  <MenuItem value={item.name} key={key}>
                    {item.name}
                  </MenuItem>
                ) : null
              )}
            </Select>
          </FormControl>
        </div>

        <div className="operations__transfers-form-input">
          {transferSum.isDirty &&
            (transferSum.isEmpty || transferSum.isNegative) && (
              <Alert severity="warning" variant="filled">
                {transferSum.textError}
              </Alert>
            )}
          <TextField
            sx={textFieldStyle}
            label="Сумма"
            variant="outlined"
            type="number"
            value={transferSum.value}
            onChange={transferSum.onChange}
            onBlur={transferSum.onBlur}
          />
        </div>
        <div className="operations__transfers-form-input">
          <Button
            type="submit"
            disabled={!transferDirection.inputValid || !transferSum.inputValid}
          >
            Подтвердить
          </Button>
        </div>
      </form>
    </div>
  );
}
export default connect((state) => ({ store: state }))(Transfers);
