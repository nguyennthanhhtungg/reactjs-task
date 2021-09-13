export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return action.payload;

    case 'updateSubTotal':
      return {
        ...state,
        subTotal: action.payload.subTotal
      };

    default:
      return state;
  }
}
