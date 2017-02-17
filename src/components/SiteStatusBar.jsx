import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { update } from '../common.js';
import { errorMessage } from '../modules/messageBox.js';
import { updateSiteStatus } from '../modules/siteStatus.js';

const FontAwesome = require('react-fontawesome');

class SiteStatusBar extends Component {
  static propTypes = {
    status: PropTypes.oneOf(['online', 'maintenance', 'offline']).isRequired
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
    status: PropTypes.oneOf(['online', 'maintenance', 'offline']).isRequired
  }

  constructor(props) {
    super(props);

    this._siteStatusTimer = null;
  }

  _fetchSiteStatus = () => {
    update('/site-status')
      .then((response) => {
        if (response === null)
          return;

        this.props.dispatch(updateSiteStatus(response.maintenance === true ? 'maintenance' : 'online'));
      })
      .catch((error) => {
        this.props.dispatch(errorMessage({
          text: error.message
        }));
      });
  }

  componentDidMount() {
    this._siteStatusTimer = setInterval(this._fetchSiteStatus, 30000);
    this._fetchSiteStatus();
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
