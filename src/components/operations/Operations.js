import { Skeleton } from "@mui/material";
import Costs from "./Costs";
import Retrievings from "./Retrievings";
import Transfers from "./Transfers";
import Debts from "./Debts";
import { connect } from "react-redux";

function Operations(props) {
  const { operationName } = props;
  const user = props.store.currentUser.user;
  const currentAccount = user.userInfo.currentAccount;
  const categories = user.categories;
  const costs = categories.costs;
  const retrievings = categories.retrievings;

  switch (operationName) {
    case "Cost":
      return <Costs costs={costs} currentAccount={currentAccount} />;
    case "Retrieving":
      return (
        <Retrievings
          retrievings={retrievings}
          currentAccount={currentAccount}
        />
      );
    case "Transfer":
      return <Transfers />;
    case "Debt":
      return <Debts />;
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
