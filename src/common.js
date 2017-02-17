const log = require('loglevel');
const Config = require('Config');

import { updateJWT } from './modules/jwt.js';
import { updateUser } from './modules/user.js';
import { updateSiteStatus } from './modules/siteStatus.js';
import { beginTask, finishTask } from './modules/tasks.js';
import { resetMessageBox } from './modules/messageBox.js';
import store from './store.js';


/*
 * Fetch
 */
function raiseError(response, msg) {
  log.debug('raiseError: response=%O, msg=%O', response, msg);

  const error = new Error(msg);
  error.response = response;

  throw error;
}

function _baseFetch(url, opts, data = null) {
  log.debug('_baseFetch:', url, opts, data);

  url = Config.backendAddress + url;

  if (data === null)
    data = {};

  const jwt = store.getState().jwt;
  log.debug('_baseFetch: jwt=%O', jwt);
  if (jwt.authenticated === true)
    data.jwt = jwt.jwt;

  opts = Object.assign({
    credentials: 'same-origin',
    headers: {},
    body: JSON.stringify(data)
  }, opts);

  log.debug('_baseFetch:', opts);

  store.dispatch(beginTask('fetch-' + url));

  return fetch(url, opts)
    .then(function(response) {
      log.debug('fetch(%s): raw response: %O', url, response);

      store.dispatch(finishTask('fetch-' + url));

      if (response.ok !== true || response.status !== 200) {
        log.debug('fetch(%s): invalid response status', url);
        raiseError(response, response.statusText);
      }

      store.dispatch(resetMessageBox());

      return response.json();
    })
    .then(function(response) {
      log.debug('fetch(%s): json response: %O', url, response);

      if (response.jwt)
        store.dispatch(updateJWT(response.jwt));

      if (response.user)
        store.dispatch(updateUser(response.user));

      if (response.success !== true) {
        log.debug('fetch(%s): not succeeded', url, response);
        raiseError(response, response.error);
      }

      return response;
    })
    .catch(function(error) {
      log.debug('fetch(%s): catch: %O', url, error);
      log.error(error);

      store.dispatch(finishTask('fetch-' + url));

      if (error.message === 'Failed to fetch') {
        log.debug('fetch(%s): failed to even fetch, network error', url);

        store.dispatch(updateSiteStatus('offline'));
        return null;
      }

      throw error;
    });
}


module.exports = {
  update: function(url, data = {}, opts = {}) {
    log.debug('update:', url, data, opts);

    opts = Object.assign({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, opts);

    return _baseFetch(url, opts, data);
  },
  mapObject: function(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    })
  }
};
