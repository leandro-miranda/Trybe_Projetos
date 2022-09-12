import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import EmptyCart from './components/EmptyCart';
import CardDetails from './components/CardDetails';

class App extends React.Component {
  state = {
    listCart: [],
  }

  addToCart = ({ id, title, thumbnail, price }) => {
    const list = {
      id,
      title,
      thumbnail,
      price,
      quantity: 1,
    };
    this.setState((prevState) => ({ listCart: [...prevState.listCart, list] }));
  }

  sumAndSubProducts = ({ target }) => {
    const { listCart } = this.state;
    const { name, value } = target;
    const findProduct = listCart.find(({ id }) => id === name);
    if (value === '+') {
      findProduct.quantity += 1;
    } else if (findProduct.quantity > 1) {
      findProduct.quantity -= 1;
    }
    this.setState((prevState) => ({ listCart: [...prevState.listCart] }));
  }

  render() {
    const { listCart } = this.state;
    return (
      <section>
        <BrowserRouter>
          <EmptyCart />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Home
                { ...props }
                addToCart={ this.addToCart }
              />
            ) }
          />
          <Route
            path="/cart"
            render={ (props) => (
              <Cart
                { ...props }
                listCart={ listCart }
                sumAndSubProducts={ this.sumAndSubProducts }
              />
            ) }
          />
          <Route
            path="/card/:id"
            render={ (props) => (
              <CardDetails
                { ...props }
                addToCart={ this.addToCart }
              />
            ) }
          />
        </BrowserRouter>
      </section>

    );
  }
}

export default App;
