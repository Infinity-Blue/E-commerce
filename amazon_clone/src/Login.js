import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import { auth, db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  collectionGroup,
  connectFirestoreEmulator,
} from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    //Prevent refreshing the page
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const register = (e) => {
    //Prevent refreshing the page
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      //if successfully created a new user
      .then((auth) => {
        console.log(auth.user);
        // const user = auth.user;
        // // Check if the user object is defined
        // if (user) {
        //   createUserInFirestore(user);
        // } else {
        //   console.error("User object is undefined.");
        // }
        updateFsDatabase(auth.user.uid, email);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <NavLink to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          className="login_logo"
        />
      </NavLink>

      <div className="login_container">
        <h1>Sign-in</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit" onClick={signIn} className="login_sign">
            Sign-in
          </button>
        </form>
        <button onClick={register} type="submit" className="login_register">
          Create account
        </button>
      </div>
    </div>
  );
}

const updateFsDatabase = async (userId, email) => {
  // Reference to the user's document in Firestore. If not exists, it will create one.
  const userDocRef = doc(db, "users", userId);
  console.log(userDocRef);
  // Data to be stored for this user
  const userData = {
    uid: userId,
    email: email,
    cart: [],
  };
  // Set the user data in Firestore
  await setDoc(userDocRef, userData);
};
export default Login;
