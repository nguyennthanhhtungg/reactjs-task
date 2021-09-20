import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Divider, Typography } from '@material-ui/core';
import OrderItem from '../../../components/OrderItem';
import CustomerContext from '../customerContext';

const useStyles = makeStyles({
  root: {},
  title: {
    backgroundColor: 'white',
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default function Order() {
  const classes = useStyles();
  const history = useHistory();

  const { store, dispatch } = useContext(CustomerContext);

  return (
    <>
      <Helmet>
        <title>Order | React App</title>
      </Helmet>
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h6" style={{ fontWeight: 'bolder' }}>
            My Orders
          </Typography>
        </div>
        {store.myOrders.length === 0 && (
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            No Orders
          </Typography>
        )}
        {store.myOrders.map((order) => {
          return <OrderItem key={order.orderId} order={order} />;
        })}
      </div>
    </>
  );
}
