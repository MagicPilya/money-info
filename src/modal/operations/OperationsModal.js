import {Box, Button, Fade, FormControl, InputLabel, Menu, MenuItem, Modal, Select, Typography} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Operations from "../../components/operations/Operations";
import {connect, useDispatch} from "react-redux";

import {findDataOfAccount} from "../../utils/arraysOperations";
import {setCurrentAccount} from "../../firebase/database";

function OperationsModal(props) {
  const {open, setOpen} = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [operation, setOperation] = useState('');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const openAccountsMenu = Boolean(anchorEl);

  const user = props.store.currentUser.user;
  const currentAccount = user.userInfo.currentAccount;
  const accounts = user.accounts;
  const uid = user.userInfo.uid;
  const currencyOfCurrentAccount = findDataOfAccount(accounts, currentAccount, "currency");
  const totalMoneyOfCurrentAccount = findDataOfAccount(accounts, currentAccount, "totalMoney");
  const currentAccountIndex = user.userInfo.currentAccountIndex;

  const handleUpdateCurrentAccount = async (name) => {
    const index = getAccountIndex(name);
    await setCurrentAccount(uid, name, index);
    dispatch({
      type: 'SET_ACTIVE_ACCOUNT',
      payload: {
        name: name,
        index: index,
      },
    });
    await handleClose(setAnchorEl);
  }

  function getAccountIndex(accountName) {
    let index = null;
    accounts.map((item, i) => {
      if (item.name === accountName) {
        index = i;
      }
      return null; // ЕСЛИ БУДЕТ ОШИБКА, УДАЛИ ЭТУ СТРОКУ!!! (fuckin' eslint)
    });
    return index;
  }
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
                  ":hover": {cursor: "pointer"},
                  position: "absolute",
                  right: "3%",
                  top: "3%",
                }}
                onClick={() => setOpen(false)}
              />
              <Typography
                id="layout-modal-title"
                level="h2"
                sx={{fontWeight: "800", fontSize: "20px"}}
              >
                Выберите операцию
              </Typography>
              <Typography
                id="layout-modal-description"
                level="h3"
                sx={{marginLeft: "15px"}}
              >
                а затем, заполните необходимые данные, в соответсвие с выбранной
                операцией
              </Typography>
              <Typography
                id="layout-modal-description"
                level="h4"
                sx={{marginLeft: "15px"}}
              >
                P.S.
                <code>Операции применяются к текущему счёту, и в соответсвующей валюте, указанной в
                  счёте</code>
              </Typography>
              <div className="operations__header-info">
                <div className="operations__header-info-selection">
                  <FormControl sx={{marginTop: "15px"}}>
                    <InputLabel id="operation-select-label">
                      Операция
                    </InputLabel>
                    <Select
                      sx={{width: "10vw"}}
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
                <div className="operations__header-info-changeAccount">
                  <Button
                    id="operations__header-info-changeAccount-button"
                    aria-controls={openAccountsMenu ? 'operations__header-info-changeAccount-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openAccountsMenu ? 'true' : undefined}
                    onClick={handleClick}
                    color="success"
                    sx={{fontSize: "20px"}}
                  >
                    Сменить
                    <ExpandMoreIcon/>
                  </Button>
                  <Menu
                    id="operations__header-info-changeAccount-menu"
                    MenuListProps={{
                      "aria-labelledby": "operations__header-info-changeAccount-button",
                    }}
                    anchorEl={anchorEl}
                    open={openAccountsMenu}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    {accounts.map((item, key) => (
                      <MenuItem
                        key={key}
                        value={item.name}
                        onClick={() => handleUpdateCurrentAccount(item.name)}
                      >{item.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>

              <div className="operations__workBox">
                <Operations
                  operationName={operation}
                  setCloseModal={setOpen}
                  currentAccountIndex={currentAccountIndex}
                  uid={uid}
                  oldValueOfTotalMoney={totalMoneyOfCurrentAccount}
                />
              </div>
            </Box>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default connect((state) => ({store: state}))(OperationsModal);
