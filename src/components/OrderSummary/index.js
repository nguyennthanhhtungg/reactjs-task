import React, { useContext, useEffect, useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import Context from '../../contexts';
import { numberWithCommas } from '../../utils/currency';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10
  }
}));

export default function OrderSummary() {
  const classes = useStyles();
  const { store, dispatch } = useContext(Context);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let subTotal = 0;

    store.productListInCart.forEach((product) => {
      subTotal +=
        parseFloat(product.price) *
        ((100 - product.discount) / 100) *
        parseInt(product.numberInCart);
    });

    console.log(store.productListInCart);
    console.log(subTotal);

    setSubTotal(subTotal);
  }, [store.numberProductsInCart]);

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
        <div>{numberWithCommas(subTotal)}đ</div>
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
        <div>{numberWithCommas(subTotal + 15000)}đ</div>
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
