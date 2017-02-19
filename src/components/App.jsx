import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ArchivePageContainer from '../pages/Archive.jsx';
import LoginPage from '../pages/Login.jsx';
import RegisterPage from '../pages/Register.jsx';
import BoardPageContainer from '../pages/Board.jsx';
import HomePageContainer from '../pages/Home.jsx';
import NewPageContainer from '../pages/New.jsx';
import { SettingsPage } from '../pages/Settings.jsx';
import { AdminPage } from '../pages/Admin.jsx';
import SettlersPageContainer from '../pages/Settlers.jsx';

import MessageBoxContainer from './MessageBox.jsx';
import PrivateNavBarContainer from './PrivateNavBar.jsx';
import PublicNavBarContainer from './PublicNavBar.jsx';
import ProgressBarContainer from './ProgressBar.jsx';
import TrumpetBarContainer from './TrumpetBar.jsx';

import SiteStatusBarContainer from './SiteStatusBar.jsx';

import { switchPage } from '../modules/page.js';
import { enterGame } from '../modules/game.js';
import { pingBackend } from '../modules/navbar.js';
import store from '../store.js';

const log = require('loglevel');


class App extends Component {
  static propTypes = {
    page: PropTypes.string,
    hasUser: PropTypes.bool.isRequired
  }

  static publicPages = [
    'login', 'register', 'password-recovery', 'login-as'
  ]

  render() {
    let page = null;
    let navbar = null;

    if (this.props.page === null) {
      page = null;
    } else if (this.props.page === 'login') {
      page = <LoginPage />;
    } else if (this.props.page === 'register') {
      page = <RegisterPage />;
    } else if (this.props.hasUser === true) {
      switch(this.props.page) {
        case 'admin':
          page = <AdminPage />;
          break;
        case 'archive':
          page = <ArchivePageContainer />
          break;
        case 'board':
          page = <BoardPageContainer />
          break;
        case 'home':
          page =  <HomePageContainer />
          break;
        case 'new':
          page = <NewPageContainer />;
          break;
        case 'settings':
          page = <SettingsPage />
          break;
        case 'settlers':
          page = <SettlersPageContainer />;
          break;
        default:
          log.error('Unhandled page:', this.props.page);
          page = null;
          break;
      }
    } else {
      log.debug(`App.render: known page (${this.props.page}), waiting for user info`);
    }

    if (App.publicPages.indexOf(this.props.page) !== -1) {
      navbar = <PublicNavBarContainer />;
    } else if (this.props.page !== null) {
      navbar = <PrivateNavBarContainer />
    }

    return (
      <div>
        <ProgressBarContainer />
        <MessageBoxContainer />
        <SiteStatusBarContainer />
        <TrumpetBarContainer />
        {page}
        {navbar}
      </div>
    );
  }
}

class AppContainer extends Component {
  static propTypes = {
    page: PropTypes.string,
    hasUser: PropTypes.bool.isRequired
  }

  componentDidMount() {
    if (store.getState().jwt.authenticated === true) {
      //this.props.dispatch(switchPage('new'));
      this.props.dispatch(enterGame('settlers', 41, 'history'));
      this.props.dispatch(pingBackend());
    } else {
      this.props.dispatch(switchPage('login'));
    }
  }

  render() {
    return (
      <App
        hasUser={this.props.hasUser}
        page={this.props.page}
      />
    );
  }
}

export default connect((state) => {
  return {
    page: state.page,
    hasUser: state.user !== null
  };
})(AppContainer);
