import React, { useContext, useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core';
import logo from '../../../logo.svg';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory, Link } from 'react-router-dom';

import Menu from '../Menu';
import Badge from '@material-ui/core/Badge';
import Context from '../../../contexts/appContext';
import AccountNavBar from './AccountNavBar';

const useStyles = makeStyles((theme) => ({
  navBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
    backgroundColor: '#d3e9f3'
  },
  link: {
    marginLeft: '10px',
    marginRight: '10px',
    fontSize: 'smaller',
    textDecoration: 'none'
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  logo: {
    width: '80px',
    height: '80px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  search_cartDIV: {
    display: 'flex'
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    backgroundColor: '#d3e9f3',
    paddingLeft: '20px',
    width: '450px'
  },
  searchButton: {
    backgroundColor: 'orange',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'orange'
    }
  },
  cartButton: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white'
    }
  },
  advertisementImg: {
    width: '200px'
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const { store } = useContext(Context);

  const [keyWords, setKeyWords] = useState('');

  const handleChangeKeyWords = (e) => {
    setKeyWords(e.target.value);
  };

  const handleKeyDownSearching = (e) => {
    if (e.key === 'Enter' && keyWords !== '') {
      history.push(`/products?keywords=${keyWords}`);
    }
  };

  const handleClickSearching = (e) => {
    if (keyWords !== '') {
      history.push(`/products?keywords=${keyWords}`);
    }
  };

  const clickLogoHandler = () => {
    history.push('/');
  };

  const handleRedirectToCartPage = () => {
    history.push('/cart');
  };

  return (
    <AppBar color={'white'}>
      <div className={classes.navBar}>
        <Link to="/" className={classes.link}>
          SAVE MORE ON APP
        </Link>
        <Link to="/" className={classes.link}>
          SELL ON LAZADA
        </Link>
        <Link to="/" className={classes.link}>
          CUSTOMER CARE
        </Link>
        <Link to="/" className={classes.link}>
          TRACK MY ORDER
        </Link>
        {store.customer.customerName === undefined ? (
          <>
            <Link to="/login" className={classes.link}>
              LOGIN
            </Link>
            <Link to="/register" className={classes.link}>
              SIGNUP
            </Link>
          </>
        ) : (
          <AccountNavBar customer={store.customer} />
        )}

        <Link to="/" className={classes.link}>
          THAY ?????I NG??N NG???
        </Link>
      </div>
      <Toolbar className={classes.toolBar}>
        <img
          src={logo}
          alt="logo"
          className={classes.logo}
          onClick={clickLogoHandler}
        />
        <div className={classes.search_cartDIV}>
          <InputBase
            className={classes.searchInput}
            placeholder="Search in ReactJs"
            value={keyWords}
            onChange={handleChangeKeyWords}
            onKeyDown={handleKeyDownSearching}
          />
          <Button className={classes.searchButton} onClick={handleClickSearching}>
            <SearchIcon />
          </Button>
          <Button className={classes.cartButton} onClick={handleRedirectToCartPage}>
            <Badge badgeContent={store.numberProductsInCart} color="primary">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </Button>
        </div>
        <img
          src="https://icms-image.slatic.net/images/ims-web/43e8cafd-1111-4f3d-b6f0-df0a2dea069a.png"
          alt="advertisement"
          className={classes.advertisementImg}
        />
      </Toolbar>
      <Menu />
    </AppBar>
  );
}
