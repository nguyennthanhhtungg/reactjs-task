import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { axiosInstance } from '../../utils/database';
import CustomSkeleton from '../CustomSkeleton';

const useStyles = makeStyles((theme) => ({
  productDIV: {
    display: 'flex'
  }
}));

export default function ProductListGroupCategory({ category }) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    async function LoadProductListByCategoryId() {
      const productListRes = await axiosInstance.get(
        `/Products/ProductListByCategoryId?n=${12}&categoryId=${category.categoryId}`
      );

      if (productListRes.status !== 200) {
        console.log('Error happened!');
      } else {
        setProductList(productListRes.data);
      }
    }
    LoadProductListByCategoryId();
  }, [category]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {category.categoryName}
      </Typography>
      <Box flexWrap="wrap" className={classes.productDIV}>
        {productList.length === 0 ? (
          <CustomSkeleton show={6} />
        ) : (
          productList.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        )}
      </Box>
    </>
  );
}
