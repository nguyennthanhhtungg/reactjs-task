import React, { useContext, useEffect, useReducer, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import { axiosInstance } from '../../utils/database';
import ProductCard from '../ProductCard';
import HomeContext from '../../pages/Home/homeContext';

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

export default function TopMostInterestedProductList(props) {
  const initialTopMostInterestedProductListState = {
    productList: [],
    top: 6,
    categoryList: [],
    currentCategoryId: 0
  };

  const classes = useStyles();
  const { store, dispatch } = useContext(HomeContext);

  const handleChangeCategory = async (e) => {
    const topMostInterestedProductListRes = await axiosInstance.get(
      `/Products/TopMostInterestedProductListByCategoryId?n=${store.top}&categoryId=${e.target.value}`
    );

    dispatch({
      type: 'changeTopMostInterestedCurrentCategoryId',
      payload: {
        topMostInterestedProductList: topMostInterestedProductListRes.data,
        topMostInterestedCurrentCategoryId: parseInt(e.target.value)
      }
    });
  };

  return (
    <HomeContext.Provider value={(store, dispatch)}>
      <div style={{ display: 'flex' }}>
        <Typography style={{ marginRight: 'auto' }} variant="h5" gutterBottom>
          Top Most Interested Products
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
        {store.topMostInterestedProductList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </HomeContext.Provider>
  );
}
