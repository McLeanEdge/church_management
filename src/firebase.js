import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAWR9vyqnwSWfCAzLAXWoJwEOC_3dDtRFg",
  authDomain: "church-management-e2403.firebaseapp.com",
  projectId: "church-management-e2403",
  storageBucket: "church-management-e2403.firebasestorage.app",
  messagingSenderId: "565341667118",
  appId: "1:565341667118:web:ae1d28521f5b234f9804bf",
  measurementId: "G-82NYCPWN64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only when supported (fails silently in localhost/dev)
isSupported().then((yes) => { if (yes) getAnalytics(app); });

// Export these — App.jsx and other components depend on them
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;