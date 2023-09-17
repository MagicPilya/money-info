export function findDataOfAccount(accounts, accountName, result) {
  let totalMoney = "";
  let currency = "";
  let index = "";

  accounts.forEach((item, i) => {
    if (item.name === accountName) {
      totalMoney = item.totalMoney;
      currency = item.currency;
      index = i;
    }
  });

  switch (result) {
    case "totalMoney":
      return totalMoney;
    case "currency":
        return currency;
    case "index":
        return +index;
    default:
      break;
  }
}
