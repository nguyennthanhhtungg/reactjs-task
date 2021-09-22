import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import makeStyles from '@material-ui/core/styles/makeStyles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Divider, Typography } from '@material-ui/core';
import * as queryString from 'query-string';
import OrderItem from '../../../components/OrderItem';
import CustomerContext from '../customerContext';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default function OrderDetail() {
  const classes = useStyles();
  const history = useHistory();

  const { store, dispatch } = useContext(CustomerContext);
  const [orderId] = useState(queryString.parse(window.location.search).orderId);
  const [order, setOrder] = useState();

  useEffect(() => {
    console.log(order);
  }, [orderId]);
  console.log(orderId);

  return (
    <>
      <Helmet>
        <title>Order Detail | React App</title>
      </Helmet>
      <div className={classes.root}>
        <div style={{ display: 'flex' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}
          >
            <NavigateBeforeIcon style={{ color: 'gray' }} />
            <Link
              to={'/customer/order'}
              style={{ textDecoration: 'none', color: 'gray', fontSize: 'large' }}
            >
              BACK
            </Link>
          </div>
          <Typography variant="subtitle1" style={{ fontWeight: 'bolder' }}>
            No: {'ABC123'}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            style={{ marginLeft: 15, marginRight: 15 }}
          />
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 'bolder', color: 'orange' }}
          >
            {'NEW'}
          </Typography>
        </div>
        <Divider />
      </div>
    </>
  );
}
