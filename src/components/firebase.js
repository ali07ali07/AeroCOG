// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged  } from "firebase/auth";
import { getFirestore, collection, addDoc, Timestamp, getDocs} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export {onAuthStateChanged };
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
export { db, collection, addDoc , Timestamp, getDocs,storage};