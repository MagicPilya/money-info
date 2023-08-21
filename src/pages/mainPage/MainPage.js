import { useEffect, useState } from "react";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Skeleton } from "@mui/material";
import TopBar from "../../components/topBar/TopBar";
import { setUserInfo } from "../../utils/setUserInfo";

function MainPage(props) {
  const store = props.store;
  const [loading = true, setLoading] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserInfo().then(async (answer) => {
      await dispatch({ type: "SET_CURRENT_USER", payload: answer });
      await setLoading(false);
    });
  }, [loading]);
  useProtectedRoute();

  if (loading) {
    return (
      <>
        <Skeleton variant="rectangular" width={210} height={60} />
      </>
    );
  } else if (!loading) {
    return (
      <div className="mainPage">
        <div className="mainPage__topBar">
          <TopBar
            name={store.currentUser.user.userInfo.name}
            totalMoney={store.currentUser.user.userInfo.totalMoney}
            currentCurrency={
              store.currentUser.user.userInfo.currentCurrency
            }
            currenciesList={store.currentUser.user.currency.currencies}
            uid={store.currentUser.user.userInfo.uid}
            accounts={store.currentUser.user.accounts}
            currentAccount={store.currentUser.user.userInfo.currentAccount}
          ></TopBar>
        </div>
        <div className="main">
        </div>
      </div>

    );
  }
}

export default connect((state) => ({ store: state }))(MainPage);
