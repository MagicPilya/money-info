import { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import { MenuItem, Menu, Button, Fade, Typography } from "@mui/material";
import {
  ExpandMore,
  Settings,
  Abc,
  Percent,
  Timeline,
  CreditCardOff,
} from "@mui/icons-material";

import {
  setCurrentAccount,
  renameAccount,
  deleteData,
  correctBalance,
} from "../../firebase/database";
import AddSomeDataWithOneInput from "../../modal/addSomeDataWithOneInput/AddSomeDataWithOneInput";
import AddAccountModal from "../../modal/addAccount/AddAccountModal";
import PreDeleteDialog from "../../modal/info/PreDeleteDialog";
import OperationsModal from "../../modal/operations/OperationsModal";
import { useInput } from "../../hooks/useInput";
function AccountsList(props) {
  const store = props.store;
  const user = store.currentUser.user;
  const userInfo = user.userInfo;

  const accounts = user.accounts;
  const uid = userInfo.uid;
  const currenciesList = user.currencies;
  const currentAccount = userInfo.currentAccount;
  const currentAccountIndex = userInfo.currentAccountIndex;

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSettings, setAnchorElSettings] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openOperations, setOpenOperations] = useState(false);
  const open = Boolean(anchorEl);
  const openSettings = Boolean(anchorElSettings);
  const transmittedValueRename = useInput("", {
    isEmpty: true,
    maxLength: 16,
    minLength: 4,
  });
  const transmittedValueCorrect = useInput("", {
    isEmpty: true,
    isNegative: true,
  });

  const handleClick = (event, setter) => {
    setter(event.currentTarget);
  };
  const handleClose = (setter) => {
    setter(null);
  };

  const iconsStyle = {
    marginRight: "5px",
  };

  const handleActiveAccount = async (name) => {
    const index = getAccountIndex(name);
    await setCurrentAccount(uid, name, index);
    dispatch({
      type: "SET_ACTIVE_ACCOUNT",
      payload: {
        name: name,
        index: index,
      },
    });
    await handleClose(setAnchorEl);
  };

  const handleSubmitRename = async (newName) => {
    const index = getAccountIndex(currentAccount);
    await renameAccount(uid, index, newName);
    await setCurrentAccount(uid, newName, index);
    dispatch({
      type: "RENAME_ACCOUNT",
      payload: { index: index, name: newName },
    });
    dispatch({
      type: "SET_ACTIVE_ACCOUNT",
      payload: { name: newName, index: getAccountIndex(currentAccount) },
    });
  };

  const handleSubmitCorrect = async (newBalance) => {
    await correctBalance(uid, currentAccountIndex, newBalance);
    dispatch({
      type: "CORRECT_ACCOUNT_BALANCE",
      payload: { newBalance: newBalance, index: currentAccountIndex },
    });
  };

  const handleDelete = async () => {
    await deleteData(uid, "accounts", `${currentAccountIndex}`).then(() => {});
    dispatch({
      type: "DELETE_ACCOUNT",
      payload: currentAccountIndex,
    });
    if (accounts.length === 0) {
      console.log("CRAZY");
    }
    await setCurrentAccount(
      uid,
      getNextAccountName(),
      +(currentAccountIndex + 1),
    );
    dispatch({
      type: "SET_ACTIVE_ACCOUNT",
      payload: {
        name: `${getNextAccountName()}`,
        index: +(currentAccountIndex + 1),
      },
    });
  };

  function getNextAccountName() {
    if (accounts.length === 0) {
      return null;
    } else {
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].name === currentAccount && i === 0) {
          return accounts[i + 1].name;
        } else {
          return accounts[0].name;
        }
      }
    }
  }

  function getAccountIndex(accountName) {
    let index = null;
    accounts.map((item, i) => {
      if (item.name === accountName) {
        index = i;
      }
      return undefined;
    });
    return index;
  }

  if (accounts.length > 0) {
    return (
      <div className="accountsList">
        <div className="accountsList__currentAccount">
          Активный счёт:
          <Button
            id="currency-button"
            aria-controls={open ? "currency-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => handleClick(e, setAnchorEl)}
            color="success"
            sx={{ fontSize: "20px" }}
          >
            {currentAccount}
            <ExpandMore />
          </Button>
          <Menu
            id="account-menu"
            MenuListProps={{
              "aria-labelledby": "account-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose(setAnchorEl)}
            TransitionComponent={Fade}
          >
            {accounts.map((item, key) => (
              <MenuItem
                key={key}
                onClick={async () => {
                  handleActiveAccount(item.name);
                }}
              >
                {item.name}
              </MenuItem>
            ))}
            <AddAccountModal
              currenciesList={currenciesList}
              uid={uid}
              accountsList={accounts}
            ></AddAccountModal>
          </Menu>
        </div>

        {/* Отображение количества грошей и в какой валюте к конкретному счёту */}
        {accounts
          .filter((item) => item.name.includes(currentAccount))
          .map((filteredItem, key) => (
            <div className="accountsList__accountState" key={key + "sss"}>
              <div className="accountsList__accountState-total" key={key}>
                {filteredItem.totalMoney}
              </div>
              <div
                className="accountsList__accountState-currency"
                key={key + "vvvv"}
              >
                {filteredItem.currency}
              </div>
            </div>
          ))}

        <div
          className="accountsList__settings"
          onClick={(e) => handleClick(e, setAnchorElSettings)}
        >
          <p className="accountsList__settings-title">Настройки счёта</p>
          <Settings />
        </div>
        <Menu
          id="account-settings-menu"
          MenuListProps={{
            "aria-labelledby": "accountsList__settings",
          }}
          anchorEl={anchorElSettings}
          open={openSettings}
          onClose={() => handleClose(setAnchorElSettings)}
          TransitionComponent={Fade}
        >
          <AddSomeDataWithOneInput
            transmittedValue={transmittedValueRename}
            triggerName="Сменить название счёта"
            title="Изменение названия счета"
            handleSubmit={handleSubmitRename}
            placeholder="Название счёта"
            svg={<Abc sx={iconsStyle} />}
          ></AddSomeDataWithOneInput>
          <AddSomeDataWithOneInput
            transmittedValue={transmittedValueCorrect}
            triggerName="Скорректировать остатки по счёту"
            title="Коррекция остатков"
            handleSubmit={handleSubmitCorrect}
            placeholder="Фактический баланс"
            svg={<Percent color="warning" sx={iconsStyle} />}
            inputType="number"
          ></AddSomeDataWithOneInput>
          <MenuItem
            onClick={() => {
              setOpenOperations(true);
            }}
          >
            <Timeline sx={iconsStyle} /> Добавить операцию
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenDialog(true);
              handleClose(setAnchorElSettings);
            }}
          >
            <CreditCardOff sx={iconsStyle} color="error" /> Удалить счёт
          </MenuItem>
        </Menu>
        <PreDeleteDialog
          handleAction={handleDelete}
          trigger={openDialog}
          triggerSetter={setOpenDialog}
          title="счёт"
        />
        <OperationsModal open={openOperations} setOpen={setOpenOperations} />
      </div>
    );
  } else {
    return (
      <div className="accountsList__empty">
        <Typography variant="h6" gutterBottom component="h6">
          У вас нет ни одного счета
        </Typography>
        <AddAccountModal
          currenciesList={currenciesList}
          uid={uid}
          accountsList={accounts}
        ></AddAccountModal>
      </div>
    );
  }
}
export default connect((state) => ({ store: state }))(AccountsList);
