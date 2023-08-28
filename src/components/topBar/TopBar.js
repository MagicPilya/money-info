import * as React from "react";
import { MenuItem, Menu, Button, Fade } from "@mui/material";
import { signAccountOut } from "../../firebase/auth";
import Currency from "../currency/Currency";
import AccountsList from "../accountsList/AccountsList";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function TopBar(props) {
  const {
    name,
    totalMoney,
    currentCurrency,
    currentCurrencyIndex,
    uid,
    currenciesList,
    accounts,
    currentAccount,
    currentAccountIndex,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="topBar">
      <Button
        id="account-button"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="success"
        sx={{ fontSize: "20px" }}
      >
        {name}
        <ExpandMoreIcon/>
      </Button>
      <Menu
        id="account-menu"
        MenuListProps={{
          "aria-labelledby": "account-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        <MenuItem
          onClick={async () => {
            await signAccountOut();
            await handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      <div className="topBar__currency">
        <Currency
          uid={uid}
          totalMoney={totalMoney}
          currentCurrency={currentCurrency}
          currenciesList={currenciesList}
          currentCurrencyIndex={currentCurrencyIndex}
        />
      </div>
      <div className="topBar__account">
        <AccountsList
          uid={uid}
          currentAccount={currentAccount}
          accounts={accounts}
          currenciesList={currenciesList}
          currentAccountIndex={currentAccountIndex}
        />
      </div>
    </div>
  );
}

export default TopBar;
