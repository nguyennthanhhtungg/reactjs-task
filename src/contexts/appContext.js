import { createContext } from 'react';

const defaultValue = {
  customer: {},
  numberProductsInCart: 0,
  productListInCart: [],
  snackbar: {
    open: false,
    severity: '',
    message: ''
  }
};

const AppContext = createContext(defaultValue);

export default AppContext;
