export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return {
        ...state,
        categoryList: action.payload.categoryList,
        supplierList: action.payload.supplierList,
        productList: action.payload.productList,
        keywords: action.payload.keywords
      };

    case 'changeType':
      return {
        ...state,
        type: action.payload.type,
        productList: action.payload.productList
      };

    case 'changeFromPrice':
      return {
        ...state,
        fromPrice: action.payload.fromPrice
      };

    case 'changeToPrice':
      return {
        ...state,
        toPrice: action.payload.toPrice
      };

    case 'changeSelectedCategory':
      return {
        ...state,
        selectedCategoryList: action.payload.selectedCategoryList
      };

    case 'changeSelectedSupplier':
      return {
        ...state,
        selectedSupplierList: action.payload.selectedSupplierList
      };

    case 'changeProductList':
      return {
        ...state,
        productList: action.payload.productList
      };

    default:
      return state;
  }
}
