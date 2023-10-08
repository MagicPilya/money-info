import OperationEditBuffer from "./OperationEditBuffer";
import CloseIcon from "@mui/icons-material/Close";
import {Modal, Fade, Box, InputLabel, Select, MenuItem, FormControl, Typography} from "@mui/material";
import * as React from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};
function OperationsEditModal(props) {
  
  const {
    open,
    setOpen,
    operationName,
    currentAccount,
    description,
    operationDate,
    operationType,
    amount,
    currentCurrency,
    operationID,
  } = props;
  
    return (
      <div className="operationEdit">
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={open}>
            <Box sx={style}>
              <CloseIcon
                sx={{
                  ":hover": {cursor: "pointer"},
                  position: "absolute",
                  right: "15px",
                  top: "15px",
                }}
                onClick={() => setOpen(false)}
              />
              <Typography variant="h3" gutterBottom component="h3">
                Изменение операции
              </Typography>
              
              <OperationEditBuffer
                operationName={operationName}
                currentAccount={currentAccount}
                description={description}
                operationDate={operationDate}
                operationType={operationType}
                amount={amount}
                currentCurrency={currentCurrency}
                operationID={operationID}
              />
            </Box>
          </Fade>
        </Modal>
      </div>
  );
}
export default OperationsEditModal;
