import React, { useContext, useEffect, useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import AppContext from '../../contexts/appContext';
import { numberWithCommas } from '../../utils/currency';
import CartContext from '../../pages/Cart/cartContext';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10
  }
}));

export default function OrderSummary() {
  const classes = useStyles();
  const { store, dispatch } = useContext(CartContext);

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
        <div style={{ color: 'gray' }}>Subtotal</div>
        <div>{numberWithCommas(store.subTotal)}đ</div>
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
        <div>15,000đ</div>
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
        <div>{numberWithCommas(store.subTotal + 15000)}đ</div>
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
