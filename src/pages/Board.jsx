import React, { Component, PropTypes } from 'react';
import { FullLayout } from '../components//ui.jsx';
import { STATUS, update } from '../common.js';
import { _ } from '../localize.js';
import { BoardSubmitForm } from '../components/BoardSubmit.jsx';
import { BoardPosts } from '../components/BoardPosts.jsx';

const log = require('loglevel');

import { currentUserPropShape } from '../proptypes.js';

export class BoardPage extends Component {
  static propTypes = {
    user: PropTypes.shape(currentUserPropShape).isRequired
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
      length: this.props.user.perPage
    })
      .then((response) => {
        if (response === null)
          return;

        this.setState({
          start: start,
          posts: response.posts
        });
      })
      .catch(function(error) {
        STATUS.Error({
          text: error.message
        });
      });
  }

  _handleNewest = (event) => {
    event.preventDefault();

    this._fetchPosts(0);
  }

  _handleNewer = (event) => {
    event.preventDefault();

    const newStart = this.state.start - this.props.user.perPage;

    this._fetchPosts(newStart < 0 ? 0 : newStart);
  }

  _handleOlder = (event) => {
    log.debug('BoardPage._handleOlder:', this.props, this.state);

    event.preventDefault();

    this._fetchPosts(this.state.start + this.props.user.perPage);
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

        STATUS.Success({
          text: _('Added'),
          onClose: () => {
            this._fetchPosts(this.state.start);
            onSuccess();
          }
        });
      })
      .catch(function(error) {
        STATUS.Error({
          text: error.message
        });
      });
  }

  _handlePreview = (text) => {
  }

  _handleQuote = (text) => {
  }

  render() {
    return (
      <FullLayout title={_('Board')}>
        <BoardSubmitForm onSubmit={this._handleSubmit} onPreview={this._handlePreview} />
        <BoardPosts
          onQuote={this._handleQuote}
          start={this.state.start}
          posts={this.state.posts}
          onNewest={this._handleNewest}
          onNewer={this._handleNewer}
          onOlder={this._handleOlder}
          onOldest={this._handleOldest} />
      </FullLayout>
    );
  }
}
