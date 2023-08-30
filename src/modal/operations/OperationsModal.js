import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Modal, Typography, Box, Fade } from "@mui/material";

import Operations from "../../components/operations/Operations";
import { connect } from "react-redux";

import { findDataOfAccount } from "../../utils/arraysOperations";

function OperationsModal(props) {
  const { open, setOpen } = props;

  const [operation, setOperation] = useState("");

  const user = props.store.currentUser.user;
  const currentAccount = user.userInfo.currentAccount;
  const accounts = user.accounts;

  const currencyOfCurrentAccount = findDataOfAccount(accounts, currentAccount, "currency");
  const totalMoneyOfCurrentAccount = findDataOfAccount(accounts, currentAccount, "totalMoney");

  return (
    <>
      <Modal
        sx={{}}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <div className="operations">
            <Box>
              <CloseIcon
                sx={{
                  ":hover": { cursor: "pointer" },
                  position: "absolute",
                  right: "3%",
                  top: "3%",
                }}
                onClick={() => setOpen(false)}
              />
              <Typography
                id="layout-modal-title"
                level="h2"
                sx={{ fontWeight: "800", fontSize: "20px" }}
              >
                Выберите операцию
              </Typography>
              <Typography
                id="layout-modal-description"
                level="h3"
                sx={{ marginLeft: "15px" }}
              >
                а затем, заполните необходимые данные, в соответсвие с выбранной
                операцией
              </Typography>
              <div className="operations__header-info">
                <div className="operations__header-info-selection">
                  <FormControl sx={{ marginTop: "15px" }}>
                    <InputLabel id="operation-select-label">
                      Операция
                    </InputLabel>
                    <Select
                      sx={{ width: "10vw" }}
                      labelId="operation-select-label"
                      id="operation-select"
                      value={operation}
                      label="Операция"
                      onChange={(e) => {
                        setOperation(e.target.value);
                      }}
                    >
                      <MenuItem value="Cost">Расход</MenuItem>
                      <MenuItem value="Retrieving">Доход</MenuItem>
                      <MenuItem value="Transfer">Перевод</MenuItem>
                      <MenuItem value="Debt">Долги</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="operations__header-info-accountInfo">
                  {`Текущий счёт: ${currentAccount}, ${totalMoneyOfCurrentAccount}, ${currencyOfCurrentAccount}`}
                </div>
              </div>

              <div className="operations__workBox">
                <Operations operationName={operation} />
              </div>
            </Box>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
export default connect((state) => ({ store: state }))(OperationsModal);
