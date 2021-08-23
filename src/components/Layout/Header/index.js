import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core';
import logo from '../../../logo.svg';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory, Link } from 'react-router-dom';

import Menu from '../Menu';

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

  const clickLogoHandler = () => {
    history.push('/');
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
        <Link to="/login" className={classes.link}>
          LOGIN
        </Link>
        <Link to="/register" className={classes.link}>
          SIGNUP
        </Link>
        <Link to="/" className={classes.link}>
          THAY ĐỔI NGÔN NGỮ
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
          />
          <Button className={classes.searchButton}>
            <SearchIcon />
          </Button>
          <Button className={classes.cartButton}>
            <ShoppingCartIcon fontSize="large" />
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
