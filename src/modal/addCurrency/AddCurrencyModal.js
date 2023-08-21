import * as React from "react";
import { Button, Modal, Box, MenuItem, TextField } from "@mui/material";
import { addCurrency, setCurrentCurrency } from "../../firebase/database";
import { useDispatch } from "react-redux";
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
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AddCurrencyModal(props) {
  const dispatch = useDispatch();
  const { uid } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [currencyName = "", setCurrencyName] = React.useState();

  return (
    <React.Fragment>
      <MenuItem onClick={handleOpen}>Добавить валюту</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "33%" }}>
          <h2 id="child-modal-title">Добавление валюты</h2>
          <TextField
            label="Наименование"
            margin="normal"
            variant="outlined"
            value={currencyName}
            color="success"
            onChange={(e) => setCurrencyName(e.target.value)}
            sx={{ "&:blur": { border: "1px solid green" }, width: "33%" }}
          ></TextField>
          <Button
            onClick={async () => {
              await addCurrency(uid, currencyName);
              await dispatch({type:"ADD_CURRENCY", payload: currencyName});
              await handleClose();
            }}
            color="success"
            variant="contained"
          >
            Принять
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
