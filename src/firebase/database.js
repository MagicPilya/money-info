import { getFirestore } from "firebase/firestore";
import { app } from ".";
// import { memoryLocalCache } from "firebase/firestore";
import { doc, getDoc, collection, getDocs, setDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);
// {localCash: memoryLocalCache()}

export const readValue = async () => {
  return new Promise(async (resolve, reject) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`)
      if (doc.data().isActive) {
        resolve(doc.id);
      }
    });
  });
};

export const readDocument = async () => {
  readValue().then( async (answer) => {
    const docRef = doc(db, "users", answer);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
  });
  
  readValue();
};

export const switchActivityAccount = async (email) => {
  let id = '';
  const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.data().email === email) {
        id = doc.id;
      }
    })

  let usersRef = doc(db, 'users', id);
  await updateDoc(usersRef, {isActive: true})
}

export const addUser = async (name, email, userID, savedData = {totalMoney: 14321}) => {

  await setDoc(doc(db, 'users', `${userID}`), {
    isActive: false,
    email: email,
    name: name,
    savedData: savedData
  })
  
}
