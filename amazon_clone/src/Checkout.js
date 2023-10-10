import React, { useEffect, useState } from "react";
import "./Checkout.css";
import CurrencyFormat from "react-currency-format";
import store from "./store";
import { getTotalPrice, computeCartQuantity } from "./reducer";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  // const addToCart = () => {
  // 	store.dispatch({
  // 		type: 'RESET'
  // 	});
  // };
  // addToCart()
  const [currentPrice, setPrice] = useState(getTotalPrice(store.getState().cart));

  useEffect(() => {
    console.log("current price:", getTotalPrice(store.getState().cart));
    let currentPrice = getTotalPrice(store.getState().cart);
    //subscribe to changes in the entire Redux stre.
    const unsubscribe = store.subscribe(() => {
      console.log("price: ", getTotalPrice(store.getState().cart));
      const changedPrice = getTotalPrice(store.getState().cart);
      // Check if user state has changed
      if (currentPrice !== changedPrice) {
        console.log("change price: ", changedPrice);
        setPrice(changedPrice); //Rerender whenever the cart logins or login out.
        currentPrice = changedPrice;
      }
    });
    // Cleanup the subscription when the component unmounts to prevent memory leaks.
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="checkout">
        <div className="checkout_left">
          <div>
            <h2 className="checkout_title">Your shopping Basket</h2>
            {/* {CheckoutProduct} */}
            {store.getState().cart.map((item) => (
              <CheckoutProduct
                key={item.img} //unique identifier for each item
                title={item.title}
                img={item.img}
                price={item.price}
                itemQuantity={item.quantity}
              />
            ))}
          </div>
        </div>
        <div className="checkout_right">
          <Subtotal />
        </div>
      </div>
    </div>
  );

  function Subtotal() {
    return (
      <div className="subtotal">
        <CurrencyFormat
          renderText={(val) => (
            <>
              <p>
                Subtotal ({computeCartQuantity(store.getState().cart)} items):<strong>{val}</strong>
              </p>
              <small className="subtotal_gift">
                <input type="checkbox" />
                This order is for a gift
              </small>
            </>
          )}
          decimalScale={2}
          value={currentPrice}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
        <button className="checkout_button">Proceed to checkout</button>
      </div>
    );
  }
}

export default Checkout;
