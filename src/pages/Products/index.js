import React, { useEffect, useReducer } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import reducer from '../Products/productsReducer';
import { axiosInstance } from '../../utils/database';
import Grid from '@material-ui/core/Grid';
import SearchFilter from '../../components/SearchFilter';
import SearchResult from '../../components/SearchResult';
import ProductsContext from './productsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 30,
    paddingBottom: 30
  },
  gridLeft: {
    borderRadius: 1,
    borderStyle: 'solid',
    borderColor: '#a2d2e5',
    borderWidth: 1
  },
  gridRight: {
    borderRadius: 1,
    borderStyle: 'solid',
    borderColor: '#a2d2e5',
    borderWidth: 1
  }
}));

const initialProductsState = {
  type: 'COMMON',
  productList: [],
  categoryList: [],
  supplierList: [],
  fromPrice: 0,
  toPrice: 1000000000,
  rating: 0,
  keywords: '',
  selectedCategoryList: [],
  selectedSupplierList: []
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Products(props) {
  const classes = useStyles();
  const history = useHistory();
  const [store, dispatch] = useReducer(reducer, initialProductsState);

  const query = useQuery();
  const keywords = query.get('keywords');

  useEffect(() => {
    async function loadInit() {
      const categoryListRes = await axiosInstance.get(`/Categories`);
      const supplierListRes = await axiosInstance.get(`/Suppliers`);
      const productListRes = await axiosInstance.get(
        `/Products/ProductListByKeyWords?keywords=${keywords}&type=${store.type}&fromPrice=${store.fromPrice}&toPrice=${store.toPrice}`
      );

      dispatch({
        type: 'init',
        payload: {
          categoryList: categoryListRes.data,
          supplierList: supplierListRes.data,
          productList: productListRes.data,
          keywords: keywords
        }
      });
    }

    loadInit();
  }, [keywords]);

  return (
    <ProductsContext.Provider value={{ store, dispatch }}>
      <Helmet>
        <title>{store.keywords} | React App</title>
      </Helmet>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container style={{ backgroundColor: 'white' }}>
          <Grid item xs={3} className={classes.gridLeft}>
            <SearchFilter />
          </Grid>
          <Grid item xs={9} className={classes.gridRight}>
            <SearchResult />
          </Grid>
        </Grid>
      </Container>
    </ProductsContext.Provider>
  );
}
