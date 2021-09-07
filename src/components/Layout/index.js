import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Zoom from '@material-ui/core/Zoom';

import Header from './Header';
import Footer from './Footer';
import Context from '../../contexts';
import reducer from '../../reducers';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

const initialState = {
  numberProductsInCart: 0,
  productListInCart: []
};

export default function Layout(props) {
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let productListInCart = JSON.parse(localStorage.getItem('ProductListInCart'));
    let numberProductsInCart = 0;

    if (productListInCart !== null) {
      productListInCart.forEach((product) => {
        numberProductsInCart += parseInt(product.numberInCart);
      });
    } else {
      productListInCart = [];
    }

    dispatch({
      type: 'init',
      payload: {
        numberProductsInCart: numberProductsInCart,
        productListInCart: productListInCart
      }
    });
  }, []);

  return (
    <Context.Provider value={{ store, dispatch }}>
      <React.Fragment>
        <Header />
        <Toolbar id="back-to-top-anchor" />
        <Box my={8.5} style={{ backgroundColor: '#d3e9f3' }}>
          {props.children}
        </Box>
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <ArrowUpwardIcon />
          </Fab>
        </ScrollTop>
        <Footer />
      </React.Fragment>
    </Context.Provider>
  );
}
