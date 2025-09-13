// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU5yCDuB48DZlusBfjWlHxVD-jEsaHx48",
  authDomain: "himalink-16.firebaseapp.com",
  projectId: "himalink-16",
  storageBucket: "himalink-16.firebasestorage.app",
  messagingSenderId: "826033898289",
  appId: "1:826033898289:web:5b607d10beee585eaba610",
  measurementId: "G-K234RWMNC0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
