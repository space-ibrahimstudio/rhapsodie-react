import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaEoS1jAe5hk2dU9URv_zZBHqt5eCclvU",
  authDomain: "rhapsodie-react.firebaseapp.com",
  projectId: "rhapsodie-react",
  storageBucket: "rhapsodie-react.appspot.com",
  messagingSenderId: "492530637227",
  appId: "1:492530637227:web:07df55c536e5a838e79aee",
  measurementId: "G-HNML3FFYPL",
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const facebook = new FacebookAuthProvider();
export const google = new GoogleAuthProvider();
