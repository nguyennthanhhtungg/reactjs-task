import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button, Divider, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useForm } from 'react-hook-form';
import AppContext from '../../../contexts/appContext';
import { axiosInstance } from '../../../utils/database';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarProvider from '../../../components/SnackbarProvider';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    padding: 25
  },
  input: {
    width: '85%',
    padding: 10,
    borderStyle: 'solid',
    borderColor: 'orange',
    borderWidth: 1,
    '&:focus': {
      outline: 'none'
    }
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: '50%'
  },
  urlInput: {
    width: '85%',
    padding: 10,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: 'orange',
    borderStyle: 'solid',
    '&:focus': {
      outline: 'none'
    }
  },
  saveBtn: {
    backgroundColor: 'orange',
    color: 'white',
    marginLeft: 30,
    marginTop: 20,
    padding: 8,
    '&:hover': {
      backgroundColor: 'orange'
    }
  },
  propertyName: {
    textAlign: 'end'
  }
});

export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const { store, dispatch } = useContext(AppContext);
  const [avatarUrl, setAvatarUrl] = useState(store.customer.avatarUrl);

  const [selectedDate, setSelectedDate] = React.useState(store.customer.dateOfBirth);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    try {
      data.customerId = store.customer.customerId;
      data.customerNo = store.customer.customerNo;
      data.dateOfBirth = selectedDate;

      const res = await axiosInstance.put(`/Customers`, data);

      if (res.status === 200) {
        const isRememberMe = localStorage.getItem('isRememberMe');
        if (isRememberMe === 'true') {
          localStorage.setItem('customer', JSON.stringify(res.data));
        } else if (isRememberMe === 'false') {
          sessionStorage.setItem('customer', JSON.stringify(res.data));
        }

        dispatch({
          type: 'updateSnackbar',
          payload: {
            snackbar: {
              open: true,
              severity: 'success',
              message: 'Update Profile Successfully!'
            }
          }
        });

        dispatch({
          type: 'updateCustomer',
          payload: {
            customer: res.data
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
  };

  // console.log(watch('example')); // watch input value by passing the name of it

  return (
    <>
      <Helmet>
        <title>{`${store.customer.customerName} | React App`}</title>
      </Helmet>
      <div className={classes.root}>
        <Typography variant="h6" style={{ fontWeight: 'bolder' }}>
          My Profile
        </Typography>
        <Typography variant="subtitle1" style={{ color: 'gray' }}>
          Manage profile for security
        </Typography>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={8}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography className={classes.propertyName} variant="subtitle2">
                    Customer Name
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <input
                    defaultValue={store.customer.customerName}
                    {...register('customerName', { required: true })}
                    className={classes.input}
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography className={classes.propertyName} variant="subtitle2">
                    Phone Number
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <input
                    defaultValue={parseInt(store.customer.phoneNumber)}
                    {...register('phoneNumber', { required: true })}
                    className={`${classes.input} numberInput`}
                    type="number"
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography className={classes.propertyName} variant="subtitle2">
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <input
                    type="email"
                    defaultValue={store.customer.email}
                    {...register('email', { required: true })}
                    className={classes.input}
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography className={classes.propertyName} variant="subtitle2">
                    Gender
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <RadioGroup
                    name="gender"
                    defaultValue={store.customer.gender}
                    // onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio color="primary" {...register('gender')} />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio color="primary" {...register('gender')} />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio color="primary" {...register('gender')} />}
                      label="Other"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography className={classes.propertyName} variant="subtitle2">
                    Address
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <input
                    defaultValue={store.customer.address}
                    {...register('address')}
                    className={classes.input}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography className={classes.propertyName} variant="subtitle2">
                    Date of Birth
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Button size="large" type="submit" className={classes.saveBtn}>
                SAVE
              </Button>
            </Grid>
            <Grid item xs={4}>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={
                    avatarUrl === '' ? 'https://via.placeholder.com/200' : avatarUrl
                  }
                  className={classes.avatar}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10
                  }}
                >
                  <Typography style={{ fontWeight: 'bolder' }}>URL:</Typography>
                  <input
                    defaultValue={store.customer.avatarUrl}
                    {...register('avatarUrl')}
                    className={classes.urlInput}
                    onChange={handleAvatarUrlChange}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}
