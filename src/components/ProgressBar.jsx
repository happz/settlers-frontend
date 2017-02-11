import React, { Component } from 'react';

const ProgressBar = require('react-progress-bar-plus');
const log = require('loglevel');

export class ProgressBarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      runningTasks: 0,
      currentBatch: 0
    };

    this._tasks = {}
  }

  componentDidMount = () => {
    window.EE.addListener('task.started', this._handleTaskStarted);
    window.EE.addListener('task.finished', this._handleTaskFinished);
  }

  _handleTaskStarted = (task) => {
    log.debug('ProgressBar: task started: %s', task);

    this.setState((prevState, props) => {
      log.debug('ProgressBar: adding new task', prevState.runningTasks + 1, prevState.currentBatch + 1);

      this._tasks[task] = true;

      return {
        runningTasks: prevState.runningTasks + 1,
        currentBatch: prevState.currentBatch + 1
      };
    });
  }

  _handleTaskFinished = (task) => {
    log.debug('ProgressBar: task finished: %s', task);

    this.setState((prevState, props) => {
      if (this._tasks[task] !== true)
        return;

      this._tasks[task] = false;

      if (prevState.runningTasks === 1) {
        log.debug('ProgressBar: last task finished');
        return {
          runningTasks: 0,
          currentBatch: 0
        };
      }

      log.debug('ProgressBar: task %s finished, running %d of %d', task, prevState.runningTasks - 1, prevState.currentBatch);

      return {
        runningTasks: prevState.runningTasks - 1,
        currentBatch: prevState.currentBatch
      };
    });
  }

  render() {
    log.debug('ProgressBar: state=%O', this.state);

    if (this.state.currentBatch === 0)
      return null;

    return (
      <ProgressBar onTop={true} spinner="left" percent={(this.state.currentBatch - this.state.runningTasks) / this.state.currentBatch * 100} />
    );
  }
}
