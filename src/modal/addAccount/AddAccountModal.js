import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import {
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import { CircularProgress } from "@mui/joy";
import AddCurrencyModal from "../addCurrency/AddCurrencyModal";
import { useDispatch } from "react-redux";
import { addAccount, setCurrentAccount } from "../../firebase/database";

const style = {
  display: "flex",
  "flexDirection": "column",
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
  const dispatch = useDispatch();
  const { currenciesList, uid } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name = "", setName] = React.useState();
  const [balance = 0, setBalance] = React.useState();
  const [currency = "", setCurrency] = React.useState();
  let accountInfo = {
    total: balance,
    currency: currency,
    name: name,
  };
  return (
    <div>
      <MenuItem onClick={handleOpen}>Добавить счёт</MenuItem>
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

                <AddCurrencyModal uid={uid} />
                {/* <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
            <Button
              onClick={ async () => {
                await dispatch({ type: "ADD_ACCOUNT", payload: accountInfo });
                await addAccount(uid, accountInfo)
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
