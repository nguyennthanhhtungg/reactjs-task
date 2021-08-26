import React, { useContext, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import Carousel from '../Carousel';
import { numberWithCommas } from '../../utils/currency';
import ProductContext from '../../pages/Product/productContext';
import SmallThumbnailImage from './SmallThumbnailImage';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white'
  },
  link: {
    textDecoration: 'none'
  },
  rating: {
    display: 'flex'
  },
  priceDIV: {
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: '#a2d2e5',
    marginTop: 30,
    marginBottom: 30,
    padding: 15
  },
  newPrice: {
    color: 'black'
  },
  oldPrice: {
    textDecoration: 'line-through',
    display: 'inline',
    marginLeft: 10,
    marginRight: 10
  },
  quantityInput: {
    padding: 6.3,
    width: 35,
    borderRadius: 0,
    borderStyle: 'solid',
    borderWidth: '1px 0px 1px 0px',
    textAlign: 'center',
    '&:focus': {
      outline: 'none'
    }
  },
  removeBtn: {
    borderStyle: 'solid',
    borderColor: 'gray',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 1
  },
  addBtn: {
    borderStyle: 'solid',
    borderColor: 'gray',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1
  },
  addToCart: {
    color: 'orange',
    borderColor: 'orange',
    borderStyle: 'solid',
    borderWidth: 1,
    width: 180
  },
  buyNow: {
    color: 'white',
    backgroundColor: 'orange',
    borderColor: 'orange',
    borderStyle: 'solid',
    borderWidth: 1,
    width: 180,
    '&:hover': {
      backgroundColor: 'orange'
    },
    marginLeft: 20
  },
  mainImage: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    height: 300
  }
}));

const imageListData = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150'
];

export default function ProductDetail({ product }) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const { store } = useContext(ProductContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeImageIndexHandler = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={5}>
        <div className={classes.mainImage}>
          <img
            style={{ width: '100%', height: '100%' }}
            src={imageListData[currentImageIndex]}
          />
        </div>
        <div>
          <Carousel show={5}>
            {imageListData.map((image, index) => (
              <SmallThumbnailImage
                key={index}
                currentImageIndex={currentImageIndex}
                id={index}
                image={image}
                onChangeImageIndexHandler={changeImageIndexHandler}
              />
            ))}
          </Carousel>
        </div>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="subtitle2">
          Brand:{' '}
          <Link to="/" className={classes.link}>
            {store.supplier.supplierName}
          </Link>
        </Typography>
        <Typography variant="h6">{store.productName}</Typography>
        <div className={classes.rating}>
          <Rating defaultValue={2.5} precision={0.5} readOnly size="small" />
          <Typography
            component="p"
            style={{ color: 'gray', fontSize: 'small', marginLeft: 10 }}
          >
            123 Ratings
          </Typography>
        </div>
        <div className={classes.priceDIV}>
          <Typography variant="h4" component="p" className={classes.newPrice}>
            {numberWithCommas(store.price * ((100 - store.discount) / 100))}đ
          </Typography>
          <div>
            <Typography component="p" className={classes.oldPrice}>
              {numberWithCommas(store.price)}đ
            </Typography>
            <span style={{ textDecoration: 'none' }}>-{store.discount}%</span>
          </div>
        </div>
        <div>
          <Typography style={{ fontSize: 'larger' }}>Quantity:</Typography>
          <Button
            className={classes.removeBtn}
            size="small"
            disabled={quantity === 0 ? true : false}
            onClick={() => setQuantity(quantity - 1)}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <input className={classes.quantityInput} value={quantity} readOnly />
          <Button
            className={classes.addBtn}
            size="small"
            onClick={() => setQuantity(quantity + 1)}
          >
            <AddIcon fontSize="small" />
          </Button>
        </div>
        <div style={{ marginTop: 10 }}>
          <Button className={classes.addToCart}>Add to Cart</Button>
          <Button className={classes.buyNow}>Buy Now</Button>
        </div>
      </Grid>
    </Grid>
  );
}
