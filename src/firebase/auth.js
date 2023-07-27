import { auth } from ".";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut  } from "firebase/auth";

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
  })
  .catch ((error) => console.log(error))
}