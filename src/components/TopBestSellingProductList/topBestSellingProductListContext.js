import { createContext } from 'react';

const defaultValue = {
  productList: [],
  top: 6,
  categoryList: [],
  currentCategoryId: 0
};

const TopBestSellingProductListContext = createContext(defaultValue);
export default TopBestSellingProductListContext;
