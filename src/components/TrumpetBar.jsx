import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class TrumpetBar extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="trumpet-bar">
        <span>{this.props.message}</span>
      </div>
    );
  }
}

class TrumpetBarContainer extends Component {
  static propTypes = {
    message: PropTypes.string
  }

  render() {
    if (this.props.message === null)
      return null;

    return (
      <TrumpetBar message={this.props.message} />
    );
  }
}

export default connect((state) => {
  return {
    message: state.navbar.trumpet
  };
})(TrumpetBarContainer);
