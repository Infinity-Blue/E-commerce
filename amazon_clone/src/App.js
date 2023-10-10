import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import DataReader from "./DataReader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
// import firebase from './firebase/index'
import HomeData from "./HomeData";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import Login from "./Login";
import { auth } from "./firebase";
import store from "./store";

function App() {
  // console.log(firebase.db);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("The user: ", authUser);
      if (authUser) {
        //the user is logged in
        store.dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        store.dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/" element={<HomeData />} />
          <Route path="/productList/:id/:subCategory" element={<ProductList />} />
          <Route path="/productList/:title/:id/:index" element={<ProductDetails />} />
          <Route path="*" element={<notfound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
