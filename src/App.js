import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MicroFrontend from './MicroFrontend';

import './App.css';

const {
  REACT_APP_STORE_HOST: storeHost,
  REACT_APP_SHOPPING_CART_HOST: shoppingCartHost,
} = process.env;

function Header() {
  return (
    <div className="banner">
      <h1 className="banner-title">New Store</h1>
    </div>
  );
}

function Store({ history, ...rest }) {
  return (
    <MicroFrontend {...rest} history={history} host={storeHost} name="Store" />
  );
}

function ProductDescription({ history, ...rest }) {
  return (
    <div>
      <Header />
      <div className="home">
        <div className="content">
          <div className="store-container product-detail">
            <MicroFrontend
              {...rest}
              history={history}
              host={storeHost}
              name="Store"
            />
          </div>
          <div className="shopping-cart-container">
            <ShoppingCart />
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingCart({ history, ...rest }) {
  return (
    <MicroFrontend
      {...rest}
      history={history}
      host={shoppingCartHost}
      name="ShoppingCart"
    />
  );
}

function useGlobalState() {
  const [newItem, setNewItem] = useState({});

  return [newItem, setNewItem];
}

function Home({ history }) {
  const [newItem, setNewItem] = useGlobalState();
  function handleAddItem(item) {
    setNewItem(item);
  }
  return (
    <div>
      <Header />
      <div className="home">
        <div className="content">
          <div className="store-container">
            <Store addItem={handleAddItem} />
          </div>
          <div className="shopping-cart-container">
            <ShoppingCart newItem={newItem} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:name" component={ProductDescription} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
