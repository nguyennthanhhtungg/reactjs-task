export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return {
        categoryList: action.payload.categoryList
      };

    default:
      return state;
  }
}
