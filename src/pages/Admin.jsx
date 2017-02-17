import React, { Component } from 'react';
import { ThinLayout, Section } from '../components/ui.jsx';
import { _ } from '../localize.js';

import MaintenanceStateFormContainer from '../components/MaintenanceStateForm.jsx';
import MaintenanceAccessFormContainer from '../components/MaintenanceAccessForm.jsx';

export class AdminPage extends Component {
  render() {
    return (
      <ThinLayout title={_('Administration')}>
        <Section label={_('Maintenance')}>
          <MaintenanceStateFormContainer />
          <MaintenanceAccessFormContainer />
        </Section>
      </ThinLayout>
    )
  }
}
