import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Form, FormRow, FinalFormRow } from '../ui.jsx';
import { SelectField } from '../forms/SelectField.jsx';
import SubmitButton from '../forms/SubmitButton.jsx';
import { update } from '../../common.js';
import { _ } from '../../localize.js';
import { successMessage, errorMessage } from '../../modules/messageBox.js';

class ChangeAfterPassTurnForm extends Component {
  static propTypes = {
    value: PropTypes.oneOf([0, 1, 2]).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    return (
      <Form legend={_('Pass turn')}>
        <FormRow label={_('What to do after passing a turn?')}>
          <SelectField
            value={this.props.value.toString()}
            valid="valid"
            onChange={this.props.onChange}
            required={true}>
            <option value="0">{_('Switch to the next game')}</option>
            <option value="1">{_('Stay in the current game')}</option>
            <option value="2">{_('Switch to the current games listing')}</option>
          </SelectField>
        </FormRow>
        <FinalFormRow>
          <SubmitButton label={_('Set')} onClick={this.props.onSubmit} />
        </FinalFormRow>
      </Form>
    );
  }
}

class ChangeAfterPassTurnFormContainer extends Component {
  static propTypes = {
    afterPassTurn: PropTypes.oneOf([0, 1, 2]).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      afterPassTurn: this.props.afterPassTurn
    };
  }

  _updateState = (afterPassTurn) => {
    update('/settings/after_pass_turn', {
      afterPassTurn: afterPassTurn
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
      afterPassTurn: parseInt(event.target.value, 10)
    });
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    this._updateState(this.state.afterPassTurn);
  }

  render() {
    return (
      <ChangeAfterPassTurnForm
        value={this.state.afterPassTurn}
        onSubmit={this._handleSubmit}
        onChange={this._handleChange} />
    );
  }
}

export default connect((state) => {
  return {
    afterPassTurn: state.user.afterPassTurn
  };
})(ChangeAfterPassTurnFormContainer);
