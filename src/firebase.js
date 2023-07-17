import { initializeApp } from "firebase/app";

import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAkBafSn3g8LnR4gQUZcS_WhgVQZ_w3D-I",
  authDomain: "react-kanban-37add.firebaseapp.com",
  projectId: "react-kanban-37add",
  storageBucket: "react-kanban-37add.appspot.com",
  messagingSenderId: "666593534499",
  appId: "1:666593534499:web:9baae7efd58f2dda65c796"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const boardsCollection = collection(db, "boards")

