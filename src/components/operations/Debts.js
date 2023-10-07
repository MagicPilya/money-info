import {Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useInput} from "../../hooks/useInput";
import {increaseAccountMoney, decreaseAccountMoney, setOperation} from "../../firebase/database";
import {connect, useDispatch} from "react-redux";
import setFinalObjectFromInputs from "../../utils/setFinalObjectFromInputs";
import {findDataOfAccount} from "../../utils/arraysOperations";

const selectStyle = {
  "width": "350px"
}

const textFieldStyle = {
  "width": "350px"
}
const Debts = (props) => {
  
  const {
    typeOfOperation,
    oldOperationAccount,
    oldDescription,
    oldOperationDate,
    oldOperationType,
    oldAmount,
  } = props
  
  const dispatch = useDispatch();
  
  const
    user = props.store.currentUser.user,
    accounts = user.accounts,
    creditors = user.creditors,
    uid = user.userInfo.uid,
    currentAccountIndex = user.userInfo.currentAccountIndex,
    currentAccount = user.userInfo.currentAccount,
    currentCurrency = user.userInfo.currentCurrency,
    oldValueOfTotalMoney = +findDataOfAccount(accounts, currentAccount, "totalMoney"),
    operations = user.operations;

  const [isValid, setValid] = useState(false);
  const typeOfDebt = useInput('', {isEmpty: true});
  const creditorName = useInput(oldDescription || '', {isEmpty: true});
  const sumOfDebt = useInput(+oldAmount || '', {isEmpty: true, isNegative: true, maxValue: {finalNumber: +oldValueOfTotalMoney, areYouSure: isValid}});
  const [operationType, setOperationType] = useState(oldOperationType || '');
  
  useEffect ( () => {
    (typeOfDebt.value === "debtNegative") ? setOperationType("minus") : setOperationType("plus");
  }, [typeOfDebt])
  useEffect( ()=> {
    setValid(typeOfDebt.value === "debtNegative");
  }, [sumOfDebt])
  
  const handlePositive = async () => {
    dispatch({type: "INCREASE_ACCOUNT_MONEY", payload: sumOfDebt.value});
    await increaseAccountMoney(uid, currentAccountIndex, +oldValueOfTotalMoney, +sumOfDebt.value);
  }
  const handleNegative = async () => {
    dispatch({type: "DECREASE_ACCOUNT_MONEY", payload: sumOfDebt.value});
    await decreaseAccountMoney(uid, currentAccountIndex, +oldValueOfTotalMoney, +sumOfDebt.value);
  }
  const handleSetOperation = async (finalObject) => {
    switch (typeOfOperation) {
      case "Edit": {
        
        break;
      }
      case "Add": {
        await setOperation(uid, operations.length, finalObject);
        dispatch({type: "ADD_OPERATION", payload: finalObject});
        break;
      }
      default: {
        break;
      }
    }
  }

  Date.prototype.today = function () {
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
  }
  const currentDate = new Date();
  const dateTime = currentDate.today();

  return (

      <div className="operations__debts">
          <form
            className="operations__debts-form"
            id="operations-debts-form"
            noValidate={true}
            onSubmit={ async  (e) => {
              e.preventDefault();
              if (typeOfDebt.value === "debtPositive") {
                  await handlePositive();
              } else if (typeOfDebt.value === "debtNegative") {
                  await handleNegative();
              }
              
              await setFinalObjectFromInputs(
                "Долги",
                currentAccount,
                creditorName.value,
                dateTime,
                operationType,
                +sumOfDebt.value,
                currentCurrency
              )
                .then(async(answer) => await handleSetOperation(answer));
            }}>
              <Typography variant="h4" gutterBottom component="h4">
                  Долговые операции
              </Typography>
              <div className="operations__debts-form-input">
                  {((typeOfDebt.isDirty) &&
                    typeOfDebt.isEmpty ) && (
                    <Alert
                      severity="warning"
                      variant="filled">{typeOfDebt.textError}
                    </Alert>)}
                  <FormControl sx={selectStyle} >
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
                          <MenuItem value="debtNegative">Я дал в долг / Я вернул долг</MenuItem>
                          <MenuItem value="debtPositive">Мне дали в долг / Мне вернули долг</MenuItem>
                      </Select>
                  </FormControl>
              </div>
              <div className="operations__debts-form-input">
                  {((creditorName.isDirty) &&
                    creditorName.isEmpty ) && (
                    <Alert
                      severity="warning"
                      variant="filled">{creditorName.textError}
                    </Alert>)}
                  <FormControl sx={selectStyle} >
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
                          {/*Исправить косяк с объектом над массивом (wtf) */}
                          {creditors.creditors.map((item, key) => (
                            <MenuItem key={key} value={item}>{item}</MenuItem>
                          ))}
                      </Select>
                  </FormControl>
              </div>
              <div className="operations__debts-form-input">
                  {((sumOfDebt.isDirty) &&
                    (sumOfDebt.isEmpty || sumOfDebt.isNegative || sumOfDebt.maxValueError)  ) && (
                    <Alert
                      severity="warning"
                      variant="filled">{sumOfDebt.textError}
                    </Alert>)}
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
                    disabled= {!typeOfDebt.inputValid || !creditorName.inputValid || ( sumOfDebt.isDirty && !sumOfDebt.inputValid ) || !sumOfDebt.inputValid}
                  >Подтвердить</Button>
              </div>
          </form>

      </div>
  )
}
export default connect((state) => ({store: state}))(Debts);
