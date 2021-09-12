import React, { useEffect, useReducer, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container, Typography } from '@material-ui/core';
import { Link, useParams, useHistory } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';

import Layout from '../../components/Layout';
import GeneralProductInformation from '../../components/GeneralProductInformation';
import SimilarProductList from '../../components/SimilarProductList';
import ProductDesctiption from '../../components/ProductDescription';
import ProductDetails from '../../components/ProductDetails';
import YourBrowsingHistory from '../../components/YourBrowsingHistory';
import { axiosInstance } from '../../utils/database';
import ProductContext from './productContext';
import reducer from './productReducer';
import Helmet from 'react-helmet';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 20
  },
  breadcrumbs: {
    marginRight: 'auto'
  },
  link: {
    textDecoration: 'none'
  },
  backBtn: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'orange',
    backgroundColor: 'white',
    color: 'orange'
  }
}));

const initialProductState = {
  product: {
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
  },
  similarProductList: []
};

export default function Product({ props }) {
  const classes = useStyles();
  const history = useHistory();
  const [store, dispatch] = useReducer(reducer, initialProductState);

  const { id } = useParams();
  useEffect(() => {
    async function loadInit() {
      const productRes = await axiosInstance.get(
        `/Products/ProductWithCategoryAndSuppilerById?id=${id}`
      );

      if (productRes.status !== 200) {
        history.push('/');
      } else {
        const similarProductListRes = await axiosInstance.get(
          `/Products/ProductListByCategoryId?categoryId=${productRes.data.categoryId}`
        );

        dispatch({
          type: 'init',
          payload: {
            product: productRes.data,
            similarProductList: similarProductListRes.data
          }
        });
      }
    }
    loadInit();

    async function increaseHitCounterBy1Unit() {
      await axiosInstance.get(
        `/Products/IncreaseHitCounterBy1UnitByProductId?productId=${id}`
      );
    }
    increaseHitCounterBy1Unit();
  }, [id]);

  const handleClickBack = () => {
    history.push('/');
  };

  return (
    <ProductContext.Provider value={{ store, dispatch }}>
      <Helmet>
        <title>{store.product.productName} | React App</title>
      </Helmet>
      <Container className={classes.root}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <Breadcrumbs
            className={classes.breadcrumbs}
            separator={<NavigateNextIcon />}
            aria-label="breadcrumb"
          >
            <Link to="/" className={classes.link}>
              {store.product.category.categoryName}
            </Link>
            <Link to="/" className={classes.link}>
              SubMenu
            </Link>
            <Typography color="textPrimary">{store.product.productName}</Typography>
          </Breadcrumbs>
          <Button
            onClick={handleClickBack}
            variant="outlined"
            className={classes.backBtn}
            size="small"
          >
            BACK
            <NavigateNextIcon />
          </Button>
        </div>
        <GeneralProductInformation />
        <SimilarProductList />
        <ProductDesctiption />
        <ProductDetails />
        <YourBrowsingHistory />
      </Container>
    </ProductContext.Provider>
  );
}
