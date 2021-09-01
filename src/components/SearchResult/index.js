import React, { useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ProductsContext from '../../pages/Products/productsContext';
import CustomSkeleton from '../CustomSkeleton';
import ProductCard from '../ProductCard';
import HomeContext from '../../pages/Home/homeContext';
import { axiosInstance } from '../../utils/database';
import * as queryString from 'query-string';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    marginBottom: 30
  },
  controlBoard: {
    backgroundColor: '#a2d2e5',
    display: 'flex'
  },
  chosen: {
    backgroundColor: 'orange',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 'smaller',
    color: 'white',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'orange'
    }
  },
  unchosen: {
    backgroundColor: 'white',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 'smaller',
    color: 'black',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'white'
    }
  },
  productDIV: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 20
  }
}));

export default function SearchResult() {
  const classes = useStyles();
  const { store, dispatch } = useContext(ProductsContext);
  const MySwal = withReactContent(Swal);

  const handleChangeType = async (e) => {
    MySwal.fire({
      title: 'Please Wait !',
      html: 'Loading...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        MySwal.showLoading();
      }
    });

    let productListRes = [];
    if (
      store.selectedCategoryList.length !== 0 ||
      store.selectedSupplierList.length !== 0
    ) {
      productListRes = await axiosInstance.get(
        `/Products/ProductListBySearchFilter`,
        {
          params: {
            type: e.target.innerText,
            fromPrice: store.fromPrice,
            toPrice: store.toPrice,
            categoryIdList: store.selectedCategoryList,
            supplierIdList: store.selectedSupplierList
          },
          paramsSerializer: (params) => {
            return queryString.stringify(params);
          }
        }
      );
    } else {
      productListRes = await axiosInstance.get(
        `/Products/ProductListByKeyWords?keywords=${store.keywords}&type=${e.target.innerText}&fromPrice=${store.fromPrice}&toPrice=${store.toPrice}`
      );
    }

    dispatch({
      type: 'changeType',
      payload: {
        type: e.target.innerText,
        productList: productListRes.data
      }
    });

    MySwal.close();
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" style={{ marginLeft: 30 }}>
        {store.keywords}:{' '}
        <span style={{ color: 'gray' }}>{store.productList.length} results</span>
      </Typography>
      <div className={classes.controlBoard}>
        <Button
          className={store.type === 'COMMON' ? classes.chosen : classes.unchosen}
          onClick={handleChangeType}
        >
          Common
        </Button>
        <Button
          className={store.type === 'NEWEST' ? classes.chosen : classes.unchosen}
          onClick={handleChangeType}
        >
          Newest
        </Button>
        <Button
          className={
            store.type === 'BEST SELLING' ? classes.chosen : classes.unchosen
          }
          onClick={handleChangeType}
        >
          Best Selling
        </Button>
      </div>
      <Box flexWrap="wrap" className={classes.productDIV}>
        {store.productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </div>
  );
}
