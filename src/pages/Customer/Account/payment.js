import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppContext from '../../../contexts/appContext';

const useStyles = makeStyles({});

export default function Payment() {
  const classes = useStyles();
  const history = useHistory();
  const { store } = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>{`${store.customer.customerName} | React App`}</title>
      </Helmet>
      <div>Hello Payment</div>
    </>
  );
}
