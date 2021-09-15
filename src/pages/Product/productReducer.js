export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return {
        ...state,
        product: action.payload.product,
        similarProductList: action.payload.similarProductList
      };

    case 'updateCommentList':
      return {
        ...state,
        commentList: action.payload.commentList
      };

    default:
      return state;
  }
}
