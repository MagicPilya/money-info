import * as React from "react";
import { MenuItem, Menu, Button, Fade } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCurrentCurrency } from "../../firebase/database";

export default function Currency(props) {
  const { currentCurrency, currenciesList, totalMoney, uid } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="currency">
      Всего: {totalMoney}
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="success"
        sx={{fontSize: "20px"}}
      >
        {currentCurrency}
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
          <MenuItem
          key={key}
            onClick={async ()=> {
              await dispatch({type:"SET_ACTIVE_CURRENCY", payload: item});
              await setCurrentCurrency(uid, item)
              await handleClose();
            }}
              >{item}
            </MenuItem>
        ))}
      
      </Menu>
    </div>
  );
}
