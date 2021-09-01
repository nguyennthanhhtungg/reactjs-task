import { createContext } from 'react';

const defaultValue = {
  type: 'common',
  categoryList: [],
  supplierList: [],
  fromPrice: 0,
  toPrice: Number.MAX_VALUE,
  rating: 0,
  keyword: ''
};

const PromotionContext = createContext(defaultValue);

export default PromotionContext;
