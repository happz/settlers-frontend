import { PropTypes } from 'react';
import { _ } from '../../localize.js';


module.exports.FieldPropTypes = {
  value: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
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
          valid: null
        };
      } else {
        let valid = true;

        for(var i = 0; i < validators.length; i++)
          valid = valid && validators[i](value);

        state[name] = {
          value: value,
          valid: valid
        };
      }

      container.setState(state);
    }
  }

  static validClass(field) {
    if (field.props.valid === true)
      return 'valid';

    if (field.props.valid === false)
      return 'invalid';

    if (field.props.valid === null)
      return (field.props.required === true ? 'invalid' : null);

    return null;
  }
};
