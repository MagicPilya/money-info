import { useState } from "react";
import { Button, Modal, Box, MenuItem, TextField } from "@mui/material";

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
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AddSomeDataWithOneInput(props) {
  const { triggerName, title, handleSubmit, placeholder, svg, inputType } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [inputData = "", setInputData] = useState();

  return (
    <>
      <MenuItem onClick={handleOpen}>
        {svg ? svg : null}
        {triggerName}
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "33%" }}>
          <h2 id="child-modal-title">{title}</h2>
          <TextField
            label={placeholder}
            type={inputType}
            margin="normal"
            variant="outlined"
            value={inputData}
            color="success"
            onChange={(e) => setInputData(e.target.value)}
            sx={{ "&:blur": { border: "1px solid green" }, width: "33%" }}
          ></TextField>
          <Button
            onClick={async () => {
              handleSubmit(inputData);
              handleClose();
            }}
            color="success"
            variant="contained"
          >
            Принять
          </Button>
        </Box>
      </Modal>
    </>
  );
}
