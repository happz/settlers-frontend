import React, { Component, PropTypes } from 'react';
import { Form, FormRow, FinalFormRow } from './ui.jsx';
import { SelectField } from './forms/SelectField.jsx';
import SubmitButton from './forms/SubmitButton.jsx';
import { update } from '../common.js';
import { validators } from '../validators.js';
import { _ } from '../localize.js';
import store from '../store.js';
import { successMessage, errorMessage } from '../modules/messageBox.js';

class MaintenanceStateForm extends Component {
  static propTypes = {
    enabled: PropTypes.oneOf(['0', '1']).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form legend={_('Maintenance mode')}>
        <FormRow>
          <SelectField
            value={this.props.enabled}
            valid="valid"
            onChange={this.props.onChange}
            required={true}>
            <option value="0">Disabled</option>
            <option value="1">Enabled</option>
          </SelectField>
        </FormRow>
        <FinalFormRow>
          <SubmitButton label="Set" onClick={this.props.onSubmit} />
        </FinalFormRow>
      </Form>
    );
  }
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: null
    };
  }

  componentDidMount() {
    this._fetchMaintenanceState();
  }

  _fetchMaintenanceState = () => {
    update('/admin/maintenance/')
      .then((payload) => {
        if (payload === null)
          return;

        this.setState({
          enabled: SelectField.createInitialState((payload.enabled === true ? '1' : '0'), 'valid')
        });
      })
      .catch((error) => {
        store.dispatch(error({
          text: _(error.message)
        }));
      });
  }

  _updateMaintenanceState = () => {
    update('/admin/maintenance/', {
        enabled: this.state.enabled.value === '1'
      })
      .then((payload) => {
        if (payload === null)
          return;

        store.dispatch(successMessage({
          text: _('Maintenance state successfully saved.'),
          onClose: () => {
            this._fetchMaintenanceState();
          }
        }));
      })
      .catch((error) => {
        store.dispatch(errorMessage({
          text: _(error.message)
        }));
      });
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    this._updateMaintenanceState();
  }

  render() {
    if (this.state.enabled === null)
      return null;

    return (
      <MaintenanceStateForm
        enabled={this.state.enabled.value}
        onChange={SelectField.createChangeHandler(this, 'enabled', [validators.oneOf(['0', '1'])])}
        onSubmit={this._handleSubmit} />
    );
  }
}
