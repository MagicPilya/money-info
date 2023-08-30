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

export default function Costs(props) {
  const { costs, currentAccount } = props;
  const [categoryName, setCategoryName] = useState("");
  return (
    <div className="operations__costs">
      <form className="operations__costs-form" id="operations-costs-form" onSubmit={(e) => e.preventDefault()}>

        <div className="operations__costs-form-input">
          <TextField
            sx={textFieldStyle}
            label="Сумма"
            variant="outlined"
            type="number"
          />
        </div>

        <div className="operations__costs-form-input">
          <FormControl sx={selectStyle} >
            <InputLabel id="operations__costs-form-selectCategory-label">
              Категория
            </InputLabel>
            <Select
              labelId="operations__costs-form-selectCategory-label"
              id="operations__costs-form-selectCategory"
              value={categoryName}
              label="Категория"
              onChange={(e) => setCategoryName(e.target.value)}
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
          <TextField
            sx={textFieldStyle}
            id="operations-costs-date"
            label="Дата"
            variant="outlined"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="operations__costs-form-input">
          <TextField
            sx={textFieldStyle}
            label="Комментарий"
            multiline
            maxRows={5}
          />
        </div>
        <div className="operations__costs-form-input">
          <Button type="submit">Подтвердить</Button>
        </div>
      </form>
    </div>
  );
}
