import React, { Component } from 'react';
import { ThinLayout, Form, FormRow, FinalFormRow, SubmitButton } from '../components/ui.jsx';
import { InputField } from '../components/forms/InputField.jsx';
import { update, STATUS } from '../common.js';
import { validators } from '../validators.js';

const log = require('loglevel');

import { _ } from '../localize.js';

const md5 = require('js-md5');


class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: InputField.createInitialState('', false),
      password: InputField.createInitialState('', false)
    };
  }

  _isValid = () => {
    return this.state.username.valid === true
      && this.state.password.valid === true;
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid())
      return;

    update('/login', {
      username: this.state.username.value,
      password: md5.hex(this.state.password.value)
    })
      .then((response) => {
        log.debug('fetch(/login): userspace response: %O', response);

        if (response === null)
          return;

        window.EE.emitEvent('page.switch', ['settings']);
      })
      .catch((error) => {
        log.debug('fetch(/login): userspace catch: %O', error);

        STATUS.Error({
          text: _(error.message)
        });
      });
  }

  render() {
    return (
      <Form>
        <FormRow label={_('Username')}>
          <InputField
            value={this.state.username.value}
            valid={this.state.username.valid}
            required={true}
            onChange={InputField.createChangeHandler(this, 'username', [validators.username])} />
        </FormRow>
        <FormRow label={_('Password')}>
          <InputField
            type="password"
            value={this.state.password.value}
            valid={this.state.password.valid}
            required={true}
            onChange={InputField.createChangeHandler(this, 'password', [validators.password])} />
        </FormRow>
        <FinalFormRow>
          <SubmitButton label={_('Log in')} onClick={this._handleSubmit} disabled={!this._isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}

export class LoginPage extends Component {
  render() {
    return (
      <ThinLayout title={_('Settlers')}>
        <LoginForm />
      </ThinLayout>
    );
  }
}
