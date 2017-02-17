import React, { Component, PropTypes } from 'react';

import { Form, FormRow, FinalFormRow } from '../ui.jsx';
import { InputField } from '../forms/InputField.jsx';
import SubmitButton from '../forms/SubmitButton.jsx';
import { update } from '../../common.js';
import { validators } from '../../validators.js';
import { fieldValidStates } from '../../proptypes.js';
import { _ } from '../../localize.js';
import store from '../../store.js';
import { successMessage, errorMessage } from '../../modules/messageBox.js';

const md5 = require('js-md5');

class ChangePasswordForm extends Component {
  static propTypes = {
    password1: PropTypes.string.isRequired,
    valid1: fieldValidStates.isRequired,
    onChange1: PropTypes.func.isRequired,
    password2: PropTypes.string.isRequired,
    valid2: fieldValidStates.isRequired,
    onChange2: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form legend={_('Change password')}>
        <FormRow label={_('Password')}>
          <InputField
            type="password"
            value={this.props.password1}
            valid={this.props.valid1}
            required={true}
            onChange={this.props.onChange1}
            placeholder={_('2 to 256 characters')} />
        </FormRow>
        <FormRow label={_('Password verification')}>
          <InputField
            type="password"
            value={this.props.password2}
            valid={this.props.valid2}
            required={true}
            onChange={this.props.onChange2} />
        </FormRow>
        <FinalFormRow>
          <SubmitButton label={_('Set')} onClick={this.props.onSubmit} disabled={!this.props.isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password1: InputField.createInitialState('', 'invalid'),
      password2: InputField.createInitialState('', 'invalid')
    };
  }

  _isValid = () => {
    return this.state.password1.valid === 'valid' && this.state.password2.valid === 'valid';
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid())
      return;

    update('/settings/passwd', {
      password: md5.hex(this.state.password1.value)
    })
      .then((response) => {
        if (response === null)
          return;

        this.setState((prevState, props) => {
          store.dispatch(successMessage({
            text: _('Settings were successfully updated.')
          }));

          return {
            password1: InputField.createInitialState('', false),
            password2: InputField.createInitialState('', false)
          }
        });
      })
      .catch((error) => {
        store.dispatch(errorMessage({
          text: error.message
        }));
      });
  }

  render() {
    return (
      <ChangePasswordForm
        password1={this.state.password1.value} valid1={this.state.password1.valid}
        onChange1={InputField.createChangeHandler(this, 'password1', [validators.password])}
        password2={this.state.password2.value} valid2={this.state.password2.valid}
        onChange2={InputField.createChangeHandler(this, 'password2', [validators.password, (value) => { return this.state.password1.value === value; }])}
        onSubmit={this._handleSubmit}
        isValid={this._isValid} />
    );
  }
}
