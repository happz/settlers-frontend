import React, { Component, PropTypes } from 'react';
import { Form, FinalFormRow, SubmitButton } from './ui.jsx';
import { TextArea } from '../components/forms/TextArea.jsx';
import { _ } from '../localize.js';
import { validators } from '../validators.js';


export class BoardSubmitForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onPreview: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      text: TextArea.createInitialState('', false)
    };
  }

  _isValid = () => {
    return this.state.text.valid === true;
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid())
      return;

    this.props.onSubmit(this.state.text, () => {
      this.setState({
        text: TextArea.createInitialState()
      });
    });
  }

  render() {
    console.log(this.state);

    return (
      <Form legend={_('New message')}>
        <FinalFormRow>
          <TextArea
            rows={7} cols={90}
            value={this.state.text.value}
            valid={this.state.text.valid}
            required={true}
            showValidation={true}
            onChange={TextArea.createChangeHandler(this, 'text', [validators.notblank])} />
        </FinalFormRow>

        <FinalFormRow>
          <SubmitButton label={_('Add')} onClick={this._handleSubmit} disabled={!this._isValid()} />
          <SubmitButton label={_('Preview')} onClick={this.props.onPreview} disabled={!this._isValid()} />
        </FinalFormRow>
      </Form>
    );
  }
}
