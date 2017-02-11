import React, { Component, PropTypes } from 'react';
import { Field, FieldPropTypes } from './Field.jsx';
import { RequiredTag } from './RequiredTag.jsx';

export class InputField extends Component {
  static propTypes = Object.assign({
    type: PropTypes.oneOf(['text', 'password']),
    placeholder: PropTypes.string
  }, FieldPropTypes);

  static defaultProps = {
    type: 'text',
    placeholder: ''
  }

  static createInitialState = Field.createInitialState;
  static createChangeHandler = Field.createChangeHandler;

  render() {
    return (
      <span>
        <input
          type={this.props.type}
          value={this.props.value}
          className={Field.validClass(this)}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange} />
        <RequiredTag required={this.props.required} valid={this.props.valid} />
      </span>
    );
  }
}
