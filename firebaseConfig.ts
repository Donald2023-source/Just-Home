// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4LsAKbNHoKlqb90CMaR_Z_kiKdr5gwSo",
  authDomain: "just-home-f531b.firebaseapp.com",
  projectId: "just-home-f531b",
  storageBucket: "just-home-f531b.appspot.com",
  messagingSenderId: "520311913919",
  appId: "1:520311913919:web:ad3c3852b39c81e03df50a",
  measurementId: "G-LG17JMEJDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);