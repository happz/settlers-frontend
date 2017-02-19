import { call, put } from 'redux-saga/effects';
import Backend from '../components/Backend.js';
import { errorMessage } from '../modules/messageBox.js';
import { switchPage } from '../modules/page.js';

export default function reducer(state, action) {
  switch(action.type) {
    case 'GAME-UPDATE':
      return Object.assign({}, state, { game: action.game });

    case 'GAME-PAGE-SWITCH':
      return Object.assign({}, state, { page: action.page });

    default:
      if (!state)
        return {
          page: null,
          game: null
        };

      return state;
  }
}

export function updateGame(game) {
  return {
    type: 'GAME-UPDATE',
    game: game
  };
}

export function switchGamePage(page) {
  return {
    type: 'GAME-PAGE-SWITCH',
    page: page
  };
}

export function enterGame(page, gid, subpage) {
  return {
    type: 'GAME-ENTER',
    page: page,
    gid: gid,
    subpage: subpage
  };
}

export function* doEnterGame(action) {
  yield put(switchPage(action.page));
  yield put(switchGamePage(action.subpage));

  try {
    const response = yield call(Backend, '/game', {
      gid: action.gid
    });

    if (response === null)
      return;

    yield put(updateGame(response.game));
  } catch(error) {
    yield put(errorMessage({
      text: error.message
    }));
  }
}
