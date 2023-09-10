export default function OperationCard (props) {
  return (
    <div className="operationCard">
      <div className="operationCard__date">06.09.2023</div>
      <div className="operationCard__leftBlock">
        <div className="operationCard__leftBlock-operationType">Бытовые расходы</div>
        <div className="operationCard__leftBlock-account">Наличные</div>
        <div className="operationCard__leftBlock-comment">Чисто на казик нахуй</div>
      </div>
      <div className="operationCard__rightBlock">
        <div className="operationCard__rightBlock-symbol">-</div>
        <div className="operationCard__rightBlock-amount">1024</div>
        <div className="operationCard__rightBlock-currency">RUB</div>
      </div>
    </div>
  )
}
