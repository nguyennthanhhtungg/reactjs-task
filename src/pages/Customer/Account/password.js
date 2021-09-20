import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppContext from '../../../contexts/appContext';
import { Button, Divider, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../../utils/database';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    padding: 25
  },
  propertyName: {
    textAlign: 'end'
  },
  confirmBtn: {
    backgroundColor: 'orange',
    color: 'white',
    padding: 8,
    '&:hover': {
      backgroundColor: 'orange'
    }
  },
  input: {
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderColor: 'orange',
    borderWidth: 1,
    '&:focus': {
      outline: 'none'
    }
  }
});

export default function Password() {
  const classes = useStyles();
  const history = useHistory();
  const { store, dispatch } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      dispatch({
        type: 'updateSnackbar',
        payload: {
          snackbar: {
            open: true,
            severity: 'error',
            message: 'New Password and Confirm Password dont match!'
          }
        }
      });
    } else {
      try {
        const res = await axiosInstance.post(`/auth/changepassword`, {
          userId: store.customer.customerId,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        });

        if (res.status === 200) {
          reset();

          dispatch({
            type: 'updateSnackbar',
            payload: {
              snackbar: {
                open: true,
                severity: 'success',
                message: 'Update Password Successfully!'
              }
            }
          });
        }
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
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${store.customer.customerName} | React App`}</title>
      </Helmet>
      <div className={classes.root}>
        <Typography variant="h6" style={{ fontWeight: 'bolder' }}>
          Change Password
        </Typography>
        <Typography variant="subtitle1" style={{ color: 'gray' }}>
          To secure password, please don't share your password to others
        </Typography>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={3}>
              <Typography className={classes.propertyName} variant="subtitle2">
                Old Password
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <input
                type="password"
                {...register('oldPassword', { required: true })}
                className={classes.input}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.propertyName} variant="subtitle2">
                New Password
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <input
                type="password"
                {...register('newPassword', { required: true })}
                className={classes.input}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.propertyName} variant="subtitle2">
                Confirm Password
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <input
                type="password"
                {...register('confirmPassword', { required: true })}
                className={classes.input}
                required
              />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
              <Button size="large" type="submit" className={classes.confirmBtn}>
                CONFIRM
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}
