import React, { Component, PropTypes } from 'react';
import { _ } from '../localize.js';
import { Username } from './Username.jsx';

const FontAwesome = require('react-fontawesome');
const Markdown = require('react-remarkable');
const strftime = require('strftime')

import { boardPostPropShape } from '../proptypes.js';

class BoardPostStamp extends Component {
  static propTypes = {
    stamp: PropTypes.number.isRequired
  }

  render() {
    const formatted = strftime('%d/%m/%Y %H:%M:%S', new Date(this.props.stamp * 1000));

    return (
      <span>{formatted}</span>
    );
  }
}

class BoardPost extends Component {
  static propTypes = {
    post: PropTypes.shape(boardPostPropShape).isRequired,
    onQuote: PropTypes.func.isRequired
  }

  static defaultProps = {
  }

  _handleUserClick = (event) => {
    event.preventDefault();

    console.log(event.target);
  }

  render() {
    return (
      <div className={this.props.post.isRead === false ? 'board-post board-post-unread' : 'board-post'}>
        <div className="board-post-header">
          <Username
            name={this.props.post.author.name}
            isOnline={this.props.post.author.isOnline} 
            onClick={this._handleUserClick} /> - <BoardPostStamp stamp={this.props.post.stamp} />
        </div>
        <div className="board-post-content">
          <Markdown source={this.props.post.text} />
        </div>
      </div>
    );
  }
}


class BoardPostsNavigation extends Component {
  static propTypes = {
    start: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,

    onNewest: PropTypes.func.isRequired,
    onNewer: PropTypes.func.isRequired,
    onOlder: PropTypes.func.isRequired,
    onOldest: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="board-navigation">
        <div>
          <span onClick={this.props.onNewest}><FontAwesome tag="i" name="fast-backward" /> {_('Newest')}</span>
          <span onClick={this.props.onNewer}><FontAwesome tag="i" name="backward" /> {_('Newer')}</span>
          <span>{this.props.start + 1}. - {this.props.start + this.props.length}.</span>
          <span onClick={this.props.onOlder}>{_('Older')} <FontAwesome tag="i" name="forward" /></span>
          <span onClick={this.props.onOldest}>{_('Oldest')} <FontAwesome tag="i" name="fast-forward" /></span>
        </div>
      </div>
    );
  }
}

export class BoardPosts extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(boardPostPropShape)).isRequired,

    /* navigation */
    start: PropTypes.number.isRequired,
    onNewest: PropTypes.func.isRequired,
    onNewer: PropTypes.func.isRequired,
    onOlder: PropTypes.func.isRequired,
    onOldest: PropTypes.func.isRequired,

    onQuote: PropTypes.func.isRequired
  }

  render() {
    let navigation = <BoardPostsNavigation
                       start={this.props.start}
                       length={this.props.posts.length}
                       onNewest={this.props.onNewest}
                       onNewer={this.props.onNewer}
                       onOlder={this.props.onOlder}
                       onOldest={this.props.onOldest} />;

    return (
      <div>
        {navigation}
        { this.props.posts.map((post) => {
          return <BoardPost key={post.id} post={post} onQuote={this.props.onQuote} />;
        })}
        {navigation}
      </div>
    );
  }
}
