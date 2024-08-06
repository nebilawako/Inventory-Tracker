// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJM-0gDk82MeiGmSWc-UyxlsC6_FxyM1M",
  authDomain: "inventory-management-e6a86.firebaseapp.com",
  projectId: "inventory-management-e6a86",
  storageBucket: "inventory-management-e6a86.appspot.com",
  messagingSenderId: "941317289527",
  appId: "1:941317289527:web:12f3c6873fef80eb5a31b2",
  measurementId: "G-XGS4PEQ862"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore=getFirestore(app);

//To access it
export{firestore}
