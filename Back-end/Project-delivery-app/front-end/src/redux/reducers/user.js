import { EMAIL, TOTALPRICE, CART, ADDTOCART, NAME } from '../actions';

const cart = JSON.parse(localStorage.getItem('cart'));
const userData = () => {
  try {
    const { name, email } = JSON.parse(localStorage.getItem('user'));
    return { name, email };
  } catch (e) {
    return { name: '', email: '' };
  }
};

const INITIAL_STATE = { email: userData().email,
  username: userData().name,
  cart,
  totalPrice: 0 };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL:
    return {
      ...state,
      email: action.email,
    };
  case TOTALPRICE:
    return {
      ...state, totalPrice: action.totalPrice,
    };
  case CART:
    return {
      ...state, cart: action.cart,
    };
  case ADDTOCART:
    return {
      ...state, cart: cart === null ? action.newItem : [...cart, ...action.newItem],
    };
  case NAME:
    return {
      ...state, username: action.name,
    };
  default:
    return state;
  }
};

export default user;
