import './App.css';
import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Verification from './pages/Verification';
import Product from './pages/Product';
import ScrollToTop from './ScrollToTop';
import Promotion from './pages/Promotion';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Layout from './components/Layout';
import reducer from './reducers/appReducer';
import Context from './contexts/appContext';

const initialState = {
  customer: {},
  numberProductsInCart: 0,
  productListInCart: []
};

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let productListInCart = JSON.parse(sessionStorage.getItem('ProductListInCart'));
    let numberProductsInCart = 0;

    if (productListInCart !== null) {
      productListInCart.forEach((product) => {
        numberProductsInCart += parseInt(product.numberInCart);
      });
    } else {
      productListInCart = [];
    }

    dispatch({
      type: 'init',
      payload: {
        numberProductsInCart: numberProductsInCart,
        productListInCart: productListInCart
      }
    });

    const isRememberMe = localStorage.getItem('isRememberMe');
    let customer = {};
    if (isRememberMe === 'true') {
      customer = JSON.parse(localStorage.getItem('customer'));
    } else if (isRememberMe === null || isRememberMe === 'false') {
      customer = JSON.parse(sessionStorage.getItem('customer'));
    }
    if (customer !== null) {
      dispatch({
        type: 'updateCustomer',
        payload: {
          customer: customer
        }
      });
    }
  }, []);

  return (
    <Router>
      <ScrollToTop>
        <Context.Provider value={{ store, dispatch }}>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/register">
                <SignUp />
              </Route>
              <Route exact path="/login">
                <LogIn />
              </Route>
              <Route exact path="/verification">
                <Verification />
              </Route>
              <Route exact path="/product/:id">
                <Product />
              </Route>
              <Route exact path="/promotion">
                <Promotion />
              </Route>
              <Route exact path="/products">
                <Products />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
            </Switch>
          </Layout>
        </Context.Provider>
      </ScrollToTop>
    </Router>
  );
}

export default App;
