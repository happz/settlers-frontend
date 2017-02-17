import React, { Component, PropTypes } from 'react';
import { Form, FinalFormRow } from './ui.jsx';
import { TextArea } from '../components/forms/TextArea.jsx';
import SubmitButton from '../components/forms/SubmitButton.jsx';
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
      text: TextArea.createInitialState('', 'invalid')
    };
  }

  _isValid = () => {
    return this.state.text.valid === 'valid';
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    if (!this._isValid())
      return;

    this.props.onSubmit(this.state.text, () => {
      this.setState({
        text: TextArea.createInitialState('', 'invalid')
      });
    });
  }

  render() {
    return (
      <Form legend={_('New message')}>
        <FinalFormRow>
          <TextArea
            rows={7} cols={90}
            value={this.state.text.value}
            valid={this.state.text.valid}
            required={true}
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
