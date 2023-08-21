import * as React from "react";
import { MenuItem, Menu, Button, Fade } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCurrentCurrency } from "../../firebase/database";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InfoModal from "../../modal/info/InfoModal";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

  const [isDelete = false, setIsDelete] = React.useState();
  const [item = '', setItem] = React.useState();
  const [key = '', setKey] = React.useState();

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
        <ExpandMoreIcon/>
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
                if (!isDelete) {
                  await dispatch({
                    type: "SET_ACTIVE_CURRENCY",
                    payload: item,
                  });
                  await setCurrentCurrency(uid, item);
                  await handleClose();
                }
              }}
            >
              {item}
            </p>
            <IconButton
              aria-label="delete"
              onClick={ () => {
                if (item !== currentCurrency) {
                  setIsDelete(true);
                }
                 setItem(item);
                 setKey(key);
              }}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </MenuItem>
        ))}
      </Menu>
      {isDelete ? (
        <InfoModal
        uid={uid}
          setIsDelete={setIsDelete}
          item={item}
          index={key}
        />
      ) : null}
    </div>
  );
}
