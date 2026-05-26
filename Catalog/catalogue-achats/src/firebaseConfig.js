// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDv_Bdu-EZSfY3Z6hmpD9B-TiKFwfif0YU",

  authDomain: "catalog-15a5e.firebaseapp.com",

  projectId: "catalog-15a5e",

  storageBucket: "catalog-15a5e.firebasestorage.app",

  messagingSenderId: "591415872807",

  appId: "1:591415872807:web:810dd6688c4a792cd32d02",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);