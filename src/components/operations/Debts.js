import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInput } from "../../hooks/useInput";
import {
  increaseAccountMoney,
  decreaseAccountMoney,
  setOperation,
  editOperation,
} from "../../firebase/database";
import { connect, useDispatch } from "react-redux";
import setFinalObjectFromInputs from "../../utils/setFinalObjectFromInputs";
import { findDataOfAccount } from "../../utils/arraysOperations";

const selectStyle = {
  width: "350px",
};

const textFieldStyle = {
  width: "350px",
};
const Debts = (props) => {
  const {
    typeOfOperation,
    oldOperationAccount,
    oldDescription,
    oldOperationDate,
    oldOperationType,
    oldAmount,
    operationID,
  } = props;

  const dispatch = useDispatch();

  const user = props.store.currentUser.user,
    accounts = user.accounts,
    creditors = user.creditors,
    uid = user.userInfo.uid,
    currentAccountIndex = user.userInfo.currentAccountIndex,
    currentAccount = user.userInfo.currentAccount,
    currentCurrency = user.userInfo.currentCurrency,
    oldValueOfTotalMoney = +findDataOfAccount(
      accounts,
      currentAccount,
      "totalMoney"
    ),
    operations = user.operations;

  const [isValid, setValid] = useState(false);
  const typeOfDebt = useInput(oldOperationType || "", { isEmpty: true });
  const creditorName = useInput(oldDescription || "", { isEmpty: true });
  const sumOfDebt = useInput(+oldAmount || "", {
    isEmpty: true,
    isNegative: true,
    maxValue: { finalNumber: +oldValueOfTotalMoney, areYouSure: isValid },
  });

  useEffect(() => {
    setValid(typeOfDebt.value === "minus");
  }, [sumOfDebt, typeOfDebt]);

  const handlePositive = async () => {
    dispatch({ type: "INCREASE_ACCOUNT_MONEY", payload: sumOfDebt.value });
    await increaseAccountMoney(
      uid,
      currentAccountIndex,
      +oldValueOfTotalMoney,
      +sumOfDebt.value
    );
  };
  const handleNegative = async () => {
    dispatch({ type: "DECREASE_ACCOUNT_MONEY", payload: sumOfDebt.value });
    await decreaseAccountMoney(
      uid,
      currentAccountIndex,
      +oldValueOfTotalMoney,
      +sumOfDebt.value
    );
  };
  const handleSetOperation = async (finalObject) => {
    switch (typeOfOperation) {
      case "Edit": {
        await editOperation(
          uid,
          operationID,
          finalObject,
          accounts,
          operations
        );
        dispatch({
          type: "EDIT_OPERATION",
          payload: { finalObject, operationID },
        });
        break;
      }
      case "Add": {
        await setOperation(uid, operations.length, finalObject);
        dispatch({ type: "ADD_OPERATION", payload: finalObject });
        if (typeOfDebt.value === "plus") {
          await handlePositive();
        } else if (typeOfDebt.value === "minus") {
          await handleNegative();
        }
        break;
      }
      default: {
        break;
      }
    }
  };
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

  return (
    <div className="operations__debts">
      <form
        className="operations__debts-form"
        id="operations-debts-form"
        noValidate={true}
        onSubmit={async (e) => {
          e.preventDefault();

          await setFinalObjectFromInputs(
            "Долги",
            currentAccount,
            creditorName.value,
            dateTime,
            typeOfDebt.value,
            +sumOfDebt.value,
            currentCurrency
          ).then(async (answer) => await handleSetOperation(answer));
        }}
      >
        <Typography variant="h4" gutterBottom component="h4">
          Долговые операции
        </Typography>
        {typeOfOperation === "Edit" ? (
          <EditData
            typeOfOperation={typeOfOperation}
            accounts={accounts}
            oldOperationAccount={oldOperationAccount}
            oldOperationDate={oldOperationDate}
          />
        ) : null}
        <div className="operations__debts-form-input">
          {typeOfDebt.isDirty && typeOfDebt.isEmpty && (
            <Alert severity="warning" variant="filled">
              {typeOfDebt.textError}
            </Alert>
          )}
          <FormControl sx={selectStyle}>
            <InputLabel id="operations__debts-form-selectType-label">
              Тип долга
            </InputLabel>
            <Select
              labelId="operations__debts-form-selectType-label"
              id="operations__debts-form-selectType"
              label="Тип долга"
              value={typeOfDebt.value}
              onChange={typeOfDebt.onChange}
              onBlur={typeOfDebt.onBlur}
            >
              <MenuItem value="minus">Я дал в долг / Я вернул долг</MenuItem>
              <MenuItem value="plus">
                Мне дали в долг / Мне вернули долг
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="operations__debts-form-input">
          {creditorName.isDirty && creditorName.isEmpty && (
            <Alert severity="warning" variant="filled">
              {creditorName.textError}
            </Alert>
          )}
          <FormControl sx={selectStyle}>
            <InputLabel id="operations__debts-form-selectCreditor-label">
              Имя кредитора
            </InputLabel>
            <Select
              labelId="operations__debts-form-selectCreditor-label"
              id="operations__debts-form-selectCreditor"
              label="Имя кредитора"
              value={creditorName.value}
              onChange={creditorName.onChange}
              onBlur={creditorName.onBlur}
            >
              {creditors.map((item, key) => (
                <MenuItem key={key} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="operations__debts-form-input">
          {sumOfDebt.isDirty &&
            (sumOfDebt.isEmpty ||
              sumOfDebt.isNegative ||
              sumOfDebt.maxValueError) && (
              <Alert severity="warning" variant="filled">
                {sumOfDebt.textError}
              </Alert>
            )}
          <TextField
            sx={textFieldStyle}
            label="Сумма"
            variant="outlined"
            type="number"
            autoComplete="off"
            value={sumOfDebt.value}
            onChange={sumOfDebt.onChange}
            onBlur={sumOfDebt.onBlur}
          />
        </div>
        <div className="operations__debts-form-input">
          <Button
            type="submit"
            disabled={
              !typeOfDebt.inputValid ||
              !creditorName.inputValid ||
              (sumOfDebt.isDirty && !sumOfDebt.inputValid) ||
              !sumOfDebt.inputValid
            }
          >
            Подтвердить
          </Button>
        </div>
      </form>
    </div>
  );
};

const EditData = (props) => {
  const { typeOfOperation, oldOperationAccount, oldOperationDate, accounts } =
    props;

  const account = useInput(oldOperationAccount, { isEmpty: true });
  const date = useInput(oldOperationDate.split("/").reverse().join("-"), {
    isEmpty: true,
  });
  if (typeOfOperation === "Edit") {
    return (
      <>
        <div className="operations__debts-form-input">
          {account.isDirty && account.isEmpty && (
            <Alert severity="warning" variant="filled">
              {account.textError}
            </Alert>
          )}
          <FormControl sx={selectStyle}>
            <InputLabel id="operations__debts-form-selectType-label">
              Счёт
            </InputLabel>
            <Select
              labelId="operations__debts-form-selectType-label"
              id="operations__debts-form-selectType"
              label="Счёт"
              value={account.value}
              onChange={account.onChange}
              onBlur={account.onBlur}
            >
              {accounts.map((item, id) => (
                <MenuItem value={item.name} key={id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="operations__debts-form-input">
          {date.isDirty && date.isEmpty && (
            <Alert severity="warning" variant="filled">
              {date.textError}
            </Alert>
          )}
          <TextField
            sx={textFieldStyle}
            id="operations-costs-date"
            label="Дата"
            value={date.value}
            onChange={date.onChange}
            onBlur={date.onBlur}
            variant="outlined"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </>
    );
  }
};
export default connect((state) => ({ store: state }))(Debts);
