import { MenuItem, Menu, Button, Fade } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentAccount } from "../../firebase/database";

export default function AccountsList(props) {
  const { accounts, currentAccount, uid } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  return (
    <div className="accountsList">
      Счёт:
      <Button
        id="currency-button"
        aria-controls={open ? "currency-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="success"
        sx={{ fontSize: "20px" }}
      >
        {currentAccount}
      </Button>
      <Menu
        id="currency-menu"
        MenuListProps={{
          "aria-labelledby": "currency-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {accounts.map(item => (
          <MenuItem onClick={async () => {
            await dispatch({type: "SET_ACTIVE_ACCOUNT", payload: item.name})
            await setCurrentAccount(uid, currentAccount)
            await handleClose()
          }}>{item.name}</MenuItem>
        ))}

      </Menu>
      – {accounts.filter(item => item.name.includes(currentAccount)).map(filteredItem => (
        <div>{filteredItem.total}</div>
      ))}
    </div>
  );
}
