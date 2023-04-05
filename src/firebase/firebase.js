// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkdkI32JiVGRGPg6RHVOCoDYpdRVBJD14",
  authDomain: "simple-chat-b84eb.firebaseapp.com",
  projectId: "simple-chat-b84eb",
  storageBucket: "simple-chat-b84eb.appspot.com",
  messagingSenderId: "1096323272513",
  appId: "1:1096323272513:web:9cec83475e023f42d8dbc0",
  measurementId: "G-W42HKTENL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;