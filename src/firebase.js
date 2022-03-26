import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDd4_OkR7F7EqMQqLDv4z06b73swupFibM",
  authDomain: "rent-a-house1.firebaseapp.com",
  projectId: "rent-a-house1",
  storageBucket: "rent-a-house1.appspot.com",
  messagingSenderId: "198373567290",
  appId: "1:198373567290:web:27fc30ba9b6a9f4b8d7e03",
  measurementId: "G-52HC59F3EQ",
};

initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default db;
