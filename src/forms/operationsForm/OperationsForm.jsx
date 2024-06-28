import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Typography,
  Button,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import AddItemDialog from "../../modal/addItemDialog/AddItemDialog";

dayjs.locale("ru");

const textFieldStyle = {
  width: "200px",
  margin: "10px",
  "&:blur": { border: "1px solid green" },
};

const commonSchema = {
  name: yup.string().required("Название обязательно"),
  additionalInfo: yup.string().required("Категория обязательна"),
  amount: yup
    .number()
    .typeError("Сумма должна быть числом")
    .required("Сумма обязательна"),
  date: yup.date().typeError("Некорректная дата").required("Дата обязательна"),
  description: yup.string().max(50, "Длина не должна превышать 50 символов"),
  location: yup.string().max(15, "Длина не должна превышать 15 символов"),
};

const costSchema = yup.object().shape({
  ...commonSchema,
});

const retrievingsSchema = yup.object().shape({
  ...commonSchema,
});

const debtsSchema = yup.object().shape({
  ...commonSchema,
});

const transfersSchema = yup.object().shape({
  additionalInfo: yup.string().required("Категория обязательна"),
  amount: yup
    .number()
    .typeError("Сумма должна быть числом")
    .required("Сумма обязательна"),
  date: yup.date().typeError("Некорректная дата").required("Дата обязательна"),
  description: yup.string().max(50, "Длина не должна превышать 50 символов"),
  location: yup.string().max(15, "Длина не должна превышать 15 символов"),
});

const defaultSchema = yup.object().shape({
  value: yup
    .number()
    .typeError("Значение должно быть числом")
    .required("Поле обязательно"),
});

const schemas = {
  Costs: costSchema,
  Retrievings: retrievingsSchema,
  Transfers: transfersSchema,
  Debts: debtsSchema,
};

const InputField = ({ name, label, control, errors, ...props }) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field }) => (
      <TextField
        label={label}
        variant="outlined"
        color="success"
        sx={textFieldStyle}
        error={!!errors?.[name]}
        helperText={errors?.[name] ? errors[name].message : ""}
        {...field}
        {...props}
      />
    )}
  />
);

const AutocompleteField = ({
  name,
  label,
  control,
  errors,
  options,
  handleAdd,
  dialogTitle,
  dialogLabel,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Autocomplete
            {...field}
            freeSolo
            options={options}
            onChange={(event, newValue) => {
              if (newValue === `Добавить ${dialogLabel.toLowerCase()}`) {
                setOpenDialog(true);
              } else {
                field.onChange(newValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="outlined"
                color="success"
                sx={textFieldStyle}
                error={!!errors?.[name]}
                helperText={errors?.[name] ? errors[name].message : ""}
              />
            )}
          />
        )}
      />
      <AddItemDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleAdd}
        title={dialogTitle}
        label={dialogLabel}
        labelForInput={`Название ${dialogLabel.toLowerCase()}`}
      />
    </>
  );
};

const DateField = ({ name, label, control, errors }) => (
  <Controller
    name={name}
    control={control}
    defaultValue={null}
    render={({ field }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru">
        <DatePicker
          sx={textFieldStyle}
          format="DD.MM.YYYY"
          label={label}
          slotProps={{
            textField: {
              error: !!errors?.[name],
              helperText: errors?.[name] ? errors[name].message : "",
              color: "success",
            },
          }}
          helperText={errors?.[name] ? errors[name].message : ""}
          {...field}
          render={(params) => (
            <TextField
              {...params}
              variant="outlined"
              color="success"
              sx={textFieldStyle}
            />
          )}
        />
      </LocalizationProvider>
    )}
  />
);

const CostsForm = ({
  control,
  errors,
  handleAddCategory,
  handleAddLocation,
  categoryOptions,
  locationOptions,
}) => (
  <div>
    <Typography variant="h2" component="h2">
      Расход
    </Typography>
    <InputField
      name="name"
      label="Название"
      control={control}
      errors={errors}
    />
    <AutocompleteField
      name="additionalInfo"
      label="Категория"
      control={control}
      errors={errors}
      options={categoryOptions}
      handleAdd={handleAddCategory}
      dialogTitle="Добавить категорию"
      dialogLabel="категорию"
    />
    <InputField name="amount" label="Сумма" control={control} errors={errors} />
    <DateField name="date" label="Дата" control={control} errors={errors} />
    <InputField
      name="description"
      label="Описание"
      control={control}
      errors={errors}
    />
    <AutocompleteField
      name="location"
      label="Место"
      control={control}
      errors={errors}
      options={locationOptions}
      handleAdd={handleAddLocation}
      dialogTitle="Добавить место"
      dialogLabel="место"
    />
  </div>
);

const RetrievingsForm = ({
  control,
  errors,
  handleAddCategory,
  handleAddLocation,
  categoryOptions,
  locationOptions,
}) => (
  <div>
    <Typography variant="h2" component="h2">
      Доход
    </Typography>
    <InputField
      name="name"
      label="Название"
      control={control}
      errors={errors}
    />
    <AutocompleteField
      name="additionalInfo"
      label="Категория"
      control={control}
      errors={errors}
      options={categoryOptions}
      handleAdd={handleAddCategory}
      dialogTitle="Добавить категорию"
      dialogLabel="категорию"
    />
    <InputField name="amount" label="Сумма" control={control} errors={errors} />
    <DateField name="date" label="Дата" control={control} errors={errors} />
    <InputField
      name="description"
      label="Описание"
      control={control}
      errors={errors}
    />
    <AutocompleteField
      name="location"
      label="Место"
      control={control}
      errors={errors}
      options={locationOptions}
      handleAdd={handleAddLocation}
      dialogTitle="Добавить место"
      dialogLabel="место"
    />
  </div>
);

