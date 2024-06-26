import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Typography, Button, Autocomplete } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import AddItemDialog from "../../modal/addItemDialog/AddItemDialog";

dayjs.locale("Ru");

const textFieldStyle = {
  width: "300px",
  margin: "10px",
  "&:blur": { border: "1px solid green" },
};

const costSchema = yup.object().shape({
  name: yup.string().required("Название обязательно"),
  category: yup.string().required("Категория обязательна"),
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

const CostsForm = ({ control, errors }) => {
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([
    "Food",
    "Transport",
    "Utilities",
    "Entertainment",
    "Добавить категорию",
  ]);
  const [locationOptions, setLocationOptions] = useState([
    "Home",
    "Office",
    "Gym",
    "Store",
    "Добавить место",
  ]);

  const handleAddCategory = (newCategory) => {
    setCategoryOptions([...categoryOptions, newCategory]);
    setOpenCategoryDialog(false);
  };

  const handleAddLocation = (newLocation) => {
    setLocationOptions([...locationOptions, newLocation]);
    setOpenLocationDialog(false);
  };
  return (
    <div>
      <Typography variant="h2" component="h2">
        Расход
      </Typography>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Название"
            variant="outlined"
            color="success"
            sx={textFieldStyle}
            error={!!errors?.name}
            helperText={errors?.name ? errors.name.message : ""}
            {...field}
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        sx={textFieldStyle}
        defaultValue=""
        render={({ field }) => (
          <Autocomplete
            sx={{ width: "300px" }}
            {...field}
            freeSolo
            options={categoryOptions}
            onChange={(event, newValue) => {
              if (newValue === "Добавить категорию") {
                setOpenCategoryDialog(true);
              } else {
                field.onChange(newValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Категория"
                variant="outlined"
                color="success"
                sx={textFieldStyle}
                error={!!errors?.category}
                helperText={errors?.category ? errors.category.message : ""}
              />
            )}
          />
        )}
      />
      <AddItemDialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        onAdd={handleAddCategory}
        title="Добавить категорию"
        label="Категория"
        labelForInput="Название категории"
      />
      <Controller
        name="amount"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Сумма"
            variant="outlined"
            color="success"
            sx={textFieldStyle}
            error={!!errors?.amount}
            helperText={errors?.amount ? errors.amount.message : ""}
            {...field}
          />
        )}
      />

      <Controller
        name="date"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru">
            <DatePicker
              sx={textFieldStyle}
              format="DD.MM.YYYY"
              label="Дата"
              slotProps={{
                textField: {
                  error: !!errors.date,
                  helperText: errors?.date ? errors.date.message : "",
                  color: "success",
                },
              }}
              helperText={errors?.date ? errors.date.message : ""}
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

      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Описание"
            variant="outlined"
            color="success"
            sx={textFieldStyle}
            error={!!errors?.description}
            helperText={errors?.description ? errors.description.message : ""}
            {...field}
          />
        )}
      />
      <Controller
        name="location"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Autocomplete
            {...field}
            freeSolo
            sx={{ width: "300px" }}
            options={locationOptions}
            onChange={(event, newValue) => {
              if (newValue === "Добавить место") {
                setOpenLocationDialog(true);
              } else {
                field.onChange(newValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Место"
                variant="outlined"
                color="success"
                sx={textFieldStyle}
                error={!!errors?.location}
                helperText={errors?.location ? errors.location.message : ""}
              />
            )}
          />
        )}
      />
      <AddItemDialog
        open={openLocationDialog}
        onClose={() => setOpenLocationDialog(false)}
        onAdd={handleAddLocation}
        title="Добавить место"
        label="Места"
        labelForInput="Название места"
      />
    </div>
  );
};

const GenericForm = ({ control, errors, name, label }) => (
  <div>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          placeholder={label}
          error={!!errors?.[name]}
          helperText={errors?.[name] ? errors[name].message : ""}
          {...field}
        />
      )}
    />
  </div>
);

const RetrievingsForm = (props) => (
  <GenericForm {...props} name="Retrievings" label="Retrievings" />
);

const TransfersForm = (props) => (
  <GenericForm {...props} name="Transfers" label="Transfers" />
);

const DebtsForm = (props) => (
  <GenericForm {...props} name="Debts" label="Debts" />
);

const forms = {
  Costs: CostsForm,
  Retrievings: RetrievingsForm,
  Transfers: TransfersForm,
  Debts: DebtsForm,
};

const schemas = {
  Costs: costSchema,
  Retrievings: defaultSchema,
  Transfers: defaultSchema,
  Debts: defaultSchema,
};

export default function OperationsForm({ operationType }) {
  const schema = schemas[operationType] || defaultSchema;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const FormComponent = forms[operationType] || null;

  return (
    <div className="operationsForm">
      <form
        className="operationsForm__form"
        onSubmit={handleSubmit((data) => {
          console.log(`Submitting ${operationType} Form:`, data);
        })}
      >
        {FormComponent && <FormComponent control={control} errors={errors} />}
        <Button type="submit" variant="contained" color="success">
          Подтвердить
        </Button>
      </form>
    </div>
  );
}
