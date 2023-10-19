import React, { useState, useEffect } from "react";
import "./CheckoutProduct.css";
import store from "./store";
import { ConstructionOutlined } from "@mui/icons-material";
import { getDocs, getDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

function CheckoutProduct({ title, img, price, id, itemQuantity }) {
  const [quantity, setQuantity] = useState(1);
  const user = store.getState().user;
  const cart = store.getState().cart;

  const handleQuantityChange = (e) => {
    const selectedQuantity = e.target.value;
    setQuantity(selectedQuantity);
    console.log(`Selected quantity: ${selectedQuantity}`);
    // Handle further actions such as updating the cart total, etc.
    const itemIndex = store.getState().cart.findIndex((item) => item.img == img);
    console.log(store.getState().cart[itemIndex].quantity);

    if (quantity != selectedQuantity) {
      quantityChange(selectedQuantity);
    }
  };

  useEffect(() => {
    setQuantity(itemQuantity);
  }, [itemQuantity]);

  /**
   * Update the quantity of Firestore database and Redux store
   * @param {*} newQuantity   New quantity to be updated
   */
  const quantityChange = async (newQuantity) => {
    console.log(img);
    const itemDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(itemDocRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const currentCart = userData.cart || [];
      const index = currentCart.findIndex((item) => item.detail.img === img);

      const updatedItem = {
        ...currentCart[index],
        quantity: Number(newQuantity),
      };
      let cartUpdated = [...currentCart];
      cartUpdated[index] = updatedItem;
      // Updating the cart in Firestore
      await updateDoc(itemDocRef, { cart: cartUpdated });
    }

    store.dispatch({
      type: "CHANGE_QUANTITY",
      img: img,
      quantityChange: newQuantity,
    });
    //Refresh the entire page to update the page once the cart item is deleted.
    window.location.reload();
  };

  const removeFromBasket = () => {
    console.log("removeFromBasket");
    store.dispatch({
      type: "DELETE_FROM_CART",
      img: img,
    });
  };

  const updateFirestore = async () => {
    console.log("updateFirestore");
    // Update Firestore to match the current state of the cart
    const itemDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(itemDocRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const currentCart = userData.cart || [];
      console.log("currentCart is: ", currentCart);

      // Modifying the cart array
      const updatedCart = currentCart.filter((item) => item.detail.img !== img);
      console.log("updateCart is: ", updatedCart);

      // Updating the cart in Firestore
      await updateDoc(itemDocRef, { cart: updatedCart });
      console.log("Document successfully deleted!");
    } else {
      console.log("No such document!");
    }
  };

  const handleRemove = () => {
    updateFirestore();
    removeFromBasket();
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct_image" src={img} />
      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">$ {price}</p>

        <div className="productOptions">
          <select className="quantity_dropdown" value={quantity} onChange={handleQuantityChange}>
            {[...Array(10)].map((_, idx) => (
              <option key={idx + 1} value={idx + 1}>
                {idx + 1}
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => handleRemove()}>Remove</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
