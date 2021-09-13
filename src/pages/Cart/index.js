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
import Transition from 'react-transition-group/Transition';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

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

const initialCartState = {
  subTotal: 0
};

export default function Cart() {
  const classes = useStyles();
  const history = useHistory();
  const [isProductExisted, setIsProductExisted] = useState(false);
  const [store, dispatch] = useReducer(reducer, initialCartState);
  const appContext = useContext(AppContext);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: '',
    message: ''
  });

  useEffect(() => {
    const productListInCart = JSON.parse(
      sessionStorage.getItem('ProductListInCart')
    );

    if (productListInCart !== null && productListInCart.length !== 0) {
      setIsProductExisted(true);
    }
  }, []);

  useEffect(() => {
    let subTotal = 0;

    appContext.store.productListInCart.forEach((product) => {
      subTotal +=
        parseFloat(product.price) *
        ((100 - product.discount) / 100) *
        parseInt(product.numberInCart);
    });

    dispatch({
      type: 'updateSubTotal',
      payload: {
        subTotal: subTotal
      }
    });
  }, [appContext.store.numberProductsInCart]);

  const handlePlaceOrder = async () => {
    try {
      if (appContext.store.customer.customerId === undefined) {
        history.push('login');
      }

      const data = {
        orderNo: 'ABC123',
        customerId: appContext.store.customer.customerId,
        totalProductMoney: store.subTotal,
        totalProduct: appContext.store.numberProductsInCart,
        status: 'New',
        orderDetails: appContext.store.productListInCart.map((product) => {
          return {
            productId: product.productId,
            number: product.numberInCart
          };
        })
      };

      await axiosInstance.post(`/Orders`, data);

      appContext.dispatch({
        type: 'updateProductListInCart',
        payload: {
          productListInCart: []
        }
      });

      appContext.dispatch({
        type: 'updateNumberProductsInCart',
        payload: {
          numberProductsInCart: 0
        }
      });

      mySwal.PlaceOrder();
      await new Promise((resolve) => setTimeout(resolve, 3000));

      sessionStorage.removeItem('ProductListInCart');
      history.push('/');
    } catch (err) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: err.response.data.Message
      });
    }
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
                  onClick={handlePlaceOrder}
                >
                  PLACE ORDER
                </Button>
              </Grid>
              <Grid item xs={3} className={classes.gridRight}>
                <Location />
                <Voucher />
                <OrderSummary />
                <Button
                  className={classes.confirmCartBtn}
                  style={{ width: '100%' }}
                  onClick={handlePlaceOrder}
                >
                  PLACE ORDER
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
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbar.open}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert variant="filled" severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
