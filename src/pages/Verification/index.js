import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Layout from '../../components/Layout';
import { Container, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import { useForm } from 'react-hook-form';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

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
  mobileVerification: {
    backgroundColor: 'white',
    padding: 30
  },
  phoneNumberInput: {
    display: 'block',
    padding: 15,
    borderWidth: 1,
    width: '96%'
  },
  smsCodeInput: {
    display: 'block',
    padding: 15,
    borderWidth: 1,
    width: '96%'
  },
  sendBtn: {
    color: 'blue',
    display: 'block'
  }
}));

export default function Verification() {
  const classes = useStyles();
  const history = useHistory();
  const [isSent, setIsSent] = useState(false);
  const [timeOut, setTimeOut] = useState(0);
  const [isDisableResend, setIsDisableResend] = useState(false);

  const sendSMSCodeHandler = () => {
    setIsDisableResend(true);

    setTimeOut(60);
  };

  useEffect(() => {
    if (timeOut === 0) {
      setIsDisableResend(false);
      return;
    }

    window.setTimeout(() => {
      setTimeOut(timeOut - 1);
    }, 1000);
  }, [timeOut]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    history.push('/');
  };

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <Layout>
      <Container maxWidth="sm" className={classes.root}>
        {isSent === false && (
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
                onClick={() => {
                  setIsSent(true);
                }}
                type="button"
                className={classes.verificationBtn}
              >
                <PhoneAndroidIcon />
                Verify through SMS Code
              </Button>
            </div>
          </>
        )}
        {isSent === true && (
          <>
            <Typography variant="h5">Mobile Verification</Typography>
            <div className={classes.mobileVerification}>
              <Typography>
                <PhoneAndroidIcon />
                We will send a one time SMS code to your Mobile Number
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <input
                  placeholder="Please enter your phone number"
                  defaultValue="0123456789"
                  readOnly={true}
                  {...register('phoneNumberRequired', { required: true })}
                  className={classes.phoneNumberInput}
                />
                {errors.phoneNumberRequired && (
                  <span style={{ color: 'red' }}>This field is required</span>
                )}
                <br />
                <input
                  placeholder="6 digits"
                  {...register('smsCodeRequired', { required: true })}
                  className={classes.smsCodeInput}
                />
                {errors.smsCodeRequired && (
                  <span style={{ color: 'red' }}>This field is required</span>
                )}

                <Button
                  onClick={sendSMSCodeHandler}
                  disabled={isDisableResend}
                  className={classes.sendBtn}
                >
                  Send{timeOut !== 0 ? '(' + timeOut + ')' : ''}
                </Button>

                <Button type="submit" className={classes.verificationBtn}>
                  Verify Code
                </Button>
              </form>
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
}
