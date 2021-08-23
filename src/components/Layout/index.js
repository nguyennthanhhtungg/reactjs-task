import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Zoom from '@material-ui/core/Zoom';
import { Helmet } from 'react-helmet';

import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router } from 'react-router-dom';

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

export default function Layout(props) {
  return (
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
  );
}
