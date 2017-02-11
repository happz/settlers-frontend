import React from 'react';
import ReactDOM from 'react-dom';

import './pure-release-0.6.1/pure-min.css';
import 'font-awesome/css/font-awesome.min.css';
//import './font-awesome-4.7.0/
import 'react-progress-bar-plus/lib/progress-bar.css';

require('./main.scss');


const log = require('loglevel');
log.setLevel(log.levels.DEBUG, false);

import AppContainer from './App.jsx';

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);
