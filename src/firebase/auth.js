import { auth } from ".";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
    .then( userCredential => resolve(userCredential))
    .catch( error => reject(error.code));
  })
}

export const signUp = (email, password) => {
  return new Promise( (resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => resolve(userCredential))
    .catch(error => reject(error.code));
  })
}

export const signAccountOut =  () => {
  signOut(auth)
  .then(() => {
    localStorage.removeItem('user')
  })
  .catch ((error) => console.log(error))
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user)
      } else {
        reject(error => console.log(error))
      }
     
    })
  })
   
}