import { createStore, applyMiddleware } from 'redux';
import RavenMiddleware from 'redux-raven-middleware';

import reducer from './reducer.js';

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

const store = createStore(reducer, {
  jwt: initJWT(),
  navbar: {
    freeGamesCount: null,
    trumpet: null
  },
  siteStatus: 'online',
  page: null,

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
}, applyMiddleware(RavenMiddleware('https://69eefb0fcc0940cfb2b03a2e8a136b56@sentry.io/139558')));

export default store;
