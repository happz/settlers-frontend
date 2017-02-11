import React, { Component, PropTypes } from 'react';
import { _ } from '../../localize.js';
import { SelectField } from './SelectField.jsx';
import { validators } from '../../validators.js';
import { Field } from './Field.jsx';

export class GameSelectField extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool.isRequired,
    showValidation: PropTypes.bool.isRequired
  }

  static createInitialState = () => {
    return Field.createInitialState('', false);
  }

  static createChangeHandler = (container, name) => {
    return Field.createChangeHandler(container, name, [validators.oneOf(['', 'settlers'])]);
  }

  render() {
    return (
      <SelectField
        value={this.props.value}
        valid={this.props.value !== ''}
        onChange={this.props.onChange}
        showValidation={true}
        required={this.props.required}>
        <option value="">{_('Pick a game kind...')}</option>
        <option value="settlers">{_('Settlers')}</option>
      </SelectField>
    );
  }
}
