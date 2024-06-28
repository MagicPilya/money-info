import { Skeleton } from "@mui/material";
import Costs from "./Costs";
import Retrievings from "./Retrievings";
import Transfers from "./Transfers";
import Debts from "./Debts";
import { connect } from "react-redux";

function Operations(props) {
  const {
    operationName,
    setCloseModal,
    currentAccountIndex,
    oldValueOfTotalMoney,
  } = props;

  const user = props.store.currentUser.user;
  const userInfo = user.userInfo;
  const currentAccount = userInfo.currentAccount;
  const accounts = user.accounts;
  const uid = userInfo.uid;

  switch (operationName) {
    case "Cost":
      return (
        <Costs
          setCloseModal={setCloseModal}
          oldValueOfTotalMoney={oldValueOfTotalMoney}
        />
      );
    case "Retrieving":
      return (
        <Retrievings
          setCloseModal={setCloseModal}
          oldValueOfTotalMoney={oldValueOfTotalMoney}
        />
      );
    case "Transfer":
      return (
        <Transfers
          accounts={accounts}
          currentAccount={currentAccount}
          uid={uid}
          currentAccountIndex={currentAccountIndex}
          oldValueOfTotalMoney={oldValueOfTotalMoney}
        />
      );
    case "Debt":
      return <Debts typeOfOperation={"Add"} setCloseModal={setCloseModal} />;
    default:
      return (
        <Skeleton
          variant="rounded"
          height="80vh"
          sx={{ width: "99%", margin: 0 }}
        />
      );
  }
}

export default connect((state) => ({ store: state }))(Operations);
