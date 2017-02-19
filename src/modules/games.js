import { call, put } from 'redux-saga/effects';
import Backend from '../components/Backend.js';
import { errorMessage } from './messageBox.js';

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

export function updateGame(game) {
  return {
    type: 'GAME-UPDATE',
    game: game
  };
}

export function fetchGames() {
  return {
    type: 'GAME-LIST-FETCH'
  };
}

export function* doFetchGames() {
  try {
    const response = yield call(Backend, '/games');

    if (response === null)
      return;

    yield put(updateGameList('activeGames', response.active));
    yield put(updateGameList('freeGames', response.free));
    yield put(updateGameList('inactiveGames', response.inactive));
  } catch(error) {
    yield put(errorMessage({
      text: error.message
    }));
  }
}
