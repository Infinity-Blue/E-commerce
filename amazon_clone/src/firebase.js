import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import { firebaseConfig } from "./credential";
// const firebaseApp = !firebase.apps.length
// 	? firebase.initializeApp(firebaseConfig)
// 	: firebase.app()
let firebaseApp;
try {
  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
  } else {
    firebaseApp = firebase.app();
  }
} catch (error) {
  console.error("Error during Firebase initialization:", error);
}

const db = firebaseApp.firestore(); //database of firebase
const auth = firebase.auth(); // handles authentication

export { db, auth };
