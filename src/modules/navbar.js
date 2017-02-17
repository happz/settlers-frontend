export default function reducer(state, action) {
  switch(action.type) {
    case 'FREE-GAMES-COUNT-UPDATE':
      if (state.freeGamesCount === action.count)
        return state;

      return Object.assign({}, state, { freeGamesCount: action.count });

    case 'TRUMPET-UPDATE':
      if (state.trumpet === action.text)
        return state;

      return Object.assign({}, state, { trumpet: action.text });

    default:
      if (!state)
        return {
          freeGamesCount: null
        };

      return state;
  }
}

export function updateFreeGamesCount(count) {
  return {
    type: 'FREE-GAMES-COUNT-UPDATE',
    count: count
  };
}

export function updateTrumpet(text) {
  return {
    type: 'TRUMPET-UPDATE',
    text: text
  };
}
