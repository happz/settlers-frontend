import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Form, FormRow, FinalFormRow } from '../ui.jsx';
import { SelectField } from '../forms/SelectField.jsx';
import SubmitButton from '../forms/SubmitButton.jsx';
import { update } from '../../common.js';
import { _ } from '../../localize.js';
import { successMessage, errorMessage } from '../../modules/messageBox.js';

class PerPageForm extends Component {
  static propTypes = {
    value: PropTypes.oneOf([10, 20, 30, 40, 50, 60]).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form legend="Items per page of table">
        <FormRow label="How many items on every page?">
          <SelectField
            value={this.props.value.toString()}
            valid="valid"
            onChange={this.props.onChange}
            required={true}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
          </SelectField>
        </FormRow>
        <FinalFormRow>
          <SubmitButton label="Set" onClick={this.props.onSubmit} />
        </FinalFormRow>
      </Form>
    );
  }
}

class PerPageFormContainer extends Component {
  static propTypes = {
    perPage: PropTypes.oneOf([10, 20, 30, 40, 50, 60]).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      perPage: this.props.perPage
    };
  }

  _updateState = (perPage) => {
    update('/settings/per_page', {
      perPage: perPage
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
      perPage: parseInt(event.target.value, 10)
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    this._updateState(this.state.perPage);
  }

  render() {
    return (
      <PerPageForm
        value={this.state.perPage}
        onChange={this._handleChange}
        onSubmit={this._handleSubmit} />
    );
  }
}

export default connect((state) => {
  return {
    perPage: state.user.perPage
  };
})(PerPageFormContainer); 
