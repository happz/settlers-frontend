import React, { Component } from 'react';

import { ThinLayout } from '../components/ui.jsx';
import LoginFormContainer from '../components/LoginForm.jsx';

import { _ } from '../localize.js';

export default class extends Component {
  render() {
    return (
      <ThinLayout title={_('Settlers')}>
        <LoginFormContainer />
      </ThinLayout>
    );
  }
}
