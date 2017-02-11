import React, { Component } from 'react';
import { Field, FieldPropTypes } from './Field.jsx';
import { RequiredTag } from './RequiredTag.jsx';


export class SelectField extends Component {
  static propTypes = Object.assign({}, FieldPropTypes);

  static createInitialState = Field.createInitialState;
  static createChangeHandler = Field.createChangeHandler;

  render() {
    return (
      <span>
        <select
          value={this.props.value}
          className={Field.validClass(this)}
          onChange={this.props.onChange}>
          {this.props.children}
        </select>
        <RequiredTag required={this.props.required} valid={this.props.valid} />
      </span>
    );
  }
}
