import React, { useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import * as queryString from 'query-string';

import ProductsContext from '../../pages/Products/productsContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { axiosInstance } from '../../utils/database';
import * as mySwal from '../../utils/mySwal';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    marginBottom: 30
  },
  priceItem: {
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 0,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    '&:focus': {
      outline: 'none'
    },
    width: '30%'
  },
  applyBtn: {
    backgroundColor: 'orange',
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 5,
    color: 'white',
    '&:hover': {
      backgroundColor: 'orange'
    }
  }
}));

export default function SearchFilter() {
  const classes = useStyles();
  const { store, dispatch } = useContext(ProductsContext);

  const handleChangeFromPrice = (e) => {
    const min = parseFloat(e.target.min);
    const value = parseFloat(e.target.value);
    const max = parseFloat(e.target.max);
    if (isNaN(value) || value < min) {
      dispatch({
        type: 'changeFromPrice',
        payload: {
          fromPrice: min
        }
      });
    } else if (value > max) {
      dispatch({
        type: 'changeFromPrice',
        payload: {
          fromPrice: max - 1
        }
      });
    } else {
      dispatch({
        type: 'changeFromPrice',
        payload: {
          fromPrice: value
        }
      });
    }
  };

  const handleChangeToPrice = (e) => {
    const min = parseFloat(e.target.min);
    const value = parseFloat(e.target.value);
    const max = parseFloat(e.target.max);
    if (isNaN(value) || value < min) {
      dispatch({
        type: 'changeToPrice',
        payload: {
          toPrice: max
        }
      });
    } else if (value > max) {
      dispatch({
        type: 'changeToPrice',
        payload: {
          toPrice: max - 1
        }
      });
    } else {
      dispatch({
        type: 'changeToPrice',
        payload: {
          toPrice: value
        }
      });
    }
  };

  const handleApply = async () => {
    mySwal.Loading();

    let productListRes = [];
    if (
      store.selectedCategoryList.length !== 0 ||
      store.selectedSupplierList.length !== 0
    ) {
      productListRes = await axiosInstance.get(
        `/Products/ProductListBySearchFilter`,
        {
          params: {
            type: store.type,
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
        `/Products/ProductListByKeyWords?keywords=${store.keywords}&type=${store.type}&fromPrice=${store.fromPrice}&toPrice=${store.toPrice}`
      );
    }

    dispatch({
      type: 'changeProductList',
      payload: {
        productList: productListRes.data
      }
    });

    mySwal.Close();
  };

  const handleChangeSelectedCategory = async (e) => {
    mySwal.Loading();

    let newSelectedCategoryList = [];
    if (e.target.checked === true) {
      newSelectedCategoryList = [
        ...store.selectedCategoryList,
        parseInt(e.target.value)
      ];
    } else {
      newSelectedCategoryList = store.selectedCategoryList.filter((value) => {
        if (value !== parseInt(e.target.value)) {
          return value;
        }
      });
    }
    dispatch({
      type: 'changeSelectedCategory',
      payload: {
        selectedCategoryList: newSelectedCategoryList
      }
    });

    //Update ProductList
    if (
      newSelectedCategoryList.length !== 0 ||
      store.selectedSupplierList.length !== 0
    ) {
      const productListRes = await axiosInstance.get(
        `/Products/ProductListBySearchFilter`,
        {
          params: {
            type: store.type,
            fromPrice: store.fromPrice,
            toPrice: store.toPrice,
            categoryIdList: newSelectedCategoryList,
            supplierIdList: store.selectedSupplierList
          },
          paramsSerializer: (params) => {
            return queryString.stringify(params);
          }
        }
      );

      dispatch({
        type: 'changeProductList',
        payload: {
          productList: productListRes.data
        }
      });
    }

    mySwal.Close();
  };

  const handleChangeSelectedSupplier = async (e) => {
    mySwal.Loading();

    let newSelectedSupplierList = [];
    if (e.target.checked === true) {
      newSelectedSupplierList = [
        ...store.selectedSupplierList,
        parseInt(e.target.value)
      ];
    } else {
      newSelectedSupplierList = store.selectedSupplierList.filter((value) => {
        if (value !== parseInt(e.target.value)) {
          return value;
        }
      });
    }

    dispatch({
      type: 'changeSelectedSupplier',
      payload: {
        selectedSupplierList: newSelectedSupplierList
      }
    });

    //Update ProductList
    if (
      newSelectedSupplierList.length !== 0 ||
      store.selectedCategoryList.length !== 0
    ) {
      const productListRes = await axiosInstance.get(
        `/Products/ProductListBySearchFilter`,
        {
          params: {
            type: store.type,
            fromPrice: store.fromPrice,
            toPrice: store.toPrice,
            categoryIdList: store.selectedCategoryList,
            supplierIdList: newSelectedSupplierList
          },
          paramsSerializer: (params) => {
            return queryString.stringify(params);
          }
        }
      );

      dispatch({
        type: 'changeProductList',
        payload: {
          productList: productListRes.data
        }
      });
    }

    mySwal.Close();
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
        SEARCH FILTER
      </Typography>
      <div style={{ marginLeft: 20 }}>
        <FormControl component="fieldset" style={{ display: 'block' }}>
          <FormLabel
            component="legend"
            style={{ fontWeight: 'bolder', color: 'black' }}
          >
            Category
          </FormLabel>
          <FormGroup>
            {store.categoryList.length === 0 ? (
              <CircularProgress style={{ margin: 20 }} />
            ) : (
              store.categoryList.map((category) => {
                return (
                  <FormControlLabel
                    key={category.categoryId}
                    control={
                      <Checkbox
                        value={category.categoryId}
                        onClick={handleChangeSelectedCategory}
                        checked={store.selectedCategoryList.includes(
                          category.categoryId
                        )}
                      />
                    }
                    label={category.categoryName}
                  />
                );
              })
            )}
          </FormGroup>
        </FormControl>
      </div>

      <hr style={{ color: '#a2d2e5' }} />

      <div style={{ marginLeft: 20 }}>
        <FormControl component="fieldset" style={{ display: 'block' }}>
          <FormLabel style={{ fontWeight: 'bolder', color: 'black' }}>
            Supplier
          </FormLabel>
          <FormGroup>
            {store.supplierList.length === 0 ? (
              <CircularProgress style={{ margin: 20 }} />
            ) : (
              store.supplierList.map((supplier) => {
                return (
                  <FormControlLabel
                    key={supplier.supplierId}
                    control={
                      <Checkbox
                        value={supplier.supplierId}
                        onClick={handleChangeSelectedSupplier}
                        checked={store.selectedSupplierList.includes(
                          supplier.supplierId
                        )}
                      />
                    }
                    label={supplier.supplierName}
                  />
                );
              })
            )}
          </FormGroup>
        </FormControl>
      </div>

      <hr style={{ color: '#a2d2e5' }} />

      <div style={{ marginLeft: 20 }}>
        <FormControl component="fieldset" style={{ display: 'block' }}>
          <FormLabel style={{ fontWeight: 'bolder', color: 'black' }}>
            Range Price
          </FormLabel>
          <FormGroup
            row={true}
            style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}
          >
            <input
              value={store.fromPrice === 0 ? '' : store.fromPrice}
              onChange={handleChangeFromPrice}
              type="number"
              min={0}
              max={1000000000}
              placeholder="From"
              className={classes.priceItem}
            />
            <Typography style={{ marginLeft: 5, marginRight: 5 }}>-</Typography>
            <input
              value={store.toPrice === 1000000000 ? '' : store.toPrice}
              onChange={handleChangeToPrice}
              type="number"
              min={0}
              max={1000000000}
              placeholder="To"
              className={classes.priceItem}
            />
            <Button size="small" className={classes.applyBtn} onClick={handleApply}>
              Apply
            </Button>
          </FormGroup>
        </FormControl>
      </div>

      <hr style={{ color: '#a2d2e5' }} />

      <div style={{ marginLeft: 20 }}>
        <FormControl component="fieldset" style={{ display: 'block' }}>
          <FormLabel style={{ fontWeight: 'bolder', color: 'black' }}>
            Rating
          </FormLabel>
          <FormGroup>
            <Box style={{ display: 'flex' }}>
              <Rating value={5} readOnly />
            </Box>
            <Box style={{ display: 'flex' }}>
              <Rating value={4} readOnly />
              <Typography style={{ marginLeft: 5 }}>more</Typography>
            </Box>
            <Box style={{ display: 'flex' }}>
              <Rating value={3} readOnly />
              <Typography style={{ marginLeft: 5 }}>more</Typography>
            </Box>
            <Box style={{ display: 'flex' }}>
              <Rating value={2} readOnly />
              <Typography style={{ marginLeft: 5 }}>more</Typography>
            </Box>
            <Box style={{ display: 'flex' }}>
              <Rating value={1} readOnly />
              <Typography style={{ marginLeft: 5 }}>more</Typography>
            </Box>
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
}
