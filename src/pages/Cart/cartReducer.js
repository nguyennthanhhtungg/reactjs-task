export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return action.payload;

    default:
      return state;
  }
}
