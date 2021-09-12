import { createContext } from 'react';

const defaultValue = {
  customer: {},
  numberProductsInCart: 0,
  productListInCart: []
};

const AppContext = createContext(defaultValue);

export default AppContext;
