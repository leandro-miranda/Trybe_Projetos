import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import './pages/table.css';
import {
  Home,
  Product,
  Register,
} from './components';
import {
  Orders,
  OrderDetails,
  Login,
  Admin,
  Checkout,
} from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/customer/products" component={ Product } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/admin/manage" component={ Admin } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders" component={ Orders } />
      <Route exact path="/seller/orders" component={ Orders } />
      <Route exact path="/customer/orders/:id" component={ OrderDetails } />
      <Route exact path="/seller/orders/:id" component={ OrderDetails } />
    </Switch>
  );
}

export default App;
