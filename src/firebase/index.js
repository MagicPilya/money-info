// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDceMYaloCeVcgIS_mV-xZeiflDEjARTiE",
  authDomain: "money-info-fcbaa.firebaseapp.com",
  databaseURL: "https://money-info-fcbaa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "money-info-fcbaa",
  storageBucket: "money-info-fcbaa.appspot.com",
  messagingSenderId: "678212012225",
  appId: "1:678212012225:web:d9ab7f279a0bed2e082c40"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);