// import firebase from 'firebase'
// import 'firebase/firestore'
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAuLNECiGfxNkUtoOczl1tsmd0TtMmFDlY",
	authDomain: "challenge-b0587.firebaseapp.com",
	projectId: "challenge-b0587",
	storageBucket: "challenge-b0587.appspot.com",
	messagingSenderId: "738555687216",
	appId: "1:738555687216:web:b60fb45573a8de9c2898f5",
	measurementId: "G-C663JBGKGW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export default db;
