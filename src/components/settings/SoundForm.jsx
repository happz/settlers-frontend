import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Form, FormRow, FinalFormRow } from '../ui.jsx';
import { SelectField } from '../forms/SelectField.jsx';
import SubmitButton from '../forms/SubmitButton.jsx';
import { update } from '../../common.js';
import { _ } from '../../localize.js';
import { successMessage, errorMessage } from '../../modules/messageBox.js';

class SoundForm extends Component {
  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form legend="Sound notification">
        <FormRow label="Play sound when player you are on turn?">
          <SelectField
            value={(this.props.enabled ? "1" : "0")}
            valid="valid"
            onChange={this.props.onChange}
            required={true}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </SelectField>
        </FormRow>
        <FinalFormRow>
          <SubmitButton label="Set" onClick={this.props.onSubmit} />
        </FinalFormRow>
      </Form>
    );
  }
}

class SoundFormContainer extends Component {
  static propTypes = {
    enabled: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      enabled: this.props.enabled
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.enabled === nextProps.enabled)
      return;

    this.setState({
      enabled: nextProps.enabled
    });
  }

  _updateState = (perPage) => {
    update('/settings/sound', {
      enabled: this.state.enabled
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

  _handleChange = (event) => {
    this.setState({
      enabled: event.target.value === '1'
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    this._updateState(this.state.enabled);
  }

  render() {
    return (
      <SoundForm
        enabled={this.state.enabled}
        onChange={this._handleChange}
        onSubmit={this._handleSubmit}
      />
    );
  }
}

export default connect((state) => {
  return {
    enabled: state.user.sound
  };
})(SoundFormContainer); 
