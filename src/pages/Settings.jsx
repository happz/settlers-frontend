import React, { Component } from 'react';

import { ThinLayout, Section } from '../components/ui.jsx';
import { _ } from '../localize.js';

import ChangeEmailFormContainer from '../components/settings/ChangeEmailForm.jsx';
import ChangePasswordFormContainer from '../components/settings/ChangePasswordForm.jsx';
import ChangeAfterPassTurnFormContainer from '../components/settings/ChangeAfterPassTurnForm.jsx';
import PerPageFormContainer from '../components/settings/PerPageForm.jsx';
import SoundFormContainer from '../components/settings/SoundForm.jsx';
import PlayerColorFormContainer from '../components/settings/PlayerColorForm.jsx';


/*
 * Top-level page
 */
export class SettingsPage extends Component {
  render() {
    return (
      <ThinLayout title={_('Settings')}>
        <Section label={_('Account')}>
          <ChangeEmailFormContainer />
          <ChangePasswordFormContainer />
          <ChangeAfterPassTurnFormContainer />
          <PerPageFormContainer />
          <SoundFormContainer />
          <PlayerColorFormContainer />
        </Section>
      </ThinLayout>
    );
  }
}
