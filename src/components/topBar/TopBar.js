import * as React from "react";
import { connect } from "react-redux";
import { MenuItem, Menu, Button, Fade } from "@mui/material";
import { signAccountOut } from "../../firebase/auth";
import Currency from "../currency/Currency";
import AccountsList from "../accountsList/AccountsList";
import { getCurrencies } from "../../firebase/database";

function TopBar(props) {
  const {
    name,
    totalMoney,
    currentCurrency,
    uid,
    currenciesList,
    accounts,
    currentAccount,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currencies, setCurrencies] = React.useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    getCurrencies(uid).then((answer) => setCurrencies(answer));
  }, []);
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
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={() => signAccountOut()}>Logout</MenuItem>
      </Menu>

      <div className="topBar__currency">
        <Currency
          uid={uid}
          totalMoney={totalMoney}
          currentCurrency={currentCurrency}
          currenciesList={currenciesList}
        />
      </div>
      <div className="topBar__account">
        <AccountsList
          uid={uid}
          currentAccount={currentAccount}
          accounts={accounts}
        />
      </div>
    </div>
  );
}

export default TopBar;
