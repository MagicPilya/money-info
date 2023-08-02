import * as React from "react";
import { MenuItem, Menu, Button, Fade } from "@mui/material";
import { useDispatch } from "react-redux";

export default function Currency(props) {
  const { currentCurrency, currenciesList } = props;
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
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="success"
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
            onClick={()=> {
              dispatch({type:"SET_ACTIVE_CURRENCY", payload: item});
              handleClose();
            }}
              >{item}
            </MenuItem>
        ))}
      
      </Menu>
    </div>
  );
}
