import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";

import { MenuItem, Menu, Button, Fade, IconButton } from "@mui/material";
import { RemoveCircleOutline, ExpandMore } from "@mui/icons-material";

import { setCurrentCurrency, deleteCurrency } from "../../firebase/database";
import PreDeleteDialog from "../../modal/info/PreDeleteDialog";

function Currency(props) {
  const store = props.store;
  const user = store.currentUser.user;
  const userInfo = user.userInfo;

  const uid = userInfo.uid;
  const currentCurrency = userInfo.currentCurrency;
  const currenciesList = user.currencies;
  const accountsList = user.accounts;

  let totalMoney = 0;
  accountsList.forEach((item) => {
    totalMoney += +item.totalMoney;
  });

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currency, setCurrency] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    await deleteCurrency(uid, currency);
    dispatch({ type: "DELETE_CURRENCY", payload: currency });
  };
  if (currenciesList.length > 0) {
    return (
      <div className="currency">
        Всего: {`${totalMoney}`}
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          color="success"
          sx={{ fontSize: "20px" }}
        >
          {currentCurrency}
          <ExpandMore />
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {currenciesList.map((item, key) => (
            <MenuItem key={key}>
              <p
                style={{ width: "100%", height: "100%", margin: "10px 10px" }}
                onClick={async () => {
                  dispatch({
                    type: "SET_ACTIVE_CURRENCY",
                    payload: item.currencyName,
                  });
                  await setCurrentCurrency(uid, item.currencyName);
                  dispatch({
                    type: "SET_ACTIVE_CURRENCY_INDEX",
                    payload: key,
                  });
                  await handleClose();
                }}
              >
                {item.currencyName}
              </p>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  if (item.currencyName !== currentCurrency) {
                    setCurrency(item.currencyName);
                    setOpenDialog(true);
                    handleClose();
                  }
                }}
              >
                <RemoveCircleOutline />
              </IconButton>
            </MenuItem>
          ))}
        </Menu>
        <PreDeleteDialog
          handleAction={handleDelete}
          trigger={openDialog}
          triggerSetter={setOpenDialog}
          title="валюту"
        />
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default connect((state) => ({ store: state }))(Currency);
