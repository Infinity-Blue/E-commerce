import React, { useState, useEffect } from "react";
import "./CheckoutProduct.css";
import store from "./store";
import { ConstructionOutlined } from "@mui/icons-material";

function CheckoutProduct({ title, img, price, id, itemQuantity }) {
  const [quantity, setQuantity] = useState(1);
  // const [cartQuantity, setCartQuantity] = useState();
  //   const itemInCart = store.getState().cart.find((item) => item.img == img);
  //   console.log("[Checkoutproduct] itemInCart: ", itemInCart);
  const handleQuantityChange = (e) => {
    const selectedQuantity = e.target.value;
    setQuantity(selectedQuantity);
    console.log(`Selected quantity: ${selectedQuantity}`);
    // Handle further actions such as updating the cart total, etc.
    const itemIndex = store.getState().cart.findIndex((item) => item.img == img);
    console.log(store.getState().cart[itemIndex].quantity);
    if (quantity != selectedQuantity) quantityChange(selectedQuantity);
  };

  useEffect(() => {
    setQuantity(itemQuantity);
  }, [itemQuantity]);

  const quantityChange = (newQuantity) => {
    console.log(img);
    store.dispatch({
      type: "CHANGE_QUANTITY",
      img: img,
      quantityChange: newQuantity,
    });
    //Refresh the entire page to update the page once the cart item is deleted.
    // window.location.reload();
  };

  const removeFromBasket = () => {
    store.dispatch({
      type: "DELETE_FROM_CART",
      img: img,
    });
    //Refresh the entire page to update the page once the cart item is deleted.
    window.location.reload();
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
        <button onClick={() => removeFromBasket()}>Remove</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
