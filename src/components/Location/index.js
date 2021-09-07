import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10
  },
  gridLeft: {
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: 'black'
  },
  gridRight: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    borderLeftColor: 'black'
  }
}));

export default function Location() {
  const classes = useStyles();

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
        <Link to="/changeLocation" style={{ textDecoration: 'none' }}>
          Change
        </Link>
      </div>
      <hr />
      <div style={{ marginBottom: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={7} className={classes.gridLeft}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bolder' }}>
              Nguyễn Thanh Tùng
            </Typography>
          </Grid>
          <Grid item xs={5} className={classes.gridRight}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bolder' }}>
              0868042318
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div style={{ color: 'gray' }}>
        1220/21/8 hẻm 05, đường Huỳnh Văn Lũy, khu phố 8, Phường Phú Mỹ, Thành phố
        Thủ Dầu Một, Bình Dương
      </div>
    </div>
  );
}
