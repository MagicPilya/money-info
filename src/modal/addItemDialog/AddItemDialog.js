import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const AddItemDialog = ({ open, onClose, onAdd, title, labelForInput }) => {
  const [itemName, setItemName] = useState("");

  const handleAdd = () => {
    onAdd(itemName);
    setItemName("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={labelForInput}
          fullWidth
          value={itemName}
          color="success"
          onChange={(e) => setItemName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Отмена
        </Button>
        <Button onClick={handleAdd} color="success">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;
