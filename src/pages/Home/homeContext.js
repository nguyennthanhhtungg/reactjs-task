import { createContext } from 'react';

const defaultValue = {
  categoryList: [],
  top: 6,
  topBestSellingProductList: [],
  topBestSellingCurrentCategoryId: 0,
  topMostInterestedProductList: [],
  topMostInterestedCurrentCategoryId: 0,
  topFlashSaleProductList: [],
  topFlashSaleProductListCurrentCategoryId: 0
};

const HomeContext = createContext(defaultValue);

export default HomeContext;
