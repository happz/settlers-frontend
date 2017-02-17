import React, { Component, PropTypes } from 'react';
import { _ } from '../../localize.js';
import { SelectField } from './SelectField.jsx';
import { validators } from '../../validators.js';
import { Field } from './Field.jsx';
import { gamesListProp } from '../../proptypes.js';

export default class extends Component {
  static propTypes = {
    value: gamesListProp.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool.isRequired
  }

  static createInitialState = () => {
    return Field.createInitialState('', 'invalid');
  }

  static createChangeHandler = (container, name) => {
    return Field.createChangeHandler(container, name, [validators.oneOf(['', 'settlers'])]);
  }

  render() {
    return (
      <SelectField
        value={this.props.value}
        valid={this.props.value === '' ? 'invalid' : 'valid'}
        onChange={this.props.onChange}
        required={this.props.required}>
        <option value="">{_('Pick a game kind...')}</option>
        <option value="settlers">{_('Settlers')}</option>
      </SelectField>
    );
  }
}
