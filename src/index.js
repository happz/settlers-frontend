import Raven from 'raven-js';

Raven.config('https://69eefb0fcc0940cfb2b03a2e8a136b56@sentry.io/139558').install();

import React from 'react';
import ReactDOM from 'react-dom';

import './pure-release-0.6.1/pure-min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-progress-bar-plus/lib/progress-bar.css';

require('./main.scss');


const log = require('loglevel');
log.setLevel(log.levels.DEBUG, false);

import { Provider } from 'react-redux';
import store from './store.js';
import AppContainer from './components/App.jsx';


ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
