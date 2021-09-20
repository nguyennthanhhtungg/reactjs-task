export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return action.payload;

    case 'updateMyOrders':
      return {
        ...state,
        myOrders: action.payload.myOrders
      };

    default:
      return state;
  }
}
