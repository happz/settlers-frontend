import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Form, FormRow, FinalFormRow } from '../components/ui.jsx';
import { InputField } from '../components/forms/InputField.jsx';
import SubmitButton from '../components/forms/SubmitButton.jsx';
import { update } from '../common.js';
import { validators } from '../validators.js';

import { fieldValidStates } from '../proptypes.js';

import { switchPage } from '../modules/page.js';
import { errorMessage } from '../modules/messageBox.js';

const log = require('loglevel');

import { _ } from '../localize.js';

const md5 = require('js-md5');


class LoginForm extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    usernameValid: fieldValidStates.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    passwordValid: fieldValidStates.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form>
        <FormRow label={_('Username')}>
          <InputField
            value={this.props.username}
            valid={this.props.usernameValid}
            required={true}
            onChange={this.props.onUsernameChange} />
        </FormRow>
        <FormRow label={_('Password')}>
          <InputField
            type="password"
            value={this.props.password}
            valid={this.props.passwordValid}
            required={true}
            onChange={this.props.onPasswordChange} />
        </FormRow>
        <FinalFormRow>
          <SubmitButton label={_('Log in')} onClick={this.props.onSubmit} disabled={!this.props.isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}

class LoginFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: InputField.createInitialState('', 'invalid'),
      password: InputField.createInitialState('', 'invalid')
    };
  }

  _isValid = () => {
    return this.state.username.valid === 'valid'
      && this.state.password.valid === 'valid';
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

        this.props.dispatch(switchPage('settings'));
      })
      .catch((error) => {
        log.debug('fetch(/login): userspace catch: %O', error);

        this.props.dispatch(errorMessage({
          text: _(error.message)
        }));
      });
  }

  render() {
    return (
      <LoginForm
        username={this.state.username.value}
        usernameValid={this.state.username.valid}
        onUsernameChange={InputField.createChangeHandler(this, 'username', [validators.username])}
        password={this.state.password.value}
        passwordValid={this.state.password.valid}
        onPasswordChange={InputField.createChangeHandler(this, 'password', [validators.password])}
        onSubmit={this._handleSubmit}
        isValid={this._isValid} />
    );
  }
}

export default connect((state) => {
  return {
  };
})(LoginFormContainer);
