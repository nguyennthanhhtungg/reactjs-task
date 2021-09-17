import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Divider, Typography } from '@material-ui/core';
import OrderItem from '../../../components/OrderItem';

const useStyles = makeStyles({
  root: {},
  title: {
    backgroundColor: 'white',
    padding: 25
  }
});

export default function Order() {
  const classes = useStyles();
  const history = useHistory();

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
        <OrderItem />
      </div>
    </>
  );
}
