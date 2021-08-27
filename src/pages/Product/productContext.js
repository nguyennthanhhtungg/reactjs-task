import { createContext } from 'react';

const defaultValue = {
  product: {
    productId: 0,
    productName: '',
    shortDescription: '',
    detailDescription: '',
    productCode: '',
    expiryDate: Date.now(),
    manufacturingDate: Date.now(),
    price: 0,
    discount: 0,
    weight: 0,
    number: 0,
    attachedGift: '',
    origin: '',
    categoryId: 1,
    category: {
      categoryId: 0,
      categoryName: '',
      imageUrl: ''
    },
    supplierId: 0,
    supplier: {
      supplierId: 0,
      supplierName: '',
      location: '',
      logoUrl: '',
      description: ''
    },
    tax: 0,
    image: {}
  },
  similarProductList: []
};
const ProductContext = createContext(defaultValue);

export default ProductContext;
