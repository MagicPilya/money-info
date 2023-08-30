import { useState } from "react";
import {FormControl, InputLabel, Select, MenuItem, TextField, Button} from '@mui/material';


const selectStyle = {
  "width": "300px"

}

const textFieldStyle = {
  "width": "300px"

}
export default function Transfers() {

  const [transferTo, setTransferTo] = useState('');

  return (
    <div className="operations__transfers">
      <form
        className="operations__transfers-form"
        id="operations-transfers-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormControl sx={selectStyle}>
          <InputLabel id="operations__transfers-form-selectAccountTo-label">
            Перевод на счет
          </InputLabel>
          <Select
            labelId="operations__transfers-form-selectAccountTo-label"
            id="operations__transfers-form-selectAccountTo"
            value={transferTo}
            label="Перевод на счет"
            onChange={(e) => setTransferTo(e.target.value)}
          >
            {/* {retrievings.map((item, key) => (
              <MenuItem value={item.name} key={key}>
                {item.name}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>

        <div className="operations__transfers-form-input">
          <TextField
            sx={textFieldStyle}
            label="Сумма"
            variant="outlined"
            type="number"
          />
        </div>
        <div className="operations__transfers-form-input">
          <Button type="submit">Подтвердить</Button>
        </div>
      </form>
    </div>
  );
}
