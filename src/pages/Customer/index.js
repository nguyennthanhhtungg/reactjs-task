import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import Helmet from 'react-helmet';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Order from './Order';
import Password from './Account/password';
import Payment from './Account/payment';
import Profile from './Account/profile';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CreateIcon from '@material-ui/icons/Create';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PaymentIcon from '@material-ui/icons/Payment';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ReceiptIcon from '@material-ui/icons/Receipt';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import Notification from './Notification';
import Voucher from './Voucher';
import AppContext from '../../contexts/appContext';

const useTreeItemStyles = makeStyles({
  root: {
    display: 'flex',
    marginTop: 5,
    marginBottom: 5
  },
  labelText: {
    textDecoration: 'none',
    marginLeft: 10,
    '&:hover': {
      color: 'orange'
    }
  }
});

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();

  const {
    labelText,
    labelIcon: LabelIcon,
    iconColor,
    isMainTitle,
    currentPath,
    toPath,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.root}>
          <LabelIcon style={{ color: 'gray' }} className={classes.labelIcon} />
          <Link
            variant="subtitle1"
            style={{
              fontWeight: isMainTitle === true ? 'bolder' : '',
              color:
                currentPath === toPath
                  ? 'orange'
                  : isMainTitle === true
                  ? 'black'
                  : 'gray'
            }}
            className={classes.labelText}
            to={toPath}
          >
            {labelText}
          </Link>
        </div>
      }
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  labelIcon: PropTypes.elementType.isRequired,
  labelText: PropTypes.string.isRequired
};

const useStyles = makeStyles({
  root: {
    paddingTop: 25,
    paddingBottom: 25
  },
  updateProfileLink: {
    textDecoration: 'none',
    color: 'gray'
  },
  treeView: {
    marginTop: 35,
    marginLeft: 35
  }
});

export default function Customer(props) {
  const classes = useStyles();
  const history = useHistory();

  const { store } = useContext(AppContext);

  if (
    props.location.pathname === '/customer' ||
    props.location.pathname === '/customer/account'
  ) {
    history.push('/customer/account/profile');
  }

  return (
    <>
      <Helmet>
        <title>{`${store.customer.customerName} | React App`}</title>
      </Helmet>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={3}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={store.customer.avatarUrl} />
            <div style={{ marginLeft: 10 }}>
              <Typography style={{ fontWeight: 'bolder' }}>
                {store.customer.customerName}
              </Typography>
              <Link
                to="/customer/account/profile"
                className={classes.updateProfileLink}
              >
                <CreateIcon fontSize="small" />
                Update Profile
              </Link>
            </div>
          </div>
          <TreeView
            className={classes.treeView}
            defaultExpanded={['1']}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
          >
            <StyledTreeItem
              nodeId="1"
              labelText="My Account"
              labelIcon={PersonIcon}
              isMainTitle={true}
              currentPath={props.location.pathname}
              toPath="/customer/account/profile"
            >
              <StyledTreeItem
                nodeId="2"
                labelText="My Profile"
                labelIcon={AccountCircleIcon}
                currentPath={props.location.pathname}
                toPath="/customer/account/profile"
              />
              <StyledTreeItem
                nodeId="3"
                labelText="My Payment Options"
                labelIcon={PaymentIcon}
                currentPath={props.location.pathname}
                toPath="/customer/account/payment"
              />
              <StyledTreeItem
                nodeId="5"
                labelText="Change Password"
                labelIcon={VpnKeyIcon}
                currentPath={props.location.pathname}
                toPath="/customer/account/password"
              />
            </StyledTreeItem>
            <StyledTreeItem
              nodeId="6"
              labelText="My Orders"
              labelIcon={ReceiptIcon}
              isMainTitle={true}
              currentPath={props.location.pathname}
              toPath="/customer/order"
            />
            <StyledTreeItem
              nodeId="7"
              labelText="Notification"
              labelIcon={NotificationsActiveIcon}
              isMainTitle={true}
              currentPath={props.location.pathname}
              toPath="/customer/notification"
            />
            <StyledTreeItem
              nodeId="8"
              labelText="My Vouchers"
              labelIcon={LoyaltyIcon}
              isMainTitle={true}
              currentPath={props.location.pathname}
              toPath="/customer/voucher"
            />
          </TreeView>
        </Grid>
        <Grid item xs={9}>
          {props.location.pathname === '/customer/account/profile' && <Profile />}
          {props.location.pathname === '/customer/account/payment' && <Payment />}
          {props.location.pathname === '/customer/account/password' && <Password />}
          {props.location.pathname === '/customer/order' && <Order />}
          {props.location.pathname === '/customer/notification' && <Notification />}
          {props.location.pathname === '/customer/voucher' && <Voucher />}
        </Grid>
      </Grid>
    </>
  );
}
