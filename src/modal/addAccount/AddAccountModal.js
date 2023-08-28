import { useState } from "react";
import { useDispatch } from "react-redux";

import AddCardIcon from '@mui/icons-material/AddCard';
import {
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  Typography,
  Fade,
  Modal,
  Box,
  Backdrop,
} from "@mui/material";

import { addAccount, addCurrency } from "../../firebase/database";

import AddSomeDataWithOneInput from "../addSomeDataWithOneInput/AddSomeDataWithOneInput";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddAccountModal(props) {
  const { currenciesList, uid, accountsList } = props;
  const dispatch = useDispatch();

  const [name = "", setName] = useState();
  const [balance = 0, setBalance] = useState();
  const [currency = "", setCurrency] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let accountInfo = {
    totalMoney: balance,
    currency: currency,
    name: name,
  };

  const handleSubmitCurrency = async (currencyName) => {
      await addCurrency(uid, currencyName);
      await dispatch({type:"ADD_CURRENCY", payload: currencyName});
  }

  const crearState = () => {
    setName("");
    setBalance("");
    setCurrency("");
  }

  return (
    <div>
      <MenuItem onClick={handleOpen}>
        <div className="modal__addAcount-triggerName">
          Добавить счёт
        </div>
        <AddCardIcon sx={{"marginLeft": "5px"}} color="success"/>
      </MenuItem>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Добавление счета
            </Typography>

            <TextField
              label="Название счёта"
              margin="normal"
              variant="outlined"
              value={name}
              color="success"
              onChange={(e) => setName(e.target.value)}
              sx={{ "&:blur": { border: "1px solid green" } }}
            ></TextField>
            <TextField
              type="number"
              label="Баланс"
              margin="normal"
              variant="outlined"
              value={balance}
              color="success"
              onChange={(e) => setBalance(e.target.value)}
              sx={{ "&:blur": { border: "1px solid green" } }}
            ></TextField>
            <FormControl margin="normal" sx={{ width: "53%" }}>
              <InputLabel id="demo-simple-select-label">
                Валюта счета
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                label="Валюта счёта"
                onChange={(e) => setCurrency(e.target.value)}
              >
                {currenciesList.map((item, key) => (
                  <MenuItem value={item} key={key} onClick={() => {}}>
                    {item}
                  </MenuItem>
                ))}

                <AddSomeDataWithOneInput
                  triggerName="Добавить валюту"
                  title="Добавление валюты"
                  handleSubmit={handleSubmitCurrency}
                  placeholder="Валюта"
                />
              </Select>
            </FormControl>
            <Button
              onClick={async () => {
                await dispatch({ type: "ADD_ACCOUNT", payload: accountInfo });
                await addAccount(uid, accountInfo, accountsList.length);
                await crearState();
                await handleClose();
              }}
              variant="contained"
              color="success"
            >
              Принять
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
