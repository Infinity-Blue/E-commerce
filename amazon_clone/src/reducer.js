import { PartyModeSharp } from "@mui/icons-material";
import { startAfter } from "firebase/firestore";
import redux, { createStore, applyMiddleware } from "redux";
export const initialState = {
  cart: [],
  user: null,
};

export function computeCartQuantity(cartItems) {
  return cartItems.reduce((sum, item) => {
    console.log("Current item quantity:", item.quantity);
    console.log("Running sum:", sum);
    return sum + Number(item.quantity || 0);
  }, 0);
}

export const getTotalPrice = (cart) => {
  console.log(typeof cart, "Array? ", Array.isArray(cart));
  return cart?.reduce((total, item) => total + item.price * item.quantity, 0);
  // return Array.from(cart).reduce((total, item) => total.concat(item), []);
  // return Array.from(cart).reduce((total, item) => total + item.price[0], 0);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (!Array.isArray(state.cart)) {
        console.error("Cart is not an array during add:", state.cart);
      }
      const itemIndex = state.cart.findIndex((item) => item.img === action.item.img);
      console.log("Found index:", itemIndex);
      let updatedCart;

      // Item exists in the cart. Update its quantity.
      if (itemIndex !== -1) {
        const updatedItem = {
          ...state.cart[itemIndex],
          quantity: Number(state.cart[itemIndex].quantity) + Number(action.item.quantity), //in case the user adds multiple same items to the cart.
        };
        updatedCart = [...state.cart];
        updatedCart[itemIndex] = updatedItem;
      }
      //Item does not exist in the cart, OR item lacks properties.
      else {
        if (!action.item.price || !action.item.quantity) {
          console.error("Item being added to cart lacks price or quantity:", action.item);
          return state; // Do not modify state if the item is lacking necessary attributes
        }
        // If item doesn't exist, just add it to the cart.
        updatedCart = [...state.cart, action.item];
      }

      /* '...'creates a shallow copy of the current state and include it in the new returned state. '...state' prevents other properties
       others than 'cart' from being overwritten when updating cart.
      */
      return {
        ...state, //prevents overwriting of other Parts when updating cart.
        cart: updatedCart, // overwrites the 'cart' property of the state with updated cart.
      };

    case "DELETE_FROM_CART":
      if (!Array.isArray(state.cart)) {
        console.error("Cart is not an array during delete:", state.cart);
      }
      return {
        ...state,
        cart: state.cart.filter((item) => item.img !== action.img),
      };

    case "CHANGE_QUANTITY":
      const index = state.cart.findIndex((item) => item.img === action.img);
      console.log("Found index:", index);
      let cartUpdated;
      console.log(action.quantityChange, action.img);
      const updatedItem = {
        ...state.cart[index],
        quantity: Number(action.quantityChange),
      };
      cartUpdated = [...state.cart];
      cartUpdated[index] = updatedItem;
      return {
        ...state,
        cart: cartUpdated,
      };

    case "RESET":
      return {
        ...initialState,
        cart: [],
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      // throw new Error(`Unknown action type: ${type}`);
      return state;
  }
};

export default reducer;
