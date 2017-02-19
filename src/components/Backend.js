import log from 'loglevel';
import Config from 'Config';

import { updateJWT } from '../modules/jwt.js';
import { updateUser } from '../modules/user.js';
import { updateSiteStatus } from '../modules/siteStatus.js';
import { beginTask, finishTask } from '../modules/tasks.js';
import { resetMessageBox } from '../modules/messageBox.js';
import store from '../store.js';


export default function(url, data = {}) {
  const logPrefix = `Backend(${url})`;

  log.debug('%s: data=%O', logPrefix, data);

  url = Config.backendAddress + url;

  if (data === null)
    data = {};

  const jwt = store.getState().jwt;
  if (jwt.authenticated === true)
    data.jwt = jwt.jwt;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  };

  store.dispatch(beginTask('fetch-' + url));

  return fetch(url, options)
    .then((response) => {
      store.dispatch(finishTask('fetch-' + url));

      if (response.ok !== true || response.status !== 200)
        throw response;

      store.dispatch(resetMessageBox());

      return response.json();
    })
    .then((response) => {
      if (response.jwt)
        store.dispatch(updateJWT(response.jwt));

      if (response.user)
        store.dispatch(updateUser(response.user));

      if (response.success !== true)
        throw response;

      log.debug('%s: response=%O', logPrefix, response);

      return response;
    })
    .catch((error) => {
      log.error(error);

      store.dispatch(finishTask('fetch-' + url));

      if (error.message === 'Failed to fetch') {
        store.dispatch(updateSiteStatus('offline'));
        return null;
      }

      throw error;
    });
}
