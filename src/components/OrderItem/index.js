import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button, Divider, Typography } from '@material-ui/core';
import { numberWithCommas } from '../../utils/currency';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

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
        <Divider orientation="vertical" flexItem />
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
            <div key={orderDetail.id} className={classes.productDIV}>
              <img src={orderDetail.product.imageUrl} style={{ width: '10%' }} />
              <div
                style={{
                  marginLeft: 10,
                  marginRight: 'auto',
                  width: '50%',
                  alignSelf: 'flex-start'
                }}
              >
                <Link
                  to={`/product/${orderDetail.product.productId}`}
                  className={classes.productLink}
                >
                  {orderDetail.product.productName}
                </Link>
                <Typography variant="subtitle1" style={{ color: 'gray' }}>
                  {orderDetail.product.category.categoryName}
                </Typography>
                <Typography variant="subtitle1">x{orderDetail.number}</Typography>
              </div>
              <div className={classes.oldPrice}>
                {numberWithCommas(orderDetail.product.price)}đ
              </div>
              <div className={classes.newPrice}>
                {numberWithCommas(
                  orderDetail.product.price *
                    ((100 - orderDetail.product.discount) / 100)
                )}
                đ
              </div>
            </div>
            <Divider />
          </>
        );
      })}
      <Grid container alignItems="flex-end" style={{ marginTop: 10 }}>
        <Grid item xs={8}>
          <Typography style={{ color: 'gray' }}>
            Create At:{' '}
            <span style={{ textDecoration: 'underline' }}>{order.updatedDate}</span>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6} style={{ textAlign: 'end' }}>
              <Typography
                variant="subtitle1"
                style={{ fontSize: 'larger', fontWeight: 'bolder' }}
              >
                Delivery Fee:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                style={{ fontWeight: 'bolder', color: 'orange' }}
              >
                {numberWithCommas(order.deliveryFee)}đ
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'end' }}>
              <Typography
                variant="subtitle1"
                style={{ fontSize: 'larger', fontWeight: 'bolder' }}
              >
                Total:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                style={{ fontWeight: 'bolder', color: 'orange' }}
              >
                {numberWithCommas(order.totalProductMoney)}đ
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'end' }}></Grid>
            <Grid item xs={6}>
              <Typography variant="body2">(VAT included)</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
