import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "rhapsodie-react.firebaseapp.com",
  projectId: "rhapsodie-react",
  storageBucket: "rhapsodie-react.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MS_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_M_ID,
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const facebook = new FacebookAuthProvider();
export const google = new GoogleAuthProvider();
