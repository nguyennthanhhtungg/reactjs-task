import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import AppContext from '../../../contexts/appContext';
import { axiosInstance } from '../../../utils/database';
import * as mySwal from '../../../utils/mySwal';
import { calculateSubTotal, numberWithCommas } from '../../../utils/currency';
import PaymentMethod from '../../../components/PaymentMethod';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProductInOrder from '../../../components/ProductInOrder';

const useStyles = makeStyles({
  root: {
    padding: 25
  },
  DIV: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 15,
    marginBottom: 15
  },
  input: {
    width: '55%',
    padding: 10,
    borderStyle: 'solid',
    borderColor: 'orange',
    borderWidth: 1,
    '&:focus': {
      outline: 'none'
    }
  },
  drawerDIV: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 15,
    paddingBottom: 15,
    borderStyle: 'solid',
    borderWidth: '1px 0px 0px 0px',
    borderColor: 'orange'
  },
  proceedToPayment: {
    backgroundColor: 'orange',
    color: 'white',
    fontWeight: 'bolder',
    padding: 10,
    '&:hover': {
      backgroundColor: 'orange',
      color: 'white'
    }
  }
});

export default function ConfirmCart() {
  const classes = useStyles();
  const history = useHistory();
  const appContext = useContext(AppContext);
  const [recipientFullName, setRecipientFullName] = useState(
    appContext.store.customer.customerName
  );
  const [address, setAddress] = useState(appContext.store.customer.address);
  const [phoneNumber, setPhoneNumber] = useState(
    appContext.store.customer.phoneNumber
  );

  const handleRecipientFullNameChange = (e) => {
    setRecipientFullName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOptionChange = (e) => {
    appContext.dispatch({
      type: 'updateDeliveryAddressOption',
      payload: {
        deliveryAddressOption: e.target.value
      }
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const data = {
        orderNo: 'ABC123',
        customerId: appContext.store.customer.customerId,
        totalProductMoney: calculateSubTotal(appContext.store.productListInCart),
        totalProduct: appContext.store.numberProductsInCart,
        status: 'New',
        address:
          appContext.store.deliveryAddressOption === 'address'
            ? appContext.store.customer.address
            : address,
        phoneNumber:
          appContext.store.deliveryAddressOption === 'address'
            ? appContext.store.customer.phoneNumber
            : phoneNumber,
        customerName:
          appContext.store.deliveryAddressOption === 'address'
            ? appContext.store.customer.customerName
            : recipientFullName,
        paymentMethod: appContext.store.paymentMethod,
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
      appContext.dispatch({
        type: 'updateSnackbar',
        payload: {
          snackbar: {
            open: true,
            severity: 'error',
            message: 'Please check your delivery address again!'
          }
        }
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Confirm Cart | React App</title>
      </Helmet>
      <Container maxWidth="lg" className={classes.root}>
        <div className={classes.DIV}>
          <Typography variant="h6" style={{ fontWeight: 'bolder' }}>
            Delivery Address
          </Typography>
          <Divider />
          {address !== '' && (
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="deliveryAddress"
                value={appContext.store.deliveryAddressOption}
                onChange={handleOptionChange}
              >
                <FormControlLabel
                  value="address"
                  control={<Radio style={{ color: 'orange' }} />}
                  label={`${appContext.store.customer.customerName} | ${appContext.store.customer.address} | ${appContext.store.customer.phoneNumber}`}
                />
                <FormControlLabel
                  value="otherAddress"
                  control={<Radio style={{ color: 'orange' }} />}
                  label="Delivery to other address"
                />
              </RadioGroup>
            </FormControl>
          )}
          {(appContext.store.deliveryAddressOption === 'otherAddress' ||
            address === '') && (
            <Grid
              container
              spacing={2}
              style={{ marginTop: 10 }}
              alignItems="center"
            >
              <Grid item xs={2}>
                <Typography
                  variant="subtitle2"
                  style={{ fontWeight: 'bolder', textAlign: 'end' }}
                >
                  Recipient's Full Name:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <input
                  className={classes.input}
                  placeholder="Enter Recipient's Full Name"
                  value={recipientFullName}
                  onChange={handleRecipientFullNameChange}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography
                  variant="subtitle2"
                  style={{ fontWeight: 'bolder', textAlign: 'end' }}
                >
                  Address:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <input
                  placeholder="Enter Address"
                  className={classes.input}
                  onChange={handleAddressChange}
                  value={address}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography
                  variant="subtitle2"
                  style={{ fontWeight: 'bolder', textAlign: 'end' }}
                >
                  Phone Number:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <input
                  placeholder="Enter Phone Number"
                  className={`${classes.input} numberInput`}
                  onChange={handlePhoneNumberChange}
                  value={parseInt(phoneNumber)}
                  type="number"
                />
              </Grid>
            </Grid>
          )}
        </div>
        <div className={classes.DIV}>
          <Typography variant="h6" style={{ fontWeight: 'bolder' }}>
            Delivery Method
          </Typography>
          <Divider />
          <FormControl component="fieldset">
            <RadioGroup aria-label="deliveryMethod" defaultValue="standardDelivery">
              <FormControlLabel
                value="standardDelivery"
                control={<Radio style={{ color: 'orange' }} />}
                label={
                  <Typography
                    style={{ fontWeight: 'bolder' }}
                  >{`Standard Delivery: ${
                    calculateSubTotal(appContext.store.productListInCart) >= 300000
                      ? 'Free'
                      : '20,000??'
                  }`}</Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </div>
        <PaymentMethod />
        <div className={classes.DIV}>
          <Typography variant="h6" style={{ fontWeight: 'bolder' }}>
            Check Your Order Again
          </Typography>
          <Divider />
          {appContext.store.productListInCart.map((product) => {
            return (
              <>
                <ProductInOrder
                  key={product.productId}
                  product={product}
                  number={product.numberInCart}
                />
                <Divider />
              </>
            );
          })}
        </div>
        <Drawer variant="permanent" anchor="bottom">
          <div className={classes.drawerDIV}>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Typography
                variant="subtitle1"
                style={{
                  fontSize: 'larger',
                  textAlign: 'end'
                }}
              >
                {`Subtotal (${appContext.store.numberProductsInCart} items):`}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  fontWeight: 'bolder',
                  color: 'orange',
                  width: '15%',
                  textAlign: 'end'
                }}
              >
                {numberWithCommas(
                  calculateSubTotal(appContext.store.productListInCart)
                )}
                ??
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Typography
                variant="subtitle1"
                style={{
                  fontSize: 'larger',
                  textAlign: 'end'
                }}
              >
                Delivery Fee:
              </Typography>
              <Typography
                variant="h6"
                style={{
                  fontWeight: 'bolder',
                  color: 'orange',
                  width: '15%',
                  textAlign: 'end'
                }}
              >
                {calculateSubTotal(appContext.store.productListInCart) >= 300000
                  ? 'Free'
                  : '20,000??'}
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Typography
                variant="subtitle1"
                style={{
                  fontSize: 'larger',
                  textAlign: 'end'
                }}
              >
                Total (include VAT):
              </Typography>
              <Typography
                variant="h6"
                style={{
                  fontWeight: 'bolder',
                  color: 'orange',
                  width: '15%',
                  textAlign: 'end'
                }}
              >
                {numberWithCommas(
                  calculateSubTotal(appContext.store.productListInCart) +
                    (calculateSubTotal(appContext.store.productListInCart) >= 300000
                      ? 0
                      : 20000)
                )}
                ??
              </Typography>
            </div>
            <Divider />
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-around',
                alignItems: 'center',
                marginTop: 10
              }}
            >
              <ArrowBackIcon></ArrowBackIcon>
              <Link
                to={'/cart'}
                style={{
                  textDecoration: 'none',
                  fontWeight: 'bolder',
                  color: 'gray',
                  marginRight: 'auto'
                }}
              >
                BACK TO YOUR CART
              </Link>
              <Button
                onClick={handlePlaceOrder}
                className={classes.proceedToPayment}
                size="large"
              >
                PROCEED TO PAYMENT
              </Button>
            </div>
          </div>
        </Drawer>
      </Container>
    </>
  );
}
