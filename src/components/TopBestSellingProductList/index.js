import React, { useContext, useEffect, useReducer, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box } from '@material-ui/core';

import ProductCard from '../ProductCard';
import Typography from '@material-ui/core/Typography';
import { axiosInstance } from '../../utils/database';
import HomeContext from '../../pages/Home/homeContext';
import CustomSkeleton from '../CustomSkeleton';

const useStyles = makeStyles((theme) => ({
  select: {
    borderColor: 'orange',
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: 'larger',
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    '&:focus': {
      outline: 'none'
    }
  },
  productDIV: {
    display: 'flex'
  }
}));

export default function TopBestSellingProductList(props) {
  const classes = useStyles();
  const { store, dispatch } = useContext(HomeContext);

  const handleChangeCategory = async (e) => {
    const topBestSellingProductListRes = await axiosInstance.get(
      `/Products/TopBestSellingProductListByCategoryId?n=${store.top}&categoryId=${e.target.value}`
    );

    dispatch({
      type: 'changeTopBestSellingCurrentCategoryId',
      payload: {
        topBestSellingProductList: topBestSellingProductListRes.data,
        topBestSellingCurrentCategoryId: parseInt(e.target.value)
      }
    });
  };

  return (
    <HomeContext.Provider value={(store, dispatch)}>
      <div style={{ display: 'flex' }}>
        <Typography style={{ marginRight: 'auto' }} variant="h5" gutterBottom>
          Top Best Selling Products
        </Typography>
        <select className={classes.select} onChange={handleChangeCategory}>
          <option value="0" className={classes.option}>
            All Categories
          </option>
          {store.categoryList.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
      <Box flexWrap="wrap" className={classes.productDIV}>
        {store.topBestSellingProductList.length === 0 ? (
          <CustomSkeleton show={6} />
        ) : (
          store.topBestSellingProductList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Box>
    </HomeContext.Provider>
  );
}
