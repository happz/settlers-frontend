import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { FullLayout } from '../components//ui.jsx';
import { update } from '../common.js';
import { _ } from '../localize.js';
import { BoardSubmitForm } from '../components/BoardSubmit.jsx';
import { BoardPosts } from '../components/BoardPosts.jsx';

import { boardPostPropShape } from '../proptypes.js';
import { successMessage, errorMessage } from '../modules/messageBox.js';

const log = require('loglevel');

class BoardPage extends Component {
  static propTypes = {
    onQuote: PropTypes.func.isRequired,
    onPreview: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    start: PropTypes.number.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape(boardPostPropShape)).isRequired,
    onNewest: PropTypes.func.isRequired,
    onNewer: PropTypes.func.isRequired,
    onOlder: PropTypes.func.isRequired,
    onOldest: PropTypes.func.isRequired
  }

  render() {
    return (
      <FullLayout title={_('Board')}>
        <BoardSubmitForm onSubmit={this.props.onSubmit} onPreview={this.props.onPreview} />
        <BoardPosts
          onQuote={this.props.onQuote}
          start={this.props.start}
          posts={this.props.posts}
          onNewest={this.props.onNewest}
          onNewer={this.props.onNewer}
          onOlder={this.props.onOlder}
          onOldest={this.props.onOldest} />
      </FullLayout>
    );
  }
}

class BoardPageContainer extends Component {
  static propTypes = {
    perPage: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      start: 0,
      posts: []
    }
  }

  componentDidMount() {
    this._fetchPosts(this.state.start);
  }

  _fetchPosts(start) {
    log.debug('BoardPage._fetchPosts:', this.props, this.state);

    update('/board', {
      start: start,
      length: this.props.perPage
    })
      .then((response) => {
        if (response === null)
          return;

        this.setState({
          start: start,
          posts: response.posts
        });
      })
      .catch((error) => {
        this.props.dispatch(errorMessage({
          text: error.message
        }));
      });
  }

  _handleNewest = (event) => {
    event.preventDefault();

    this._fetchPosts(0);
  }

  _handleNewer = (event) => {
    event.preventDefault();

    const newStart = this.state.start - this.props.perPage;

    this._fetchPosts(newStart < 0 ? 0 : newStart);
  }

  _handleOlder = (event) => {
    log.debug('BoardPage._handleOlder:', this.props, this.state);

    event.preventDefault();

    this._fetchPosts(this.state.start + this.props.perPage);
  }

  _handleOldest = (event) => {
  }

  _handleSubmit = (text, onSuccess) => {
    update('/board/add', {
      text: text.value
    })
      .then((response) => {
        if (response === null)
          return;

        this.props.dispatch(successMessage({
          text: _('Added'),
          onClose: () => {
            this._fetchPosts(this.state.start);
            onSuccess();
          }
        }));
      })
      .catch((error) => {
        this.props.dispatch(errorMessage({
          text: error.message
        }));
      });
  }

  _handlePreview = (text) => {
  }

  _handleQuote = (text) => {
  }

  render() {
    return (
      <BoardPage
        onQuote={this._handleQuote}
        onPreview={this._handlePreview}
        onSubmit={this._handleSubmit}
        start={this.state.start}
        posts={this.state.posts}
        onNewest={this._handleNewest}
        onNewer={this._handleNewer}
        onOlder={this._handleOlder}
        onOldest={this._handleOldest} />
    );
  }
}

export default connect((state) => {
  return {
    perPage: state.user.perPage
  };
})(BoardPageContainer);
