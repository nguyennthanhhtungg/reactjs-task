import React, { useEffect, useReducer, useState } from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Helmet from 'react-helmet';

import ProductListGroupCategory from '../../components/ProductListGroupCategory';
import Layout from '../../components/Layout';
import Banner from '../../components/Banner';
import TopBestSellingProductList from '../../components/TopBestSellingProductList';
import TopMostInterestedProductList from '../../components/TopMostInterestedProductList';
import HomeContext from './homeContext';
import reducer from './homeReducer';
import { axiosInstance } from '../../utils/database';
import FlashSale from '../../components/FlashSale';

const useStyles = makeStyles((theme) => ({
  item: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: '20px',
    padding: '10px',
    fontWeight: 'bolder',
    margin: '10px',
    display: 'flex',
    justifyContent: 'start',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#a2d2e5'
    }
  }
}));

const initialHomeState = {
  categoryList: [],
  top: 6,
  topBestSellingProductList: [],
  topBestSellingCurrentCategoryId: 0,
  topMostInterestedProductList: [],
  topMostInterestedCurrentCategoryId: 0,
  topFlashSaleProductList: [],
  topFlashSaleProductListCurrentCategoryId: 0
};

export default function Home() {
  const classes = useStyles();
  const history = useHistory();

  const [store, dispatch] = useReducer(reducer, initialHomeState);

  useEffect(() => {
    async function loadInitialData() {
      const categoryListRes = await axiosInstance.get(`/Categories`);

      if (categoryListRes.status !== 200) {
        alert('Error happened!');
      } else {
        const topBestSellingProductListRes = await axiosInstance.get(
          `/Products/TopBestSellingProductListByCategoryId?n=${store.top}&categoryId=${store.topBestSellingCurrentCategoryId}`
        );

        const topMostInterestedProductListRes = await axiosInstance.get(
          `/Products/TopMostInterestedProductListByCategoryId?n=${store.top}&categoryId=${store.topMostInterestedCurrentCategoryId}`
        );

        const topFlashSaleProductListRes = await axiosInstance.get(
          `/Products/TopPromotionProductListByCategoryId?n=${store.top}&categoryId=${store.topFlashSaleProductListCurrentCategoryId}`
        );

        dispatch({
          type: 'init',
          payload: {
            categoryList: categoryListRes.data,
            topBestSellingProductList: topBestSellingProductListRes.data,
            topMostInterestedProductList: topMostInterestedProductListRes.data,
            topFlashSaleProductList: topFlashSaleProductListRes.data
          }
        });
      }
    }

    loadInitialData();
  }, []);

  const handleRedirectToPromotionPage = () => {
    history.push('/promotion');
  };

  return (
    <>
      <Helmet>
        <title>Home | React App</title>
      </Helmet>
      <Banner />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Button className={classes.item} onClick={handleRedirectToPromotionPage}>
              <img src="./sale.png" style={{ marginRight: '15px' }} />
              Deal & Promotion
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button className={classes.item}>
              <img src="./voucher.png" style={{ marginRight: '15px' }} />
              Vouchers
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button className={classes.item}>
              <img src="./coupon.png" style={{ marginRight: '15px' }} />
              Top Up & eCoupon
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button className={classes.item}>
              <img src="./global.png" style={{ marginRight: '15px' }} />
              LazGlobal
            </Button>
          </Grid>
        </Grid>
        <div>
          <HomeContext.Provider value={{ store, dispatch }}>
            <FlashSale />
            <TopBestSellingProductList />
            <TopMostInterestedProductList />
            {store.categoryList.map((category) => {
              if (category.active === true) {
                return (
                  <ProductListGroupCategory
                    key={category.categoryId}
                    category={category}
                  />
                );
              } else {
                return;
              }
            })}
          </HomeContext.Provider>
        </div>
      </Container>
    </>
  );
}
