import React, { Component, PropTypes } from 'react';
import { JWT, STATUS, SIGNAL, update } from './common.js';

import { ArchivePageContainer } from './pages/Archive.jsx';
import { LoginPage } from './pages/Login.jsx';
import { RegisterPage } from './pages/Register.jsx';
import { BoardPage } from './pages/Board.jsx';
import { HomePage } from './pages/Home.jsx';
import { NewPage } from './pages/New.jsx';
import { SettingsPage } from './pages/Settings.jsx';
import { AdminPage } from './pages/Admin.jsx';

import { PrivateNavBarContainer } from './components/PrivateNavBar.jsx';
import { PublicNavBar } from './components/PublicNavBar.jsx';
import { ProgressBarContainer } from './components/ProgressBar.jsx';
import { SiteStatusBar } from './components/SiteStatusBar.jsx';

import { currentUserPropShape } from './proptypes.js';
import { _ } from './localize.js';

const FontAwesome = require('react-fontawesome');
const log = require('loglevel');


class MessageBox extends Component {
  static propTypes = {
    style: PropTypes.oneOf(['info', 'success', 'error']),
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    needsClose: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  static defaultProps = {
    style: 'info',
    text: ''
  }

  constructor(props) {
    super(props);

    this._timer = null;
  }

  _handleTimedClose = () => {
    log.debug('MessageBox._handleTimedClose');

    this.props.onClose();
    this._timer = null;
  }

  componentDidMount() {
    log.debug('MessageBox: componentDidMount', this.props);

    if (this.props.needsClose === true)
      this._timer = setTimeout(this._handleTimedClose, 5000);
  }

  componentWillUnmount() {
    log.debug('MessageBox: componentWillUnmount', this.props);

    if (this.props.needsClose === true && this._timer !== null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  render() {
    log.debug('MessageBox.render:', this.props);

    let icon = null;

    switch(this.props.style) {
      case 'success':
        icon = 'check';
        break;
      case 'error':
        icon = 'exclamation';
        break;
      case 'info':
      default:
        icon = 'info';
        break;
    }

    return (
      <div className="overlay">
        <div className="popup">
          <h3>{this.props.title}</h3>
          <a className="close" onClick={this.props.onClose}>&times;</a>
          <div className="content">
            <FontAwesome tag="i" name={icon} size="2x" className={this.props.style} />
            {this.props.text}
          </div>
          { this.props.needsClose === true &&
              <div className="close-info">
                {_('This window will disappear in 5 seconds.')}
              </div>
          }
        </div>
      </div>
    );
  }
}

class MessageBoxContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: 'info',
      title: null,
      text: null,
      needsClose: false,
      onClose: null
    };
  }

  componentDidMount() {
    window.EE.addListener('status.reset', this.reset);
    window.EE.addListener('status.info', this.info);
    window.EE.addListener('status.success', this.success);
    window.EE.addListener('status.error', this.error);
  }

  _show = (options) => {
    const defaultOptions = {
      style: 'info',
      title: null,
      text: null,
      needsClose: false,
      onClose: null
    };

    options = Object.assign({}, defaultOptions, options);

    log.debug('MessageBox._show: options=%O', options);

    this.setState(options);
  }

  reset = () => {
    this._show({
      style: 'info'
    });
  }

  info = (options) => {
    const defaultOptions = {
      style: 'info',
      needsClose: true
    };

    this._show(Object.assign({}, defaultOptions, options));
  }

  success = (options) => {
    const defaultOptions = {
      style: 'success',
      title: null,
      text: null,
      needsClose: true
    };

    options = Object.assign({}, defaultOptions, options);
    options.title = (options.title === null ? _('Success!') : options.title);

    this._show(options);
  }

  error = (options) => {
    const defaultOptions = {
      style: 'error',
      title: null,
      text: null
    };

    options = Object.assign({}, defaultOptions, options);
    options.title = (options.title === null ? _('Error!') : options.title);

    this._show(options);
  }

