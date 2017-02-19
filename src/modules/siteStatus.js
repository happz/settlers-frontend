import { call, put } from 'redux-saga/effects';
import Backend from '../components/Backend.js';
import { errorMessage } from './messageBox.js';

export default function reducer(state, action) {
  switch(action.type) {
    case 'SITE-STATUS-UPDATE':
      if (state === action.status)
        return state;

      return action.status;

    default:
      if (!state)
        return 'online';

      return state;
  }
};

export function updateSiteStatus(status) {
  return {
    type: 'SITE-STATUS-UPDATE',
    status: status
  };
}

export function fetchSiteStatus() {
  return {
    type: 'SITE-STATUS-FETCH'
  };
}

export function* doFetchSiteStatus(action) {
  try {
    const response = yield call(Backend, '/site-status');

    if (response === null)
      return;

    yield put(updateSiteStatus(response.maintenance === true ? 'maintenance' : 'online'));
  } catch (error) {
    yield put(errorMessage({
      text: error.message
    }));
  }
}
