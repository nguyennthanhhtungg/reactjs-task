import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Verification from './pages/Verification';
import Product from './pages/Product';
import ScrollToTop from './ScrollToTop';
import Promotion from './pages/Promotion';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <ScrollToTop>
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
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
