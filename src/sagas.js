import { takeEvery } from 'redux-saga/effects';

import { doFetchSiteStatus } from './modules/siteStatus.js';
import { doPingBackend, doFetchRecentEvents } from './modules/navbar.js';
import { doLogIn } from './modules/login.js';
import { doEnterGame } from './modules/game.js';
import { doFetchGames } from './modules/games.js';

export default function* rootSaga() {
  yield takeEvery('SITE-STATUS-FETCH', doFetchSiteStatus);
  yield takeEvery('BACKEND-PING', doPingBackend);
  yield takeEvery('RECENT-EVENTS-FETCH', doFetchRecentEvents);
  yield takeEvery('LOG-IN', doLogIn);
  yield takeEvery('GAME-ENTER', doEnterGame);
  yield takeEvery('GAME-LIST-FETCH', doFetchGames);
}
