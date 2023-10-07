import Debts from '../../components/operations/Debts';
import {connect} from "react-redux";
const OperationEditBuffer = (props) => {
  
  const {
    operationName,
    operationAccount,
    description,
    operationDate,
    operationType,
    amount,
  } = props;
  
  switch (operationName) {
    case "Долги": {
      return (
        <Debts
          typeOfOperation={"Edit"}
          oldOperationAccount={operationAccount}
          oldDescription={description}
          oldOperationDate={operationDate}
          oldOperationType={operationType}
          oldAmount={amount}
        />
      )
    }
    default:
      return null
    }
  }
export default connect((state) => ({store: state}))(OperationEditBuffer);