import {
  getUser,
  getCurrencies,
  getAccounts,
  getCosts,
  getRetrievings,
  getCreditors,
  getOperations
} from "../firebase/database";

export const setUserInfo = async () => {
  return new Promise(async (resolve, reject) => {
    let user = "",
        currency = "",
        accounts = "",
        categories = {},
        creditors = "",
        operations = "";
      const uid = localStorage.getItem("user");
    await getUser(uid).then((answer) => {
      user = answer;
    });
    await getCurrencies(uid).then((answer) => {
      currency = answer;
    });
    await getAccounts(uid).then((answer) => {
      accounts = answer;
    });
    await getCosts(uid).then((answer) => {
      categories.costs = answer;
    });
    await getRetrievings(uid).then((answer) => {
      categories.retrievings = answer;
    });
    await getCreditors(uid).then((answer) => {
      creditors = answer;
    })
    await getOperations(uid).then((answer) => {
      operations = answer;
    })
    resolve({
      userInfo: user,
      currency,
      accounts,
      categories,
      creditors,
      operations
    });
  });
};
