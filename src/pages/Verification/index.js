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
  const [isDisableSend, setIsDisableSend] = useState(false);
  const [signupType] = useState(
    queryString.parse(window.location.search).signupType
  );

  const sendSMSCodeHandler = () => {
    setIsDisableSend(true);

    setTimeOut(60);
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
                onClick={() => {
                  setFlag(true);
                }}
                type="button"
                className={classes.verificationBtn}
              >
                <PhoneAndroidIcon />
                {signupType === 'phone'
                  ? 'Verify through SMS Code'
                  : 'Verify through Email Code'}
              </Button>
            </div>
          </>
        )}
        {flag === true && (
          <>
            <Typography variant="h5">
              {signupType === 'phone' ? 'Mobile Verification' : 'Email Verification'}
            </Typography>
            <div className={classes.verification}>
              {signupType === 'phone' ? (
                <Typography>
                  <PhoneAndroidIcon />
                  We will send a one time SMS code to your Mobile Number
                </Typography>
              ) : (
                <Typography>
                  <MailOutlineIcon />
                  We will send a one time Email code to your Email
                </Typography>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <input
                  placeholder="Please enter your phone number"
                  defaultValue={
                    signupType === 'phone'
                      ? '0123456789'
                      : 'tung-thanh.nguyen@capgemini.com'
                  }
                  readOnly={true}
                  {...register('phoneNumberRequired', { required: true })}
                  className={classes.input}
                />
                {errors.phoneNumberRequired && (
                  <span style={{ color: 'red' }}>This field is required</span>
                )}
                <br />
                <input
                  placeholder="6 digits"
                  {...register('codeRequired', { required: true })}
                  className={classes.codeInput}
                />
                {errors.codeRequired && (
                  <span style={{ color: 'red' }}>This field is required</span>
                )}

                <Button
                  onClick={sendSMSCodeHandler}
                  disabled={isDisableSend}
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
