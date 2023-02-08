import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllProducts } from '../api/products';
import Navbar from './Navbar';
import './Product.css';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const prefix = 'customer_products__';
  const history = useHistory();
  const dispatch = useDispatch();

  const enabled = () => {
    const filtredProducts = products.filter((product) => product.quantity > 0);
    return filtredProducts.length > 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getAllProducts();
      const data = productsData.data.map((product) => ({ ...product, quantity: 0 }));
      setProducts(data);
    };

    fetchData();
  }, []);

  const calcPrice = () => {
    const price = products.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    dispatch({ type: 'TOTALPRICE', totalPrice: price });
    setTotal(price.toFixed(2));
  };

  const handleQuantity = ({ target }, operator) => {
    const parentId = target.parentNode.id.replace('card-', '');

    if (operator === 'add') {
      const newProduct = products.map((product) => {
        if (product.id === Number(parentId)) {
          product.quantity += 1;
        }
        return product;
      });
      setProducts(newProduct);
    }

    if (operator === 'dec') {
      const newProduct = products.map((product) => {
        if (product.id === Number(parentId)) {
          product.quantity = product.quantity > 0 ? product.quantity - 1 : 0;
        }
        return product;
      });
      setProducts(newProduct);
    }
    calcPrice();
  };

  const handleChangeQuantityInput = ({ target }) => {
    const parentId = target.parentNode.id.replace('card-', '');

    const newProduct = products.map((product) => {
      if (product.id === Number(parentId)) {
        product.quantity = target.value;
      }
      return product;
    });
    setProducts(newProduct);
    calcPrice();
  };

  const handleCart = () => {
    const filtredProducts = products.filter((product) => product.quantity > 0);
    dispatch({ type: 'ADDTOCART', newItem: filtredProducts });
    localStorage.setItem('cart', JSON.stringify(filtredProducts));
    history.push('/customer/checkout');
  };

  const generateCard = (data) => (
    <div className="element-card" key={ `card-item-${data.id}` } id={ `card-${data.id}` }>
      <img
        src={ data.urlImage }
        alt={ data.name }
        data-testid={ `${prefix}img-card-bg-image-${data.id}` }
      />
      <p data-testid={ `${prefix}element-card-title-${data.id}` }>{data.name}</p>
      <p
        data-testid={ `${prefix}element-card-price-${data.id}` }
      >
        {data.price.replace('.', ',')}
      </p>
      <button
        type="button"
        data-testid={ `${prefix}button-card-rm-item-${data.id}` }
        onClick={ (event) => handleQuantity(event, 'dec') }
      >
        -
      </button>
      <input
        type="number"
        data-testid={ `${prefix}input-card-quantity-${data.id}` }
        value={ data.quantity }
        onChange={ handleChangeQuantityInput }
      />
      <button
        type="button"
        data-testid={ `${prefix}button-card-add-item-${data.id}` }
        onClick={ (event) => handleQuantity(event, 'add') }
      >
        +
      </button>
    </div>
  );

  return (
    <div className="Product">
      <Navbar />
      <button
        className="carrinho"
        type="button"
        data-testid={ `${prefix}button-cart` }
        onClick={ handleCart }
        disabled={ !enabled() }
      >
        Ver carrinho:
        {' '}
        <p
          className="cart"
          data-testid="customer_products__checkout-bottom-value"
        >
          R$
          {String(total).replace('.', ',')}
        </p>
      </button>
      <div className="products-container">
        {
          products.length > 0 && products.map((item) => generateCard(item))
        }
      </div>
    </div>
  );
}
