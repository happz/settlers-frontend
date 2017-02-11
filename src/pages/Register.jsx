import React, { Component } from 'react';
import { ThinLayout, Form, FormRow, FinalFormRow, SubmitButton } from '../components/ui.jsx';
import { InputField } from '../components/forms/InputField.jsx';
import { update, STATUS, SIGNAL } from '../common.js';
import { validators } from '../validators.js';

const log = require('loglevel');
const md5 = require('js-md5');

import { _ } from '../localize.js';


class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username:  InputField.createInitialState(),
      password1: InputField.createInitialState(),
      password2: InputField.createInitialState(),
      email:     InputField.createInitialState()
    };
  }

  _isValid = () => {
    return this.state.username.valid
      && this.state.password1.valid
      && this.state.password2.valid
      && this.state.email.valid;
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid()) {
      log.error('Form is expected to be valid', this.state);
      return;
    }

    update('/register', {
      username: this.state.username.value,
      password: md5.hex(this.state.password1.value),
      email: this.state.email.value
    })
      .then((response) => {
        log.debug('RegisterForm._handleSubmit:', response);

        if (response === null)
          return;

        STATUS.Success({
          text: _('Account registered.'),
          onClose: () => {
            SIGNAL('page.switch', ['login']);
          }
        });
      })
      .catch(function(error) {
        STATUS.Error({
          text: error.message
        });
      });
  }

  render() {
    return (
      <Form legend={_('New player')}>
        <FormRow label={_('Username')}>
          <InputField
            value={this.state.username.value}
            valid={this.state.username.valid}
            onChange={InputField.createChangeHandler(this, 'username', [validators.username])} />
        </FormRow>
        <FormRow label={_('Password')}>
          <InputField
            type="password"
            value={this.state.password1.value}
            valid={this.state.password1.valid}
            onChange={InputField.createChangeHandler(this, 'password1', [validators.password])} />
        </FormRow>
        <FormRow label={_('Password verification')}>
          <InputField
            type="password"
            value={this.state.password2.value}
            valid={this.state.password2.valid}
            onChange={InputField.createChangeHandler(this, 'password2', [validators.password, (value) => { return this.state.password1.value === value; }])} />
        </FormRow>
        <FormRow label={_('E-mail')}>
          <InputField
            value={this.state.email.value}
            valid={this.state.email.valid}
            onChange={InputField.createChangeHandler(this, 'email', [validators.email])} />
        </FormRow>
        <FinalFormRow>
          <SubmitButton
            label={_('Create account')}
            onClick={this._handleSubmit}
            disabled={!this._isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}

export class RegisterPage extends Component {
  render() {
    return (
      <ThinLayout title={_('Settlers')}>
        <RegisterForm />
      </ThinLayout>
    );
  }
}
