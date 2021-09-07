import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Context from '../../contexts';
import ProductInCart from '../ProductInCart';
import Dialog from '@material-ui/core/Dialog';
import Transition from 'react-transition-group/Transition';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15
  },
  deleteBtn: {
    fontSize: 'smaller',
    color: 'red',
    marginLeft: 5,
    '&:hover': {
      backgroundColor: 'white'
    }
  },
  body: {},
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

export default function ProductListInCart(props) {
  const classes = useStyles();
  const { store, dispatch } = useContext(Context);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleOpenDialog = () => {
    if (store.numberProductsInCart !== 0) {
      setOpen(true);
    }
  };

  const handleRemove = () => {
    localStorage.removeItem('ProductListInCart');

    dispatch({
      type: 'updateNumberProductsInCart',
      payload: {
        numberProductsInCart: 0
      }
    });

    dispatch({
      type: 'updateProductListInCart',
      payload: {
        productListInCart: []
      }
    });

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

      <div className={classes.header}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
          {/*<Checkbox checked={true} name="selectAll" color="primary" size="small" />*/}
          <Typography style={{ fontWeight: 'bolder' }} variant="subtitle2">
            TOTAL: {store.numberProductsInCart} ITEM(S)
          </Typography>
        </div>
        <Button className={classes.deleteBtn} onClick={handleOpenDialog}>
          <DeleteIcon fontSize="small" />
          DELETE ALL
        </Button>
      </div>
      <div className={classes.body}>
        {store.productListInCart.map((product) => {
          return <ProductInCart key={product.productId} product={product} />;
        })}
      </div>
    </div>
  );
}
