import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import { numberWithCommas } from '../../utils/currency';

const useStyles = makeStyles({
  root: {
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
    textAlign: 'end'
  },
  oldPrice: {
    marginLeft: 5,
    color: 'gray',
    textDecoration: 'line-through'
  }
});

export default function ProductInOrder({ product, number }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <img src={product.imageUrl} style={{ width: '10%' }} />
      <div
        style={{
          marginLeft: 10,
          marginRight: 'auto',
          width: '50%',
          alignSelf: 'flex-start'
        }}
      >
        <Link to={`/product/${product.productId}`} className={classes.productLink}>
          {product.productName}
        </Link>
        <Typography variant="subtitle1" style={{ color: 'gray' }}>
          {product.category.categoryName}
        </Typography>
        <Typography variant="subtitle1">x{number}</Typography>
      </div>
      <div className={classes.oldPrice}>{numberWithCommas(product.price)}đ</div>
      <div className={classes.newPrice}>
        {numberWithCommas(product.price * ((100 - product.discount) / 100))}đ
      </div>
    </div>
  );
}
