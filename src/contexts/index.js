import { createContext } from 'react';

const defaultValue = {
  numberProductsInCart: 0,
  productListInCart: []
};

const Context = createContext(defaultValue);

export default Context;
