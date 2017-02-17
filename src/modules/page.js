export default function reducers(state, action) {
  switch(action.type) {
    case 'PAGE-SWITCH':
      if (state === action.newPage)
        return state;

      return action.newPage;

    default:
      if (!state)
        return null;

      return state;
  }
}

export function switchPage(newPage) {
  return {
    type: 'PAGE-SWITCH',
    newPage: newPage
  }
}
