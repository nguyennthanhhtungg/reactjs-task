import { createContext } from 'react';

const defaultValue = {
  type: 'COMMON',
  productList: [],
  categoryList: [],
  supplierList: [],
  fromPrice: 0,
  toPrice: 1000000000,
  rating: 0,
  keywords: '',
  selectedCategoryList: [],
  selectedSupplierList: []
};
const ProductsContext = createContext(defaultValue);

export default ProductsContext;