  _handleClose = (event) => {
    log.debug('MessageBoxContainer._handleClose');

    if (event)
      event.preventDefault();

    if (this.state.onClose !== null)
      this.state.onClose();

    this.reset();
  }

  render() {
    if (this.state.title === null)
      return null;

    return (
      <MessageBox title={this.state.title} text={this.state.text} style={this.state.style} needsClose={this.state.needsClose} onClose={this._handleClose} />
    );
  }
}

class App extends Component {
  static propTypes = {
    page: PropTypes.string,
    user: PropTypes.shape(currentUserPropShape),
    freeGamesCount: PropTypes.number,
    siteStatus: PropTypes.oneOf(['online', 'maintenance', 'offline']).isRequired
  }

  static publicPages = [
    'login', 'register', 'password-recovery', 'login-as'
  ]

  render() {
    log.debug('App.render:', this.props, this.state);

    let page = null;
    let navbar = null;

    if (this.props.page === null) {
      page = null;
    } else if (this.props.page === 'login') {
      page = <LoginPage />;
    } else if (this.props.page === 'register') {
      page = <RegisterPage />;
    } else if (this.props.user !== null) {
      switch(this.props.page) {
        case 'admin':
          page = <AdminPage />;
          break;
        case 'archive':
          page = <ArchivePageContainer user={this.props.user} />
          break;
        case 'board':
          page = <BoardPage user={this.props.user} />
          break;
        case 'home':
          page =  <HomePage user={this.props.user} />
          break;
        case 'new':
          page = <NewPage />;
          break;
        case 'settings':
          page = <SettingsPage user={this.props.user} />
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
      navbar = <PublicNavBar />;
    } else if (this.props.page !== null) {
      navbar = <PrivateNavBarContainer page={this.props.page} isAdmin={this.props.user !== null ? this.props.user.isAdmin : false} />;
    }

    return (
      <div>
        <ProgressBarContainer />
        <MessageBoxContainer />
        <SiteStatusBar status={this.props.siteStatus} />
        {page}
        {navbar}
      </div>
    );
  }
}

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: null,
      user: null,
      siteStatus: 'online'
    };

    this._siteStatusTimer = null;
  }

  _handleUserUpdate = (user) => {
    log.debug('AppContainer._handleUserUpdate');

    this.setState({
      user: user
    });
  }

  _handlePageSwitch = (page) => {
    log.debug('AppContainer._handlePageSwitch:', page);

    this.setState({
      page: page
    });
  }

  _fetchSiteStatus = () => {
    update('/site-status')
      .then((response) => {
        if (response === null)
          return;

        this._handleSiteStatusChange(response.maintenance === true ? 'maintenance' : 'online');
      })
      .catch((error) => {
        STATUS.Error({
          text: error.message
        });
      });
  }

  _handleSiteStatusChange = (status) => {
    log.debug('AppContainer._handleSiteStatusChange: state=%s', status);

    this.setState({
      siteStatus: status
    });
  }

  componentDidMount() {
    window.EE.addListener('page.switch', this._handlePageSwitch);
    window.EE.addListener('user.update', this._handleUserUpdate);
    window.EE.addListener('site.status', this._handleSiteStatusChange);

    //this._siteStatusTimer = setInterval(this._fetchSiteStatus, 30000);
    //this._fetchSiteStatus();

    if (JWT.authenticated === true) {
      SIGNAL('page.switch', ['settings']);

      update('/ping')
        .catch(function(error) {
          STATUS.Error({
            text: error.message
          });
        });
    } else {
      SIGNAL('page.switch', ['login']);
    }
  }

  componentWillUnmount() {
    if (this._siteStatusTimer !== null) {
      clearInterval(this._siteStatusTimer);
      this._siteStatusTimer = null;
    }
  }

  render() {
    log.debug('AppContainer.render:', this.props, this.state);

    return (
      <App page={this.state.page} user={this.state.user} siteStatus={this.state.siteStatus} />
    );
  }
}

export default AppContainer;
