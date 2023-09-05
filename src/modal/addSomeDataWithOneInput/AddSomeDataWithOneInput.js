import React, { useState } from "react";
import {Button, Modal, Box, MenuItem, TextField, Alert} from "@mui/material";

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
  const { triggerName, title, handleSubmit, placeholder, svg, inputType, transmittedValue  } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
transmittedValue.setValue('');
  };

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
        <form onSubmit={e => e.preventDefault()}>
          <Box sx={{ ...style, width: "33%" }}>
            <h2 id="child-modal-title">{title}</h2>

            {(transmittedValue.isDirty) && (
                transmittedValue.isEmpty ||
                transmittedValue.maxLengthError || transmittedValue.minLengthError || transmittedValue.isNegative) && (
                <Alert
                    severity="warning"
                    variant="filled">{transmittedValue.textError}
                </Alert>)}
            <TextField
                label={placeholder}
                type={inputType}
                margin="normal"
                variant="outlined"
                value={transmittedValue.value}
                color="success"
                onChange={transmittedValue.onChange}
                onBlur={transmittedValue.onBlur}
                sx={{ "&:blur": { border: "1px solid green" }, width: "33%" }}
            ></TextField>
            <Button
                disabled={ !transmittedValue.inputValid}
                type="submit"
                onClick={async () => {
                  handleSubmit(transmittedValue.value);
                  handleClose();
                }}
                color="success"
                variant="contained"
            >
              Принять
            </Button>
          </Box>
        </form>

      </Modal>
    </>
  );
}
