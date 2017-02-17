import React, { Component, PropTypes } from 'react';
import { _ } from '../../localize.js';


export default class extends Component {
  static propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    label: _('Submit'),
    disabled: false
  }

  render() {
    const disabledClassName = (this.props.disabled === true ? 'disabled' : '');
    const onClick = (this.props.disabled === true ? (event) => { event.preventDefault(); } : this.props.onClick);

    return (
      <button
        className={`pure-button pure-button-primary ${disabledClassName}`}
        onClick={onClick}
        disabled={this.props.disabled}>{this.props.label}</button>
    );
  }
}
