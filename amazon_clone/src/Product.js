import React, { useState } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { useCallback } from "react";
import { createContext, useContext, useReducer } from "react";
import { NavLink } from "react-router-dom";
import reducer, { initialState } from "./reducer";
import redux, { createStore } from "redux";
import store from "./store";

function Product({ title, img }) {
  const [itemClicked, setClick] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);
  //Make title appears only when Loaded is True.
  const [loaded, setLoaded] = useState(false);
  console.log("Title: ", title, "Image: ", img);
  const category = title[0] === "Computer mice" ? "Electronics" : "Cosmetics";

  const product_states = {
    state,
    dispatch,
  };

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const addToCart = () => {
    // dispatch the item into the data layer. Call Reducer function.
    console.log(store.getState());
    //dispatch updates state by calling reducer and re-renders the function.
    store.dispatch({
      type: "ADD_TO_CART",
      item: {
        title: title,
        img: img,
      },
    });
    console.log(store.getState());
  };

  const homeItem = (singleTitle, index) => {
    // console.log(index + singleTitle);
    return (
      <div className="img_container">
        <NavLink
          key={index}
          className={"navLink"}
          to={`/productList/${category}/${singleTitle}`}
          state={{
            title: singleTitle,
          }}
        >
          <div className="img_container">
            <img src={img[index]} alt="" onLoad={handleImageLoad} />
            {loaded && <span className="subtitle">{singleTitle}</span>}
          </div>
        </NavLink>
      </div>
    );
  };

  return (
    <div className="homeProduct">
      {loaded && <span className="homeProduct_title">{category}</span>}
      {/* First row */}
      <div className="homeProduct_items">
        {/* <div className="img_container"> */}
        {/* Pass the title representing what the list of items are about to 'productList' component
					 so that the component knows what data should be fetched from database. */}
        {title.slice(0, 2).map((singleTitle, index) => homeItem(singleTitle, index))}
      </div>
      {/* Second row */}
      <div className="homeProduct_items">
        {title.slice(2, 4).map((singleTitle, index) => homeItem(singleTitle, index + 2))}
      </div>
      {/* <button onClick={addToCart}>Add to Cart</button> */}
    </div>
  );
}

function Product2({ title, img }) {
  return (
    <div className="homeProduct">
      <div className="img">
        <span className="homeProduct_title">{title}</span>
        <img src={img} alt="" />
      </div>
      {/* <button onclick={addToCart}>Add to Cart</button> */}
    </div>
  );
}

export { Product, Product2 };
