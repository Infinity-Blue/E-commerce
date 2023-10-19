import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { productDetail, productList } from "./HomeData";
import store from "./store";
import { db } from "./firebase";
import { getDocs, getDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { OtherHouses } from "@mui/icons-material";

function ProductDetails() {
  //the state signaling once product detail fetched from Firestore database is ready.
  const [itemDetails, setitemDetails] = useState(null);
  const params = useParams();
  console.log(params.title, params.id, params.index);
  // const product = productDetail(params.title, params.id, params.index);
  // let products = Promise.resolve(product);
  const [quantity, setQuantity] = useState(1);
  const user = store.getState().user;
  const cart = store.getState().cart;
  console.log(cart);

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
        <button
          className="addToCart_button"
          onClick={() => {
            addToCart();
            updateCart();
          }}
        >
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

  /**
   * Update Firestore database.
   */
  async function addToCart() {
    const userDocRef = doc(db, "users", user.uid);
    const userData = (await getDoc(userDocRef)).data();

    const itemIndex = userData.cart.findIndex(
      (cartItem) => cartItem.detail.img === itemDetails.detail.img
    );

    if (itemIndex !== -1) {
      // Item is already in cart, update the quantity
      const newQuantity = Number(userData.cart[itemIndex].quantity) + Number(quantity);
      userData.cart[itemIndex].quantity = newQuantity;
    } else {
      // Item is not in the cart, add it with the specified quantity and details
      const newItem = {
        quantity: quantity,
        detail: itemDetails.detail,
      };
      userData.cart.push(newItem);
    }

    // Update Firestore
    await updateDoc(userDocRef, {
      cart: userData.cart,
    });
  }

  /**
   * Update Redux store so that it syncs with Firestore database once the user add item to the cart.
   */
  function updateCart() {
    console.log("updatecart");
    store.dispatch({
      type: "ADD_TO_CART",
      item: {
        img: itemDetails.detail.img,
        price: itemDetails.detail.price,
        title: itemDetails.detail.name,
        quantity: quantity,
      },
    });
  }
}

export default ProductDetails;
