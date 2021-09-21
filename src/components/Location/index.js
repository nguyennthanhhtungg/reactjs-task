import React, { useContext } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AppContext from '../../contexts/appContext';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10
  }
}));

export default function Location() {
  const classes = useStyles();
  const { store } = useContext(AppContext);

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex' }}>
        <LocationOnIcon color="primary" />
        <Typography
          variant="subtitle1"
          style={{ fontWeight: 'bolder', marginLeft: 5, marginRight: 'auto' }}
        >
          Location
        </Typography>
        <Link to="/customer/account/profile" style={{ textDecoration: 'none' }}>
          Change
        </Link>
      </div>
      <hr />
      {store.customer.customerName !== undefined ? (
        <>
          <div style={{ marginBottom: 5, display: 'flex' }}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bolder' }}>
              {store.customer.customerName}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              style={{ marginLeft: 10, marginRight: 10, ontWeight: 'bolder' }}
            />
            <Typography variant="subtitle2" style={{ fontWeight: 'bolder' }}>
              {store.customer.phoneNumber}
            </Typography>
          </div>
          {store.customer.address !== '' ? (
            <div style={{ color: 'gray' }}>
              34/5 hẻm 05, đường Lê Hồng Phong, khu phố 1, Phường Hòa Phú, Thành phố
              Thủ Dầu Một, Bình Dương
            </div>
          ) : (
            <div style={{ color: 'gray', textAlign: 'center' }}>Unknown</div>
          )}
        </>
      ) : (
        <Typography style={{ textAlign: 'center' }}>Not Logged In</Typography>
      )}
    </div>
  );
}
