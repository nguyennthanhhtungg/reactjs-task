import React, { useContext, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container, Typography } from '@material-ui/core';

import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';
import AppContext from '../../contexts/appContext';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../utils/database';

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
    fontSize: 'larger',
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
    backgroundColor: 'white',
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

export default function LogIn(props) {
  const classes = useStyles();
  const history = useHistory();
  const { store, dispatch } = useContext(AppContext);
  const [isRememberMe, setIsRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(`/auth/login`, data);
      dispatch({
        type: 'updateSnackbar',
        payload: {
          snackbar: {
            open: true,
            severity: 'success',
            message: 'Login successfully!'
          }
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (isRememberMe === true) {
        localStorage.setItem('customer', JSON.stringify(res.data));
      } else {
        sessionStorage.setItem('customer', JSON.stringify(res.data));
      }
      dispatch({
        type: 'updateCustomer',
        payload: {
          customer: res.data
        }
      });
      history.push('/');
    } catch (err) {
      dispatch({
        type: 'updateSnackbar',
        payload: {
          snackbar: {
            open: true,
            severity: 'error',
            message: err.response.data.Message
          }
        }
      });

      if (err.response.data.Message === 'This account has not been verified yet!') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        sessionStorage.setItem('email', data.email);
        history.push('/verification');
      }
    }
  };

  const facebookLoginHandler = () => {
    history.push('/');
  };

  const googleLoginHandler = () => {
    history.push('/');
  };

  // console.log(watch('example')); // watch input value by passing the name of it

  const handleChangeRememberMe = (e) => {
    setIsRememberMe(e.target.checked);
    localStorage.setItem('isRememberMe', e.target.checked);
  };

  return (
    <>
      <Helmet>
        <title>Login | React App</title>
      </Helmet>
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h5">Welcome to ReactJs! Please login.</Typography>

        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <input
            placeholder="Enter your email"
            defaultValue=""
            type="email"
            {...register('email', { required: true })}
            className={classes.input}
            required="true"
            style={{ marginBottom: 20 }}
          />
          <input
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: true })}
            className={classes.input}
            required="true"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChangeRememberMe}
                name="checkedB"
                color="primary"
                value={isRememberMe}
              />
            }
            label="Please remember me!"
          />
          <div className={classes.loginBtnDIV}>
            <button type="submit" className={classes.loginBtn}>
              LOGIN
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
    </>
  );
}
