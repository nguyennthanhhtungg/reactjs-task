import { createContext } from 'react';

const defaultValue = {
  categoryList: [],
  top: 6,
  bannerAdvertisingList: []
};

const PromotionContext = createContext(defaultValue);

export default PromotionContext;
