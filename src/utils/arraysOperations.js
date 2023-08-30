export function findDataOfAccount(accounts, accountName, result) {
  let totalMoney = "";
  let currency = "";

  accounts.forEach((item) => {
    if (item.name === accountName) {
      totalMoney = item.totalMoney;
      currency = item.currency;
    }
  });

  switch (result) {
    case "totalMoney":
      return totalMoney;
    case "currency":
        return currency;
    default:
      break;
  }
}
