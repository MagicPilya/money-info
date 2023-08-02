import * as React from "react";
import { connect } from "react-redux";
import { MenuItem, Menu, Button, Fade } from "@mui/material";
import { signAccountOut } from "../../firebase/auth";
import Currency from "../currency/Currency";
import { getCurrencies } from "../../firebase/database";

function TopBar(props) {
  const { name, totalMoney, currentCurrency, uid, currenciesList } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currencies, setCurrencies ] = React.useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    getCurrencies(uid).then(answer => setCurrencies(answer))
  }, [])
  return (
    <div className="topBar">
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="success"
      >
        {name}
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
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={() => signAccountOut()}>Logout</MenuItem>
      </Menu>
      <p className="topBar__totalMoney">Всего: {totalMoney}</p>
      <div className="topBar__currency">
        <Currency
          currentCurrency={currentCurrency}
          currenciesList={currenciesList}
        ></Currency>
      </div>
      <div className="topBar__account">
      Счёт:
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="success"
      >
        
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
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={() => signAccountOut()}>Logout</MenuItem>
      </Menu>
      </div>
    </div>
  );
}

export default connect((state) => ({ store: state }))(TopBar);
