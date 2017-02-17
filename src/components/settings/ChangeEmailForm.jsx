import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Form, FormRow, FinalFormRow } from '../ui.jsx';
import { InputField } from '../forms/InputField.jsx';
import SubmitButton from '../forms/SubmitButton.jsx';
import { update } from '../../common.js';
import { validators } from '../../validators.js';
import { fieldValidStates } from '../../proptypes.js';
import { _ } from '../../localize.js';
import { successMessage, errorMessage } from '../../modules/messageBox.js';

class ChangeEmailForm extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    valid: fieldValidStates.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form legend={_('Change e-mail')}>
        <FormRow label={_('Your new e-mail address')}>
          <InputField
            value={this.props.email}
            valid={this.props.valid}
            required={true}
            placeholder="foo@bar.bz"
            onChange={this.props.onChange} />
        </FormRow>
        <FinalFormRow>
          <SubmitButton label={_('Set')} onClick={this.props.onSubmit} disabled={!this.props.isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}

class ChangeEmailFormContainer extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      email: InputField.createInitialState(this.props.email, 'valid')
    };
  }

  _isValid = () => {
    return this.state.email.valid === 'valid';
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid())
      return;

    update('/settings/email', {
      email: this.state.email.value
    })
      .then((response) => {
        if (response === null)
          return;

        this.props.dispatch(successMessage({
          text: _('Settings were successfully updated.')
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
      <ChangeEmailForm
        email={this.state.email.value}
        valid={this.state.email.valid}
        onChange={InputField.createChangeHandler(this, 'email', [validators.email])}
        onSubmit={this._handleSubmit}
        isValid={this._isValid} />
    );
  }
}

export default connect((state) => {
  return {
    email: state.user.email
  };
})(ChangeEmailFormContainer);
