const saveCartItems = (idItem) => {
  localStorage.setItem('cartItems', idItem);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
} 