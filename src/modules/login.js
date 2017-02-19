import { call, put } from 'redux-saga/effects';
import Backend from '../components/Backend.js';
import { switchPage } from '../modules/page.js';
import { errorMessage } from '../modules/messageBox.js';
import md5 from 'js-md5';

export function logIn(username, password) {
  return {
    type: 'LOG-IN',
    username: username,
    password: password
  };
}

export function* doLogIn(action) {
  try {
    const response = yield call(Backend, '/login', {
      username: action.username,
      password: md5.hex(action.password)
    });

    if (response === null)
      return;

    yield put(switchPage('settings'));
  } catch(error) {
    yield put(errorMessage({
      text: error.message
    }));
  }
}
