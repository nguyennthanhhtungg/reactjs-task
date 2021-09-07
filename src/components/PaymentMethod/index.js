import React from 'react';
import { makeStyles } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  radio: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 15
  }
}));

export default function PaymentMethod() {
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = React.useState('cod');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6">Payment Method</Typography>
      <div className={classes.radio}>
        <Radio
          checked={selectedValue === 'cod'}
          style={{ color: 'orange' }}
          onChange={handleChange}
          value="cod"
        />
        <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg" />
        <div style={{ marginLeft: 10 }}>Cash On Delivery (COD)</div>
      </div>
      <div className={classes.radio}>
        <Radio
          checked={selectedValue === 'zaloPay'}
          style={{ color: 'orange' }}
          onChange={handleChange}
          value="zaloPay"
        />
        <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-mo-mo.svg" />
        <div style={{ marginLeft: 10 }}>MOMO</div>
      </div>
      <div className={classes.radio}>
        <Radio
          checked={selectedValue === 'momo'}
          style={{ color: 'orange' }}
          onChange={handleChange}
          value="momo"
        />
        <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-zalo-pay.svg" />
        <div style={{ marginLeft: 10 }}>ZaloPay</div>
      </div>
      <div className={classes.radio}>
        <Radio
          checked={selectedValue === 'internetBanking'}
          style={{ color: 'orange' }}
          onChange={handleChange}
          value="internetBanking"
        />
        <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-atm.svg" />
        <div style={{ marginLeft: 10 }}>ATM Card/Internet Banking</div>
      </div>
      <div className={classes.radio}>
        <Radio
          checked={selectedValue === 'internationalCard'}
          style={{ color: 'orange' }}
          onChange={handleChange}
          value="internationalCard"
        />
        <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-credit.svg" />
        <div style={{ marginLeft: 10 }}>Visa, Master, JCB</div>
      </div>
    </div>
  );
}
