import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const ProgressBar = require('react-progress-bar-plus');

class ProgressBarContainer extends Component {
  static propTypes = {
    runningTasks: PropTypes.number.isRequired,
    currentBatch: PropTypes.number.isRequired
  }

  render() {
    if (this.props.currentBatch === 0)
      return null;

    return (
      <ProgressBar
        onTop={true}
        spinner="left"
        percent={(this.props.currentBatch - this.props.runningTasks) / this.props.currentBatch * 100} />
    );
  }
}

export default connect((state) => {
  return {
    runningTasks: state.tasks.runningTasks,
    currentBatch: state.tasks.currentBatch
  };
})(ProgressBarContainer);
