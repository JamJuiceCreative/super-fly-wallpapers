import { createContext, useReducer } from 'react';
export const CART_UPDATE_ITEM_QUANTITY = 'CART_UPDATE_ITEM_QUANTITY';
export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    quoteItems: localStorage.getItem('quoteItems')
      ? JSON.parse(localStorage.getItem('quoteItems'))
      : [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_UPDATE_ITEM_QUANTITY': {
      const { itemId, quantity } = action.payload;
      const cartItems = state.cart.cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_UPDATE_ITEMS':
      return { ...state, cart: { ...state.cart, cartItems: action.payload } };
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case 'QUOTE_ADD_ITEM':
      // add to quoteItems
      const newQuoteItem = action.payload;
      const existQuoteItem = state.cart.quoteItems.find(
        (item) => item._id === newQuoteItem._id
      );
      const quoteItems = existQuoteItem
        ? state.cart.quoteItems.map((item) =>
            item._id === existQuoteItem._id ? newQuoteItem : item
          )
        : [...state.cart.quoteItems, newQuoteItem];
      localStorage.setItem('quoteItems', JSON.stringify(quoteItems));
      return { ...state, cart: { ...state.cart, quoteItems } };




      case 'CART_ADD_QUOTE':
  // add a quote to cart's quoteItems
  console.log('CART_ADD_QUOTE action triggered');
  console.log('Payload:', action.payload);
  const newQuote = action.payload;
  const existQuote = state.cart.cartItems.find((quote) => quote._id === newQuote._id);
  const updatedCartItems = existQuote
    ? state.cart.cartItems.map((quote) => (quote._id === existQuote._id ? newQuote : quote))
    : [...state.cart.cartItems, newQuote];
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };




    case 'QUOTE_REMOVE_ITEM': {
      const quoteItems = state.cart.quoteItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('quoteItems', JSON.stringify(quoteItems));
      return { ...state, cart: { ...state.cart, quoteItems } };
    }
    case 'QUOTE_CLEAR':
      return { ...state, cart: { ...state.cart, quoteItems: [] } };

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          quoteItems: [], // Add this to clear quoteItems on signout
          shippingAddress: {},
          paymentMethod: '',
        },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
