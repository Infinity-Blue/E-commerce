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
import store from "./store";

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
        updateReduxCart(auth.user.uid);
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
        updateFsDatabase(auth.user.uid, email);
        //store user data in Redux so that user data can be accessed from any component.
        if (auth.user) {
          store.dispatch({
            type: "SET_USER",
            user: auth.user,
          });
        }
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

/**
 *  Fetch the cart data of the user from Firestore database and update Redux store accordingly.
 */
const updateReduxCart = async (userID) => {
  // User is signed in, fetch their cart from Firestore
  const userDocRef = doc(db, "users", userID);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    const userCart = userData.cart || [];

    if (userCart.length > 0) {
      for (let i = 0; i < userCart.length; i++) {
        store.dispatch({
          type: "ADD_TO_CART",
          item: {
            img: userCart[i].detail.img,
            price: userCart[i].detail.price,
            title: userCart[i].detail.name,
            quantity: userCart[i].quantity,
          },
        });
      }
    }
  }
};

export default Login;
