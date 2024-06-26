import { getFirestore } from "firebase/firestore";
import { app } from ".";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
const db = getFirestore(app);

export const setPath = async (uid) => {
  return new Promise(async (resolve, reject) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.id === uid) {
        resolve(doc.id);
      }
    });
  });
};

export const reindexAndSave = async (uid, subject) => {
  // Получаем все оставшиеся элементы
  const querySnapshot = await getDocs(collection(db, subject, uid, subject));

  // Удаляем все элементы
  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
    })
  );

  // Создаем новые документы с последовательными индексами
  await Promise.all(
    querySnapshot.docs.map(async (document, index) => {
      const data = document.data(); // Получаем данные из исходного документа
      await setDoc(doc(db, subject, uid, subject, `${index}`), data); // Добавляем данные в новую коллекцию с индексом
    })
  );
};

export const deleteData = async (uid, subject, index = `${0}`) => {
  const docRef = doc(db, subject, uid, subject, `${index}`);
  await deleteDoc(docRef);
  await reindexAndSave(uid, subject);
};
export const addUser = async (name, email, userID) => {
  await setDoc(doc(db, "users", `${userID}`), {
    email: email,
    name: name,
    uid: userID,
    currentAccount: null,
    currentAccountIndex: null,
    currentCurrency: null,
    currentCurrencyIndex: null,
    totalMoney: 0,
  });
};

export const getUser = async (userID) => {
  return new Promise((resolve, reject) => {
    setPath(userID).then(async (answer) => {
      const docRef = doc(db, "users", answer);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        resolve(docSnap.data());
      } else {
        console.log("No such document!");
      }
    });
  });
};

export const getCurrencies = async (userID) => {
  return new Promise((resolve, reject) => {
    setPath(userID).then(async (answer) => {
      let finalArray = [];
      for (let i = 0; i > -1; i++) {
        let docRef = doc(db, "currencies", answer, "currencies", `${i}`);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          finalArray.push(docSnap.data());
        } else {
          break;
        }
      }
      resolve(finalArray);
    });
  });
};

export const getAccounts = async (userID) => {
  return new Promise((resolve, reject) => {
    setPath(userID).then(async (answer) => {
      let finalArray = [];
      for (let i = 0; i > -1; i++) {
        let docRef = doc(db, "accounts", answer, "accounts", `${i}`);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          finalArray.push(docSnap.data());
        } else {
          break;
        }
      }
      resolve(finalArray);
    });
  });
};

export const getOperations = async (userID) => {
  return new Promise((resolve, reject) => {
    setPath(userID).then(async (answer) => {
      let finalArray = [];
      for (let i = 0; i > -1; i++) {
        let docRef = doc(db, "operations", answer, "operations", `${i}`);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          finalArray.push(docSnap.data());
        } else {
          break;
        }
      }
      resolve(finalArray);
    });
  });
};

export const setOperation = async (userId, index, finalObject) => {
  const docRef = doc(db, "operations", userId, "operations", `${index}`);
  await setDoc(docRef, finalObject);
};

export const setCurrentCurrency = async (userId, currentCurrency) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    currentCurrency: currentCurrency,
  });
};

export const setCurrentAccount = async (userId, currentAccount, index) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    currentAccount: currentAccount,
    currentAccountIndex: index,
  });
};

export const addCurrency = async (userId, currency, id) => {
  const docRef = doc(db, "currencies", `${userId}`, "currencies", `${id}`);
  await setDoc(docRef, {
    currencyName: currency,
  });
};

export const addAccount = async (userId, account, id) => {
  const docRef = doc(db, "accounts", userId, "accounts", `${id}`);
  await setDoc(docRef, {
    name: account.name,
    currency: account.currency,
    totalMoney: Number(account.totalMoney),
  });
};

export const renameAccount = async (userId, index, newName) => {
  const docRef = doc(db, "accounts", userId, "accounts", `${index}`);
  await updateDoc(docRef, {
    name: newName,
  });
};

export const correctBalance = async (userId, index, newBalance) => {
  const docRef = doc(db, "accounts", userId, "accounts", `${index}`);
  await updateDoc(docRef, {
    totalMoney: Number(newBalance),
  });
};

export const setCurrentCurrencyIndex = async (userId, index) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    currentCurrencyIndex: index,
  });
};

export const getCosts = async (userID) => {
  return new Promise((resolve, reject) => {
    setPath(userID).then(async (answer) => {
      let finalArray = [];
      for (let i = 0; i > -1; i++) {
        let docRef = doc(db, "categories", answer, "costs", `${i}`);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          finalArray.push(docSnap.data());
        } else {
          break;
        }
      }
      resolve(finalArray);
    });
  });
};

export const getRetrievings = async (userID) => {
  return new Promise((resolve, reject) => {
    setPath(userID).then(async (answer) => {
      let finalArray = [];
      for (let i = 0; i > -1; i++) {
        let docRef = doc(db, "categories", answer, "retrievings", `${i}`);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          finalArray.push(docSnap.data());
        } else {
          break;
        }
      }
      resolve(finalArray);
    });
  });
};
export const getCreditors = async (userID) => {
  return new Promise((resolve, reject) => {
    setPath(userID).then(async (answer) => {
      let finalArray = [];
      for (let i = 0; i > -1; i++) {
        let docRef = doc(db, "creditors", answer, "creditors", `${i}`);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          finalArray.push(docSnap.data());
        } else {
          break;
        }
      }
      resolve(finalArray);
    });
  });
};
export const decreaseAccountMoney = async (
  userId,
  index,
  oldValue,
  decreaser
) => {
  const docRef = doc(db, "accounts", userId, "accounts", `${index}`);
  const newValue = +oldValue - +decreaser;
  await updateDoc(docRef, {
    totalMoney: +Number.parseFloat(newValue).toFixed(2),
  });
};
export const increaseAccountMoney = async (
  userId,
  index,
  oldValue,
  increaser
) => {
  const docRef = doc(db, "accounts", userId, "accounts", `${index}`);
  const newValue = +oldValue + +increaser;
  await updateDoc(docRef, {
    totalMoney: +Number.parseFloat(newValue).toFixed(2),
  });
};

export const editOperation = async (
  userId,
  index,
  finalObject,
  accounts,
  operations
) => {
  const newAmount = finalObject.amount;
  const oldAmount = operations[index].amount;
  const symbol = finalObject.operationType;

  const difference =
    symbol === "plus" ? newAmount - oldAmount : oldAmount - newAmount;

  accounts.map((item, index) => {
    if (item.name === finalObject.currentAccount) {
      increaseAccountMoney(userId, index, item.totalMoney, difference); // Тут хуйня
    }
    return undefined;
  });
  const docRef = doc(db, "operations", userId, "operations", `${index}`);
  await updateDoc(docRef, finalObject);
};

export const addRetrievingsCategory = async (uid, categoryName, id) => {
  const docRef = doc(db, "categories", `${uid}`, "retrievings", `${id}`);
  await setDoc(docRef, {
    categoryName,
  });
};

export const addCostsCategory = async (uid, categoryName, id) => {
  const docRef = doc(db, "categories", `${uid}`, "costs", `${id}`);
  await setDoc(docRef, {
    categoryName,
  });
};
export const addCreditors = async (uid, creditorName, id) => {
  const docRef = doc(db, "creditors", `${uid}`, "creditors", `${id}`);
  await setDoc(docRef, {
    creditorName,
  });
};

export const editUserName = async (uid, newName) => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, newName);
};
