import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  menu: {
    textDecoration: 'none',
    display: 'block',
    padding: 8,
    marginLeft: 5,
    marginRight: 5,
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

export default function SubMenu({ menu }) {
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
        to="/"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        className={classes.menu}
      >
        {menu.title}
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
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        disableRestoreFocus
      >
        <div>
          {menu.subMenu.map((item) => {
            return (
              <Link key={item.id} to="/" className={classes.subMenu}>
                {item.title}
              </Link>
            );
          })}
        </div>
      </Popover>
    </div>
  );
}
