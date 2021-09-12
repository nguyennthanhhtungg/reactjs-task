import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Link } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme) => ({
  menu: {
    textDecoration: 'none',
    display: 'block',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 'smaller',
    '&:hover': {
      backgroundColor: '#d3e9f3'
    }
  },
  subMenu: {
    textDecoration: 'none',
    display: 'block',
    padding: 8,
    marginLeft: 5,
    marginRight: 5,
    '&:hover': {
      backgroundColor: '#d3e9f3'
    }
  },
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    pointerEvents: 'auto',
    padding: theme.spacing(1)
  }
}));

export default function AccountNavBar({ customer }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <Link
        to="/account"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        className={classes.menu}
      >
        {`${customer.customerName.toUpperCase()}'S ACCOUNT`}
      </Link>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        disableRestoreFocus
      >
        <div>
          <Link to="/account" className={classes.subMenu}>
            My Account
          </Link>
          <Link to="/orders" className={classes.subMenu}>
            My Orders
          </Link>
          <Link to="/logout" className={classes.subMenu}>
            Log Out
          </Link>
        </div>
      </Popover>
    </div>
  );
}
