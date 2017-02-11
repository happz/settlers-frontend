import React, { Component, PropTypes } from 'react';
import { Field, FieldPropTypes } from './Field.jsx';
import { RequiredTag } from './RequiredTag.jsx';

export class TextArea extends Component {
  static propTypes = Object.assign({
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
  }, FieldPropTypes);

  static createInitialState = Field.createInitialState;
  static createChangeHandler = Field.createChangeHandler;

  render() {
    return (
      <span>
        <textarea
          rows={this.props.rows} cols={this.props.cols}
          value={this.props.value}
          className={Field.validClass(this)}
          onChange={this.props.onChange} />
        <RequiredTag required={this.props.required} valid={this.props.valid} />
      </span>
    );
  }
}
