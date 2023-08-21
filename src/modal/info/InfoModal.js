import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { deleteCurrency } from "../../firebase/database";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InfoModal(props) {
  const dispatch = useDispatch();
  const { setIsDelete, item, index, uid } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsDelete(false);
  };
  
  const handleDelete = async (item, key) => {
    await deleteCurrency(uid, item);
    await dispatch({ type: "DELETE_CURRENCY", payload: key });
    console.log(key);
    setIsDelete(false);
  };

  React.useEffect(() => {
    handleClickOpen();
  }, []);
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          handleClose();
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Вы действительно хотите удалить валюту?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Данные удалятся без возможности восстановления
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Отмена
          </Button>
          <Button
            onClick={ async ()  => {
              handleDelete(item, index)
              handleClose();
            }}
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
