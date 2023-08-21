import { MenuItem, Menu, Button, Fade } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentAccount } from "../../firebase/database";
import AddAccountModal from "../../modal/addAccount/AddAccountModal";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccountsList(props) {
  const { accounts, currentAccount, uid, currenciesList } = props;
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
      <div className="accountsList__currentAccount">
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
          <ExpandMoreIcon/>
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
          {accounts.map((item, key) => (
            <MenuItem
              key={key}
              onClick={async () => {
                await setCurrentAccount(uid, item.name);
                await dispatch({
                  type: "SET_ACTIVE_ACCOUNT",
                  payload: item.name,
                });
                await handleClose();
              }}
            >
              {item.name}
            </MenuItem>
          ))}
          <AddAccountModal
            currenciesList={currenciesList}
            uid={uid}  
          >
          </AddAccountModal>
        </Menu>
      </div>
      {accounts
        .filter((item) => item.name.includes(currentAccount))
        .map((filteredItem, key) => (
          <div className="accountsList__accountState" key={key + "sss"}>
            <div className="accountsList__accountState-total" key={key}>
              {filteredItem.total}
            </div>
            <div
              className="accountsList__accountState-currency"
              key={key + "vvvv"}
            >
              {filteredItem.currency}
            </div>
          </div>
        ))}
    </div>
  );
}
