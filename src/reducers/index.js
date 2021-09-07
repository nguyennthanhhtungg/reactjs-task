export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return {
        ...state,
        numberProductsInCart: action.payload.numberProductsInCart,
        productListInCart: action.payload.productListInCart
      };

    case 'updateProductListInCart':
      return {
        ...state,
        productListInCart: action.payload.productListInCart
      };

    case 'updateNumberProductsInCart':
      return {
        ...state,
        numberProductsInCart: action.payload.numberProductsInCart
      };

    default:
      return state;
  }
}
