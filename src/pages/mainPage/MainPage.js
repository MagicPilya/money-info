import { useEffect, useState } from "react";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Skeleton, Typography } from "@mui/material";
import TopBar from "../../components/topBar/TopBar";
import { deleteInitialValues } from "../../firebase/database.js";
import { setUserInfo } from "../../utils/setUserInfo";
import OperationCard from "../../components/operationCard/OperationCard";

function MainPage(props) {
  const store = props.store;
  const [loading = true, setLoading] = useState();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [operationID, setOperationID] = useState("");

  useEffect(() => {
    setUserInfo().then(async (answer) => {
      dispatch({ type: "SET_CURRENT_USER", payload: answer });
      await setLoading(false);

      // При добавлении элементов в коллекцию вызывать данную фичу при условии, что значение initial существует.
      await deleteInitialValues(answer.user, "accounts");
      await deleteInitialValues(answer.user, "categories");
      await deleteInitialValues(answer.user, "creditors");
      await deleteInitialValues(answer.user, "currencies");
      await deleteInitialValues(answer.user, "operations");
    });
  }, [loading, dispatch]);

  useProtectedRoute();

  if (loading) {
    return (
      <>
        <Skeleton variant="rectangular" width={210} height={60} />
      </>
    );
  } else if (!loading) {
    const user = props.store.currentUser.user;
    const operations = user.operations;
    return (
      <div className="mainPage">
        <div className="mainPage__topBar">
          <TopBar
            name={store.currentUser.user.userInfo.name}
            totalMoney={store.currentUser.user.userInfo.totalMoney}
            currentCurrency={store.currentUser.user.userInfo.currentCurrency}
            currentCurrencyIndex={
              store.currentUser.user.userInfo.currentCurrencyIndex
            }
            currenciesList={store.currentUser.user.currencies.currencies}
            uid={store.currentUser.user.userInfo.uid}
            accounts={store.currentUser.user.accounts}
            currentAccount={store.currentUser.user.userInfo.currentAccount}
            currentAccountIndex={
              store.currentUser.user.userInfo.currentAccountIndex
            }
          ></TopBar>
        </div>
        <div className="mainPage__workBox">
          <div className="mainPage__workBox-title">
            <Typography variant="h2" gutterBottom component="h2">
              Последние операции
            </Typography>
          </div>
          <div className="mainPage__workBox-table">
            {operations.length > 0 ? (
              operations.map((item, id) => (
                <OperationCard
                  key={id}
                  operationID={id}
                  setOperationID={setOperationID}
                  operationName={item.operationName}
                  currentAccount={item.currentAccount}
                  description={item.description}
                  operationDate={item.operationDate}
                  operationType={item.operationType}
                  amount={item.amount}
                  currentCurrency={item.currentCurrency}
                />
              ))
            ) : (
              <Typography variant="h3" gutterBottom component="h3">
                У вас нет операций
              </Typography>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default connect((state) => ({ store: state }))(MainPage);
