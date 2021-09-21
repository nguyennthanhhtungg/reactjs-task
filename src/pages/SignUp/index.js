import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import { axiosInstance } from '../../utils/database';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 50,
    paddingBottom: 50
  },
  form: {
    backgroundColor: 'white',
    padding: 30
  },
  input: {
    display: 'block',
    padding: 15,
    marginBottom: 20,
    fontSize: 'larger',
    borderWidth: 1,
    width: '94%',
    borderColor: 'orange',
    borderStyle: 'solid',
    '&:focus': {
      outline: 'none'
    }
  },
  loginBtnDIV: {
    display: 'flex',
    justifyContent: 'center'
  },
  loginBtn: {
    display: 'block',
    backgroundColor: 'orange',
    borderColor: 'white',
    fontSize: 'larger',
    color: 'white',
    marginTop: 20,
    borderWidth: 1,
    width: '60%',
    padding: 15,
    cursor: 'pointer'
  },
  otherLoginBtn: {
    display: 'flex',
    cursor: 'pointer',
    borderStyle: 'solid',
    borderColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    width: '60%',
    alignItems: 'center',
    fontSize: 'larger',
    color: 'white'
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: '',
    message: ''
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post('/auth/register', data);
      sessionStorage.setItem('email', res.data.email);
      // localStorage.setItem('customer', JSON.stringify(res.data));
      history.push('/verification');
    } catch (err) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: err.response.data.Message
      });
    }
  };

  const facebookLoginHandler = () => {
    history.push('/');
  };

  const googleLoginHandler = () => {
    history.push('/');
  };

  // console.log(watch('example')); // watch input value by passing the name of it

  return (
    <>
      <Helmet>
        <title>Sign Up | React App</title>
      </Helmet>
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h4">Create Your Account</Typography>

        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <input
            placeholder="Full Name"
            defaultValue=""
            {...register('customerName', { required: true })}
            className={classes.input}
            required={true}
          />

          <input
            placeholder="Enter your email"
            defaultValue=""
            type="email"
            {...register('email', {
              required: true
            })}
            className={classes.input}
            required={true}
          />

          <input
            placeholder="Enter your phone number"
            defaultValue=""
            type="number"
            {...register('phoneNumber', { required: true })}
            className={`${classes.input} numberInput`}
            required={true}
          />

          <input
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: true })}
            className={classes.input}
            required={true}
            minLength={6}
          />

          <div className={classes.loginBtnDIV}>
            <button type="submit" className={classes.loginBtn}>
              SIGN UP
            </button>
          </div>

          <Typography>Or, login with</Typography>
          <div className={classes.loginBtnDIV}>
            <button
              onClick={facebookLoginHandler}
              type="button"
              className={classes.otherLoginBtn}
              style={{ backgroundColor: '#4267B2' }}
            >
              <img src="./facebook.png" />
              Facebook
            </button>
            <button
              onClick={googleLoginHandler}
              type="button"
              className={classes.otherLoginBtn}
              style={{ backgroundColor: '#db3236' }}
            >
              <img src="./google-plus.png" />
              Google
            </button>
          </div>
        </form>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbar.open}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert variant="filled" severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
