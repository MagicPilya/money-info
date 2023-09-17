import {Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useInput} from "../../hooks/useInput";
import {increaseAccountMoney, decreaseAccountMoney} from "../../firebase/database";
import {useDispatch} from "react-redux";

const selectStyle = {
    "width": "350px"
}

const textFieldStyle = {
    "width": "350px"
}
export default function Debts(props) {
    const { creditors, uid,  currentAccountIndex, oldValueOfTotalMoney} = props;
    const dispatch = useDispatch();

    const [isValid, setValid] = useState(false);
    const typeOfDebt = useInput('', {isEmpty: true});
    const creditorName = useInput('', {isEmpty: true});
    const sumOfDebt = useInput('', {isEmpty: true, isNegative: true, maxValue: {finalNumber: oldValueOfTotalMoney, areYouSure: isValid}});

    useEffect( ()=> {
      setValid(typeOfDebt.value === "debtNegative");
    }, [sumOfDebt])

    const handlePositive = async () => {
      dispatch({type: "INCREASE_ACCOUNT_MONEY", payload: sumOfDebt.value});
      await increaseAccountMoney(uid, currentAccountIndex, oldValueOfTotalMoney, sumOfDebt.value);
    }
    const handleNegative = async () => {
      dispatch({type: "DECREASE_ACCOUNT_MONEY", payload: sumOfDebt.value});
      await decreaseAccountMoney(uid, currentAccountIndex, oldValueOfTotalMoney, sumOfDebt.value);
    }
  return (

      <div className="operations__debts">
          <form
            className="operations__debts-form"
            id="operations-debts-form"
            noValidate="true"
            onSubmit={ async  (e) => {
                e.preventDefault();
                if (typeOfDebt.value === "debtPositive") {
                    await handlePositive();
                } else if (typeOfDebt.value === "debtNegative") {
                    await handleNegative();
                }
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
                    disabled={ !typeOfDebt.inputValid || !creditorName.inputValid || !sumOfDebt.inputValid}
                  >Подтвердить</Button>
              </div>
          </form>

      </div>
  )
}
