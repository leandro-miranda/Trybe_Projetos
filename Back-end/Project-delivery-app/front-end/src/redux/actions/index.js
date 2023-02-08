export const EMAIL = 'EMAIL';
export const TOTALPRICE = 'TOTALPRICE';
export const CART = 'CART';
export const ADDTOCART = 'ADDTOCART';
export const NAME = 'NAME';

const emailAction = (payload) => ({
  type: EMAIL,
  email: payload,
});

const nameAction = (payload) => ({
  type: NAME,
  name: payload,
});

const totalPriceAction = (payload) => ({
  type: TOTALPRICE,
  totalPrice: payload,
});

const filteredAction = (payload) => ({
  type: CART,
  cart: payload,
});

const addToCartAction = (payload) => ({
  type: ADDTOCART,
  newItem: payload,
});

export { emailAction, totalPriceAction, filteredAction, addToCartAction, nameAction };
