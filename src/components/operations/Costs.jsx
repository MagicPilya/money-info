import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Typography,
} from "@mui/material";
import { useInput } from "../../hooks/useInput";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { decreaseAccountMoney } from "../../firebase/database";
import { addCostsCategory } from "../../firebase/database";
import AddSomeDataWithOneInput from "../../modal/addSomeDataWithOneInput/AddSomeDataWithOneInput";
import setFinalObjectFromInputs from "../../utils/setFinalObjectFromInputs";
import { setOperation } from "../../firebase/database";

const textFieldStyle = {
  width: "300px",
};

const selectStyle = {
  width: "300px",
};

function Costs(props) {
  const { setCloseModal, oldValueOfTotalMoney } = props;
  const dispatch = useDispatch();

  const store = props.store;
  const user = store.currentUser.user;
  const userInfo = user.userInfo;

  const costs = user.categories.costs;
  const currentAccountIndex = userInfo.currentAccountIndex;
  const currentAccount = userInfo.currentAccount;
  const currentCurrency = userInfo.currentCurrency;
  const operations = user.operations;

  const costsAmount = useInput("", { isEmpty: true, isNegative: true });
  const categoryName = useInput("", { isEmpty: true });
  const date = useInput("", { isEmpty: true });
  const comment = useInput("", { isEmpty: true, maxLength: 50 });
  const uid = user.userInfo.uid;

  const transmittedValueCosts = useInput("", {
    isEmpty: true,
    maxLength: 16,
  });

  const handleSubmit = async () => {
    await decreaseAccountMoney(
      uid,
      currentAccountIndex,
      oldValueOfTotalMoney,
      costsAmount.value
    );
    dispatch({ type: "DECREASE_ACCOUNT_MONEY", payload: costsAmount.value });

    // Сохранение операции
    setFinalObjectFromInputs(
      "Расход",
      currentAccount,
      comment.value,
      (date.value = date.value.split("-").reverse().join("/")),
      "minus",
      costsAmount.value,
      currentCurrency
    ).then(async (resObject) => {
      dispatch({
        type: "ADD_OPERATION",
        payload: resObject,
      });
      await setOperation(uid, operations.length, resObject);
    });
  };

  // Добавление категории расходов
  const handleSubmitCosts = async (costsName) => {
    await addCostsCategory(uid, costsName, costs.length);
    dispatch({
      type: "ADD_COSTS_CATEGORY",
      payload: { categoryName: costsName },
    });
  };

  return (
    <div className="operations__costs">
      <form
        className="operations__costs-form"
        id="operations-costs-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Typography variant="h4" gutterBottom component="h4">
          Добавить расход
        </Typography>
        <div className="operations__costs-form-input">
          {costsAmount.isDirty &&
            (costsAmount.isEmpty || costsAmount.isNegative) && (
              <Alert severity="warning" variant="filled">
                {costsAmount.textError}
              </Alert>
            )}
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
          {categoryName.isDirty && categoryName.isEmpty && (
            <Alert severity="warning" variant="filled">
              {categoryName.textError}
            </Alert>
          )}
          <FormControl sx={selectStyle}>
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
              <AddSomeDataWithOneInput
                transmittedValue={transmittedValueCosts}
                triggerName="Добавить категорию расходов"
                title="Добавление категории расходов"
                handleSubmit={handleSubmitCosts}
                placeholder="Название категории"
              />
              {costs.map((item, key) => (
                <MenuItem value={item.categoryName} key={key}>
                  {item.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div
          className="operations__costs-form-input"
          children="operations-costs-date"
        >
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
        <div className="operations__costs-form-input">
          {comment.isDirty && (comment.isEmpty || comment.maxLengthError) && (
            <Alert severity="warning" variant="filled">
              {comment.textError}
            </Alert>
          )}
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
            disabled={
              !costsAmount.inputValid ||
              !categoryName.inputValid ||
              !date.inputValid ||
              !comment.inputValid
            }
          >
            Подтвердить
          </Button>
        </div>
      </form>
    </div>
  );
}
export default connect((state) => ({ store: state }))(Costs);
