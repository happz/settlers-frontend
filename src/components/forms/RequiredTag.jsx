import React, { Component, PropTypes } from 'react';
import { fieldValidStates } from '../../proptypes.js';


export class RequiredTag extends Component {
  static propTypes = {
    required: PropTypes.bool.isRequired,
    valid: fieldValidStates.isRequired
  }

  render() {
    if (this.props.required !== true || this.props.valid === 'valid')
      return null;

    return (
      <span className="pure-form-message-inline required">*</span>
    );
  }
}
