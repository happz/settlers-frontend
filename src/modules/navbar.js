import { call, put } from 'redux-saga/effects';
import Backend from '../components/Backend.js';
import { errorMessage } from './messageBox.js';

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

export function pingBackend() {
  return {
    type: 'BACKEND-PING'
  };
}

export function fetchRecentEvents() {
  return {
    type: 'RECENT-EVENTS-FETCH'
  };
}

export function* doFetchRecentEvents() {
  try {
    const response = yield call(Backend, '/recent');

    if (response === null)
      return;

    yield put(updateFreeGamesCount(response.hasOwnProperty('freeGamesCount') ? response.freeGamesCount : 0));
  } catch(error) {
    yield put(errorMessage({
      text: error.message
    }));
  }
}

export function* doPingBackend() {
  try {
    yield call(Backend, '/ping');
  } catch(error) {
    yield put(errorMessage({
      text: error.message
    }));
  }
}
