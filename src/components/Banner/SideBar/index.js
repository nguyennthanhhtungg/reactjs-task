import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  sideBar: {
    display: 'block',
    backgroundColor: 'white',
    height: '100%'
  },
  link: {
    paddingLeft: '50px',
    paddingRight: '20px',
    fontSize: 'smaller',
    textDecoration: 'none',
    display: 'block',
    paddingTop: '5px',
    paddingBottom: '5px',
    '&:hover': {
      backgroundColor: '#d3e9f3'
    }
  }
}));

export default function SideBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.sideBar}>
      <Link to="/" className={classes.link}>
        Electronic Devices
      </Link>
      <Link to="/" className={classes.link}>
        Electronic Accessories
      </Link>
      <Link to="/" className={classes.link}>
        TV & Home Appliances
      </Link>
      <Link to="/" className={classes.link}>
        Health & Beauty
      </Link>
      <Link to="/" className={classes.link}>
        Babies & Toys
      </Link>
      <Link to="/" className={classes.link}>
        SIGNUP
      </Link>
      <Link to="/" className={classes.link}>
        Groceries & Pets
      </Link>
      <Link to="/" className={classes.link}>
        Home & Lifestyle
      </Link>
      <Link to="/" className={classes.link}>
        Women's Fashion
      </Link>
      <Link to="/" className={classes.link}>
        Men's Fashion
      </Link>
      <Link to="/" className={classes.link}>
        Fashion Accessories
      </Link>
      <Link to="/" className={classes.link}>
        Sports & Travel
      </Link>
      <Link to="/" className={classes.link}>
        Automotive & Motorcycles
      </Link>
    </div>
  );
}
