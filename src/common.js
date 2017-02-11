const log = require('loglevel');
const Config = require('Config');


/*
 * Events
 */
if (typeof window.EE === 'undefined') {
  const EventEmitter = require('wolfy87-eventemitter');
  window.EE = new EventEmitter();
}

const SIGNAL = function(event, args) {
  log.debug('SIGNAL:', event, args);

  window.EE.emitEvent(event, args);
};


/*
 * JWT
 */
class JWTStore {
  constructor() {
    this.jwt = null;
    this.authenticated = false;

    window.EE.addListener('jwt.update', this._handleJWTUpdate);
    window.EE.addListener('jwt.reset', this._handleJWTReset);

    const jwt = sessionStorage.getItem('JWT');

    if (jwt) {
      SIGNAL('jwt.update', [jwt]);
    } else {
      SIGNAL('jwt.reset');
    }
  }

  _handleJWTUpdate = (jwt) => {
    log.debug('JWTStore.update:', jwt);

    if (jwt === this.jwt)
      return;

    sessionStorage.setItem('JWT', jwt);

    this.jwt = jwt;
    this.authenticated = true;

    log.debug('JWT._handleJWTUpdate: ', this.jwt, this.authenticated);
  }

  _handleJWTReset = () => {
    log.debug('JWTStore.reset');

    this.jwt = null;
    this.authenticated = false;

    sessionStorage.removeItem('JWT');
  }
};
const JWT = new JWTStore();


const STATUS = {
  Reset: function() {
    SIGNAL('status.reset');
  },
  Error: function(options) {
    log.error('Error: options=%O', options);
    console.trace();

    SIGNAL('status.error', [options]);
  },
  Success: function(options) {
    SIGNAL('status.success', [options]);
  }
};


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

  if (JWT.authenticated === true)
    data.jwt = JWT.jwt;

  opts = Object.assign({
    credentials: 'same-origin',
    headers: {},
    body: JSON.stringify(data)
  }, opts);

  log.debug('_baseFetch:', opts);

  SIGNAL('task.started', ['fetch-' + url]);

  return fetch(url, opts)
    .then(function(response) {
      log.debug('fetch(%s): raw response: %O', url, response);

      SIGNAL('task.finished', ['fetch-' + url]);

      if (response.ok !== true || response.status !== 200) {
        log.debug('fetch(%s): invalid response status', url);
        raiseError(response, response.statusText);
      }

      STATUS.Reset();
      //SIGNAL('site.status', ['online']);

      return response.json();
    })
    .then(function(response) {
      log.debug('fetch(%s): json response: %O', url, response);

      if (response.jwt)
        SIGNAL('jwt.update', [response.jwt]);

      if (response.user)
        SIGNAL('user.update', [response.user]);

      if (response.success !== true) {
        log.debug('fetch(%s): not succeeded', url, response);
        raiseError(response, response.error);
      }

      return response;
    })
    .catch(function(error) {
      log.debug('fetch(%s): catch: %O', url, error);
      log.error(error);

      SIGNAL('task.finished', ['fetch-' + url]);

      if (error.message === 'Failed to fetch') {
        log.debug('fetch(%s): failed to even fetch, network error', url);

        SIGNAL('site.status', ['offline']);
        return null;
      }

      throw error;
    });
}


module.exports = {
  SIGNAL: SIGNAL,
  JWT: JWT,
  STATUS: STATUS,
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
