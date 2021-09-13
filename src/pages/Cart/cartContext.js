import { createContext } from 'react';

const defaultValue = {
  subTotal: 0
};
const CartContext = createContext(defaultValue);

export default CartContext;
