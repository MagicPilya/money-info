import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useState} from "react";

const selectStyle = {
    "width": "300px"
}

const textFieldStyle = {
    "width": "300px"
}
export default function Debts(props) {
    const { creditors } = props;
    const [typeOfDebt, setTypeOfDebt] = useState('');
    const [creditorName, setCreditorName] = useState('');
  return (
      <div className="operations__debts">
          <form className="operations__debts-form" id="operations-debts-form" onSubmit={(e) => e.preventDefault()}>
              <FormControl sx={selectStyle} >
                  <InputLabel id="operations__debts-form-selectType-label">
                      Тип долга
                  </InputLabel>
                  <Select
                      labelId="operations__debts-form-selectType-label"
                      id="operations__debts-form-selectType"
                      value={typeOfDebt}
                      label="Тип долга"
                      onChange={(e) => setTypeOfDebt(e.target.value)}
                  >
                      <MenuItem value="debtPositive">Я дал в долг / Я вернул долг</MenuItem>
                      <MenuItem value="debtNegative">Мне дали в долг / Мне вернули долг</MenuItem>
                  </Select>
              </FormControl>
              <FormControl sx={selectStyle} >
                  <InputLabel id="operations__debts-form-selectCreditor-label">
                      Имя кредитора
                  </InputLabel>
                  <Select
                      labelId="operations__debts-form-selectCreditor-label"
                      id="operations__debts-form-selectCreditor"
                      value={creditorName}
                      label="Имя кредитора"
                      onChange={(e) => setCreditorName(e.target.value)}
                  >

                      {/*Исправить косяк с объектом над массивом (wtf) */}
                      {creditors.creditors.map((item, key) => (
                          <MenuItem key={key} value={item}>{item}</MenuItem>
                      ))}
                  </Select>
              </FormControl>
              <div className="operations__costs-form-input">
                  <TextField
                      sx={textFieldStyle}
                      label="Сумма"
                      variant="outlined"
                      type="number"
                  />
              </div>
              <div className="operations__debts-form-input">
                  <Button type="submit">Подтвердить</Button>
              </div>
          </form>

      </div>
  )
}
