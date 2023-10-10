import React, { useReducer, useState } from "react";
import redux, { createStore } from "redux";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import reducer, { initialState } from "./reducer";
import CustomContext, { useCustomContext } from "./CustomContext";
import { useSelector } from "react-redux";
import { StateProvider } from "./StateProvider";
import store from "./store";
import { auth } from "./firebase";
import { computeCartQuantity } from "./reducer";

function Header(props) {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(store.getState().user);
  const [cartQuantity, setCartQuantity] = useState(computeCartQuantity(store.getState().cart));

  useEffect(() => {
    console.log("Initial cart:", store.getState().cart);
    let previouscartQuantity = computeCartQuantity(store.getState().cart);
    //subscribe to changes in the entire Redux stre.
    const unsubscribe = store.subscribe(() => {
      console.log("cart after dispatch: ", computeCartQuantity(store.getState().cart));
      const currentcartQuantity = computeCartQuantity(store.getState().cart);
      console.log("Current cart: ", store.getState().cart);
      // Check if user state has changed
      if (previouscartQuantity !== currentcartQuantity) {
        console.log("Current cart Quantity is: ", currentcartQuantity);
        setCartQuantity(currentcartQuantity); //Rerender whenever the cart logins or login out.
        previouscartQuantity = currentcartQuantity;
      }
    });
    // Cleanup the subscription when the component unmounts to prevent memory leaks.
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let previousUserState = store.getState().user;
    //subscribe to changes in the entire Redux stre.
    const unsubscribe = store.subscribe(() => {
      console.log("State after dispatch: ", store.getState().user);
      const currentUserState = store.getState().user;

      // Check if user state has changed
      if (previousUserState !== currentUserState) {
        setUser(currentUserState); //Rerender whenever the user logins or login out.
        previousUserState = currentUserState;
      }
    });
    // Cleanup the subscription when the component unmounts to prevent memory leaks.
    return () => {
      unsubscribe();
    };
  }, []);

  const handleAuthentication = () => {
    if (store.getState().user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <NavLink to="/">
        <img className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
      </NavLink>
      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="searchIcon" />
      </div>

      <div className="header_nav">
        {/* Direct to 'login' page only if no user is logged in. */}
        <NavLink to={!store.getState().user && "/login"}>
          <div onClick={handleAuthentication} className="header_opt">
            <div className="header_Line1">Hello Guest</div>
            <span className="header_Line2">{store.getState().user ? "Sign Out" : "Sign In"}</span>
          </div>
        </NavLink>
        <div className="header_opt">
          <span className="header_Line1">Returns </span>
          <span className="header_Line2">& Orders</span>
        </div>
        <div className="header_opt">
          <span className="header_Line1">Your</span>
          <span className="header_Line2">Prime</span>
        </div>
        <NavLink to="/checkout">
          <div className="header_Basket">
            <ShoppingCartIcon />
            <span className="header_Line2 header_cartCount">{cartQuantity}</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
