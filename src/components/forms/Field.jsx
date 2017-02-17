import { PropTypes } from 'react';
import { fieldValidStates } from '../../proptypes.js';
import { _ } from '../../localize.js';

module.exports.FieldPropTypes = {
  value: PropTypes.string.isRequired,
  valid: fieldValidStates.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired
};

module.exports.Field = class {
  static createInitialState(value, valid) {
    return {
      value: value,
      valid: valid
    };
  }

  static createChangeHandler(container, name, validators = []) {
    return (event) => {
      const value = event.target.value;
      let state = {};

      if (value === '') {
        state[name] = {
          value: '',
          valid: 'unknown'
        };
      } else {
        let valid = true;

        for(var i = 0; i < validators.length; i++)
          valid = valid && validators[i](value);

        state[name] = {
          value: value,
          valid: (valid === true ? 'valid' : 'invalid')
        };
      }

      container.setState(state);
    }
  }

  static validClass(field) {
    if (field.props.valid === 'valid')
      return 'valid';

    if (field.props.valid === 'invalid')
      return 'invalid';

    if (field.props.valid === 'unknown')
      return (field.props.required === true ? 'invalid' : null);

    return null;
  }
};
