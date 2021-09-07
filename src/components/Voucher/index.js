import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10
  },
  voucherCodeInput: {
    borderColor: 'orange',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    width: '65%',
    '&:focus': {
      outline: 'none'
    }
  },
  voucherCodeBtn: {
    backgroundColor: 'orange',
    color: 'white',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'orange'
    }
  }
}));

export default function Voucher() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex' }}>
        <CardGiftcardIcon color="primary" />
        <Typography
          variant="subtitle1"
          style={{ fontWeight: 'bolder', marginLeft: 5 }}
        >
          Voucher
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          placeholder="Enter Voucher Code"
          className={classes.voucherCodeInput}
        />
        <Button className={classes.voucherCodeBtn}>APPLY</Button>
      </div>
    </div>
  );
}
