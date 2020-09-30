import React, { useRef } from 'react';
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

const Store = React.forwardRef(({ history, ...rest }, ref) => {
  return (
    <MicroFrontend
      {...rest}
      history={history}
      host={storeHost}
      name="Store"
      ref={ref}
    />
  );
});

const ShoppingCart = React.forwardRef(({ history, ...rest }, ref) => {
  return (
    <MicroFrontend
      {...rest}
      history={history}
      host={shoppingCartHost}
      name="ShoppingCart"
      ref={ref}
    />
  );
});

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

function Home({ history }) {
  const storeRef = useRef(null);
  const shoppingCartRef = useRef(null);

  return (
    <div>
      <Header />
      <div className="home">
        <div className="content">
          <div className="store-container">
            <Store ref={storeRef} shoppingCartRef={shoppingCartRef} />
          </div>
          <div className="shopping-cart-container">
            <ShoppingCart ref={shoppingCartRef} storeRef={storeRef} />
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
