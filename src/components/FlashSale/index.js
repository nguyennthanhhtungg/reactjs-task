import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import HomeContext from '../../pages/Home/homeContext';
import CustomSkeleton from '../CustomSkeleton';

const useStyles = makeStyles((theme) => ({
  productDIV: {
    display: 'flex'
  }
}));

export default function FlashSale(props) {
  const classes = useStyles();

  const { store } = useContext(HomeContext);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Flash Sale
      </Typography>
      <Box flexWrap="wrap" className={classes.productDIV}>
        {store.topFlashSaleProductList.length === 0 ? (
          <CustomSkeleton show={6} />
        ) : (
          store.topFlashSaleProductList.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              promotionBadge={true}
            />
          ))
        )}
      </Box>
    </>
  );
}
