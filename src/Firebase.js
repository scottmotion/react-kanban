// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { collection, getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkBafSn3g8LnR4gQUZcS_WhgVQZ_w3D-I",
  authDomain: "react-kanban-37add.firebaseapp.com",
  projectId: "react-kanban-37add",
  storageBucket: "react-kanban-37add.appspot.com",
  messagingSenderId: "666593534499",
  appId: "1:666593534499:web:9baae7efd58f2dda65c796"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const boardsCollection = collection(db, "boards")
