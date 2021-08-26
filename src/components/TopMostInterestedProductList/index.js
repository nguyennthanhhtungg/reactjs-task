import React, { useEffect, useReducer, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box } from '@material-ui/core';

import TopMostInterestedProductListContext from './topMostInterestedProductListContext';
import reducer from './topMostInterestedProductListReducer';
import Typography from '@material-ui/core/Typography';
import { axiosInstance } from '../../utils/database';
import ProductCard from '../ProductCard';

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
  const [store, dispatch] = useReducer(
    reducer,
    initialTopMostInterestedProductListState
  );

  useEffect(() => {
    async function LoadTopMostInterestedProductList() {
      const categoryListRes = await axiosInstance.get(`/Categories`);

      const topMostInterestedProductListRes = await axiosInstance.get(
        `/Products/TopMostInterestedProductListByCategoryId?n=${store.top}&categoryId=${store.currentCategoryId}`
      );

      dispatch({
        type: 'init',
        payload: {
          productList: topMostInterestedProductListRes.data,
          categoryList: categoryListRes.data
        }
      });
    }

    LoadTopMostInterestedProductList();
  }, []);

  const handleChangeTop = async (e) => {
    const topMostInterestedProductListRes = await axiosInstance.get(
      `/Products/TopMostInterestedProductListByCategoryId?n=${e.target.value}&&categoryId=${store.currentCategoryId}`
    );

    dispatch({
      type: 'changeTop',
      payload: {
        productList: topMostInterestedProductListRes.data,
        top: parseInt(e.target.value)
      }
    });
  };

  const handleChangeCategory = async (e) => {
    const topMostInterestedProductListRes = await axiosInstance.get(
      `/Products/TopMostInterestedProductListByCategoryId?n=${store.top}&categoryId=${e.target.value}`
    );

    dispatch({
      type: 'changeCategoryId',
      payload: {
        productList: topMostInterestedProductListRes.data,
        currentCategoryId: parseInt(e.target.value)
      }
    });
  };

  return (
    <TopMostInterestedProductListContext.Provider value={(store, dispatch)}>
      <div style={{ display: 'flex' }}>
        <Typography style={{ marginRight: 'auto' }} variant="h5" gutterBottom>
          Top Most Interested Products
        </Typography>
        <select className={classes.select} onChange={handleChangeTop}>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="18">18</option>
          <option value="24">24</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
          <option value="0">All</option>
        </select>
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
        {store.productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </TopMostInterestedProductListContext.Provider>
  );
}
