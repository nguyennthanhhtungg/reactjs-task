import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import { useForm } from 'react-hook-form';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import * as queryString from 'query-string';

import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import ProductContext from '../Product/productContext';
import { spawn } from 'env-cmd/dist/spawn';
import { axiosInstance } from '../../utils/database';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 50,
    paddingBottom: 50
  },
  securityVerification: {
    backgroundColor: 'white',
    padding: 30,
    textAlign: 'center'
  },
  securityLogo: {
    height: 100,
    width: 100
  },
  verificationBtn: {
    backgroundColor: 'orange',
    color: 'white',
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    '&:hover': {
      backgroundColor: 'orange'
    }
  },
  verification: {
    backgroundColor: 'white',
    padding: 30
  },
  input: {
    display: 'block',
    padding: 15,
    borderWidth: 1,
    marginBottom: 20,
    width: '96%',
    borderColor: 'orange',
    borderStyle: 'solid',
    '&:focus': {
      outline: 'none'
    }
  },
  codeInput: {
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
  sendBtn: {
    color: 'blue',
    display: 'block'
  }
}));

export default function Verification(props) {
  const classes = useStyles();
  const history = useHistory();
  const [flag, setFlag] = useState(false);
  const [timeOut, setTimeOut] = useState(0);
  const [isDisableSend, setIsDisableSend] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: '',
    message: ''
  });
  // const [signupType] = useState(
  //   queryString.parse(window.location.search).signupType
  // );

  const [email, setEmail] = useState('');
  const [OTPCode, setOTPCode] = useState('');

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    setEmail(email);
  }, []);

  const sendOTPCodeHandler = async () => {
    setFlag(true);
    await resendOTPCodeHandler();
  };

  const resendOTPCodeHandler = async () => {
    setIsDisableSend(true);
    setTimeOut(60);

    try {
      const res = await axiosInstance.get(`/auth/sendOTPCode?email=${email}`);

      setSnackbar({
        open: true,
        severity: 'success',
        message: res.data
      });
    } catch (err) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: err.response.data.Message
      });
    }
  };

  useEffect(() => {
    if (timeOut === 0) {
      setIsDisableSend(false);
      return;
    }

    window.setTimeout(() => {
      setTimeOut(timeOut - 1);
    }, 1000);
  }, [timeOut]);

  const handleChangeOTPCode = (e) => {
    if (e.key >= '0' && e.key <= '9') {
      setOTPCode(parseInt(OTPCode + e.key));
    }

    if (e.key === 'Backspace') {
      setOTPCode(parseInt(OTPCode / 10));
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(`/auth/verifyTwoStepVerification`, data);
      setSnackbar({
        open: true,
        severity: 'success',
        message: res.data
      });

      await new Promise((resolve) => setTimeout(resolve, 3000));
      history.push('/login');
    } catch (err) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: err.response.data.Message
      });
    }
  };

  // console.log(watch('example')); // watch input value by passing the name of it

  return (
    <>
      <Helmet>
        <title>Verification | React App</title>
      </Helmet>

      <Container maxWidth="sm" className={classes.root}>
        {flag === false && (
          <>
            <Typography variant="h5">Security Verification</Typography>
            <div className={classes.securityVerification}>
              <img
                className={classes.securityLogo}
                src="https://laz-img-cdn.alicdn.com/tfs/TB1v0JvAmBYBeNjy0FeXXbnmFXa-300-300.png"
              />
              <Typography style={{ color: 'gray' }}>
                To protect your account security, we need to verify your identity
              </Typography>
              <Typography style={{ color: 'gray' }}>
                Please choose a way to verify:
              </Typography>
              <Button
                onClick={sendOTPCodeHandler}
                type="button"
                className={classes.verificationBtn}
              >
                <MailOutlineIcon />
                Verify through Email Code
              </Button>
            </div>
          </>
        )}
        {flag === true && (
          <>
            <Typography variant="h5">Email Verification</Typography>
            <div className={classes.verification}>
              <div style={{ display: 'flex' }}>
                <MailOutlineIcon />
                <Typography>
                  We will send a one time Email code to your Email
                </Typography>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <input
                  placeholder="Please enter your phone number"
                  defaultValue={email}
                  readOnly={true}
                  {...register('email', { required: true })}
                  className={classes.input}
                  required="true"
                />

                <input
                  id="OTPCodeInput"
                  placeholder="6 digits"
                  type="number"
                  onKeyDown={handleChangeOTPCode}
                  value={OTPCode}
                  {...register('otpCode', { required: true })}
                  className={classes.codeInput}
                  required="true"
                />

                <Button
                  onClick={resendOTPCodeHandler}
                  disabled={isDisableSend}
                  className={classes.sendBtn}
                >
                  Resend{timeOut !== 0 ? '(' + timeOut + ')' : ''}
                </Button>

                <Button type="submit" className={classes.verificationBtn}>
                  Verify Code
                </Button>
              </form>
            </div>
          </>
        )}
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
