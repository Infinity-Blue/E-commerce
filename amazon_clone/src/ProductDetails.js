import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { productDetail, productList } from "./HomeData";
import store from "./store";
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

function ProductDetails() {
  //the state signaling once product detail fetched from Firestore database is ready.
  const [itemDetails, setitemDetails] = useState(null);
  const params = useParams();
  console.log(params.title, params.id, params.index);
  // const product = productDetail(params.title, params.id, params.index);
  // let products = Promise.resolve(product);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const selectedQuantity = e.target.value;
    setQuantity(selectedQuantity);
    console.log(`Selected quantity: ${selectedQuantity}`);
  };

  useEffect(() => {
    productDetail(params.title, params.id, params.index)
      .then((result) => {
        console.log(result);
        setitemDetails(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addToCart = (itemDetails) => {
    // dispatch the item into the data layer. Call Reducer function.
    console.log("[productDetails] quantity:", quantity);
    //dispatch updates state by calling reducer and re-renders the function.
    store.dispatch({
      type: "ADD_TO_CART",
      item: {
        img: itemDetails.detail.img,
        price: itemDetails.detail.price,
        title: itemDetails.detail.name,
        quantity: quantity,
      },
    });
    // store.dispatch({
    // 	type: 'RESET'
    // });
    // persistor.purge()
  };

  const productDetailView = () => (
    <div className="container">
      <div className="productImage">
        <img src={itemDetails.detail.img} alt="" className="img" />
      </div>
      <div className="detail-container">
        <span className="title">
          {itemDetails.detail.name < 80
            ? `${itemDetails.detail.name}`
            : `${itemDetails.detail.name.substring(0, 40)}....`}
        </span>
        <span className="price">${itemDetails.detail.price}</span>
      </div>
      <div className="cart-container">
        <button className="addToCart_button" onClick={() => addToCart(itemDetails)}>
          Add to Cart
        </button>
        <div className="option-container">
          <div className="productOptions">
            <select className="quantity_dropdown" value={quantity} onChange={handleQuantityChange}>
              {[...Array(10)].map((_, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return <div>{itemDetails && productDetailView()}</div>;
}
export default ProductDetails;