const DebtsForm = ({
  control,
  errors,
  handleAddCategory,
  handleAddLocation,
  categoryOptions,
  locationOptions,
  transactionType,
  setTransactionType,
}) => (
  <div>
    <Typography variant="h2" component="h2">
      Долги
    </Typography>
    <Controller
      name="name"
      control={control}
      defaultValue="positive"
      render={({ field }) => (
        <RadioGroup
          {...field}
          value={transactionType}
          onChange={(event) => {
            setTransactionType(event.target.value);
            field.onChange(event.target.value);
          }}
          row
        >
          <FormControlLabel
            value="positive"
            control={<Radio color="success" />}
            label="Я беру в долг / Мне вернули долг"
          />
          <FormControlLabel
            value="negative"
            control={<Radio color="error" />}
            label="Я дал в долг / Я вернул долг"
          />
        </RadioGroup>
      )}
    />
    <AutocompleteField
      name="additionalInfo"
      label="Имя кредитора"
      control={control}
      errors={errors}
      options={categoryOptions}
      handleAdd={handleAddCategory}
      dialogTitle="Добавить кредитора"
      dialogLabel="кредитора"
    />
    <InputField
      name="amount"
      label="Сумма"
      control={control}
      errors={errors}
      color={transactionType === "positive" ? "success" : "error"}
    />
    <DateField name="date" label="Дата" control={control} errors={errors} />
    <InputField
      name="description"
      label="Описание"
      control={control}
      errors={errors}
    />
    <AutocompleteField
      name="location"
      label="Место"
      control={control}
      errors={errors}
      options={locationOptions}
      handleAdd={handleAddLocation}
      dialogTitle="Добавить место"
      dialogLabel="место"
    />
  </div>
);

const TransfersForm = ({
  control,
  errors,
  handleAddCategory,
  categoryOptions,
}) => (
  <div>
    <Typography variant="h2" component="h2">
      Переводы
    </Typography>
    <AutocompleteField
      name="additionalInfo"
      label="Счет"
      control={control}
      errors={errors}
      options={categoryOptions}
      handleAdd={handleAddCategory}
      dialogTitle="Добавить счет"
      dialogLabel="счет"
    />
    <InputField name="amount" label="Сумма" control={control} errors={errors} />
    <DateField name="date" label="Дата" control={control} errors={errors} />
    <InputField
      name="description"
      label="Описание"
      control={control}
      errors={errors}
    />
  </div>
);

const defaultValues = {
  name: "",
  additionalInfo: "",
  amount: "",
  date: null,
  description: "",
  location: "",
};

export default function TransactionForm() {
  const [formType, setFormType] = useState("Costs");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas[formType]),
    defaultValues,
  });

  const [categoryOptions, setCategoryOptions] = useState([
    "Продукты",
    "Транспорт",
    "Кафе",
    "Развлечения",
    "Коммунальные платежи",
    "Зарплата",
  ]);
  const [locationOptions, setLocationOptions] = useState([
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
  ]);
  const [transactionType, setTransactionType] = useState("positive");

  const handleAddCategory = (newCategory) => {
    setCategoryOptions((prev) => [...prev, newCategory]);
  };

  const handleAddLocation = (newLocation) => {
    setLocationOptions((prev) => [...prev, newLocation]);
  };

  const onSubmit = (data) => {
    const { additionalInfo, amount, date, description, location, name } = data;
    const finalObject = {
      additionalInfo,
      amount,
      date: dayjs(date).format("DD.MM.YYYY"),
      description,
      location,
      name,
    };

    console.log(finalObject);
  };

  return (
    <div className="operationsForm">
      <Typography variant="h4" component="h1">
        Создание транзакции
      </Typography>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Тип транзакции</InputLabel>
        <Select value={formType} onChange={(e) => setFormType(e.target.value)}>
          <MenuItem value="Costs">Расход</MenuItem>
          <MenuItem value="Retrievings">Доход</MenuItem>
          <MenuItem value="Debts">Долги</MenuItem>
          <MenuItem value="Transfers">Переводы</MenuItem>
        </Select>
      </FormControl>
      <form onSubmit={handleSubmit(onSubmit)} className="operationsForm__form">
        {formType === "Costs" && (
          <CostsForm
            control={control}
            errors={errors}
            handleAddCategory={handleAddCategory}
            handleAddLocation={handleAddLocation}
            categoryOptions={categoryOptions}
            locationOptions={locationOptions}
          />
        )}
        {formType === "Retrievings" && (
          <RetrievingsForm
            control={control}
            errors={errors}
            handleAddCategory={handleAddCategory}
            handleAddLocation={handleAddLocation}
            categoryOptions={categoryOptions}
            locationOptions={locationOptions}
          />
        )}
        {formType === "Debts" && (
          <DebtsForm
            control={control}
            errors={errors}
            handleAddCategory={handleAddCategory}
            handleAddLocation={handleAddLocation}
            categoryOptions={categoryOptions}
            locationOptions={locationOptions}
            transactionType={transactionType}
            setTransactionType={setTransactionType}
          />
        )}
        {formType === "Transfers" && (
          <TransfersForm
            control={control}
            errors={errors}
            handleAddCategory={handleAddCategory}
            categoryOptions={categoryOptions}
          />
        )}
        <Button variant="contained" color="success" type="submit">
          Создать
        </Button>
      </form>
    </div>
  );
}
