// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBH2t8IE7IbpGTeEAwX8xkf2SQMq5hekw",
  authDomain: "churchmanagement-3e996.firebaseapp.com",
  projectId: "churchmanagement-3e996",
  storageBucket: "churchmanagement-3e996.firebasestorage.app",
  messagingSenderId: "63265598284",
  appId: "1:63265598284:web:ca8fe559b4dc125b613de9",
  measurementId: "G-PGW113267R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);