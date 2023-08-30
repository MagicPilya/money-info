import { useState } from "react";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const textFieldStyle = {
  width: "300px",
};

const selectStyle = {
  width: "300px",
};

export default function Retrievings(props) {
  const { retrievings, currentAccount } = props;
  const [categoryName, setCategoryName] = useState("");
  return (
    <div className="operations__retrievings">
      <form className="operations__retrievings-form" id="operations-retrievings-form" onSubmit={(e) => e.preventDefault()}>

        <div className="operations__retrievings-form-input">
          <TextField
            sx={textFieldStyle}
            label="Сумма"
            variant="outlined"
            type="number"
          />
        </div>

        <div className="operations__retrievings-form-input">
          <FormControl sx={selectStyle} >
            <InputLabel id="operations__retrievings-form-selectCategory-label">
              Категория
            </InputLabel>
            <Select
              labelId="operations__retrievings-form-selectCategory-label"
              id="operations__retrievings-form-selectCategory"
              value={categoryName}
              label="Категория"
              onChange={(e) => setCategoryName(e.target.value)}
            >
              {retrievings.map((item, key) => (
                <MenuItem value={item.name} key={key}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div
          className="operations__retrievings-form-input"
          children="operations-retrievings-date"
        >
          <TextField
            sx={textFieldStyle}
            id="operations-retrievings-date"
            label="Дата"
            variant="outlined"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="operations__retrievings-form-input">
          <TextField
            sx={textFieldStyle}
            label="Комментарий"
            multiline
            maxRows={5}
          />
        </div>
        <div className="operations__retrievings-form-input">
          <Button type="submit">Подтвердить</Button>
        </div>
      </form>
    </div>
  );
}
