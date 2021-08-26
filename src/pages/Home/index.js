import React from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import JustForYou from '../../components/JustForYou';
import FlashSale from '../../components/FlashSale';
import Layout from '../../components/Layout';
import Banner from '../../components/Banner';
import TopBestSellingProductList from '../../components/TopBestSellingProductList';
import TopMostInterestedProductList from '../../components/TopMostInterestedProductList';

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

export default function Home() {
  const classes = useStyles();

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
          <FlashSale />
          <JustForYou />
        </div>
      </Container>
    </Layout>
  );
}
