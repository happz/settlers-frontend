import React, { Component, PropTypes } from 'react';
import { SIGNAL } from '../common.js';
import { _ } from '../localize.js';

class NavBarLink extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired
  }

  _handleClick = (event) => {
    event.preventDefault();

    SIGNAL('page.switch', [this.props.page]);
  }

  render() {
    return (
      <span onClick={this._handleClick}>{_(this.props.label)}</span>
    );
  }
}

export class PublicNavBar extends Component {
  render() {
    return (
      <div className="public-navbar">
        <NavBarLink label="Log in" page="login" /> | <NavBarLink label="New player" page="register" /> | <NavBarLink label="Password recovery" page="password-recovery" /> | <NavBarLink label="Admin log in" page="login-as" />
      </div>
    );
  }
}
