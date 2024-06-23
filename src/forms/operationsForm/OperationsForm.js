import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, TextField, Typography, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const textFieldStyle = {
  width: "300px",
  margin: "10px",
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

const CostsForm = ({ control, errors }) => (
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
      defaultValue=""
      render={({ field }) => (
        <TextField
          label="Категория"
          variant="outlined"
          color="success"
          sx={textFieldStyle}
          error={!!errors?.category}
          helperText={errors?.category ? errors.category.message : ""}
          {...field}
        />
      )}
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
      defaultValue=""
      render={({ field }) => (
        <TextField
          label="Дата"
          variant="outlined"
          color="success"
          sx={textFieldStyle}
          error={!!errors?.date}
          helperText={errors?.date ? errors.date.message : ""}
          {...field}
        />
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
        <TextField
          label="Место"
          variant="outlined"
          color="success"
          sx={textFieldStyle}
          error={!!errors?.location}
          helperText={errors?.location ? errors.location.message : ""}
          {...field}
        />
      )}
    />
  </div>
);

const GenericForm = ({ control, errors, name, label }) => (
  <div>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Input
          type="number"
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

  const onSubmit = (data) => {
    console.log(`Submitting ${operationType} Form:`, data);
    // Логика для обработки данных формы
  };

  return (
    <div className="operationsForm">
      <form className="operationsForm__form" onSubmit={handleSubmit(onSubmit)}>
        {FormComponent && <FormComponent control={control} errors={errors} />}
        <Button type="submit" variant="contained" color="success">
          Подтвердить
        </Button>
      </form>
    </div>
  );
}
