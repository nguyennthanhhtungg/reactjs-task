import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button, Divider, Typography } from '@material-ui/core';
import { calculateSubTotal, numberWithCommas } from '../../utils/currency';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import ProductInOrder from '../ProductInOrder';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    padding: 25,
    marginTop: 10
  },
  productDIV: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10
  },
  productLink: {
    color: 'black',
    fontSize: 'larger',
    textDecoration: 'none',
    '&:hover': {
      color: 'blue'
    }
  },
  newPrice: {
    marginLeft: 10,
    fontWeight: 'bolder',
    fontSize: 'smaller',
    textAlign: 'end'
  },
  oldPrice: {
    marginLeft: 5,
    color: 'gray',
    textDecoration: 'line-through',
    fontSize: 'smaller'
  }
});

export default function OrderItem({ order }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex' }}>
        <Typography
          variant="subtitle1"
          style={{ fontWeight: 'bolder', marginRight: 'auto' }}
        >
          No: {order.orderNo} ({order.totalProduct} Product(s))
        </Typography>
        {/*<Link*/}
        {/*  to={`/customer/orderDetail?orderId=${order.orderId}`}*/}
        {/*  style={{ textDecoration: 'none' }}*/}
        {/*>*/}
        {/*  Order Detail*/}
        {/*</Link>*/}
        <Divider
          orientation="vertical"
          flexItem
          style={{ marginLeft: 15, marginRight: 15 }}
        />
        <Typography
          variant="subtitle1"
          style={{ fontWeight: 'bolder', color: 'orange' }}
        >
          {order.status.toUpperCase()}
        </Typography>
      </div>
      <Divider />
      {order.orderDetails.map((orderDetail) => {
        return (
          <>
            <ProductInOrder
              product={orderDetail.product}
              number={orderDetail.number}
            />
            <Divider />
          </>
        );
      })}
      <div style={{ marginTop: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Typography
            variant="subtitle1"
            style={{
              fontSize: 'larger',
              textAlign: 'end',
              fontWeight: 'bolder'
            }}
          >
            {`Subtotal (${order.totalProduct} items):`}
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
            {numberWithCommas(order.totalProductMoney)}đ
          </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Typography
            variant="subtitle1"
            style={{
              fontSize: 'larger',
              textAlign: 'end',
              fontWeight: 'bolder'
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
            {order.totalProductMoney >= 300000 ? 'Free' : '20,000đ'}
          </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Typography
            variant="subtitle1"
            style={{
              fontSize: 'larger',
              textAlign: 'end',
              fontWeight: 'bolder'
            }}
          >
            Total:
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
              order.totalProductMoney +
                (order.totalProductMoney >= 300000 ? 0 : 20000)
            )}
            đ
          </Typography>
        </div>
        <div style={{ display: 'flex' }}>
          <Typography style={{ color: 'gray', marginRight: 'auto' }}>
            Create At:{' '}
            <span style={{ textDecoration: 'underline' }}>{order.updatedDate}</span>
          </Typography>
          <Typography variant="body2" style={{ textAlign: 'end' }}>
            (VAT included)
          </Typography>
        </div>
      </div>
    </div>
  );
}
