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
  arrayRemove
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
      const docRef = doc(db, "accounts", answer);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        resolve(docSnap.data());
      } else {
        console.log("No such document!");
      }
    });
  });
};

export const setCurrentCurrency = async (userId, currentCurrency) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    currentCurrency: currentCurrency,
  });
};

export const setCurrentAccount = async(userId, currentAccount) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    currentAccount: currentAccount,
  });
}

export const addCurrency = async(userId, currency) => {
  const docRef = doc(db, "currencies", userId);
  await updateDoc(docRef, {
    currencies: arrayUnion(currency)
});
}

export const addAccount = async(userId, account) => {
  const docRef = doc(db, "accounts", userId);
  await updateDoc(docRef, {
    accounts: arrayUnion(account)
  })
}

export const deleteCurrency = async(userId, currency) => {
  const docRef = doc(db, "currencies", userId);
  await updateDoc(docRef, {
    currencies: arrayRemove(currency)
});
}