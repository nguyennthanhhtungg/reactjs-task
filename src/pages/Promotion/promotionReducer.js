export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return {
        ...state,
        categoryList: action.payload.categoryList,
        bannerAdvertisingList: action.payload.bannerAdvertisingList
      };

    default:
      return state;
  }
}
