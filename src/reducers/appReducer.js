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

    case 'updateCustomer':
      return {
        ...state,
        customer: action.payload.customer
      };

    case 'updateSnackbar':
      return {
        ...state,
        snackbar: action.payload.snackbar
      };

    case 'updatePaymentMethod':
      return {
        ...state,
        paymentMethod: action.payload.paymentMethod
      };

    case 'updateDeliveryAddressOption':
      return {
        ...state,
        deliveryAddressOption: action.payload.deliveryAddressOption
      };

    default:
      return state;
  }
}
