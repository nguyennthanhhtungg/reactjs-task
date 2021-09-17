import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button, Divider, Typography } from '@material-ui/core';
import { numberWithCommas } from '../../utils/currency';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    padding: 25,
    marginTop: 10
  },
  productDIV: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10
  },
  productLink: {
    color: 'black',
    fontSize: 'larger',
    textDecoration: 'none',
    '&:hover': {
      color: 'blue'
    }
  },
  newPrice: {
    marginLeft: 10,
    fontWeight: 'bolder',
    fontSize: 'smaller',
    textAlign: 'end'
  },
  oldPrice: {
    marginLeft: 5,
    color: 'gray',
    textDecoration: 'line-through',
    fontSize: 'smaller'
  }
});

export default function OrderItem() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex' }}>
        <Typography
          variant="subtitle1"
          style={{ fontWeight: 'bolder', marginRight: 'auto' }}
        >
          No: ABC123 (3 Products)
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography
          variant="subtitle1"
          style={{ fontWeight: 'bolder', color: 'orange' }}
        >
          NEW
        </Typography>
      </div>
      <Divider />
      {[...new Array(4)].map((index) => {
        return (
          <>
            <div key={index} className={classes.productDIV}>
              <img src="https://picsum.photos/200/200" style={{ width: '10%' }} />
              <div
                style={{
                  marginLeft: 10,
                  marginRight: 'auto',
                  width: '50%',
                  alignSelf: 'flex-start'
                }}
              >
                <Link to={`/product/1`} className={classes.productLink}>
                  Smart Tivi Samsung 4K 50 inch 50TU6900asdasdasdasd asdasd asdas
                  sada d wasd á
                </Link>
                <Typography variant="subtitle1" style={{ color: 'gray' }}>
                  Category Name
                </Typography>
                <Typography variant="subtitle1">x3</Typography>
              </div>
              <div className={classes.oldPrice}>{numberWithCommas(100000)}đ</div>
              <div className={classes.newPrice}>
                {numberWithCommas(100000 * ((100 - 10) / 100))}đ
              </div>
            </div>
            <Divider />
          </>
        );
      })}
      <div></div>
    </div>
  );
}
