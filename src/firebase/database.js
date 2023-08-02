import { getFirestore } from "firebase/firestore";
import { app } from ".";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
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
  savedData = { totalMoney: 0 }
) => {
  await setDoc(doc(db, "users", `${userID}`), {
    isActive: false,
    email: email,
    name: name,
    savedData: savedData,
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
      const docRef = doc(db, "сurrencies", answer);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        (resolve(docSnap.data()));
      } else {
        console.log("No such document!");
      }
    });
  });
};
