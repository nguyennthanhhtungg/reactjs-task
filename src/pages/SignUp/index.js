import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/Layout';

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
    borderWidth: 1,
    width: '96%',
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

  const [method, setMethod] = useState('PhoneNumber');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    history.push('/verification?signupType=phone');
  };

  const facebookLoginHandler = () => {
    history.push('/');
  };

  const googleLoginHandler = () => {
    history.push('/');
  };

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <Layout>
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h5">Welcome to ReactJs! Please login.</Typography>

        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Typography>Phone Number or Email (*)</Typography>
          <input
            placeholder="Please enter your Phone Number or Email"
            defaultValue=""
            {...register('userNameRequired', { required: true })}
            className={classes.input}
          />
          {errors.userNameRequired && (
            <span style={{ color: 'red' }}>This field is required</span>
          )}
          <br />
          <Typography>Full name (*)</Typography>
          <input
            placeholder="First Last"
            defaultValue=""
            {...register('fullNameRequired', { required: true })}
            className={classes.input}
          />
          {errors.fullNameRequired && (
            <span style={{ color: 'red' }}>This field is required</span>
          )}
          <br />
          <Typography>Password (*)</Typography>
          <input
            type="password"
            placeholder="Please enter your Password"
            {...register('passwordRequired', { required: true })}
            className={classes.input}
          />
          {errors.passwordRequired && (
            <span style={{ color: 'red' }}>This field is required</span>
          )}

          <div className={classes.loginBtnDIV}>
            <button type="submit" className={classes.loginBtn}>
              SIGN UP
            </button>
          </div>
          <br />
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
    </Layout>
  );
}
