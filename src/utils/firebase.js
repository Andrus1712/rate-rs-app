// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNkglyuHrMos_H4-9yK3mfn3Qb7R1XBbw",
  authDomain: "curso-rate-app.firebaseapp.com",
  projectId: "curso-rate-app",
  storageBucket: "curso-rate-app.appspot.com",
  messagingSenderId: "277795661077",
  appId: "1:277795661077:web:57cd5674630bd8453db51c",
  measurementId: "G-Y8MTJRZFGT",
};

// Initialize Firebase
const initFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(initFirebase);
const auth = initializeAuth(initFirebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { initFirebase, auth, getApp, getAuth };
