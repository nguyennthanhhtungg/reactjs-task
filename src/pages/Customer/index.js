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
import reducer from './customerReducer';
import CustomerContext from './customerContext';
import { axiosInstance } from '../../utils/database';

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

const initialCustomerState = {
  myOrders: []
};

export default function Customer(props) {
  const classes = useStyles();
  const history = useHistory();
  const [store, dispatch] = useReducer(reducer, initialCustomerState);
  const appContext = useContext(AppContext);

  if (
    location.pathname === '/customer' ||
    location.pathname === '/customer/account'
  ) {
    history.push('/customer/account/profile');
  }

  useEffect(() => {
    async function loadInitialData() {
      const res = await axiosInstance.get(
        `/Orders/OrderListByCustomerId?customerId=${appContext.store.customer.customerId}`
      );

      if (res.status === 200) {
        dispatch({
          type: 'updateMyOrders',
          payload: {
            myOrders: res.data
          }
        });
      }
    }
    loadInitialData();
  }, [appContext.store.customer, dispatch]);

  return (
    <>
      <Helmet>
        <title>{`${appContext.store.customer.customerName} | React App`}</title>
      </Helmet>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={3}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={appContext.store.customer.avatarUrl} />
            <div style={{ marginLeft: 10 }}>
              <Typography style={{ fontWeight: 'bolder' }}>
                {appContext.store.customer.customerName}
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
              currentPath={location.pathname}
              toPath="/customer/account/profile"
            >
              <StyledTreeItem
                nodeId="2"
                labelText="My Profile"
                labelIcon={AccountCircleIcon}
                currentPath={location.pathname}
                toPath="/customer/account/profile"
              />
              <StyledTreeItem
                nodeId="3"
                labelText="My Payment Options"
                labelIcon={PaymentIcon}
                currentPath={location.pathname}
                toPath="/customer/account/payment"
              />
              <StyledTreeItem
                nodeId="5"
                labelText="Change Password"
                labelIcon={VpnKeyIcon}
                currentPath={location.pathname}
                toPath="/customer/account/password"
              />
            </StyledTreeItem>
            <StyledTreeItem
              nodeId="6"
              labelText="My Orders"
              labelIcon={ReceiptIcon}
              isMainTitle={true}
              currentPath={location.pathname}
              toPath="/customer/order"
            />
            <StyledTreeItem
              nodeId="7"
              labelText="Notification"
              labelIcon={NotificationsActiveIcon}
              isMainTitle={true}
              currentPath={location.pathname}
              toPath="/customer/notification"
            />
            <StyledTreeItem
              nodeId="8"
              labelText="My Vouchers"
              labelIcon={LoyaltyIcon}
              isMainTitle={true}
              currentPath={location.pathname}
              toPath="/customer/voucher"
            />
          </TreeView>
        </Grid>
        <Grid item xs={9}>
          <CustomerContext.Provider value={{ store, dispatch }}>
            {location.pathname === '/customer/account/profile' && <Profile />}
            {location.pathname === '/customer/account/payment' && <Payment />}
            {location.pathname === '/customer/account/password' && <Password />}
            {location.pathname === '/customer/order' && <Order />}
            {location.pathname === '/customer/notification' && <Notification />}
            {location.pathname === '/customer/voucher' && <Voucher />}
          </CustomerContext.Provider>
        </Grid>
      </Grid>
    </>
  );
}
