import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container, Typography } from '@material-ui/core';

import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import LogInComponent from '../../components/LogInComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 50,
    paddingBottom: 50
  }
}));

export default function LogIn() {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Login | React App</title>
      </Helmet>
      <Container maxWidth="sm" className={classes.root}>
        <LogInComponent />
      </Container>
    </>
  );
}
