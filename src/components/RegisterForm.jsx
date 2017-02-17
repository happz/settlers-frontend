import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Form, FormRow, FinalFormRow } from '../components/ui.jsx';
import { InputField } from '../components/forms/InputField.jsx';
import SubmitButton from '../components/forms/SubmitButton.jsx';
import { update } from '../common.js';
import { validators } from '../validators.js';
import { fieldValidStates } from '../proptypes.js';
import { switchPage } from '../modules/page.js';
import { successMessage, errorMessage } from '../modules/messageBox.js';

const md5 = require('js-md5');

import { _ } from '../localize.js';


class RegisterForm extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    usernameValid: fieldValidStates.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    password1: PropTypes.string.isRequired,
    password1Valid: fieldValidStates.isRequired,
    onPassword1Change: PropTypes.func.isRequired,
    password2: PropTypes.string.isRequired,
    password2Valid: fieldValidStates.isRequired,
    onPassword2Change: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    emailValid: fieldValidStates.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form legend={_('New player')}>
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
            value={this.props.password1}
            valid={this.props.password1Valid}
            required={true}
            onChange={this.props.onPassword1Change} />
        </FormRow>
        <FormRow label={_('Password verification')}>
          <InputField
            type="password"
            value={this.props.password2}
            valid={this.props.password2Valid}
            required={true}
            onChange={this.props.onPassword2Change} />
        </FormRow>
        <FormRow label={_('E-mail')}>
          <InputField
            value={this.props.email}
            valid={this.props.emailValid}
            required={true}
            onChange={this.props.onEmailChange} />
        </FormRow>
        <FinalFormRow>
          <SubmitButton
            label={_('Create account')}
            onClick={this.props.onSubmit}
            disabled={!this.props.isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}

class RegisterFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username:  InputField.createInitialState('', 'invalid'),
      password1: InputField.createInitialState('', 'invalid'),
      password2: InputField.createInitialState('', 'invalid'),
      email:     InputField.createInitialState('', 'invalid')
    };
  }

  _isValid = () => {
    return this.state.username.valid === 'valid'
      && this.state.password1.valid === 'valid'
      && this.state.password2.valid === 'valid'
      && this.state.email.valid === 'valid';
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid())
      return;

    update('/register', {
      username: this.state.username.value,
      password: md5.hex(this.state.password1.value),
      email: this.state.email.value
    })
      .then((response) => {
        if (response === null)
          return;

        this.props.dispatch(successMessage({
          text: _('Account registered.'),
          onClose: () => {
            this.props.dispatch(switchPage('login'));
          }
        }));
      })
      .catch((error) => {
        this.props.dispatch(errorMessage({
          text: error.message
        }));
      });
  }

  render() {
    return (
      <RegisterForm
        username={this.state.username.value}
        usernameValid={this.state.username.valid}
        onUsernameChange={InputField.createChangeHandler(this, 'username', [validators.username])}
        password1={this.state.password1.value}
        password1Valid={this.state.password1.valid}
        onPassword1Change={InputField.createChangeHandler(this, 'password1', [validators.password])}
        password2={this.state.password2.value}
        password2Valid={this.state.password2.valid}
        onPassword2Change={InputField.createChangeHandler(this, 'password2', [validators.password, (value) => { return this.state.password1.value === value; }])}
        email={this.state.email.value}
        emailValid={this.state.email.valid}
        onEmailChange={InputField.createChangeHandler(this, 'email', [validators.email])}
        onSubmit={this._handleSubmit}
        isValid={this._isValid} />
    );
  }
}

export default connect((state) => {
  return {};
})(RegisterFormContainer);
