import React, { useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Context from '../../contexts';
import { numberWithCommas } from '../../utils/currency';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Transition from 'react-transition-group/Transition';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  quantityInput: {
    padding: 5,
    width: 20,
    borderRadius: 0,
    borderStyle: 'solid',
    borderWidth: '1px 0px 1px 0px',
    textAlign: 'center',
    '&:focus': {
      outline: 'none'
    }
  },
  subtractBtn: {
    borderStyle: 'solid',
    borderColor: 'gray',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 1
  },
  addBtn: {
    borderStyle: 'solid',
    borderColor: 'gray',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1
  },
  productLink: {
    color: 'black',
    fontSize: 'smaller',
    textDecoration: 'none',
    '&:hover': {
      color: 'blue'
    }
  },
  newPrice: {
    marginLeft: 10,
    fontWeight: 'bolder',
    fontSize: 'smaller',
    width: '10%',
    textAlign: 'end'
  },
  oldPrice: {
    marginLeft: 5,
    color: 'gray',
    textDecoration: 'line-through',
    fontSize: 'smaller',
    width: '10%'
  },
  actualPrice: {
    marginLeft: 10,
    fontWeight: 'bolder',
    fontSize: 'smaller',
    width: '10%',
    textAlign: 'end'
  },
  deleteBtn: {
    fontSize: 'smaller',
    color: 'red',
    marginLeft: 5,
    '&:hover': {
      backgroundColor: 'white'
    }
  },
  cancelBtn: {
    backgroundColor: 'lightgray',
    '&:hover': {
      backgroundColor: 'lightgray'
    }
  },
  removeBtn: {
    backgroundColor: 'orange',
    color: 'white',
    '&:hover': {
      backgroundColor: 'orange'
    }
  }
}));

export default function ProductInCart({ product }) {
  const classes = useStyles();
  const { store, dispatch } = useContext(Context);
  const [open, setOpen] = React.useState(false);

  const [number, setNumber] = useState(product.numberInCart);

  useEffect(() => {
    const productListInCart = JSON.parse(localStorage.getItem('ProductListInCart'));
    let numberProductsInCart = 0;

    productListInCart.forEach((product) => {
      numberProductsInCart += product.numberInCart;
    });

    dispatch({
      type: 'updateNumberProductsInCart',
      payload: {
        numberProductsInCart: numberProductsInCart
      }
    });

    dispatch({
      type: 'updateProductListInCart',
      payload: {
        productListInCart: productListInCart
      }
    });
  }, [number, dispatch]);

  const handleDecreaseNumberByOneUnit = () => {
    let newProductListInCart = store.productListInCart.map((item) => {
      if (item.productId === product.productId) {
        item.numberInCart -= 1;
      }
      return item;
    });

    localStorage.setItem('ProductListInCart', JSON.stringify(newProductListInCart));

    setNumber(number - 1);
  };

  const handleIncreaseNumberByOneUnit = () => {
    let newProductListInCart = store.productListInCart.map((item) => {
      if (item.productId === product.productId) {
        item.numberInCart += 1;
      }
      return item;
    });

    localStorage.setItem('ProductListInCart', JSON.stringify(newProductListInCart));

    setNumber(number + 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleRemove = () => {
    let newProductListInCart = store.productListInCart.filter((item) => {
      if (item.productId !== product.productId) {
        return item;
      }
    });

    localStorage.setItem('ProductListInCart', JSON.stringify(newProductListInCart));

    setNumber(0);

    handleClose();

    location.reload();
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{'Remove from Cart'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Item(s) will be removed from order
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} className={classes.cancelBtn}>
            Cancel
          </Button>
          <Button onClick={handleRemove} className={classes.removeBtn}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/*<Checkbox checked={true} name="select" color="primary" size="small" />*/}
      <img src={product.imageUrl} style={{ width: '10%' }} />
      <div style={{ marginLeft: 10, width: '30%', alignSelf: 'flex-start' }}>
        <Link to={`/product/${product.productId}`} className={classes.productLink}>
          {product.productName}
        </Link>
        <Typography
          variant="subtitle2"
          style={{ color: 'gray', fontSize: 'smaller' }}
        >
          {product.category.categoryName}
        </Typography>
      </div>
      <div className={classes.newPrice}>
        {numberWithCommas(product.price * ((100 - product.discount) / 100))}đ
      </div>
      <div className={classes.oldPrice}>{numberWithCommas(product.price)}đ</div>
      <div style={{ display: 'flex', marginLeft: 5 }}>
        <Button
          className={classes.subtractBtn}
          size="small"
          disabled={product.numberInCart === 1 ? true : false}
          onClick={handleDecreaseNumberByOneUnit}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <input className={classes.quantityInput} value={number} readOnly />
        <Button
          className={classes.addBtn}
          size="small"
          onClick={handleIncreaseNumberByOneUnit}
        >
          <AddIcon fontSize="small" />
        </Button>
      </div>
      <div className={classes.actualPrice}>
        {numberWithCommas(
          product.price * ((100 - product.discount) / 100) * product.numberInCart
        )}
        đ
      </div>
      <Button className={classes.deleteBtn} size="small" onClick={handleOpenDialog}>
        <DeleteIcon fontSize="small" />
      </Button>
    </div>
  );
}
