import Debts from '../../components/operations/Debts';
import {connect} from "react-redux";
const OperationEditBuffer = (props) => {
  
  const {
    operationName,
    currentAccount,
    description,
    operationDate,
    operationType,
    amount,
    operationID,
  } = props;
  
  switch (operationName) {
    case "Долги": {
      return (
        <Debts
          typeOfOperation={"Edit"}
          oldOperationAccount={currentAccount}
          oldDescription={description}
          oldOperationDate={operationDate}
          oldOperationType={operationType}
          oldAmount={amount}
          operationID={operationID}
        />
      )
    }
    default:
      return null
    }
  }
export default connect((state) => ({store: state}))(OperationEditBuffer);