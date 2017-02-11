import React, { Component, PropTypes } from 'react';
import { SIGNAL, STATUS, update } from '../common.js';
import { _ } from '../localize.js';

const FontAwesome = require('react-fontawesome');


class Badge extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    return (
      <span className="badge badge-info" title={this.props.title}>{this.props.value}</span>
    );
  }
}

class NavBarButton extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    currentPage: PropTypes.string.isRequired,
    infoBadge: PropTypes.number,
    infoBadgeTitle: PropTypes.string
  }

  static defaultProps = {
    infoBadge: null
  }

  _handleClick = (event) => {
    event.preventDefault();

    SIGNAL('page.switch', [this.props.page]);
  }

  render() {
    return (
      <a className={this.props.page === this.props.currentPage ? 'active' : ''} onClick={this._handleClick}>
        <FontAwesome
          tag="i"
          name={this.props.icon}
          className="navbar-icon"
        />
        <span className="navbar-label">{this.props.label}</span>
        { this.props.infoBadge && <Badge value={this.props.infoBadge} title={this.props.infoBadgeTitle} /> }
      </a>
    );
  }
}

class NavBarSeparator extends Component {
  render() {
    return (
      <hr />
    );
  }
}

export class NavBar extends Component {
  static propTypes = {
    page: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    freeGamesCount: PropTypes.number
  }

  _createClickHandler = (page) => {
    return function(event) {
      event.preventDefault();

      SIGNAL('page.switch', [page]);
    }
  }

  render() {
    return (
      <div className="navbar">
        <NavBarButton label={_('Home')}     icon="home"      page="home" currentPage={this.props.page}
          infoBadge={this.props.freeGamesCount} infoBadgeTitle={`${this.props.freeGamesCount} free games`} />
        <NavBarButton label={_('Archive')}  icon="archive"   page="archive" currentPage={this.props.page} />
        <NavBarButton label={_('New')}      icon="plus"      page="new" currentPage={this.props.page} />
        <NavBarButton label={_('Board')}    icon="comment-o" page="board" currentPage={this.props.page} />
        <NavBarButton label={_('Stats')}    icon="bar-chart" page="stats" currentPage={this.props.page} />
        <NavBarButton label={_('Settings')} icon="cog"       page="settings" currentPage={this.props.page} />
        <NavBarSeparator />
        <NavBarButton label={_('Help')}     icon="question"  page="help" currentPage={this.props.page} />
        <NavBarSeparator />
        { this.props.isAdmin && <NavBarButton label={_('Admin')}   icon="wrench" page="admin" currentPage={this.props.page} /> }
        { this.props.isAdmin && <NavBarButton label={_('Monitor')} icon="info"   page="monitor" currentPage={this.props.page} /> }
        { this.props.isAdmin && <NavBarSeparator /> }
        <NavBarButton label={_('Log out')}  icon="sign-out"  page="logout" currentPage={this.props.page} />
      </div>
    );
  }
}

export class PrivateNavBarContainer extends Component {
  static propTypes = {
    page: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      freeGamesCount: null
    };

    this._updateTimer = null;
  }

  componentDidMount() {
    this._updateTimer = setInterval(this._fetchRecentEvents, 60000);

    //this._fetchRecentEvents();
  }

  componentWillUnmount() {
    if (this._updateTimer !== null) {
      clearInterval(this._updateTimer);
      this._updateTimer = null;
    }
  }

  _fetchRecentEvents = () => {
    update('/recent')
      .then((response) => {
        if (response === null)
          return;

        this.setState({
          freeGamesCount: (response.hasOwnProperty('freeGamesCount') ? response.freeGamesCount : null)
        });
      })
      .catch(function(error) {
        STATUS.Error({
          text: error.message
        });
      });
  }

  render() {
    return (
      <NavBar page={this.props.page} isAdmin={this.props.isAdmin} freeGamesCount={this.state.freeGamesCount} />
    );
  }
}
