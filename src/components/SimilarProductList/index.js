import React, { useContext, useReducer } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

import Carousel from '../Carousel';
import ProductCard from '../ProductCard';
import ProductContext from '../../pages/Product/productContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30
  }
}));

export default function SimilarProductList() {
  const classes = useStyles();

  const { store } = useContext(ProductContext);

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Products related to this item
      </Typography>
      <Carousel show={6} auto={false}>
        {store.similarProductList.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </Carousel>
    </div>
  );
}
