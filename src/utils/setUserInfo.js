import { getUser, getCurrencies } from "../firebase/database";

export const setUserInfo = async () => {
  return new Promise(async (resolve, reject) => {
    let user = "",
      currency = "";
    await getUser(localStorage.getItem("user")).then((answer) => {
      user = answer;
    });
    await getCurrencies(localStorage.getItem("user")).then((answer) => {
      currency = answer;
    });
    resolve({
      userInfo: user,
      currency,
    });
  });
};
