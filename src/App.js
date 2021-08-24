import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Verification from './pages/Verification';
import Product from './pages/Product';

function App() {
  return (
    <Router>
      <div>
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
