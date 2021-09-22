import React, { useContext, useEffect, useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import AppContext from '../../contexts/appContext';
import { calculateSubTotal, numberWithCommas } from '../../utils/currency';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10
  }
}));

export default function OrderSummary() {
  const classes = useStyles();
  const appContext = useContext(AppContext);

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex' }}>
        <Typography variant="subtitle1" style={{ fontWeight: 'bolder' }}>
          Order Summary
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <div
          style={{ color: 'gray' }}
        >{`Subtotal (${appContext.store.numberProductsInCart} items)`}</div>
        <div>
          {numberWithCommas(calculateSubTotal(appContext.store.productListInCart))}đ
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <div style={{ color: 'gray' }}>Shipping Fee</div>
        <div>
          {calculateSubTotal(appContext.store.productListInCart) >= 300000
            ? 'Free'
            : '20,000đ'}
        </div>
      </div>
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <div style={{ color: 'gray' }}>Total</div>
        <div>
          {numberWithCommas(
            calculateSubTotal(appContext.store.productListInCart) + 20000
          )}
          đ
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          fontSize: 'small'
        }}
      >
        (VAT included)
      </div>
    </div>
  );
}
