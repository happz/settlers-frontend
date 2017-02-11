import React, { Component, PropTypes } from 'react';

const FontAwesome = require('react-fontawesome');

export class SiteStatusBar extends Component {
  static propTypes = {
    status: PropTypes.oneOf(['online', 'maintenance', 'offline']).isRequired
  }

  render() {
    if (this.props.status === 'online')
      return null;

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
