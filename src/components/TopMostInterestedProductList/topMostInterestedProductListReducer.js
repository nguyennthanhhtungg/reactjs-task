export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return {
        ...state,
        productList: action.payload.productList,
        categoryList: action.payload.categoryList
      };

    case 'changeTop':
      return {
        ...state,
        productList: action.payload.productList,
        top: action.payload.top
      };

    case 'changeCategoryId':
      return {
        ...state,
        productList: action.payload.productList,
        currentCategoryId: action.payload.currentCategoryId
      };

    default:
      return state;
  }
}
