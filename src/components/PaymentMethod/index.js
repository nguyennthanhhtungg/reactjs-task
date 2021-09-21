import React, { useContext, useState } from 'react';
import { Divider, makeStyles } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import AppContext from '../../contexts/appContext';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: 'white'
  },
  radio: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 15
  }
}));

export default function PaymentMethod() {
  const classes = useStyles();
  const appContext = useContext(AppContext);

  const handleChange = (e) => {
    appContext.dispatch({
      type: 'updatePaymentMethod',
      payload: {
        paymentMethod: e.target.value
      }
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" style={{ fontWeight: 'bolder' }}>
        Payment Method
      </Typography>
      <Divider />
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="paymentMethod"
          defaultValue={appContext.store.paymentMethod}
          onChange={handleChange}
        >
          <FormControlLabel
            value="cod"
            control={<Radio style={{ color: 'orange' }} value="cod" />}
            label={
              <div className={classes.radio}>
                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg" />
                <div style={{ marginLeft: 10 }}>Cash On Delivery (COD)</div>
              </div>
            }
          />
          <FormControlLabel
            value="momo"
            control={<Radio style={{ color: 'orange' }} value="momo" />}
            label={
              <div className={classes.radio}>
                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-mo-mo.svg" />
                <div style={{ marginLeft: 10 }}>MOMO</div>
              </div>
            }
          />
          <FormControlLabel
            value="zaloPay"
            control={<Radio style={{ color: 'orange' }} value="zaloPay" />}
            label={
              <div className={classes.radio}>
                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-zalo-pay.svg" />
                <div style={{ marginLeft: 10 }}>ZaloPay</div>
              </div>
            }
          />
          <FormControlLabel
            value="internetBanking"
            control={<Radio style={{ color: 'orange' }} value="internetBanking" />}
            label={
              <div className={classes.radio}>
                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-atm.svg" />
                <div style={{ marginLeft: 10 }}>ATM Card/Internet Banking</div>
              </div>
            }
          />
          <FormControlLabel
            value="internationalCard"
            control={<Radio style={{ color: 'orange' }} value="internationalCard" />}
            label={
              <div className={classes.radio}>
                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-credit.svg" />
                <div style={{ marginLeft: 10 }}>Visa, Master, JCB</div>
              </div>
            }
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
