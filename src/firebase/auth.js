import { auth } from ".";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, inMemoryPersistence  } from "firebase/auth";

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

export const getToken = () => {
  auth.currentUser.getIdToken(true).then(token => {
    // console.log(token)
  })
  setPersistence(auth, inMemoryPersistence)
  .then((answer) => {
    return answer
  })
}

export const onChangeIdToken = (email, password) => {
  auth.onIdTokenChanged( (user) => {
    if (user) {
      signIn(email, password);
    }
    else {

    }
  })
}