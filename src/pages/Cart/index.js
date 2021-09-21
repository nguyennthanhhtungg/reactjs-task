import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ProductListInCart from '../../components/ProductListInCart';
import Location from '../../components/Location';
import Voucher from '../../components/Voucher';
import OrderSummary from '../../components/OrderSummary';
import PaymentMethod from '../../components/PaymentMethod';

import * as mySwal from '../../utils/mySwal';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import AppContext from '../../contexts/appContext';
import reducer from '../Cart/cartReducer';
import CartContext from './cartContext';
import { axiosInstance } from '../../utils/database';
import { calculateSubTotal } from '../../utils/currency';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 30,
    paddingBottom: 30
  },
  gridLeft: {},
  gridRight: {},
  confirmCartBtn: {
    backgroundColor: 'orange',
    color: 'white',
    fontSize: 'larger',
    '&:hover': {
      backgroundColor: 'orange'
    }
  },
  noProductsInCart: {
    backgroundColor: 'white',
    padding: 10
  },
  shoppingNowBtn: {
    backgroundColor: 'orange',
    color: 'white',
    margin: 10,
    '&:hover': {
      backgroundColor: 'orange'
    }
  }
}));

const initialCartState = {};

export default function Cart() {
  const classes = useStyles();
  const history = useHistory();
  const [isProductExisted, setIsProductExisted] = useState(false);
  const [store, dispatch] = useReducer(reducer, initialCartState);

  useEffect(() => {
    const productListInCart = JSON.parse(
      sessionStorage.getItem('ProductListInCart')
    );

    if (productListInCart !== null && productListInCart.length !== 0) {
      setIsProductExisted(true);
    }
  }, []);

  const handleConfirmCart = () => {
    history.push('/cart/confirmCart');
  };

  const handleShoppingNow = () => {
    history.push('/');
  };

  return (
    <>
      <Helmet>
        <title>Cart | React App</title>
      </Helmet>
      <CartContext.Provider value={{ store, dispatch }}>
        <Container maxWidth="lg" className={classes.root}>
          {isProductExisted === true ? (
            <Grid container spacing={2}>
              <Grid item xs={9} className={classes.gridLeft}>
                <ProductListInCart />
                <PaymentMethod />
                <Button
                  className={classes.confirmCartBtn}
                  style={{ width: '50%' }}
                  onClick={handleConfirmCart}
                >
                  CONFIRM CART
                </Button>
              </Grid>
              <Grid item xs={3} className={classes.gridRight}>
                <Location />
                <Voucher />
                <OrderSummary />
                <Button
                  className={classes.confirmCartBtn}
                  style={{ width: '100%' }}
                  onClick={handleConfirmCart}
                >
                  CONFIRM CART
                </Button>
              </Grid>
            </Grid>
          ) : (
            <div className={classes.noProductsInCart}>
              <Typography variant="h5">Your Cart</Typography>
              <div style={{ textAlign: 'center' }}>
                <img src="https://salt.tikicdn.com/desktop/img/mascot@2x.png" />
                <div>No Products in your cart!</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Button
                  className={classes.shoppingNowBtn}
                  onClick={handleShoppingNow}
                >
                  Shopping Now
                </Button>
              </div>
            </div>
          )}
        </Container>
      </CartContext.Provider>
    </>
  );
}
