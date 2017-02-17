import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { _ } from '../localize.js';

import { resetMessageBox } from '../modules/messageBox.js';

const FontAwesome = require('react-fontawesome');


class MessageBox extends Component {
  static propTypes = {
    style: PropTypes.oneOf(['info', 'success', 'error']).isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    needsClose: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this._timer = null;
  }

  _handleTimedClose = () => {
    this.props.onClose();
    this._timer = null;
  }

  componentDidMount() {
    if (this.props.needsClose === true)
      this._timer = setTimeout(this._handleTimedClose, 5000);
  }

  componentWillUnmount() {
    if (this.props.needsClose === true && this._timer !== null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  render() {
    let icon = null;

    switch(this.props.style) {
      case 'success':
        icon = 'check';
        break;
      case 'error':
        icon = 'exclamation';
        break;
      case 'info':
      default:
        icon = 'info';
        break;
    }

    return (
      <div className="overlay">
        <div className="popup">
          <h3>{this.props.title}</h3>
          <a className="close" onClick={this.props.onClose}>&times;</a>
          <div className="content">
            <FontAwesome tag="i" name={icon} size="2x" className={this.props.style} />
            {this.props.text}
          </div>
          { this.props.needsClose === true &&
              <div className="close-info">
                {_('This window will disappear in 5 seconds.')}
              </div>
          }
        </div>
      </div>
    );
  }
}

class MessageBoxContainer extends Component {
  static propTypes = {
    style: PropTypes.oneOf(['info', 'success', 'error']).isRequired,
    title: PropTypes.string,
    text: PropTypes.string,
    needsClose: PropTypes.bool.isRequired,
    onClose: PropTypes.func
  }

  static defaultProps = {
    title: null,
    text: ''
  }

  _handleClose = (event = null) => {
    if (event)
      event.preventDefault();

    if (this.props.onClose !== null)
      this.props.onClose();

    this.props.dispatch(resetMessageBox());
  }

  render() {
    if (this.props.title === null)
      return null;

    return (
      <MessageBox
        title={this.props.title}
        text={this.props.text}
        style={this.props.style}
        needsClose={this.props.needsClose}
        onClose={this._handleClose} />
    );
  }
}

export default connect((state) => {
  return {
    style: state.messageBox.style,
    title: state.messageBox.title,
    text: state.messageBox.text,
    needsClose: state.messageBox.needsClose,
    onClose: state.messageBox.onClose
  };
})(MessageBoxContainer);
