import { forwardRef } from "react";

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PreDeleteDialog(props) {
  const { handleAction, trigger, triggerSetter, title } = props;

  const handleClose = () => {
    triggerSetter(false);
  };

  return (
    <div>
      <Dialog
        open={trigger}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          handleClose();
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Вы действительно хотите удалить ${title}?`}</DialogTitle>
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
            onClick={() => {
              handleAction();
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
