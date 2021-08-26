import { createContext } from 'react';

const defaultValue = {
  productList: [],
  top: 6,
  categoryList: [],
  currentCategoryId: 0
};

const TopMostInterestedProductListContext = createContext(defaultValue);
export default TopMostInterestedProductListContext;
