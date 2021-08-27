import React, { useEffect, useReducer } from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import ProductListGroupCategory from '../../components/ProductListGroupCategory';
import Layout from '../../components/Layout';
import Banner from '../../components/Banner';
import TopBestSellingProductList from '../../components/TopBestSellingProductList';
import TopMostInterestedProductList from '../../components/TopMostInterestedProductList';
import HomeContext from './homeContext';
import reducer from './homeReducer';
import { axiosInstance } from '../../utils/database';

const useStyles = makeStyles((theme) => ({
  items: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  item: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '10px',
    fontWeight: 'bolder',
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#a2d2e5'
    }
  }
}));

const initialHomeState = {
  categoryList: []
};

export default function Home() {
  const classes = useStyles();

  const [store, dispatch] = useReducer(reducer, initialHomeState);

  useEffect(() => {
    async function loadCategoryList() {
      const categoryListRes = await axiosInstance.get(`/Categories`);

      if (categoryListRes.status !== 200) {
        alert('Error happened!');
      } else {
        dispatch({
          type: 'init',
          payload: {
            categoryList: categoryListRes.data
          }
        });
      }
    }

    loadCategoryList();
  }, []);

  return (
    <Layout>
      <Banner />
      <Container maxWidth="lg">
        <Grid container className={classes.items}>
          <Grid item xs={3}>
            <div className={classes.item}>
              <img src="./mall.png" style={{ marginRight: '15px' }} />
              LazMall
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.item}>
              <img src="./voucher.png" style={{ marginRight: '15px' }} />
              Vouchers
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.item}>
              <img src="./coupon.png" style={{ marginRight: '15px' }} />
              Top Up & eCoupon
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.item}>
              <img src="./global.png" style={{ marginRight: '15px' }} />
              LazGlobal
            </div>
          </Grid>
        </Grid>
        <div>
          <TopBestSellingProductList />
          <TopMostInterestedProductList />
          <HomeContext.Provider value={{ store, dispatch }}>
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
    </Layout>
  );
}
