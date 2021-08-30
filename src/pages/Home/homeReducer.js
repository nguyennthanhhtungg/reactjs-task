export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return {
        ...state,
        categoryList: action.payload.categoryList,
        topBestSellingProductList: action.payload.topBestSellingProductList,
        topMostInterestedProductList: action.payload.topMostInterestedProductList,
        topFlashSaleProductList: action.payload.topFlashSaleProductList
      };

    case 'changeTopBestSellingCurrentCategoryId':
      return {
        ...state,
        topBestSellingProductList: action.payload.topBestSellingProductList,
        topBestSellingCurrentCategoryId:
          action.payload.topBestSellingCurrentCategoryId
      };

    case 'changeTopMostInterestedCurrentCategoryId':
      return {
        ...state,
        topMostInterestedProductList: action.payload.topMostInterestedProductList,
        topMostInterestedCurrentCategoryId:
          action.payload.topMostInterestedCurrentCategoryId
      };

    default:
      return state;
  }
}
