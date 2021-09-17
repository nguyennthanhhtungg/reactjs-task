import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({});

export default function Notification() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Helmet>
        <title>Notification | React App</title>
      </Helmet>
      <div>Hello Notification</div>
    </>
  );
}
