import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FullLayout } from '../components//ui.jsx';

class SettlersPage extends Component {
  static propTypes = {
  }

  render() {
    return (
      <FullLayout>
        <div className="pure-u-3-24" />
        <div className="pure-u-18-24">
          <div className="pure-u-4-24">hic sunt players</div>
          <div className="pure-u-16-24">hic sunt board</div>
          <div className="pure-u-4-24">hic sunt tools</div>
        </div>
        <div className="pure-u-3-24" />
      </FullLayout>
    );
  }
}

class SettlersPageContainer extends Component {
  static propTypes = {
  }

  render() {
    return (
      <SettlersPage />
    );
  }
}

export default connect((state) => {
  return {
  };
})(SettlersPageContainer);
