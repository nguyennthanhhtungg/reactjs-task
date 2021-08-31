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

export default function PromotionProductListGroupCategory({ category }) {
  const classes = useStyles();
  const [promotionProductList, setPromotionProductList] = useState([]);

  useEffect(() => {
    async function LoadPromotionProductListByCategoryId() {
      const promotionProductListRes = await axiosInstance.get(
        `/Products/TopPromotionProductListByCategoryId?n=${6}&categoryId=${
          category.categoryId
        }`
      );

      if (promotionProductListRes.status !== 200) {
        console.log('Error happened!');
      } else {
        setPromotionProductList(promotionProductListRes.data);
      }
    }
    LoadPromotionProductListByCategoryId();
  }, [category]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {category.categoryName}
      </Typography>
      <Box flexWrap="wrap" className={classes.productDIV}>
        {promotionProductList.length === 0 ? (
          <CustomSkeleton show={6} />
        ) : (
          promotionProductList.map((product) => (
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
