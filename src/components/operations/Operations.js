import { Skeleton } from "@mui/material";
import Costs from "./Costs";
import Retrievings from "./Retrievings";
import Transfers from "./Transfers";
import Debts from "./Debts";
import { connect } from "react-redux";

function Operations(props) {
  const { operationName, setCloseModal, uid, currentAccountIndex, oldValueOfTotalMoney } = props;
  const user = props.store.currentUser.user;
  const currentAccount = user.userInfo.currentAccount;
  const currentCurrency = user.userInfo.currentCurrency;
  const categories = user.categories;
  const costs = categories.costs;
  const retrievings = categories.retrievings;
  const creditors = user.creditors;
  const accounts = user.accounts;
  const operations = user.operations;

  switch (operationName) {
    case "Cost":
      return <Costs
        costs={costs}
        currentAccount={currentAccount}
        setCloseModal={setCloseModal}
        uid={uid}
        currentAccountIndex={currentAccountIndex}
        oldValueOfTotalMoney={oldValueOfTotalMoney}

      />;
    case "Retrieving":
      return (
        <Retrievings
          retrievings={retrievings}
          setCloseModal={setCloseModal}
          uid={uid}
          currentAccountIndex={currentAccountIndex}
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
      return (
        <Debts
          operations={operations}
          currentAccount={currentAccount}
          currentCurrency={currentCurrency}
          creditors={creditors}
          uid={uid}
          currentAccountIndex={currentAccountIndex}
          oldValueOfTotalMoney={oldValueOfTotalMoney}
        />);
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

export default connect((state) => ({store: state}))(Operations);
