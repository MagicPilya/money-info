import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import { MenuItem, Menu, Button, Fade, IconButton } from "@mui/material";
import {RemoveCircleOutline, ExpandMore} from "@mui/icons-material";

import { setCurrentCurrency, deleteCurrency } from "../../firebase/database";
import PreDeleteDialog from "../../modal/info/PreDeleteDialog";

export default function Currency(props) {
  const { currentCurrency, currenciesList, totalMoney, uid, currentCurrencyIndex } = props;
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
    await dispatch({ type: "DELETE_CURRENCY", payload: currency });  
  }

  return (
    <div className="currency">
      Всего: {`${totalMoney} В валюте`}
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
        <ExpandMore/>
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
                  await dispatch({
                    type: "SET_ACTIVE_CURRENCY",
                    payload: item,
                  });
                  await setCurrentCurrency(uid, item);
                  await dispatch({
                    type: "SET_ACTIVE_CURRENCY_INDEX",
                    payload: key,
                  });
                  await handleClose();
              }}
            >
              {item}
            </p>
            <IconButton
              aria-label="delete"
              onClick={ () => {
                if (item !== currentCurrency) {
                  setCurrency(item);
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
}
