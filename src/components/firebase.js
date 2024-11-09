// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHNx4TaNjtc0lTdzfa3qbODsfDRQo4-Vs",
  authDomain: "aerocog-in.firebaseapp.com",
  projectId: "aerocog-in",
  storageBucket: "aerocog-in.firebasestorage.app",
  messagingSenderId: "149748266667",
  appId: "1:149748266667:web:29a77533fd7fe5e8f1a9ee",
  measurementId: "G-0PJSDFRF9B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();