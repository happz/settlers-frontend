import React, { Component, PropTypes } from 'react';

export default class extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  render() {
    return (
      <div className="page-content">
        { this.props.title && <PageHeader title={this.props.title} /> }
        <div className="content">
          <div className="pure-g">
            <div className="pure-u-1-1">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
