import React from 'react';
import { Link } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import PropTypes from 'prop-types';
import EmptyCart from './EmptyCart';

class Cart extends React.Component {
  render() {
    const { listCart, sumAndSubProducts } = this.props;
    return (
      <div>
        <Link to="/" className="btnReturn cartHeader">
          <TiArrowBackOutline />
        </Link>
        <p className="tituloDaPagina">Carrinho de Compras</p>
        <div className="cartMain">
          { !listCart.length
            ? (
              <div>
                <EmptyCart />
                <p data-testid="shopping-cart-empty-message">
                  Seu carrinho está vazio
                </p>
              </div>
            ) : (
              <div className="cartMain">
                {listCart.map((list) => (
                  <div key={ `${list.id}` } className="cartMainMap">
                    <img src={ list.thumbnail } alt={ list.title } />
                    <p data-testid="shopping-cart-product-name">{list.title}</p>
                    <div className="sumAndMin">
                      <button
                        type="button"
                        data-testid="product-decrease-quantity"
                        name={ list.id }
                        value="-"
                        onClick={ sumAndSubProducts }
                      >
                        -
                      </button>
                      <p data-testid="shopping-cart-product-quantity">
                        { list.quantity }
                      </p>
                      <button
                        type="button"
                        data-testid="product-increase-quantity"
                        name={ list.id }
                        value="+"
                        onClick={ sumAndSubProducts }
                      >
                        +
                      </button>
                    </div>
                    <p>{ `R$ ${list.price}`}</p>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Cart;

Cart.propTypes = {
  listCart: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  sumAndSubProducts: PropTypes.func.isRequired,
};
