export default function reducer(state, action) {
  switch(action.type) {
    case 'GAME-LIST-UPDATE':
      let newState = {};
      newState[action.list] = action.games;

      return Object.assign({}, state, newState);

    default:
      if (!state)
        return {
          activeGames: [],
          freeGames: [],
          inactiveGames: [],
          archivedGames: []
        };

      return state;
  }
}

export function updateGameList(list, games) {
  return {
    type: 'GAME-LIST-UPDATE',
    list: list,
    games: games
  };
}
