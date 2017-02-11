import React, { Component, PropTypes } from 'react';

export class Username extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isOnline: PropTypes.bool,
    isConfirmed: PropTypes.bool,
    isOnTurn: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    isOnline: false,
    isConfirmed: false,
    isOnTurn: false
  }

  render() {
    let classes = ['user-name'];

    if (this.props.isOnline === true)
      classes.push('user-online');

    if (this.props.isConfirmed === true)
      classes.push('user-invited');

    if (this.props.isOnTurn === true)
      classes.push('user-onturn');

    return (
      <span className={classes.join(' ')} onClick={this.props.onClick}>{this.props.name}</span>
    );
  }
}
