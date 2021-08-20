import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Radio from '@material-ui/core/Radio';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8),
    backgroundColor: '#d3e9f3'
  },
  subtitle: {
    fontWeight: 'bold',
    color: 'purple'
  },
  link: {
    fontSize: 'smaller',
    textDecoration: 'none',
    display: 'block',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  },
  paymentMethodLogo: {
    marginRight: '15px',
    height: '64px',
    width: '64px',
    borderWidth: '2px',
    borderColor: 'blue'
  },
  download: {
    display: 'block'
  }
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={3}>
        <Typography variant="subtitle1" className={classes.subtitle} gutterBottom>
          CONTACT US
        </Typography>
        <div>
          <Link to="/" className={classes.link}>
            Hotline & Online chat (24/7)
          </Link>
          <Link to="/" className={classes.link}>
            Help Center
          </Link>
          <Link to="/" className={classes.link}>
            How to Buy
          </Link>
          <Link to="/" className={classes.link}>
            Shipping & Delivery
          </Link>
          <Link to="/" className={classes.link}>
            International Product Policy
          </Link>
          <Link to="/" className={classes.link}>
            How to Return
          </Link>
          <Link to="/" className={classes.link}>
            About Lazada
          </Link>
          <Link to="/" className={classes.link}>
            Sell on Lazada
          </Link>
          <Link to="/" className={classes.link}>
            Afﬁliate Program
          </Link>
          <Link to="/" className={classes.link}>
            HCareers
          </Link>
          <Link to="/" className={classes.link}>
            Terms & Conditions
          </Link>
          <Link to="/" className={classes.link}>
            Privacy Policy
          </Link>
          <Link to="/" className={classes.link}>
            Press & Media
          </Link>
          <Link to="/" className={classes.link}>
            Intellectual Property Protection
          </Link>
          <Link to="/" className={classes.link}>
            Operating Regulation
          </Link>
          <Link to="/" className={classes.link}>
            Procedure of claim and dispute handling
          </Link>
        </div>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="subtitle1" className={classes.subtitle} gutterBottom>
          Payment Methods
        </Typography>
        <img src="./visa.svg" alt="visa" className={classes.paymentMethodLogo} />
        <img src="./paypal.png" alt="paypal" className={classes.paymentMethodLogo} />
        <img src="./jcb.png" alt="jcb" className={classes.paymentMethodLogo} />
        <img
          src="./mastercard.svg"
          alt="mastercard"
          className={classes.paymentMethodLogo}
        />
      </Grid>
      <Grid item xs={3}>
        <Typography variant="subtitle1" className={classes.subtitle} gutterBottom>
          Delivery Services
        </Typography>
        <img
          src="https://laz-img-cdn.alicdn.com/tfs/TB1bsKlX8WD3KVjSZFsXXcqkpXa-190-50.png"
          alt="ahamove"
        />
      </Grid>
      <Grid item xs={3}>
        <Typography variant="subtitle1" className={classes.subtitle} gutterBottom>
          Download My App
        </Typography>
        <img src="./app-store-logo.svg" />
        <img
          src="./google-play-logo.png"
          className={classes.download}
          style={{ height: '120px' }}
        />
      </Grid>
    </Grid>
  );
}
