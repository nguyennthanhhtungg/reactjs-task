import React, { useEffect, useReducer, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container, Typography } from '@material-ui/core';
import { Link, useParams, useHistory } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import Layout from '../../components/Layout';
import GeneralProductInformation from '../../components/GeneralProductInformation';
import SimilarProductList from '../../components/SimilarProductList';
import ProductDesctiption from '../../components/ProductDescription';
import ProductDetails from '../../components/ProductDetails';
import YourBrowsingHistory from '../../components/YourBrowsingHistory';
import { axiosInstance } from '../../utils/database';
import ProductContext from './productContext';
import reducer from './productReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 20
  },
  breadcrumbs: {
    paddingTop: 10,
    paddingBottom: 10
  },
  link: {
    textDecoration: 'none'
  }
}));

export default function Product({ props }) {
  const initialProductState = {
    productId: 0,
    productName: '',
    shortDescription: '',
    detailDescription: '',
    productCode: '',
    expiryDate: Date.now(),
    manufacturingDate: Date.now(),
    price: 0,
    discount: 0,
    weight: 0,
    number: 0,
    attachedGift: '',
    origin: '',
    categoryId: 1,
    category: {
      categoryId: 0,
      categoryName: '',
      imageUrl: ''
    },
    supplierId: 0,
    supplier: {
      supplierId: 0,
      supplierName: '',
      location: '',
      logoUrl: '',
      description: ''
    },
    tax: 0,
    image: {}
  };

  const classes = useStyles();
  const history = useHistory();
  const [store, dispatch] = useReducer(reducer, initialProductState);

  const { id } = useParams();

  useEffect(() => {
    async function loadProduct() {
      const res = await axiosInstance.get(
        `/Products/ProductWithCategoryAndSuppilerById?id=${id}`
      );

      console.log(res);
      if (res.status !== 200) {
        history.push('/');
      } else {
        dispatch({
          type: 'init',
          payload: res.data
        });
      }
    }
    loadProduct();
  }, []);

  return (
    <Layout>
      <ProductContext.Provider value={{ store, dispatch }}>
        <Container className={classes.root}>
          <Breadcrumbs
            className={classes.breadcrumbs}
            separator={<NavigateNextIcon />}
            aria-label="breadcrumb"
          >
            <Link to="/" className={classes.link}>
              {store.category.categoryName}
            </Link>
            <Link to="/" className={classes.link}>
              SubMenu
            </Link>
            <Typography color="textPrimary">{store.productName}</Typography>
          </Breadcrumbs>
          <GeneralProductInformation />
          <SimilarProductList />
          <ProductDesctiption />
          <ProductDetails />
          <YourBrowsingHistory />
        </Container>
      </ProductContext.Provider>
    </Layout>
  );
}
