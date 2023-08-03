import { getUser, getCurrencies, getAccounts } from "../firebase/database";

export const setUserInfo = async () => {
  return new Promise(async (resolve, reject) => {
    let user = "",
      currency = "",
      accounts = "";
      const uid = localStorage.getItem("user");
    await getUser(uid).then((answer) => {
      user = answer;
    });
    await getCurrencies(uid).then((answer) => {
      currency = answer;
    });
    await getAccounts(uid).then((answer) => {
      accounts = answer.accounts;
    })
    resolve({
      userInfo: user,
      currency,
      accounts,
    });
  });
};
