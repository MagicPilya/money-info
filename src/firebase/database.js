import { getFirestore } from "firebase/firestore";
import { app } from ".";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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

export const addUser = async (
  name,
  email,
  userID,
  savedData = { totalMoney: 0, currentCurrency: "USD" }
) => {
  await setDoc(doc(db, "users", `${userID}`), {
    email: email,
    name: name,
    uid: userID,
    savedData: savedData,
  });
  await setDoc(doc(db, "currencies", `${userID}`), {
    currencies: ["USD", "BYN"],
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
      const docRef = doc(db, "currencies", answer);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        resolve(docSnap.data());
      } else {
        console.log("No such document!");
      }
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
    currentAccountIndex: index
  });
};

export const addCurrency = async (userId, currency) => {
  const docRef = doc(db, "currencies", userId);
  await updateDoc(docRef, {
    currencies: arrayUnion(currency),
  });
};

export const addAccount = async (userId, account, id) => {
  const docRef = doc(db, "accounts", userId, "accounts", `${id}`);
  await setDoc(docRef, {
    name: account.name,
    currency: account.currency,
    totalMoney: account.totalMoney
  });
};

export const deleteCurrency = async (userId, currency) => {
  const docRef = doc(db, "currencies", userId);
  await updateDoc(docRef, {
    currencies: arrayRemove(currency),
  });
};

export const renameAccount = async (userId, index, newName) => {
  const docRef = doc(db, "accounts", userId, "accounts", `${index}`);
  await updateDoc(docRef, {
    name: newName,
  });
};

export const deleteAccount = async (userId, index) => {
  const docRef = doc(db, "accounts", userId, "accounts", `${index}`);
  await deleteDoc(docRef);
}

export const correctBalance = async (userId, index, newBalance) => {
  const docRef = doc(db, "accounts", userId, "accounts", `${index}`);
  await updateDoc(docRef, {
    totalMoney: newBalance,
  });
}

export const setCurrentCurrencyIndex = async (userId, index) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    currentCurrencyIndex: index,
  });
}

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
      const docRef = doc(db, "creditors", answer);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        resolve(docSnap.data());
      } else {
        console.log("No such document!");
      }
    });
  });
};


