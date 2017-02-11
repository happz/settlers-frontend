import React, { Component, PropTypes } from 'react';


export class RequiredTag extends Component {
  static propTypes = {
    required: PropTypes.bool.isRequired,
    valid: PropTypes.oneOf([null, false, true]).isRequired
  }

  render() {
    if (this.props.required !== true || this.props.valid === true)
      return null;

    return (
      <span className="pure-form-message-inline required">*</span>
    );
  }
}
