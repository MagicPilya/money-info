import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Alert,
  IconButton,
  Menu,
} from "@mui/material";
import { useInput } from "../../hooks/useInput";
import { connect, useDispatch } from "react-redux";
import {
  increaseAccountMoney,
  addRetrievingsCategory,
} from "../../firebase/database";
import AddSomeDataWithOneInput from "../../modal/addSomeDataWithOneInput/AddSomeDataWithOneInput";
import React, { useState } from "react";
import { RemoveCircleOutline } from "@mui/icons-material";
import PreDeleteDialog from "../../modal/info/PreDeleteDialog";

const textFieldStyle = {
  width: "300px",
};

const selectStyle = {
  width: "300px",
};

function Retrievings(props) {
  const { oldValueOfTotalMoney, setCloseModal } = props;
  const transmittedValueRetrievings = useInput("", {
    isEmpty: true,
    maxLength: 16,
  });

  const store = props.store;
  const user = store.currentUser.user;
  const userInfo = user.userInfo;

  const retrievings = user.categories.retrievings;
  const currentAccountIndex = userInfo.currentAccountIndex;
  const uid = userInfo.uid;
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const retrievingsAmount = useInput("", { isEmpty: true, isNegative: true });
  const categoryName = useInput("", { isEmpty: true });
  const date = useInput("", { isEmpty: true });
  const comment = useInput("", { isEmpty: true, maxLength: 50 });

  const handleSubmit = async () => {
    await increaseAccountMoney(
      uid,
      currentAccountIndex,
      oldValueOfTotalMoney,
      retrievingsAmount.value,
    );
    dispatch({
      type: "INCREASE_ACCOUNT_MONEY",
      payload: retrievingsAmount.value,
    });
    setCloseModal(false);
  };

  const handleSubmitRetrievings = async (retrievingsName) => {
    await addRetrievingsCategory(uid, retrievingsName, retrievings.length);
    dispatch({
      type: "ADD_RETRIEVINGS_CATEGORY",
      payload: { categoryName: retrievingsName },
    });
  };
  const handleDelete = async () => {
    console.log("crazy bitch");
  };

  return (
    <div className="operations__retrievings">
      <form
        className="operations__retrievings-form"
        id="operations-retrievings-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Typography variant="h4" gutterBottom component="h4">
          Добавить доход
        </Typography>
        <div className="operations__retrievings-form-input">
          {retrievingsAmount.isDirty &&
            (retrievingsAmount.isEmpty || retrievingsAmount.isNegative) && (
              <Alert severity="warning" variant="filled">
                {retrievingsAmount.textError}
              </Alert>
            )}
          <TextField
            sx={textFieldStyle}
            label="Сумма"
            variant="outlined"
            type="number"
            value={retrievingsAmount.value}
            onChange={retrievingsAmount.onChange}
            onBlur={retrievingsAmount.onBlur}
          />
        </div>

        <div className="operations__retrievings-form-input">
          {categoryName.isDirty && categoryName.isEmpty && (
            <Alert severity="warning" variant="filled">
              {categoryName.textError}
            </Alert>
          )}
          <FormControl sx={selectStyle}>
            <InputLabel id="operations__retrievings-form-selectCategory-label">
              Категория
            </InputLabel>
            <Select
              labelId="operations__retrievings-form-selectCategory-label"
              id="operations__retrievings-form-selectCategory"
              label="Категория"
              value={categoryName.value}
              onChange={categoryName.onChange}
              onBlur={categoryName.onBlur}
            >
              <AddSomeDataWithOneInput
                transmittedValue={transmittedValueRetrievings}
                triggerName="Добавить категорию доходов"
                title="Добавление категории доходов"
                handleSubmit={handleSubmitRetrievings}
                placeholder="Название категории"
              />
              {retrievings.map((item, key) => (
                <MenuItem value={item.categoryName} key={key}>
                  {item.categoryName}
                  <IconButton aria-label="delete" onClick={() => {}}>
                    <RemoveCircleOutline />
                  </IconButton>
                </MenuItem>
              ))}
              <PreDeleteDialog
                handleAction={handleDelete}
                trigger={openDialog}
                triggerSetter={setOpenDialog}
                title="категорию доходов"
              />
            </Select>
          </FormControl>
        </div>

        <div
          className="operations__retrievings-form-input"
          children="operations-retrievings-date"
        >
          {date.isDirty && date.isEmpty && (
            <Alert severity="warning" variant="filled">
              {date.textError}
            </Alert>
          )}
          <TextField
            sx={textFieldStyle}
            id="operations-retrievings-date"
            label="Дата"
            variant="outlined"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={date.value}
            onChange={date.onChange}
            onBlur={date.onBlur}
          />
        </div>
        <div className="operations__retrievings-form-input">
          {comment.isDirty && (comment.isEmpty || comment.maxLengthError) && (
            <Alert severity="warning" variant="filled">
              {comment.textError}
            </Alert>
          )}
          <TextField
            sx={textFieldStyle}
            label="Комментарий"
            multiline
            maxRows={5}
            value={comment.value}
            onChange={comment.onChange}
            onBlur={comment.onBlur}
          />
        </div>
        <div className="operations__retrievings-form-input">
          <Button
            type="submit"
            disabled={
              !retrievingsAmount.inputValid ||
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

export default connect((state) => ({ store: state }))(Retrievings);
