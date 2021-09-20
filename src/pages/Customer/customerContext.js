import { createContext } from 'react';

const defaultValue = {
  myOrders: []
};
const CustomerContext = createContext(defaultValue);

export default CustomerContext;
