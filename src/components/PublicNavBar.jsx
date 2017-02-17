import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { _ } from '../localize.js';

import { switchPage } from '../modules/page.js';

class NavBarLink extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  render() {
    return (
      <span onClick={this.props.onClick}>{_(this.props.label)}</span>
    );
  }
}

class PublicNavBar extends Component {
  _handleClick = (page, event) => {
    event.preventDefault();

    this.props.dispatch(switchPage(page));
  }

  render() {
    return (
      <div className="public-navbar">
        <NavBarLink label="Log in" onClick={this._handleClick.bind(this, 'login')} />
        &nbsp;| <NavBarLink label="New player" onClick={this._handleClick.bind(this, 'register')} />
        &nbsp;| <NavBarLink label="Password recovery" onClick={this._handleClick.bind(this, 'password-recovery')} />
        &nbsp;| <NavBarLink label="Admin log in" onClick={this._handleClick.bind(this, 'login-as')} />
      </div>
    );
  }
}

export default connect((state) => {
  return {}
})(PublicNavBar);
