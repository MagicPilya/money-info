import {useEffect, useState} from "react";
import OperationEditModal from "../../modal/operationEdit/OperationEditModal";

export default function OperationCard (props) {
  const {
    operationID,
    setOperationID,
    operationName,
    currentAccount,
    description,
    operationDate,
    operationType,
    amount,
    currentCurrency,
  } = props;
  const [symbol, setSymbol] = useState('');
  const [color, setColor] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  useEffect(() => {
    switch (operationType) {
      case "plus":
        setSymbol('+');
        setColor("green");
        break;
      case "minus":
        setSymbol('-');
        setColor("red");
        break;
      default:
        break;
    }
  }, [operationType]);
  
  return (
  <>
    <OperationEditModal
      open={openEdit}
      setOpen={setOpenEdit}
      operationName={operationName}
      currentAccount={currentAccount}
      description={description}
      operationDate={operationDate}
      operationType={operationType}
      amount={amount}
      currentCurrency={currentCurrency}
    />
    <div className="operationCard"

       onClick={()=> {
         setOpenEdit(true);
         setOperationID(operationID);
         console.log(operationID);
       }}
    >
      <div className="operationCard__date">{operationDate}</div>
      <div className="operationCard__leftBlock">
        <div className="operationCard__leftBlock-operationType">{operationName}</div>
        <div className="operationCard__leftBlock-account">{currentAccount}</div>
        <div className="operationCard__leftBlock-comment">{description}</div>
      </div>
      <div className="operationCard__rightBlock" >
        <div className="operationCard__rightBlock-money" style={{color: color}}>
          <div className="operationCard__rightBlock-money-symbol">{symbol}</div>
          <div className="operationCard__rightBlock-money-amount">{amount}</div>
          <div className="operationCard__rightBlock-currency">{currentCurrency}</div>
        </div>
      </div>
    </div>
  </>
  )
}
