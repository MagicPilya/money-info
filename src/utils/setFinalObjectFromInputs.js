function setFinalObjectFromInputs( operationName, currentAccount, description, operationDate, operationType, amount, currentCurrency) {
  return new Promise ( (resolve) => {
    resolve({
      operationName,
      currentAccount,
      description,
      operationDate,
      operationType,
      amount,
      currentCurrency
    })
  })
}

export default setFinalObjectFromInputs;