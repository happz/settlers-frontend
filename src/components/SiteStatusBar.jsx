import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSiteStatus } from '../modules/siteStatus.js';
import { siteStatusValues } from '../proptypes.js';

const FontAwesome = require('react-fontawesome');

class SiteStatusBar extends Component {
  static propTypes = {
    status: siteStatusValues.isRequired
  }

  render() {
    let icon = null;
    let text = null;

    if (this.props.status === 'offline') {
      icon = <FontAwesome tag="i" name="power-off" className="offline" />;
      text = <span>Apparently, server is offline. Please, try again later.</span>;
    } else if (this.props.status === 'maintenance') {
      icon = <FontAwesome tag="i" name="bath" className="maintenance" />;
      text = <span>Server runs in maintenance mode. Please, try again later.</span>;
    }

    return (
      <div className="site-status-bar">
        {icon}
        {text}
      </div>
    );
  }
}

class SiteStatusBarContainer extends Component {
  static propTypes = {
    status: siteStatusValues.isRequired
  }

  constructor(props) {
    super(props);

    this._siteStatusTimer = null;
  }

  componentDidMount() {
    this._siteStatusTimer = setInterval(() => {
      this.props.dispatch(fetchSiteStatus());
    }, 30000);

    this.props.dispatch(fetchSiteStatus());
  }

  componentWillUnmount() {
    if (this._siteStatusTimer === null)
      return;

    clearInterval(this._siteStatusTimer);
    this._siteStatusTimer = null;
  }

  render() {
    if (this.props.status === 'online')
      return null;

    return (
      <SiteStatusBar status={this.props.status} />
    );
  }
}

export default connect((state) => {
  return {
    status: state.siteStatus
  };
})(SiteStatusBarContainer);
