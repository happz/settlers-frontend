import { createStore, applyMiddleware } from 'redux';
import RavenMiddleware from 'redux-raven-middleware';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer.js';
import rootSaga from './sagas.js';

function initJWT() {
  const jwt = sessionStorage.getItem('JWT');

  if (jwt)
    return {
      jwt: jwt,
      authenticated: true
    };

  return {
    jwt: null,
    authenticated: false
  };
}


const ravenMiddleware = RavenMiddleware('https://69eefb0fcc0940cfb2b03a2e8a136b56@sentry.io/139558');
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, {
  jwt: initJWT(),
  navbar: {
    freeGamesCount: null,
    trumpet: null
  },
  siteStatus: 'online',
  page: null,

  game: {
    page: null,
    game: null
  },

  games: {
    activeGames: [],
    freeGames: [],
    inactiveGames: [],
    archivedGames: []
  },

  tasks: {
    runningTasks: 0,
    currentBatch: 0,
    tasks: {}
  },

  messageBox: {
    style: 'info',
    title: null,
    text: null,
    needsClose: false,
    onClose: null
  }
}, applyMiddleware(ravenMiddleware, sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
