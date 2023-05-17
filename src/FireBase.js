// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC36s-5Vw_1Tq6RGMCXPGstbSYbh6nJhWk",
  authDomain: "aniflex-5f4f8.firebaseapp.com",
  projectId: "aniflex-5f4f8",
  storageBucket: "aniflex-5f4f8.appspot.com",
  messagingSenderId: "1008935178589",
  appId: "1:1008935178589:web:687e951a6f2db1b267d8b4",
  measurementId: "G-8QX751EZQD"
};

// Initialize Firebase
const FireBase = initializeApp(firebaseConfig);
const analytics = getAnalytics(FireBase);
export const storage = getStorage(FireBase)
export default FireBase
