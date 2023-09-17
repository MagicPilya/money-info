import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem, Alert, Typography,
} from "@mui/material";
import {useInput} from "../../hooks/useInput";
import React from "react";
import {useDispatch} from "react-redux";
import {decreaseAccountMoney} from "../../firebase/database";

const textFieldStyle = {
  width: "300px",
};

const selectStyle = {
  width: "300px",
};

export default function Costs(props) {
  const { costs, setCloseModal, uid, currentAccountIndex, oldValueOfTotalMoney } = props;
  const dispatch = useDispatch();

  const costsAmount = useInput('', {isEmpty: true, isNegative: true});
  const categoryName = useInput('', {isEmpty: true});
  const date = useInput('', {isEmpty: true});
  const comment = useInput('', {isEmpty: true, maxLength: 50});

  const handleSubmit = async () => {
    await decreaseAccountMoney(uid, currentAccountIndex, oldValueOfTotalMoney, costsAmount.value)
    dispatch({type: "DECREASE_ACCOUNT_MONEY", payload: costsAmount.value});
    setCloseModal(false); // Для закрытия модалки

  }

  function composeCostsData (amount, category, date, comment) {
    return {
      costsAmount: amount,
      categoryName: category,
      date: date,
      comment: comment,
    }
  }

  return (
    <div className="operations__costs">
      <form
        className="operations__costs-form"
        id="operations-costs-form"
        onSubmit={(e) => {
        e.preventDefault();
        console.log(composeCostsData(costsAmount.value, categoryName.value, date.value, comment.value));
        handleSubmit();
      }}>

        <Typography variant="h4" gutterBottom component="h4">
          Добавить расход
        </Typography>
        <div className="operations__costs-form-input">
          {((costsAmount.isDirty) && (
            costsAmount.isEmpty ||
            costsAmount.isNegative)) && (
            <Alert
              severity="warning"
              variant="filled">{costsAmount.textError}
            </Alert>)}
          <TextField
            sx={textFieldStyle}
            value={costsAmount.value}
            label="Сумма"
            variant="outlined"
            type="number"
            onChange={costsAmount.onChange}
            onBlur={costsAmount.onBlur}
          />
        </div>

        <div className="operations__costs-form-input">
          {((categoryName.isDirty) &&
            categoryName.isEmpty) && (
            <Alert
              severity="warning"
              variant="filled">{categoryName.textError}
            </Alert>)}
          <FormControl sx={selectStyle} >
            <InputLabel id="operations__costs-form-selectCategory-label">
              Категория
            </InputLabel>
            <Select
              labelId="operations__costs-form-selectCategory-label"
              id="operations__costs-form-selectCategory"
              value={categoryName.value}
              label="Категория"
              onChange={categoryName.onChange}
              onBlur={categoryName.onBlur}
            >
              {costs.map((item, key) => (
                <MenuItem value={item.name} key={key}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div
          className="operations__costs-form-input"
          children="operations-costs-date"
        >
          {((date.isDirty) &&
            date.isEmpty) && (
            <Alert
              severity="warning"
              variant="filled">{date.textError}
            </Alert>)}
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
        <div className="operations__costs-form-input">
          {((comment.isDirty) && (
            comment.isEmpty ||
            comment.maxLengthError)) && (
            <Alert
              severity="warning"
              variant="filled">{comment.textError}
            </Alert>)}
          <TextField
            sx={textFieldStyle}
            label="Комментарий"
            value={comment.value}
            onChange={comment.onChange}
            onBlur={comment.onBlur}
            multiline
            maxRows={5}
          />
        </div>
        <div className="operations__costs-form-input">
          <Button
            type="submit"
            disabled={ !costsAmount.inputValid || !categoryName.inputValid || !date.inputValid || !comment.inputValid}
          >Подтвердить</Button>
        </div>
      </form>
    </div>
  );
}
