import React, { Component } from 'react';
import { ThinLayout, Section } from '../components/ui.jsx';
import { _ } from '../localize.js';
import NewGameFormContainer from '../components/NewGameForm.jsx';

export default class extends Component {
  render() {
    return (
      <ThinLayout title={_('New')}>
        <Section label={_('Game')}>
          <NewGameFormContainer />
        </Section>
      </ThinLayout>
    );
  }
}
