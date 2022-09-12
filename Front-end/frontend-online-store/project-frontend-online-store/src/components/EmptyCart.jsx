import React from 'react';
import { Link } from 'react-router-dom';

class EmptyCart extends React.Component {
  render() {
    return (
      <Link to="/cart" data-testid="shopping-cart-button" />
    );
  }
}

export default EmptyCart;
